// routes/pricing.js
// Read-only admin endpoints exposing pricing zones, baselines, and zone
// resolution. Lets the admin frontend preview pricing data through the
// service-role backend (single source of truth for pricing logic) instead
// of touching Supabase RLS-gated tables directly.
//
// Mounted at /api/admin/pricing from server.js.

const express = require('express');

const { supabase } = require('../lib/supabase');
const { verifyAdmin } = require('../middleware/auth');
const { resolveZone } = require('../lib/pricing');

const router = express.Router();

function fail(res, err, fallback, status = 500) {
  // eslint-disable-next-line no-console
  console.error('[pricing]', fallback, err);
  return res
    .status(err && err.status ? err.status : status)
    .json({ success: false, error: (err && err.message) || fallback });
}

// GET /api/admin/pricing/zones
router.get('/zones', verifyAdmin, async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('pricing_zones')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error, 'Failed to load zones');
    return res.json({ success: true, zones: data || [] });
  } catch (err) {
    return fail(res, err, 'Failed to load zones');
  }
});

// GET /api/admin/pricing/baselines
router.get('/baselines', verifyAdmin, async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('pricing_baselines')
      .select('*')
      .eq('active', true)
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error, 'Failed to load baselines');
    return res.json({ success: true, baselines: data || [] });
  } catch (err) {
    return fail(res, err, 'Failed to load baselines');
  }
});

// GET /api/admin/pricing/resolve-zone?zip=77316
router.get('/resolve-zone', verifyAdmin, async (req, res) => {
  try {
    const zip = typeof req.query.zip === 'string' ? req.query.zip.trim() : '';
    if (!/^\d{5}$/.test(zip)) {
      return res.status(400).json({ success: false, error: 'zip must be a 5-digit string' });
    }

    const { data: zones, error } = await supabase
      .from('pricing_zones')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error, 'Failed to load zones');

    let zone;
    try {
      zone = resolveZone(zip, zones || []);
    } catch (resolveErr) {
      return res.status(404).json({ success: false, error: resolveErr.message });
    }
    return res.json({ success: true, zone });
  } catch (err) {
    return fail(res, err, 'Failed to resolve zone');
  }
});

module.exports = router;
