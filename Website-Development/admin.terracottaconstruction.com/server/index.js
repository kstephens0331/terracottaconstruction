// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyToken } from './middleware/auth.js';
import { apiRateLimit } from './middleware/rateLimit.js';
import quoteRoutes from './routes/quotes.js';
import customerRoutes from './routes/customers.js';
import workOrderRoutes from './routes/workorders.js';
import invoiceRoutes from './routes/invoices.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - restrict to allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://admin.terracottaconstruction.com',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Apply rate limiting to all routes
app.use(apiRateLimit);

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Terracotta Construction Admin API',
    version: '2.0.0',
    status: 'running'
  });
});

// Protected API routes - require authentication
app.use('/api/quotes', verifyToken, quoteRoutes);
app.use('/api/customers', verifyToken, customerRoutes);
app.use('/api/workorders', verifyToken, workOrderRoutes);
app.use('/api/invoices', verifyToken, invoiceRoutes);
app.use('/api/analytics', verifyToken, analyticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS policy violation'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Terracotta Admin API v2.0.0 running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
