# Lostify Deployment Guide

This guide explains how to deploy Lostify to production using Vercel (frontend) and Render (backend).

## Prerequisites

1. **Google OAuth Client ID**: Create a Google Cloud project and configure OAuth 2.0 credentials
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Render Account**: Sign up at [render.com](https://render.com)

## Part 1: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen if prompted
6. Application type: **Web application**
7. Add authorized JavaScript origins:
   - Development: `http://localhost:5000`
   - Production: `https://your-backend-url.onrender.com`
8. Add authorized redirect URIs:
   - Development: `http://localhost:5000`
   - Production: `https://your-backend-url.onrender.com`
9. Copy the **Client ID** (format: `123456789-abc123.apps.googleusercontent.com`)

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Repository

Ensure your code is pushed to GitHub/GitLab.

### Step 2: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your repository
4. Configure the service:
   - **Name**: `lostify-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node index.js`
   - **Instance Type**: Free or Starter (recommend Starter for production)

### Step 3: Add Persistent Disk (CRITICAL for SQLite)

1. In your Render service, go to **Settings** → **Disks**
2. Click **Add Disk**
3. **Name**: `sqlite-data`
4. **Mount Path**: `/var/data`
5. **Size**: 1 GB (minimum)
6. Save and redeploy

### Step 4: Set Environment Variables

In Render service settings, add these environment variables:

```
NODE_ENV=production
PORT=5000
DATABASE_PATH=/var/data/lostify.db
JWT_SECRET=<generate-random-64-char-hex-string>
GOOGLE_CLIENT_ID=<your-google-client-id>.apps.googleusercontent.com
ADMIN_USERNAME=<your-admin-username>
ADMIN_PASSWORD=<secure-admin-password>
ADMIN_EMAIL=<admin@sst.scaler.com>
```

**Important**: The `DATABASE_PATH` should point to your persistent disk mount path.

**Generate JWT_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 5: Deploy

Click **Manual Deploy** or push to your repository to trigger automatic deployment.

## Part 3: Frontend Deployment (Vercel)

### Step 1: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 2: Set Environment Variables

In Vercel project settings → **Environment Variables**, add:

```
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>.apps.googleusercontent.com
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 3: Update API Base URL

In `frontend/src/main.jsx` or your axios configuration:

```javascript
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';
```

### Step 4: Update CORS Settings

In `backend/index.js`, update CORS configuration:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true
}));
```

### Step 5: Deploy

Click **Deploy** or push to your repository.

## Part 4: Update Google OAuth

After deployment, update your Google OAuth credentials:

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Edit your OAuth 2.0 Client
3. Add production URLs to **Authorized JavaScript origins**:
   - `https://your-frontend-domain.vercel.app`
   - `https://your-backend-url.onrender.com`
4. Add production URLs to **Authorized redirect URIs**:
   - `https://your-frontend-domain.vercel.app`
   - `https://your-backend-url.onrender.com`

## Testing Deployment

1. Visit your Vercel frontend URL
2. Click **Login** → **Sign in with Google**
3. Authenticate with an @sst.scaler.com email
4. Test creating a post
5. Test admin login with your admin credentials

## Important Notes

### SQLite on Render

- **MUST use persistent disk**: Without it, your database will be wiped on every deployment
- **Single instance only**: SQLite doesn't support horizontal scaling
- **Backups**: Set up regular backups of `/var/data/lostify.db`
- **Alternative**: Consider PostgreSQL for production if you need:
  - Multiple instances
  - Better concurrent access
  - Managed backups

### Scaling Considerations

If your app grows beyond SQLite's capabilities:

1. Migrate to PostgreSQL (Render Managed or Supabase)
2. Update database layer in `backend/database/`
3. Use connection pooling for better performance

## Monitoring

- **Render**: Check logs in your service dashboard
- **Vercel**: View deployment logs and function logs
- Set up uptime monitoring (e.g., UptimeRobot, Pingdom)

## Troubleshooting

### "Address already in use"
- Ensure PORT environment variable is set correctly
- Render automatically assigns the PORT

### "Database locked"
- SQLite WAL mode is enabled by default
- Ensure only one instance is running

### Google OAuth errors
- Verify all redirect URIs are added in Google Cloud Console
- Check CORS settings in backend
- Ensure GOOGLE_CLIENT_ID matches on frontend and backend

### 500 errors
- Check Render logs for detailed error messages
- Verify all environment variables are set
- Ensure persistent disk is mounted correctly

## Security Checklist

- [ ] JWT_SECRET is a strong random string
- [ ] Admin password is secure
- [ ] CORS only allows your frontend domain
- [ ] Google OAuth restricted to @sst.scaler.com
- [ ] Environment variables are not committed to git
- [ ] HTTPS is enabled (automatic on Vercel/Render)

## Support

For issues specific to:
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)
- **Render**: [Render Documentation](https://render.com/docs)
- **Google OAuth**: [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
