# Deployment Guide for Terracotta Construction

This repository contains multiple applications that need to be deployed separately.

## 🌐 SEO Marketing Website (terracotta-seo-website)

**Recommended for:** terracottaconstruction.com

### Vercel Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import project from GitHub
3. **IMPORTANT**: Set Root Directory to `terracotta-seo-website`
4. Framework: Next.js (auto-detected)
5. Environment Variables: None required
6. Deploy!

### Local Development
```bash
cd terracotta-seo-website
npm install
npm run dev
# Open http://localhost:3000
```

---

## 🔧 Admin Portal (admin.terracottaconstruction.com)

**Recommended for:** admin.terracottaconstruction.com

### Frontend Deployment (Vercel)
1. Create new project in Vercel
2. **Root Directory**: `admin.terracottaconstruction.com`
3. Framework: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variables:
   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=your_backend_url
   ```

### Backend Deployment (Railway/Render/Vercel Serverless)

#### Option 1: Railway
1. Create new project
2. Deploy from GitHub
3. **Root Directory**: `admin.terracottaconstruction.com/server`
4. Add environment variables from `server/.env.example`

#### Option 2: Render
1. New Web Service
2. **Root Directory**: `admin.terracottaconstruction.com/server`
3. Build Command: `npm install`
4. Start Command: `node index.js`
5. Add environment variables

### Local Development
```bash
# Frontend
cd admin.terracottaconstruction.com
npm install
npm run dev

# Backend
cd admin.terracottaconstruction.com/server
npm install
npm start
```

---

## 👥 Customer Portal (customer.terracottaconstruction.com)

**Recommended for:** customer.terracottaconstruction.com

### Frontend Deployment (Vercel)
1. **Root Directory**: `customer.terracottaconstruction.com`
2. Framework: Create React App
3. Build Command: `npm run build`
4. Output Directory: `build`
5. Environment Variables:
   ```
   REACT_APP_FIREBASE_API_KEY=your_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
   ```

### Backend Deployment
1. **Root Directory**: `customer-portal-server`
2. Runtime: Node.js
3. Start Command: `node server.js`

### Local Development
```bash
# Frontend
cd customer.terracottaconstruction.com
npm install
npm start

# Backend
cd customer-portal-server
npm install
npm start
```

---

## 📝 Environment Variables Setup

### Admin Backend (.env)
```env
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
ADMIN_EMAILS=admin@terracottaconstruction.com
ALLOWED_ORIGINS=https://admin.terracottaconstruction.com,http://localhost:5173
```

### Customer Portal Server (.env)
```env
PORT=3001
# Add your specific environment variables
```

---

## 🚀 Quick Deploy Links

**For the SEO website (main site):**
- Use the root `vercel.json` configuration OR
- Set Root Directory in Vercel to `terracotta-seo-website`

**For separate admin/customer portals:**
- Deploy each as a separate Vercel project
- Set appropriate root directories for each

---

## ⚠️ Important Notes

1. **Firebase Setup**: Ensure Firebase project is created and credentials are added to environment variables
2. **CORS Configuration**: Update `ALLOWED_ORIGINS` in admin backend to include your deployed URLs
3. **API URLs**: Update frontend `VITE_API_URL` / `REACT_APP_API_URL` to point to deployed backend
4. **Domain Configuration**: Set up custom domains in Vercel after deployment

---

## 🔒 Security Checklist

- [ ] All `.env` files are in `.gitignore`
- [ ] Firebase credentials are stored as environment variables
- [ ] CORS is configured with specific origins (not `*`)
- [ ] Rate limiting is enabled on admin backend
- [ ] API authentication tokens are required for all routes
