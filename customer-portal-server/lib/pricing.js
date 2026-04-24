// lib/pricing.js
// Pure functions for resolving zones and pricing line items from baselines.
// No I/O. The caller must fetch zones + baselines and pass them in.

function roundMoney(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num * 100) / 100;
}

function isFiveDigitZip(zip) {
  return typeof zip === 'string' && /^\d{5}$/.test(zip);
}

// Longest-prefix match against zone.zip_prefixes (an array of strings).
// e.g. zone with prefixes ['773','7731'] is preferred over one with ['77'] for zip 77316.
function resolveZone(zip, zones) {
  if (!isFiveDigitZip(zip)) {
    throw new Error('resolveZone: zip must be a 5-digit string');
  }
  if (!Array.isArray(zones) || zones.length === 0) {
    throw new Error('resolveZone: zones array is required');
  }

  let best = null;
  let bestLen = -1;
  for (const zone of zones) {
    const prefixes = Array.isArray(zone && zone.zip_prefixes) ? zone.zip_prefixes : [];
    for (const p of prefixes) {
      if (typeof p !== 'string') continue;
      if (zip.startsWith(p) && p.length > bestLen) {
        best = zone;
        bestLen = p.length;
      }
    }
  }

  if (!best) {
    throw new Error(`resolveZone: no zone matched zip ${zip}`);
  }
  return best;
}

// Price one item using its matching baseline + the zone multiplier.
function priceLineItem(item, baseline, multiplier) {
  if (!item || typeof item !== 'object') {
    throw new Error('priceLineItem: item is required');
  }
  if (!baseline || typeof baseline !== 'object') {
    throw new Error('priceLineItem: baseline is required');
  }
  const mult = Number.isFinite(Number(multiplier)) ? Number(multiplier) : 1;
  const qty = Number.isFinite(Number(item.quantity)) ? Number(item.quantity) : 0;
  const baseUnitPrice = Number.isFinite(Number(baseline.base_unit_price))
    ? Number(baseline.base_unit_price)
    : 0;
  const baseUnitCost = Number.isFinite(Number(baseline.base_unit_cost))
    ? Number(baseline.base_unit_cost)
    : 0;

  const unitPrice = roundMoney(baseUnitPrice * mult);
  const unitCost = roundMoney(baseUnitCost * mult);
  const total = roundMoney(qty * unitPrice);
  const totalCost = roundMoney(qty * unitCost);

  return {
    category: baseline.category || null,
    item_key: baseline.item_key || item.item_key || null,
    label: baseline.label || item.label || '',
    quantity: qty,
    unit: item.unit || baseline.unit || 'each',
    unit_price: unitPrice,
    unit_cost: unitCost,
    total,
    total_cost: totalCost,
  };
}

// Given Gemini's structured scope + the resolved zone + baselines, build the
// final priced line items, subtotal, and any pricing warnings.
function buildEstimate(scope, zone, baselines) {
  if (!scope || typeof scope !== 'object') {
    throw new Error('buildEstimate: scope is required');
  }
  if (!zone || typeof zone !== 'object') {
    throw new Error('buildEstimate: zone is required');
  }
  if (!Array.isArray(baselines)) {
    throw new Error('buildEstimate: baselines must be an array');
  }

  const multiplier = Number.isFinite(Number(zone.multiplier)) ? Number(zone.multiplier) : 1;
  const baselineByKey = new Map();
  for (const b of baselines) {
    if (b && typeof b.item_key === 'string') {
      baselineByKey.set(b.item_key, b);
    }
  }

  const items = Array.isArray(scope.items) ? scope.items : [];
  const lineItems = [];
  const warnings = [];

  for (const it of items) {
    if (!it || typeof it !== 'object') continue;
    const key = typeof it.item_key === 'string' ? it.item_key.trim() : '';
    const label = typeof it.label === 'string' ? it.label.trim() : '';
    const qty = Number.isFinite(Number(it.quantity)) ? Number(it.quantity) : 0;
    const unit = typeof it.unit === 'string' && it.unit.trim() ? it.unit.trim() : 'each';

    if (key && key !== 'custom' && baselineByKey.has(key)) {
      const baseline = baselineByKey.get(key);
      lineItems.push(priceLineItem(it, baseline, multiplier));
    } else {
      // Custom or unknown item - admin must price manually.
      lineItems.push({
        category: null,
        item_key: key || 'custom',
        label,
        quantity: qty,
        unit,
        unit_price: 0,
        unit_cost: 0,
        total: 0,
        total_cost: 0,
      });
      const displayLabel = label || key || 'unnamed item';
      warnings.push(`Custom item: ${displayLabel} - set price manually`);
    }
  }

  const subtotal = roundMoney(
    lineItems.reduce((sum, li) => sum + (Number(li.total) || 0), 0)
  );

  return {
    line_items: lineItems,
    subtotal,
    warnings,
  };
}

function suggestQuoteTitle(scope, zone) {
  const zoneName = (zone && zone.name) || '';
  const summary = scope && typeof scope.summary === 'string' ? scope.summary.trim() : '';
  if (summary) {
    // Take first sentence-ish chunk, cap at ~80 chars.
    const firstChunk = summary.split(/[.!?]\s|\n/)[0].trim();
    const base = firstChunk.length > 80 ? firstChunk.slice(0, 77) + '...' : firstChunk;
    return zoneName ? `${base} (${zoneName})` : base;
  }

  const items = Array.isArray(scope && scope.items) ? scope.items : [];
  if (items.length) {
    const first = items[0];
    const label = (first && first.label) || (first && first.item_key) || 'project';
    return zoneName ? `${label} (${zoneName})` : String(label);
  }

  return zoneName ? `Estimate (${zoneName})` : 'Estimate';
}

module.exports = {
  resolveZone,
  roundMoney,
  priceLineItem,
  buildEstimate,
  suggestQuoteTitle,
};
