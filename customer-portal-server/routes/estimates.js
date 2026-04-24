// routes/estimates.js
// Smart Estimate endpoints. Vision via Google Gemini, deterministic pricing
// via Supabase pricing_baselines + pricing_zones tables.
//
// Mounted at /api/admin/estimates from server.js.

const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const { supabase } = require('../lib/supabase');
const { verifyAdmin } = require('../middleware/auth');
const { analyzeProject } = require('../lib/gemini');
const {
  resolveZone,
  buildEstimate,
  suggestQuoteTitle,
  roundMoney,
} = require('../lib/pricing');

const router = express.Router();

// ---------------------------------------------------------------------------
// Config / limits
// ---------------------------------------------------------------------------

const MAX_PHOTOS = parseInt(process.env.MAX_PHOTOS || '5', 10);
const MAX_PHOTO_SIZE_MB = parseInt(process.env.MAX_PHOTO_SIZE_MB || '5', 10);
const MAX_PHOTO_SIZE_BYTES = MAX_PHOTO_SIZE_MB * 1024 * 1024;
const ESTIMATE_RATE_LIMIT_PER_HOUR = parseInt(
  process.env.ESTIMATE_RATE_LIMIT_PER_HOUR || '30',
  10
);
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const STORAGE_BUCKET = 'estimate-photos';
const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1h

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PHOTO_SIZE_BYTES, files: MAX_PHOTOS },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIMES.has(file.mimetype)) {
      return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
    cb(null, true);
  },
});

const estimateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: ESTIMATE_RATE_LIMIT_PER_HOUR,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Estimate rate limit exceeded. Try again later.' },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function bad(res, msg, status = 400) {
  return res.status(status).json({ success: false, error: msg });
}

function fail(res, err, fallback, status = 500) {
  // eslint-disable-next-line no-console
  console.error('[estimates]', fallback, err);
  return res
    .status(err && err.status ? err.status : status)
    .json({ success: false, error: (err && err.message) || fallback });
}

function isUuid(v) {
  return typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

function extForMime(mime) {
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'bin';
}

// Multer error -> JSON. Wrap upload.array so we can return cleaner errors.
function uploadPhotos(req, res, next) {
  const handler = upload.array('photos', MAX_PHOTOS);
  handler(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return bad(res, `Photo too large (max ${MAX_PHOTO_SIZE_MB}MB each)`, 413);
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return bad(res, `Too many photos (max ${MAX_PHOTOS})`, 413);
      }
      return bad(res, `Upload error: ${err.message}`, 400);
    }
    return bad(res, err.message || 'Upload failed', 400);
  });
}

// ---------------------------------------------------------------------------
// POST /api/admin/estimates
// Multipart: photos[] (required, 1-MAX), description, zip_code,
//            customer_id (optional), project_type (optional)
// ---------------------------------------------------------------------------

router.post('/', verifyAdmin, estimateLimiter, uploadPhotos, async (req, res) => {
  try {
    const description =
      typeof req.body.description === 'string' ? req.body.description.trim() : '';
    const zipCode = typeof req.body.zip_code === 'string' ? req.body.zip_code.trim() : '';
    const customerId =
      typeof req.body.customer_id === 'string' && req.body.customer_id.trim()
        ? req.body.customer_id.trim()
        : null;
    const projectType =
      typeof req.body.project_type === 'string' ? req.body.project_type.trim() : '';

    // ---- Validate
    if (!Array.isArray(req.files) || req.files.length === 0) {
      return bad(res, 'At least one photo is required');
    }
    if (description.length < 10 || description.length > 2000) {
      return bad(res, 'Description must be 10-2000 characters');
    }
    if (!/^\d{5}$/.test(zipCode)) {
      return bad(res, 'zip_code must be a 5-digit US ZIP');
    }
    if (customerId && !isUuid(customerId)) {
      return bad(res, 'customer_id must be a UUID');
    }

    const userId = req.user.id;

    // ---- 1. Upload photos to private storage bucket.
    const storagePaths = [];
    for (let i = 0; i < req.files.length; i += 1) {
      const f = req.files[i];
      const ext = extForMime(f.mimetype);
      const objectPath = `${userId}/${Date.now()}-${i}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(objectPath, f.buffer, {
          contentType: f.mimetype,
          upsert: false,
        });
      if (uploadErr) {
        return fail(res, uploadErr, `Failed to upload photo ${i + 1}`);
      }
      storagePaths.push(objectPath);
    }

    // ---- 2. (Generate signed URLs - currently unused since we pass inline data
    // to Gemini, but generated for the response so admin UI can preview.)
    let signedUrls = [];
    try {
      const { data: signed, error: signErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrls(storagePaths, SIGNED_URL_TTL_SECONDS);
      if (!signErr && Array.isArray(signed)) {
        signedUrls = signed.map((s) => s.signedUrl || s.signedURL || null);
      }
    } catch (_e) {
      signedUrls = [];
    }

    // ---- 3. Convert each photo buffer to base64 for Gemini inline data.
    const photoBase64Array = req.files.map((f) => ({
      mimeType: f.mimetype,
      data: f.buffer.toString('base64'),
    }));

    // ---- 4. Fetch baselines + zones.
    const [baselinesRes, zonesRes] = await Promise.all([
      supabase
        .from('pricing_baselines')
        .select('*')
        .eq('active', true)
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true }),
      supabase
        .from('pricing_zones')
        .select('*')
        .order('sort_order', { ascending: true }),
    ]);
    if (baselinesRes.error) return fail(res, baselinesRes.error, 'Failed to load baselines');
    if (zonesRes.error) return fail(res, zonesRes.error, 'Failed to load zones');

    const baselines = baselinesRes.data || [];
    const zones = zonesRes.data || [];
    const knownItemKeys = baselines.map((b) => b.item_key).join(',');

    // ---- 5. Call Gemini.
    let aiResult;
    try {
      aiResult = await analyzeProject({
        photoBase64Array,
        description,
        projectType,
        knownItemKeys,
      });
    } catch (geminiErr) {
      return fail(res, geminiErr, 'AI analysis failed', 502);
    }

    // ---- 6. Resolve zone.
    let zone;
    try {
      zone = resolveZone(zipCode, zones);
    } catch (zoneErr) {
      return fail(res, zoneErr, 'Failed to resolve service zone', 400);
    }

    // ---- 7. Build deterministic priced estimate.
    const built = buildEstimate(aiResult, zone, baselines);
    const suggestedTitle = suggestQuoteTitle(aiResult, zone);

    // ---- 8. Insert estimate row.
    const insertPayload = {
      created_by: userId,
      customer_id: customerId,
      photo_urls: storagePaths,
      description,
      zip_code: zipCode,
      zone_id: zone.id,
      zone_multiplier: Number.isFinite(Number(zone.multiplier))
        ? Number(zone.multiplier)
        : 1,
      ai_provider: 'google-gemini',
      ai_raw_response: aiResult.raw || null,
      ai_summary: aiResult.summary || '',
      ai_confidence: aiResult.confidence || 0,
      suggested_items: built.line_items,
      suggested_subtotal: built.subtotal,
      suggested_quote_title: suggestedTitle,
      warnings: built.warnings,
      status: 'draft',
    };

    const { data: inserted, error: insertErr } = await supabase
      .from('estimates')
      .insert(insertPayload)
      .select('*')
      .single();
    if (insertErr) {
      return fail(res, insertErr, 'Failed to save estimate');
    }

    return res.json({
      success: true,
      estimate: inserted,
      ai: {
        summary: aiResult.summary,
        confidence: aiResult.confidence,
        identified_scope: aiResult.identified_scope,
        estimated_labor_hours: aiResult.estimated_labor_hours,
        notes: aiResult.notes,
        items: aiResult.items,
      },
      zone,
      line_items: built.line_items,
      subtotal: built.subtotal,
      warnings: built.warnings,
      suggested_quote_title: suggestedTitle,
      photo_paths: storagePaths,
      photo_signed_urls: signedUrls,
    });
  } catch (err) {
    return fail(res, err, 'Failed to create estimate');
  }
});

// ---------------------------------------------------------------------------
// GET /api/admin/estimates/:id
// ---------------------------------------------------------------------------

router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (!isUuid(id)) return bad(res, 'Invalid estimate id');

    const { data, error } = await supabase
      .from('estimates')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) return fail(res, error, 'Failed to load estimate');
    if (!data) return bad(res, 'Estimate not found', 404);

    return res.json({ success: true, estimate: data });
  } catch (err) {
    return fail(res, err, 'Failed to load estimate');
  }
});

// ---------------------------------------------------------------------------
// PATCH /api/admin/estimates/:id
// Body: { status }
// Only allows status transition to 'discarded'.
// ---------------------------------------------------------------------------

router.patch('/:id', verifyAdmin, express.json(), async (req, res) => {
  try {
    const id = req.params.id;
    if (!isUuid(id)) return bad(res, 'Invalid estimate id');

    const status = req.body && req.body.status;
    if (status !== 'discarded') {
      return bad(res, 'Only transition to status="discarded" is allowed via PATCH');
    }

    const { data: existing, error: loadErr } = await supabase
      .from('estimates')
      .select('id, status')
      .eq('id', id)
      .maybeSingle();
    if (loadErr) return fail(res, loadErr, 'Failed to load estimate');
    if (!existing) return bad(res, 'Estimate not found', 404);

    const { data: updated, error: updateErr } = await supabase
      .from('estimates')
      .update({ status: 'discarded' })
      .eq('id', id)
      .select('*')
      .single();
    if (updateErr) return fail(res, updateErr, 'Failed to update estimate');

    return res.json({ success: true, estimate: updated });
  } catch (err) {
    return fail(res, err, 'Failed to update estimate');
  }
});

// ---------------------------------------------------------------------------
// POST /api/admin/estimates/:id/convert
// Body: { customer_id (required), title?, items? }
// Creates a Draft quote + quote_items, marks estimate as converted.
// ---------------------------------------------------------------------------

router.post('/:id/convert', verifyAdmin, express.json(), async (req, res) => {
  try {
    const id = req.params.id;
    if (!isUuid(id)) return bad(res, 'Invalid estimate id');

    const customerId = req.body && req.body.customer_id;
    if (!isUuid(customerId)) return bad(res, 'customer_id (uuid) is required');

    const overrideTitle =
      typeof (req.body && req.body.title) === 'string' && req.body.title.trim()
        ? req.body.title.trim()
        : null;
    const overrideItems =
      Array.isArray(req.body && req.body.items) && req.body.items.length
        ? req.body.items
        : null;

    // Load estimate.
    const { data: estimate, error: loadErr } = await supabase
      .from('estimates')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (loadErr) return fail(res, loadErr, 'Failed to load estimate');
    if (!estimate) return bad(res, 'Estimate not found', 404);
    if (estimate.status !== 'draft') {
      return bad(res, `Estimate status is ${estimate.status}; only draft estimates can be converted`);
    }

    // Build line items array (use override if provided, else suggested_items).
    const sourceItems = overrideItems || estimate.suggested_items || [];
    if (!Array.isArray(sourceItems) || sourceItems.length === 0) {
      return bad(res, 'No line items available to convert');
    }

    const cleanItems = sourceItems.map((it, index) => {
      const qty = Number.isFinite(Number(it.quantity)) ? Number(it.quantity) : 0;
      const unitPrice = Number.isFinite(Number(it.unit_price)) ? Number(it.unit_price) : 0;
      const unitCost = Number.isFinite(Number(it.unit_cost)) ? Number(it.unit_cost) : 0;
      const lineTotal = roundMoney(qty * unitPrice);
      const lineCost = roundMoney(qty * unitCost);
      return {
        service_id: it.service_id || null,
        description: (it.label || it.description || it.item_key || 'Item').toString().trim(),
        quantity: qty,
        unit: (it.unit || 'each').toString(),
        unit_price: roundMoney(unitPrice),
        unit_cost: roundMoney(unitCost),
        total: lineTotal,
        total_cost: lineCost,
        sort_order: index,
      };
    });

    // Compute totals.
    const subtotal = roundMoney(
      cleanItems.reduce((s, it) => s + (Number(it.total) || 0), 0)
    );
    const taxRate = 8.25;
    const discountAmount = 0;
    const taxableBase = Math.max(0, subtotal - discountAmount);
    const taxAmount = roundMoney(taxableBase * (taxRate / 100));
    const total = roundMoney(taxableBase + taxAmount);

    const title = overrideTitle || estimate.suggested_quote_title || 'Estimate';
    const notes = [
      `[Generated from Smart Estimate ${estimate.id}]`,
      '',
      `AI summary: ${estimate.ai_summary || ''}`,
      '',
      'Preliminary estimate - subject to on-site review.',
    ].join('\n');
    const terms =
      'This is a preliminary estimate generated from photos and a brief description. Final pricing requires an on-site assessment.';

    const quotePayload = {
      customer_id: customerId,
      title,
      description: estimate.description || null,
      status: 'Draft',
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      discount_amount: discountAmount,
      total,
      terms,
      notes,
    };

    // Insert quote.
    const { data: createdQuote, error: quoteErr } = await supabase
      .from('quotes')
      .insert(quotePayload)
      .select('id')
      .single();
    if (quoteErr) return fail(res, quoteErr, 'Failed to create quote');

    const quoteId = createdQuote.id;

    // Insert quote items.
    const itemsWithQuoteId = cleanItems.map((it) => ({ ...it, quote_id: quoteId }));
    const { error: itemsErr } = await supabase.from('quote_items').insert(itemsWithQuoteId);
    if (itemsErr) {
      // Best-effort cleanup of the quote since items failed.
      await supabase.from('quotes').delete().eq('id', quoteId);
      return fail(res, itemsErr, 'Failed to create quote items');
    }

    // Mark estimate converted.
    const { error: updateErr } = await supabase
      .from('estimates')
      .update({ status: 'converted', converted_quote_id: quoteId })
      .eq('id', id);
    if (updateErr) {
      // Quote is created; just warn.
      // eslint-disable-next-line no-console
      console.warn('[estimates] convert: estimate update failed:', updateErr.message);
    }

    return res.json({ success: true, quote_id: quoteId });
  } catch (err) {
    return fail(res, err, 'Failed to convert estimate');
  }
});

module.exports = router;
