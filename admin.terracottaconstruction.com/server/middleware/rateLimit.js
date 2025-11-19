// server/middleware/rateLimit.js

// Simple in-memory rate limiter
// For production, consider using Redis-based rate limiting

const requests = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requests) {
    if (now - data.windowStart > 60000) {
      requests.delete(key);
    }
  }
}, 300000);

export const rateLimit = (options = {}) => {
  const {
    windowMs = 60000, // 1 minute window
    max = 100, // Max requests per window
    message = 'Too many requests, please try again later'
  } = options;

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    if (!requests.has(key)) {
      requests.set(key, {
        count: 1,
        windowStart: now
      });
      return next();
    }

    const data = requests.get(key);

    // Reset window if expired
    if (now - data.windowStart > windowMs) {
      data.count = 1;
      data.windowStart = now;
      return next();
    }

    // Increment count
    data.count++;

    // Check if over limit
    if (data.count > max) {
      return res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil((windowMs - (now - data.windowStart)) / 1000)
      });
    }

    next();
  };
};

// Stricter rate limit for sensitive operations
export const strictRateLimit = rateLimit({
  windowMs: 60000,
  max: 10,
  message: 'Too many attempts, please wait before trying again'
});

// General API rate limit
export const apiRateLimit = rateLimit({
  windowMs: 60000,
  max: 100,
  message: 'API rate limit exceeded'
});

export default rateLimit;
