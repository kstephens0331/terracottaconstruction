import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';

config();

// Unescape newline characters in private key
const raw = process.env.FIREBASE_ADMIN_CREDENTIALS.replace(/\\n/g, '\n');
const serviceAccount = JSON.parse(raw);

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

export { db };