// middleware/auth.js
// Supabase JWT verification for customer-portal-server.
const { supabase } = require('../lib/supabase');

function extractBearerToken(req) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header || typeof header !== 'string') return null;
  const parts = header.split(' ');
  if (parts.length !== 2) return null;
  if (parts[0].toLowerCase() !== 'bearer') return null;
  return parts[1];
}

async function resolveUserFromRequest(req) {
  const token = extractBearerToken(req);
  if (!token) return { error: 'Missing bearer token' };

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data || !data.user) {
    return { error: (error && error.message) || 'Invalid token' };
  }
  return { user: { id: data.user.id, email: data.user.email } };
}

// Customer-only guard: valid Supabase JWT + a matching row in `customers` table.
async function verifyCustomer(req, res, next) {
  try {
    const { user, error } = await resolveUserFromRequest(req);
    if (error) return res.status(401).json({ error });

    req.user = user;

    const { data: customer, error: customerErr } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (customerErr && customerErr.code !== 'PGRST116') {
      return res.status(500).json({ error: 'Failed to load customer profile' });
    }
    if (!customer) {
      return res
        .status(403)
        .json({ error: 'No customer profile linked to this account' });
    }

    req.customer = customer;
    return next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[verifyCustomer] error:', err);
    return res.status(500).json({ error: 'Auth check failed' });
  }
}

// Admin/employee guard: valid Supabase JWT + profiles.role in ('admin','employee').
async function verifyAdmin(req, res, next) {
  try {
    const { user, error } = await resolveUserFromRequest(req);
    if (error) return res.status(401).json({ error });

    req.user = user;

    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileErr && profileErr.code !== 'PGRST116') {
      return res.status(500).json({ error: 'Failed to load profile' });
    }
    if (!profile || !['admin', 'employee'].includes(profile.role)) {
      return res.status(403).json({ error: 'Admin or employee role required' });
    }

    req.profile = profile;
    return next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[verifyAdmin] error:', err);
    return res.status(500).json({ error: 'Auth check failed' });
  }
}

module.exports = { verifyCustomer, verifyAdmin };
