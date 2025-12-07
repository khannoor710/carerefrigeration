# Railway Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. **Code Fixes Applied**
- [x] Added `"start": "node server.js"` script to package.json
- [x] Server now serves static files from `dist` folder in production
- [x] Added catch-all route for client-side routing
- [x] Created `railway.json` configuration file

### 2. **Environment Variables to Set on Railway**

**REQUIRED:**
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
NODE_ENV=production
```

**RECOMMENDED (Security):**
```
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_secure_password_here
```

**OPTIONAL:**
```
PORT=3001
```
(Railway auto-assigns PORT, but you can override)

### 3. **Build Configuration**
Railway will automatically:
- Run `npm install`
- Run `npm run build` (compiles TypeScript + builds Vite)
- Run `npm start` (starts the server)

### 4. **Persistent Storage Setup**

**CRITICAL:** Configure a Railway Volume to persist uploaded images

**Steps:**
1. In Railway dashboard → Your service → "Settings"
2. Scroll to "Volumes" section
3. Click "New Volume"
4. Configure:
   - **Name:** gallery-images
   - **Mount Path:** `/app/public/gallery`
   - **Size:** 1GB (start small, increase if needed)
5. Click "Add Volume"

**Why this matters:**
- Without a volume, all uploaded images will be deleted when Railway restarts your service
- Default images in the repository will persist, but user uploads won't

---

## 🚀 Deployment Steps

### Option A: Deploy via Railway Dashboard (Easiest)

1. **Go to** [railway.app](https://railway.app)

2. **Sign in** with GitHub

3. **New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `khannoor710/carerefrigeration`

4. **Configure Environment Variables:**
   - Click your service
   - Go to "Variables" tab
   - Add all required variables (see Section 2 above)

5. **Configure Volume:**
   - Follow steps in Section 4 above

6. **Deploy:**
   - Railway auto-deploys on every push to `main`
   - First deployment starts automatically

7. **Get Your URL:**
   - Railway assigns a URL like: `carerefrigeration-production.up.railway.app`
   - Click "Settings" → "Domains" to add custom domain

### Option B: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Add environment variables
railway variables set GEMINI_API_KEY=your_key_here
railway variables set NODE_ENV=production
railway variables set ADMIN_USERNAME=your_username
railway variables set ADMIN_PASSWORD=your_password

# Deploy
railway up
```

---

## 🔍 Post-Deployment Verification

### 1. **Check Build Logs**
- In Railway dashboard → "Deployments" tab
- Verify build completed successfully
- Look for errors in build output

### 2. **Check Runtime Logs**
- In Railway dashboard → "Logs" tab
- Should see: `Backend server running on http://localhost:3001`
- Should see: `Gallery directory: /app/public/gallery`

### 3. **Test Website Features**

**Frontend:**
- [ ] Homepage loads at your Railway URL
- [ ] All sections render (Hero, Services, Gallery, etc.)
- [ ] Images load correctly
- [ ] Booking form works
- [ ] AI assistant responds (tests GEMINI_API_KEY)

**Admin Panel:**
- [ ] Can access `/admin` route
- [ ] Can login with credentials
- [ ] Can upload images
- [ ] Uploaded images appear in gallery
- [ ] Can delete images
- [ ] Images persist after Railway restart (tests volume)

### 4. **Monitor Resources**
- Railway free tier: $5/month credit
- Check usage in Railway dashboard
- Estimated runtime: ~500 hours/month on free tier

---

## ⚠️ Known Issues & Solutions

### Issue 1: GEMINI_API_KEY Exposed in Frontend Bundle

**Current Risk:** The API key is embedded in frontend JavaScript via `vite.config.ts`

**Severity:** 🔴 **HIGH** - Anyone can extract your API key from browser dev tools

**Immediate Workaround:**
1. Set up Gemini API key restrictions in Google AI Studio:
   - Go to https://aistudio.google.com/apikey
   - Click your API key settings
   - Add "HTTP referrers" restriction
   - Allow only your Railway domain: `*.railway.app` and your custom domain

**Proper Fix (Recommended):**
Move Gemini API calls to backend:
1. Create new API endpoint in `server.js` (e.g., `/api/ai/chat`)
2. Frontend calls your backend endpoint instead of Gemini directly
3. Backend makes Gemini API calls server-side
4. Remove `GEMINI_API_KEY` from `vite.config.ts`

### Issue 2: Images Lost on Restart

**Solution:** Configure Railway Volume (see Section 4 above)

### Issue 3: Build Fails

**Common causes:**
- Missing environment variables → Add `GEMINI_API_KEY`
- Node version mismatch → Railway uses Node 20 (your project requires >=18)
- TypeScript errors → Run `npm run type-check` locally first

### Issue 4: "Cannot GET /" Error

**Cause:** Server not serving built files

**Solution:** Already fixed! Server now serves `dist` folder in production mode

---

## 🌐 Custom Domain Setup (carerefrigeration.com)

### Steps to Add Custom Domain:

1. **In Railway Dashboard:**
   - Go to your service → "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `carerefrigeration.com`
   - Also add: `www.carerefrigeration.com`

2. **Railway Provides DNS Records:**
   ```
   Type: CNAME
   Name: @
   Value: your-app.up.railway.app
   
   Type: CNAME
   Name: www
   Value: your-app.up.railway.app
   ```

3. **Update DNS at Your Domain Registrar:**
   - Login to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the CNAME records provided by Railway
   - DNS propagation takes 5-60 minutes

4. **SSL Certificate:**
   - Railway automatically provisions Let's Encrypt SSL
   - HTTPS will work within 5-10 minutes after DNS propagates

---

## 📊 Estimated Costs

### Railway Free Tier:
- **$5/month credit** (renews monthly)
- **~500 hours runtime** for this app
- **1GB persistent storage** (volumes charged separately at $0.25/GB/month)

### If You Exceed Free Tier:
- **Compute:** $0.000463/GB-hour (~$10/month for always-on)
- **Storage:** $0.25/GB/month

**Tip:** For hobby project, free tier is enough if you:
- Sleep app during inactive hours (Railway does this automatically after 30 min inactivity)
- Keep storage under 1GB

---

## 🛠️ Maintenance

### Update Deployment:
```bash
# Just push to GitHub main branch
git add .
git commit -m "Update website"
git push origin main

# Railway auto-deploys from GitHub
```

### View Logs:
```bash
# Via CLI
railway logs

# Or use Railway dashboard → "Logs" tab
```

### Restart Service:
- Railway dashboard → Your service → Click "⋯" → "Restart"

---

## 🆘 Troubleshooting

### Build Fails with "MODULE_NOT_FOUND"
**Solution:** Ensure all dependencies are in `package.json` (not just `devDependencies`)

### "Error: Cannot find module 'C:\Users\dt241318\vite\bin\vite.js'"
**Solution:** This is your local environment issue, not Railway. Railway builds in clean Linux environment.

### Images Not Persisting
**Solution:** Configure Railway Volume (see Section 4)

### "GEMINI_API_KEY not set" Error
**Solution:** Add environment variable in Railway dashboard → Variables tab

### Site Loads but Shows Blank Page
**Solution:** 
1. Check browser console for errors
2. Verify `dist` folder contains `index.html`
3. Check Railway logs for server errors

---

## 📞 Support Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Your Deployment Guide:** See `DEPLOYMENT_GUIDE.md` in this repo

---

## ✅ Final Checklist Before Going Live

- [ ] All code changes committed and pushed to GitHub
- [ ] Railway project created and linked to GitHub repo
- [ ] All environment variables set (especially `GEMINI_API_KEY`)
- [ ] Persistent volume configured for `/app/public/gallery`
- [ ] Build completed successfully in Railway
- [ ] Website loads and all features work
- [ ] Admin panel login works
- [ ] Image upload/delete works
- [ ] AI assistant responds
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (green padlock in browser)

**You're ready to deploy!** 🚀
