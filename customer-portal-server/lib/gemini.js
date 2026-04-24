// lib/gemini.js
// Vision + scope-extraction wrapper around Google Gemini.
//
// Exports a single function: analyzeProject({ photoBase64Array, description,
// projectType, knownItemKeys }). Returns a normalized object with summary,
// confidence, identified_scope, estimated_labor_hours, notes, items[], raw.
//
// SDK strategy:
//   - Prefer the new official @google/genai package.
//   - Fall back to the legacy @google/generative-ai package if the new one
//     is not installed.
//   - Only require() either SDK lazily inside the call so importing this file
//     never throws.
//
// API key is read from GEMINI_API_KEY at call time (so the server boots
// cleanly without it). Model defaults to gemini-2.0-flash, override via
// GEMINI_MODEL.

const DEFAULT_MODEL = 'gemini-2.0-flash';
const TIMEOUT_MS = 30_000;

// JSON schema describing exactly what we want Gemini to return.
const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    confidence: { type: 'number' },
    identified_scope: { type: 'string' },
    estimated_labor_hours: { type: 'number' },
    notes: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          item_key: { type: 'string' },
          label: { type: 'string' },
          quantity: { type: 'number' },
          unit: { type: 'string' },
        },
        required: ['item_key', 'label', 'quantity', 'unit'],
      },
    },
  },
  required: ['summary', 'confidence', 'items'],
};

function buildSystemInstruction(knownItemKeys) {
  const keyList =
    typeof knownItemKeys === 'string' && knownItemKeys.length
      ? knownItemKeys
      : '(none provided)';
  return [
    'You are an estimating assistant for a Texas residential & light-commercial',
    'construction, landscaping, fencing, and handyman company.',
    '',
    'Given customer photos and a short text description, identify the scope of',
    'work and produce a structured preliminary estimate of materials and labor.',
    '',
    'Rules:',
    '1. You MUST return JSON matching the response schema. No prose outside JSON.',
    '2. For each line item, set "item_key" to ONE of these exact keys when the',
    '   item matches one of them:',
    `   ${keyList}`,
    '3. If no key in that list matches, set "item_key" to "custom" and use the',
    '   "label" field to describe the work in plain English.',
    '4. Quantities must be realistic positive numbers. Use the unit that makes',
    '   sense for that item (linear_ft, sq_ft, hour, each, ton, yard, etc.).',
    '5. "confidence" is a 0.0 - 1.0 estimate of how sure you are about the scope',
    '   given the photo quality and description detail. Lower it for blurry or',
    '   ambiguous photos.',
    '6. "estimated_labor_hours" is total labor across all items.',
    '7. Keep "summary" to one or two sentences describing what you see and what',
    '   work is needed. Do NOT use em dashes anywhere; use hyphens or commas.',
    '8. "notes" should flag anything you are unsure about, anything that needs',
    '   on-site verification, or follow-up questions for the customer.',
    '9. Never invent damage or scope you cannot see; only estimate what is',
    '   visible or directly implied by the description.',
  ].join('\n');
}

function buildUserText(description, projectType) {
  const lines = [];
  if (projectType) {
    lines.push(`Project type: ${projectType}`);
  }
  lines.push('Customer description:');
  lines.push(description || '(none provided)');
  lines.push('');
  lines.push(
    'Analyze the photos plus this description and return the structured JSON estimate.'
  );
  return lines.join('\n');
}

function isTransient5xx(err) {
  if (!err) return false;
  const status = err.status || err.statusCode || (err.response && err.response.status);
  if (typeof status === 'number') return status >= 500 && status < 600;
  const msg = String(err.message || '').toLowerCase();
  return /5\d\d|timeout|deadline|unavailable|temporar/.test(msg);
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      reject(new Error(`Gemini request timed out after ${ms}ms`));
    }, ms);
    promise
      .then((v) => {
        clearTimeout(t);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(t);
        reject(e);
      });
  });
}

function tryRequireGenAI() {
  try {
    // New official SDK: https://www.npmjs.com/package/@google/genai
    return { kind: 'genai', mod: require('@google/genai') };
  } catch (e1) {
    try {
      return {
        kind: 'generative-ai',
        mod: require('@google/generative-ai'),
      };
    } catch (e2) {
      throw new Error(
        'No Google Gemini SDK installed. Install @google/genai (preferred) or @google/generative-ai.'
      );
    }
  }
}

function normalizeResult(parsed, raw) {
  const items = Array.isArray(parsed && parsed.items) ? parsed.items : [];
  const cleanItems = items
    .filter((i) => i && typeof i === 'object')
    .map((i) => ({
      item_key: typeof i.item_key === 'string' && i.item_key.trim() ? i.item_key.trim() : 'custom',
      label: typeof i.label === 'string' ? i.label.trim() : '',
      quantity: Number.isFinite(Number(i.quantity)) ? Number(i.quantity) : 1,
      unit: typeof i.unit === 'string' && i.unit.trim() ? i.unit.trim() : 'each',
    }));

  return {
    summary: typeof parsed.summary === 'string' ? parsed.summary : '',
    confidence:
      Number.isFinite(Number(parsed.confidence)) && Number(parsed.confidence) >= 0
        ? Math.min(1, Number(parsed.confidence))
        : 0,
    identified_scope:
      typeof parsed.identified_scope === 'string' ? parsed.identified_scope : '',
    estimated_labor_hours: Number.isFinite(Number(parsed.estimated_labor_hours))
      ? Number(parsed.estimated_labor_hours)
      : 0,
    notes: typeof parsed.notes === 'string' ? parsed.notes : '',
    items: cleanItems,
    raw,
  };
}

function extractTextFromGenAIResponse(resp) {
  // The new SDK returns a response object with .text (string) or candidates.
  if (!resp) return '';
  if (typeof resp.text === 'string') return resp.text;
  if (typeof resp.text === 'function') {
    try { return resp.text(); } catch (_) { /* fallthrough */ }
  }
  const candidates = resp.candidates || (resp.response && resp.response.candidates);
  if (Array.isArray(candidates) && candidates.length) {
    const parts = candidates[0].content && candidates[0].content.parts;
    if (Array.isArray(parts)) {
      return parts.map((p) => p.text || '').join('');
    }
  }
  return '';
}

async function callGenAI({ apiKey, model, systemInstruction, userText, photoBase64Array }) {
  const { GoogleGenAI } = require('@google/genai');
  const ai = new GoogleGenAI({ apiKey });

  const parts = [{ text: userText }];
  for (const b64 of photoBase64Array) {
    parts.push({
      inlineData: {
        mimeType: b64.mimeType || 'image/jpeg',
        data: b64.data,
      },
    });
  }

  const request = {
    model,
    contents: [{ role: 'user', parts }],
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.2,
    },
  };

  const resp = await ai.models.generateContent(request);
  const text = extractTextFromGenAIResponse(resp);
  return { text, raw: resp };
}

async function callLegacy({ apiKey, model, systemInstruction, userText, photoBase64Array }) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const m = genAI.getGenerativeModel({
    model,
    systemInstruction,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.2,
    },
  });

  const parts = [{ text: userText }];
  for (const b64 of photoBase64Array) {
    parts.push({
      inlineData: {
        mimeType: b64.mimeType || 'image/jpeg',
        data: b64.data,
      },
    });
  }

  const result = await m.generateContent({ contents: [{ role: 'user', parts }] });
  const text =
    (result && result.response && typeof result.response.text === 'function'
      ? result.response.text()
      : '') || '';
  return { text, raw: result && result.response ? result.response : result };
}

async function analyzeProject({
  photoBase64Array,
  description,
  projectType,
  knownItemKeys,
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }
  if (!Array.isArray(photoBase64Array) || photoBase64Array.length === 0) {
    throw new Error('analyzeProject: photoBase64Array must contain at least one photo');
  }
  if (typeof description !== 'string' || description.trim().length < 1) {
    throw new Error('analyzeProject: description is required');
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const systemInstruction = buildSystemInstruction(knownItemKeys);
  const userText = buildUserText(description, projectType);

  const sdk = tryRequireGenAI();

  const doCall = async () => {
    if (sdk.kind === 'genai') {
      return callGenAI({ apiKey, model, systemInstruction, userText, photoBase64Array });
    }
    return callLegacy({ apiKey, model, systemInstruction, userText, photoBase64Array });
  };

  let lastErr = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const { text, raw } = await withTimeout(doCall(), TIMEOUT_MS);
      if (!text) {
        throw new Error('Gemini returned an empty response');
      }
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (parseErr) {
        // Try to salvage JSON if the model wrapped it.
        const match = text.match(/\{[\s\S]*\}/);
        if (!match) {
          throw new Error('Gemini response was not valid JSON');
        }
        parsed = JSON.parse(match[0]);
      }
      return normalizeResult(parsed, raw);
    } catch (err) {
      lastErr = err;
      if (attempt === 0 && isTransient5xx(err)) {
        // brief backoff then retry once
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      break;
    }
  }
  throw lastErr || new Error('Gemini call failed');
}

module.exports = {
  analyzeProject,
  // Exposed for tests / debugging.
  _internal: { RESPONSE_SCHEMA, buildSystemInstruction, buildUserText, normalizeResult },
};
