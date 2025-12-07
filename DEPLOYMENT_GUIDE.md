# Gallery Management System - Deployment Guide

This guide explains how to deploy the updated Care Refrigeration website with the new server-side image upload functionality.

## 🎯 What's New

- **Server-Side Image Storage**: Images are now saved to the file system (not localStorage)
- **Unlimited Uploads**: No limit on number of images (displays latest 6)
- **File-Based Persistence**: Images persist across server restarts
- **Production Ready**: Works on any Node.js hosting platform

## ⚡ TL;DR - Recommended FREE Options

| Platform | Why Choose It | Deploy Time | Custom Domain |
|----------|---------------|-------------|---------------|
| **🥇 Railway** | Persistent storage, $5/month credit, beautiful UI | 3 minutes | ✅ FREE |
| **🥈 Render** | Very reliable, automatic HTTPS, great docs (needs Cloudinary) | 5 minutes | ✅ FREE |
| **🥉 Fly.io** | Global edge, persistent volumes, 3 VMs free | 5 minutes | ✅ FREE |

### 🌐 Custom Domain Support (carerefrigeration.com)

**All these FREE platforms support custom domains:**

| Platform | Custom Domain | SSL Certificate | Setup Difficulty |
|----------|---------------|-----------------|------------------|
| **Cyclic** | ✅ Free | ✅ Auto (Let's Encrypt) | ⭐ Easy |
| **Render** | ✅ Free | ✅ Auto (Let's Encrypt) | ⭐ Easy |
| **Railway** | ✅ Free | ✅ Auto | ⭐ Easy |
| **Vercel** | ✅ Free | ✅ Auto | ⭐ Easy |
| **Netlify** | ✅ Free | ✅ Auto | ⭐ Easy |
| **Fly.io** | ✅ Free | ✅ Auto | ⭐⭐ Medium |
| **Koyeb** | ✅ Free | ✅ Auto | ⭐ Easy |
| **Glitch** | ❌ Pro only | N/A | N/A |
| **Heroku** | ✅ Free | ✅ Auto | ⭐ Easy |

**Recommended for carerefrigeration.com:**
1. **Railway** - Easiest setup, persistent storage, $5/month free credit
2. **Render + Cloudinary** - Most reliable, great documentation
3. **Fly.io** - Global edge network, persistent volumes

---

## 🚀 Quick Start: Deploy to Railway (Recommended FREE Option)

**Why Railway?**
- ✅ **$5/month free credit** (renews monthly, ~500 hours runtime)
- ✅ **Persistent storage** for your gallery images
- ✅ **Beautiful UI** - easiest deployment experience
- ✅ **No credit card required** for first $5
- ✅ **Auto-deploy** from GitHub
- ✅ **Custom domain support** (free)
- ✅ **Automatic HTTPS**

**Steps:**

1. **Your code is already on GitHub** ✅
   - Repository: https://github.com/khannoor710/carerefrigeration

2. **Go to** [railway.app](https://railway.app)

3. **Sign in with GitHub**

4. **Create New Project**:
   - Click "New Project" 
   - Select "Deploy from GitHub repo"
   - Choose `khannoor710/carerefrigeration`

5. **Railway Auto-Configures**:
   - Detects Node.js automatically
   - Uses `npm install` to build
   - Runs `npm start` (make sure this runs `node server.js`)

6. **Add Environment Variables**:
   - In Railway dashboard → Click your service → "Variables" tab
   - Add these variables:
     ```
     GEMINI_API_KEY=your_actual_api_key
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=your_secure_password
     NODE_ENV=production
     PORT=3001
     ```

7. **Deploy**:
   - Railway automatically deploys
   - Get URL like `your-app.up.railway.app`

8. **Access Your Site**:
   - Main site: `https://your-app.up.railway.app`
   - Admin panel: `https://your-app.up.railway.app/admin`

9. **Enable Persistent Storage** (Important for images!):
   - In Railway dashboard → Your service → "Settings"
   - Scroll to "Volumes"
   - Click "New Volume"
   - Mount path: `/app/public/gallery`
   - This ensures images persist across deployments!

**That's it!** Your app is deployed with:
- ✅ Automatic HTTPS
- ✅ File uploads working
- ✅ Gallery images persisted (with volume)
- ✅ Auto-redeploy on GitHub push

### 💰 Railway Free Tier Details
- $5 credit/month (renews monthly)
- ~500 hours of runtime (~16 hours/day)
- 100GB bandwidth/month
- 8GB RAM, 8 vCPU
- Persistent storage via volumes

**Cost Management Tip**: Your app will likely stay within the $5/month free credit. Railway charges only for actual usage (~$0.01/hour when running).

---

## 🌐 Setting Up Your Custom Domain (carerefrigeration.com)

### Step 1: Choose Your Platform

Since you have **carerefrigeration.com**, here are your best FREE options:

#### Option A: Railway (Recommended for Your Domain)

**Why?** Persistent storage + Custom domain + Beautiful UI + $5/month free credit

1. **Deploy to Railway** (follow steps above)

2. **Add Custom Domain**:
   - In Railway dashboard → Your service → "Settings" → "Domains"
   - Click "Custom Domain"
   - Enter: `carerefrigeration.com`
   - Also add: `www.carerefrigeration.com`

3. **Configure DNS** at your domain registrar (GoDaddy, Namecheap, etc.):
   
   Railway will provide you with DNS records. Typically:
   ```
   Type: CNAME
   Name: @
   Value: [provided by Railway, e.g., your-app.up.railway.app]
   TTL: 3600
   
   Type: CNAME
   Name: www
   Value: [provided by Railway]
   TTL: 3600
   ```
   
   *Note: If your registrar doesn't support CNAME for root domain (@):*
   ```
   Type: A
   Name: @
   Value: [IP provided by Railway]
   ```

4. **Wait 5-60 minutes** for DNS propagation

5. **SSL Certificate** - Railway auto-generates (automatic with custom domain)

6. **Done!** Visit `https://carerefrigeration.com`

#### Option B: Render (Most Reliable)

1. **Deploy to Render** (see Option 4 above)

2. **Add Custom Domain**:
   - In Render dashboard → "Settings" → "Custom Domains"
   - Click "Add Custom Domain"
   - Enter: `carerefrigeration.com`

3. **Render provides DNS instructions**:
   ```
   Type: CNAME
   Name: @
   Value: [your-app].onrender.com
   TTL: 3600
   
   Type: CNAME
   Name: www
   Value: [your-app].onrender.com
   TTL: 3600
   ```
   
   *Note: If your registrar doesn't support CNAME for root domain (@):*
   ```
   Type: A
   Name: @
   Value: [IP provided by Render]
   ```

4. **SSL** - Auto-enabled by Render (Let's Encrypt)

5. **Done!** `https://carerefrigeration.com` is live

#### Option C: Railway

1. **Deploy to Railway** (see Option 9 above)

2. **Add Custom Domain**:
   - In Railway project → "Settings" → "Domains"
   - Click "Custom Domain"
   - Enter: `carerefrigeration.com`

3. **Configure DNS**:
   ```
   Type: CNAME
   Name: @
   Value: [provided by Railway]
   TTL: 3600
   
   Type: CNAME
   Name: www
   Value: [provided by Railway]
   TTL: 3600
   ```

4. **SSL** - Automatically provisioned

#### Option D: Vercel (Frontend) + Railway (Backend)

**Best for Maximum Performance**

1. **Deploy Frontend to Vercel**:
   - Vercel dashboard → "Domains"
   - Add `carerefrigeration.com`
   - Follow DNS instructions (very simple)

2. **Deploy Backend to Railway**:
   - Can use subdomain: `api.carerefrigeration.com`
   - Or keep on default platform URL

3. **Configure Frontend Environment**:
   ```
   VITE_API_URL=https://api.carerefrigeration.com
   ```

4. **DNS Configuration**:
   ```
   # For main site (Vercel)
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel IP)
   
   # For www (Vercel)
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   # For API backend (Railway)
   Type: CNAME
   Name: api
   Value: [your-railway-app.up.railway.app]
   ```

### 📋 DNS Configuration Cheat Sheet

**Where to configure DNS:**
- Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
- Find "DNS Management" or "DNS Settings"
- Add/Edit DNS records as shown above

**Common DNS Record Types:**
- **A Record**: Points to an IP address (e.g., 192.0.2.1)
- **CNAME**: Points to another domain (e.g., yourapp.cyclic.app)
- **@**: Represents root domain (carerefrigeration.com)
- **www**: Subdomain (www.carerefrigeration.com)

**Typical Propagation Time:**
- 5-10 minutes: Cloudflare DNS
- 30-60 minutes: Most registrars
- Up to 24 hours: Worst case (rare)

### 🎯 Recommended Setup for carerefrigeration.com

**Best Option: Railway (Single Platform)**
```
carerefrigeration.com → Railway full-stack app
└── Frontend + Backend + File Storage (with Volume)
└── $5/month free credit, persistent storage
└── Beautiful UI, easy deployment
└── Automatic HTTPS
```

**Alternative: Split Stack (Better Performance)**
```
carerefrigeration.com → Vercel (frontend)
api.carerefrigeration.com → Railway (backend)
images → Railway Volume or Cloudinary
└── Frontend: 100+ edge locations worldwide
└── Backend: Persistent storage for uploads
└── Images: CDN delivery
```

### ✅ Domain Setup Checklist

- [ ] Platform deployed and working (test with platform URL first)
- [ ] Custom domain added in platform dashboard
- [ ] DNS records configured at registrar
- [ ] www subdomain configured
- [ ] DNS propagation complete (check with `nslookup carerefrigeration.com`)
- [ ] HTTPS certificate issued (usually automatic)
- [ ] Test both `http://` and `https://` (should redirect to https)
- [ ] Test both `carerefrigeration.com` and `www.carerefrigeration.com`
- [ ] Admin panel accessible at `carerefrigeration.com/admin`
- [ ] Image uploads working on custom domain

### 🔍 Verify DNS Propagation

Check if your domain is pointing correctly:

**Windows PowerShell:**
```powershell
nslookup carerefrigeration.com
nslookup www.carerefrigeration.com
```

**Online Tools:**
- https://dnschecker.org
- https://www.whatsmydns.net

**Expected Result:**
```
Non-authoritative answer:
Name:    carerefrigeration.com
Address: [Your platform's IP]
```

---

### Option 1: Deploy to Herokuration website with the new server-side image upload functionality.

## 🎯 What's New

- **Server-Side Image Storage**: Images are now saved to the file system (not localStorage)
- **Unlimited Uploads**: No limit on number of images (displays latest 6)
- **File-Based Persistence**: Images persist across server restarts
- **Production Ready**: Works on any Node.js hosting platform

## 📋 Prerequisites

- Node.js 22.x or higher
- npm or yarn package manager
- A hosting service that supports Node.js (e.g., Heroku, Vercel, Railway, DigitalOcean)

## 🚀 Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Gemini API Configuration
GEMINI_API_KEY=your_actual_api_key_here

# Backend API URL (leave blank for local development)
# VITE_API_URL=

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# Server Port
PORT=3001
```

### 3. Run Both Frontend and Backend

#### Option A: Run Both Simultaneously (Recommended)
```bash
npm run dev:all
```
This will start:
- Backend server on `http://localhost:3001`
- Frontend Vite server on `http://localhost:5173`

#### Option B: Run Separately
Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 4. Access the Application

- **Main Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Default Login**: admin / CareRefrig2024! (change in `.env.local`)

## 🌐 Production Deployment

### 📊 Free Tier Comparison Table

| Platform | Best For | Free Tier | Cold Starts | Difficulty | Recommendation |
|----------|----------|-----------|-------------|------------|----------------|
| **Railway** | Full-stack apps | $5/month credit | Minimal | ⭐ Easy | ⭐⭐⭐⭐⭐ Best Overall |
| **Render** | Full-stack apps | 750hrs/month | Yes (~30s) | ⭐ Easy | ⭐⭐⭐⭐⭐ Best w/ Cloudinary |
| **Fly.io** | Global apps | 3 VMs free | No | ⭐⭐⭐ Hard | ⭐⭐⭐⭐ Advanced users |
| **Netlify + Render** | Static + API | 100GB bandwidth | Backend only | ⭐⭐ Medium | ⭐⭐⭐⭐ Good separation |
| **Vercel + Railway** | Modern stack | Generous | Backend only | ⭐⭐ Medium | ⭐⭐⭐⭐ Enterprise-like |
| **Glitch** | Prototyping | 1000hrs/month | Yes (~5min) | ⭐ Easy | ⭐⭐⭐ Learning projects |
| **Koyeb** | Edge computing | 1 service | Minimal | ⭐⭐ Medium | ⭐⭐⭐ Good alternative |
| **Heroku** | Classic PaaS | 550hrs/month | Yes | ⭐⭐ Medium | ⭐⭐ Requires credit card |

### 🏆 Recommended Options by Use Case

**🥇 Best for Production (Free)**
- **Railway** - Persistent storage, $5/month credit, beautiful UI

**🥈 Best for Reliability**
- **Render + Cloudinary** - Industry standard, automatic HTTPS, great free tier

**🥉 Best for Beginners**
- **Railway** - Beautiful UI, one-click deploy, easiest setup

**💰 Best Value**
- **Netlify (Frontend) + Railway (Backend)** - Combine best of both worlds

**🌍 Best for Global Users**
- **Fly.io** - Edge network, runs close to users worldwide

**⚡ Fastest Setup**
- **Railway** - Deploy in 3 minutes from GitHub

### Option 1: Deploy to Heroku

1. **Create a Heroku App**
```bash
heroku create care-refrigeration-app
```

2. **Set Environment Variables**
```bash
heroku config:set GEMINI_API_KEY=your_api_key
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=your_secure_password
heroku config:set NODE_ENV=production
```

3. **Create a Production Server File** (`server-prod.js`):
```javascript
// This will serve both the API and the built frontend
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Import your existing server.js routes
// ... (copy all routes from server.js)

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

4. **Update package.json**:
```json
{
  "scripts": {
    "start": "node server-prod.js",
    "build": "tsc && vite build"
  }
}
```

5. **Deploy**
```bash
git add .
git commit -m "Add production server"
git push heroku main
```

### Option 2: Deploy to Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel:

1. **Push your code to GitHub**

2. **Import project to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Set Environment Variables** in Vercel:
   - `VITE_GEMINI_API_KEY`
   - `VITE_API_URL` (your Railway backend URL)
   - `VITE_ADMIN_USERNAME`
   - `VITE_ADMIN_PASSWORD`

#### Backend on Railway:

1. **Create Railway Account** (railway.app)

2. **Create New Project** from GitHub repository

3. **Configure Settings**:
   - Root Directory: `/`
   - Start Command: `node server.js`

4. **Set Environment Variables**:
   - `PORT=3001`
   - `GEMINI_API_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`

5. **Get the Railway URL** and add it to Vercel's `VITE_API_URL`

### Option 3: Deploy to DigitalOcean App Platform

1. **Create App from GitHub**

2. **Configure Two Components**:
   - **Web Service** (Backend):
     - Build Command: `npm install`
     - Run Command: `node server.js`
     - HTTP Port: 3001
   
   - **Static Site** (Frontend):
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Set Environment Variables** for both components

4. **Deploy** and get your URLs

### Option 4: Deploy to Render (100% FREE - Recommended!)

**✨ Best Free Option** - Render offers generous free tier with no credit card required!

#### Deploy Full-Stack App (Single Service):

1. **Push code to GitHub**

2. **Create Account** at [render.com](https://render.com)

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: care-refrigeration
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free

4. **Add Environment Variables**:
   ```
   GEMINI_API_KEY=your_api_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   NODE_ENV=production
   ```

5. **Deploy** - Render will build and deploy automatically

**Free Tier Limits**:
- ✅ 750 hours/month (enough for 24/7)
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Automatic deploys from GitHub
- ⚠️ Spins down after 15 min inactivity (cold starts ~30 seconds)

### Option 5: Deploy to Netlify (Frontend) + Render (Backend)

#### Frontend on Netlify (FREE):

1. **Connect to GitHub** at [netlify.com](https://netlify.com)

2. **Import Project**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

3. **Environment Variables**:
   ```
   VITE_GEMINI_API_KEY=your_api_key
   VITE_API_URL=https://your-app.onrender.com
   VITE_ADMIN_USERNAME=admin
   VITE_ADMIN_PASSWORD=your_password
   ```

4. **Deploy** - Gets custom URL like `your-app.netlify.app`

**Free Tier**: 100GB bandwidth/month, unlimited sites

#### Backend on Render (FREE):
- Follow Option 4 above for backend

### Option 6: Deploy to Cyclic.sh (100% FREE)

**Excellent for Full-Stack Node.js Apps**

1. **Visit** [cyclic.sh](https://cyclic.sh)

2. **Connect GitHub** and select repository

3. **Auto-Deploy** - Cyclic auto-detects Node.js and deploys

4. **Environment Variables** - Add in Cyclic dashboard:
   ```
   GEMINI_API_KEY
   ADMIN_USERNAME
   ADMIN_PASSWORD
   ```

5. **Static Files** - Automatically serves from `public/`

**Free Tier**:
- ✅ Unlimited apps
- ✅ 10GB storage
- ✅ Custom domains
- ✅ HTTPS included
- ✅ No cold starts!

### Option 7: Deploy to Fly.io (FREE Tier)

**Great for Global Distribution**

1. **Install Fly CLI**:
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Create Account**: `fly auth signup`

3. **Create fly.toml** in project root:
   ```toml
   app = "care-refrigeration"
   
   [build]
     builder = "heroku/buildpacks:20"
   
   [env]
     PORT = "8080"
   
   [[services]]
     internal_port = 8080
     protocol = "tcp"
   
     [[services.ports]]
       port = 80
       handlers = ["http"]
   
     [[services.ports]]
       port = 443
       handlers = ["tls", "http"]
   ```

4. **Deploy**:
   ```bash
   fly launch
   fly secrets set GEMINI_API_KEY=your_key ADMIN_USERNAME=admin ADMIN_PASSWORD=your_pass
   fly deploy
   ```

**Free Tier**:
- ✅ 3 shared-cpu VMs
- ✅ 3GB storage
- ✅ 160GB bandwidth/month
- ✅ Global edge network

### Option 8: Deploy to Glitch (FREE - Best for Prototyping)

**Easiest Setup - No CLI Needed**

1. **Go to** [glitch.com](https://glitch.com)

2. **Import from GitHub**
   - Click "New Project" → "Import from GitHub"
   - Paste repository URL

3. **Configure** in `.env` file:
   ```
   GEMINI_API_KEY=your_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_password
   ```

4. **Add to package.json**:
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

5. **Auto-Deploy** - Glitch automatically runs your app

**Free Tier**:
- ✅ 1000 project hours/month
- ✅ Easy code editor in browser
- ✅ Automatic HTTPS
- ⚠️ 512MB RAM limit
- ⚠️ Sleeps after 5 min inactivity

### Option 9: Deploy to Railway (FREE $5/month Credit)

**Modern, Developer-Friendly Platform**

1. **Visit** [railway.app](https://railway.app)

2. **Deploy from GitHub**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select repository

3. **Configure**:
   - Start Command: `node server.js`
   - Add environment variables in dashboard

4. **Get URL** - Railway provides URL like `app.railway.app`

**Free Tier**:
- ✅ $5 credit/month (renews monthly)
- ✅ ~500 hours runtime/month
- ✅ 100GB bandwidth
- ✅ No credit card for first $5

### Option 10: Deploy to Koyeb (FREE Tier)

**Fast Global Edge Platform**

1. **Create Account** at [koyeb.com](https://koyeb.com)

2. **Create Service** from GitHub

3. **Configure**:
   - Type: Web
   - Builder: Buildpack
   - Run Command: `node server.js`
   - Port: 3001

4. **Environment Variables** - Add in dashboard

**Free Tier**:
- ✅ 1 web service
- ✅ 512MB RAM
- ✅ 2GB disk
- ✅ Global CDN
- ✅ Automatic HTTPS

## 🔧 Configuration Details

### Backend API Endpoints

The server provides these API endpoints:

- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery/upload` - Upload a new image
- `DELETE /api/gallery/:index` - Delete an image
- `POST /api/gallery/reset` - Reset to default images

### Frontend Configuration

The frontend automatically detects the API URL:
- **Development**: `http://localhost:3001`
- **Production**: Set `VITE_API_URL` environment variable

### File Storage

Images are stored in:
- Path: `public/gallery/`
- Metadata: `public/gallery-data.json`
- Max display: 6 latest images
- Allowed formats: JPEG, JPG, PNG, GIF, WEBP
- Max file size: 10MB (configurable in `server.js`)

## 🔒 Security Recommendations

1. **Change Default Credentials**:
   - Update `ADMIN_USERNAME` and `ADMIN_PASSWORD` before production

2. **Use HTTPS**:
   - Most hosting providers (Vercel, Heroku, Railway) provide HTTPS automatically

3. **Secure File Uploads**:
   - File type validation is enabled
   - File size limit is set to 10MB
   - Consider adding rate limiting for production

4. **Environment Variables**:
   - Never commit `.env.local` to version control
   - Use hosting platform's environment variable management

## ⚠️ Important: File Storage Considerations

### Platforms with Persistent Storage (✅ Recommended for Images)

These platforms keep uploaded images permanently:

- ✅ **Railway** - Persistent volumes, easy setup
- ✅ **Fly.io** - Persistent volumes (3GB free)
- ✅ **Koyeb** - 2GB persistent disk
- ✅ **DigitalOcean** - Persistent storage included

### Platforms with Ephemeral Storage (⚠️ Files Lost on Restart)

These platforms reset files on redeploy/restart:

- ⚠️ **Render** - Ephemeral file system (files lost on restart)
- ⚠️ **Heroku** - Ephemeral file system (files lost daily)
- ⚠️ **Vercel** - Serverless (no file storage)
- ⚠️ **Netlify** - Static hosting only
- ⚠️ **Glitch** - May lose files on sleep

### Solutions for Ephemeral Storage Platforms

If using Render/Heroku, you need external storage:

#### Option A: Use Cloudinary (FREE - Recommended)

1. **Sign up** at [cloudinary.com](https://cloudinary.com) (free tier: 25GB storage)

2. **Install Cloudinary SDK**:
   ```bash
   npm install cloudinary multer-storage-cloudinary
   ```

3. **Update `server.js`** to use Cloudinary:
   ```javascript
   import { v2 as cloudinary } from 'cloudinary';
   import { CloudinaryStorage } from 'multer-storage-cloudinary';
   
   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });
   
   const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
       folder: 'gallery',
       allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
     }
   });
   ```

4. **Add Environment Variables**:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

#### Option B: Use AWS S3 Free Tier

- 5GB storage free for 12 months
- Requires AWS account and configuration

#### Option C: Use Vercel Blob Storage

- 100GB free bandwidth/month
- Easy integration with Vercel

### 🎯 Best Deployment Strategy by Priority

**Priority: Simplicity + Free + Persistent Storage**
→ **Railway** with Volume (persistent storage, beautiful UI)

**Priority: Image Permanence**
→ **Railway** or **Fly.io** (both have persistent volumes)

**Priority: Maximum Uptime**
→ **Fly.io** with persistent volumes

**Priority: Easy Setup + Don't Care About Image Persistence**
→ **Render** + **Cloudinary** for images

**Priority: Best Performance**
→ **Vercel (Frontend)** + **Railway (Backend)** + **Cloudinary (Images)**

## 📊 Monitoring & Maintenance

### Check Gallery Status
```bash
# View current images count
curl https://your-api.com/api/gallery | jq '.images | length'
```

### Backup Images
```bash
# Download gallery-data.json
curl https://your-api.com/gallery-data.json > backup-gallery.json

# Download all images from public/gallery/
wget -r -np -nd -A png,jpg,jpeg https://your-api.com/gallery/
```

### Reset Gallery
Use the admin panel's "Reset to Default" button or:
```bash
curl -X POST https://your-api.com/api/gallery/reset
```

## 🐛 Troubleshooting

### Images Not Loading
1. Check if backend server is running
2. Verify `VITE_API_URL` is correct
3. Check browser console for CORS errors
4. Ensure `public/gallery` folder exists and has write permissions

### Upload Fails
1. Check file size (must be under 10MB by default)
2. Verify file format (only images allowed)
3. Check server logs for errors
4. Ensure disk space is available

### CORS Errors
- Backend includes CORS middleware
- If issues persist, update CORS configuration in `server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com']
}));
```

## 📝 Development Notes

### Folder Structure
```
project-root/
├── server.js              # Backend Express server
├── public/
│   ├── gallery/           # Image storage
│   └── gallery-data.json  # Image metadata
├── services/
│   └── galleryService.ts  # Frontend API client
└── components/
    ├── Gallery.tsx        # Public gallery display
    └── AdminGalleryManager.tsx  # Admin upload UI
```

### Adding Features

To increase file size limit (in `server.js`):
```javascript
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // Change to 50MB
  }
});
```

To change displayed images count (in `galleryService.ts`):
```javascript
return data.images.slice(0, 12); // Show 12 instead of 6
```

## 🎉 Success Checklist

- [ ] Backend server running on correct port
- [ ] Frontend can fetch gallery images
- [ ] Admin login works with credentials
- [ ] Image upload saves to file system
- [ ] New images appear on public gallery
- [ ] Delete function works
- [ ] Reset to default works
- [ ] Images persist after server restart
- [ ] Production deployment successful
- [ ] HTTPS enabled
- [ ] Default credentials changed

## 📞 Support

If you encounter issues:
1. Check server logs for errors
2. Verify all environment variables are set
3. Ensure Node.js version is compatible (22.x+)
4. Review CORS and network settings
5. Check file system permissions on hosting platform

---

**Last Updated**: November 2, 2025
**Version**: 2.0.0 (Server-Side Image Storage)
