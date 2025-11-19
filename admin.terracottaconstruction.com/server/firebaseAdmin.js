// server/firebaseAdmin.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { config } from 'dotenv';

config();

// Check for credentials
if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
  console.error('ERROR: FIREBASE_ADMIN_CREDENTIALS environment variable is not set');
  process.exit(1);
}

// Unescape newline characters in private key
const raw = process.env.FIREBASE_ADMIN_CREDENTIALS.replace(/\\n/g, '\n');
const serviceAccount = JSON.parse(raw);

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
