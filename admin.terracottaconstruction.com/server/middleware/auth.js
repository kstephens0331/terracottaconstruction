// server/middleware/auth.js
import { getAuth } from 'firebase-admin/auth';

// Allowed admin emails (can be expanded for role-based access)
const ADMIN_EMAILS = [
  'admin@terracottaconstruction.com'
];

// Verify Firebase ID token middleware
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No authorization token provided'
    });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;

    // Check if user is an authorized admin
    if (!ADMIN_EMAILS.includes(decodedToken.email)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Role-based access control middleware
export const requireRole = (roles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // For now, all admins have full access
    // This can be expanded to check user roles from Firestore
    const userRole = req.user.role || 'admin';

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Required role: ${roles.join(' or ')}`
      });
    }

    next();
  };
};

export default verifyToken;
