# 🚨 Railway Deployment - Critical Fixes

## Issues Found & Solutions

### ❌ Issue 1: Email Connection Timeout

**Error:**
```
Error sending customer email: Error: Connection timeout
SMTPConnection._formatError
```

**Root Cause:**  
Railway **blocks outbound SMTP ports (25, 465, 587)** for security reasons. Gmail SMTP won't work on Railway.

**✅ Solution: Switch to SendGrid**

SendGrid uses HTTP API instead of SMTP ports, which works on Railway.

---

## 🔧 How to Fix Email on Railway

### Step 1: Sign Up for SendGrid (FREE)

1. Go to https://sendgrid.com
2. Sign up for free account (100 emails/day free forever)
3. Verify your email address

### Step 2: Create API Key

1. Login to SendGrid dashboard
2. Go to **Settings** → **API Keys**
3. Click **"Create API Key"**
4. Name: `Care Refrigeration`
5. Permissions: **Full Access** or **Restricted Access** with "Mail Send" enabled
6. Click **"Create & View"**
7. **COPY THE API KEY** (starts with `SG.`) - you can't see it again!

### Step 3: Verify Sender Email

1. Go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Enter your business email (e.g., `noreply@carerefrigeration.com` or `tarik788@gmail.com`)
4. Fill out the form
5. Check your email and click verification link
6. ✅ Sender verified

### Step 4: Add to Railway Environment Variables

In Railway Dashboard → your-project → Variables, **ADD**:

```bash
SENDGRID_API_KEY=SG.your-actual-api-key-here
EMAIL_FROM=noreply@carerefrigeration.com
BUSINESS_EMAIL=khannoor710@gmail.com
```

**Important**: Replace `SG.your-actual-api-key-here` with your real SendGrid API key!

### Step 5: Update Server Code

The code has already been updated to use SendGrid! ✅

- Installed: `@sendgrid/mail` package
- Created: `services/emailService.sendgrid.js`
- Updated: `server.js` to auto-detect SendGrid vs Gmail

### Step 6: Redeploy

```bash
git add .
git commit -m "Fix email for Railway - Switch to SendGrid"
git push origin main
```

Railway will auto-redeploy and emails will work! 🎉

---

## ❌ Issue 2: Gallery API Calling `localhost:3001`

**Error:**
```
GET http://localhost:3001/api/gallery net::ERR_CONNECTION_REFUSED
```

**Root Cause:**  
The gallery service was hardcoded to call `localhost:3001` even in production.

**✅ Solution: Dynamic API URL**

Updated `services/galleryService.ts` to:
- **Development**: Call `http://localhost:3001`
- **Production**: Call same-origin (empty string = current domain)

This is already fixed! ✅

---

## 📋 Complete Railway Environment Variables

After fixes, your Railway variables should be:

```bash
# Required
NODE_ENV=production
GEMINI_API_KEY=

# SendGrid Email (NEW)
SENDGRID_API_KEY=SG.your-sendgrid-api-key
EMAIL_FROM=noreply@carerefrigeration.com
BUSINESS_EMAIL=khannoor710@gmail.com

# DO NOT USE THESE ON RAILWAY (they won't work):
# EMAIL_SERVICE=gmail
# EMAIL_USER=...
# EMAIL_PASSWORD=...
```

---

## 🧪 Testing After Deployment

### Test 1: Gallery API
```bash
curl https://your-app.railway.app/api/gallery
```

Should return JSON with gallery images.

### Test 2: Booking Form
1. Visit https://your-app.railway.app
2. Scroll to booking form
3. Fill out with:
   - Name: Test User
   - Email: tarik788@gmail.com
   - Phone: 123-456-7890
   - Appliance: Refrigerator
   - Issue: Test from Railway
4. Submit
5. Check emails at:
   - Customer: tarik788@gmail.com
   - Business: khannoor710@gmail.com

---

## 📊 SendGrid vs Gmail Comparison

| Feature | Gmail SMTP | SendGrid API |
|---------|------------|--------------|
| **Works on Railway** | ❌ No (ports blocked) | ✅ Yes (HTTP API) |
| **Free Tier** | ✅ Yes (<500/day) | ✅ Yes (100/day) |
| **Reliability** | ⚠️ Medium | ✅ High |
| **Deliverability** | ⚠️ Medium | ✅ High |
| **Setup Complexity** | Easy | Medium |
| **Professional** | ⚠️ Gmail branding | ✅ Custom domain |

**Recommendation**: Use **SendGrid for production** (Railway), keep Gmail for local development.

---

## 🔄 Local vs Production Email

Your code now supports **both**:

### Local Development (Gmail SMTP)
```bash
# .env.local
EMAIL_SERVICE=gmail
EMAIL_USER=tarik788@gmail.com
EMAIL_PASSWORD=whwuxcfjdyzzyerq
BUSINESS_EMAIL=khannoor710@gmail.com
```

### Production (SendGrid API)
```bash
# Railway Variables
SENDGRID_API_KEY=SG.your-api-key
EMAIL_FROM=noreply@carerefrigeration.com
BUSINESS_EMAIL=khannoor710@gmail.com
```

The server automatically detects which to use based on environment variables! 🎯

---

## 📝 Summary of Changes

### Files Modified
1. ✅ `services/emailService.sendgrid.js` - NEW SendGrid email service
2. ✅ `services/galleryService.ts` - Fixed hardcoded localhost URL
3. ✅ `server.js` - Auto-detect SendGrid vs Gmail
4. ✅ `vite-env.d.ts` - Added DEV/PROD types
5. ✅ `.env.production.example` - Updated with SendGrid instructions
6. ✅ `package.json` - Added @sendgrid/mail dependency

### What Was Installed
```bash
npm install @sendgrid/mail
```

---

## 🚀 Next Steps

1. ✅ Code is already fixed
2. 📧 Sign up for SendGrid (5 minutes)
3. 🔑 Get API key from SendGrid
4. 🌐 Add to Railway environment variables
5. 🔄 Push changes to GitHub
6. ⏳ Wait for Railway to redeploy (3-5 min)
7. ✅ Test emails - should work!

---

## 💡 Pro Tips

1. **Use SendGrid's Email Activity** to debug delivery issues
2. **Monitor SendGrid quota** (100/day on free tier)
3. **Set up domain authentication** for better deliverability
4. **Keep Gmail for local dev** - simpler setup
5. **Test thoroughly** before going live

---

## 📞 Support

- **SendGrid Docs**: https://docs.sendgrid.com/
- **Railway Docs**: https://docs.railway.app/
- **SendGrid Support**: https://support.sendgrid.com/

---

**Status**: 🔧 Fixes applied locally, ready to deploy to Railway

**Estimated time to fix on Railway**: 10 minutes (mostly SendGrid signup)
