# 🚂 Railway Deployment Guide - Gmail SMTP

## ✅ Simple Setup - No SendGrid Required!

Good news! You can use **Gmail SMTP directly on Railway**. No need for SendGrid account.

---

## 📋 Railway Environment Variables

Add these **4 variables** in Railway Dashboard → Variables:

```bash
NODE_ENV=production
EMAIL_SERVICE=gmail
EMAIL_USER=tarik788@gmail.com
EMAIL_PASSWORD=whwuxcfjdyzzyerq
BUSINESS_EMAIL=khannoor710@gmail.com
```

**That's it!** Your existing Gmail app password will work on Railway.

---

## 🚀 Deployment Steps

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. Create Railway Project

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose `khannoor710/carerefrigeration`

### 3. Add Environment Variables

In Railway Dashboard → your-project → **Variables**, click **"+ New Variable"** and add:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `EMAIL_SERVICE` | `gmail` |
| `EMAIL_USER` | `tarik788@gmail.com` |
| `EMAIL_PASSWORD` | `whwuxcfjdyzzyerq` |
| `BUSINESS_EMAIL` | `khannoor710@gmail.com` |

### 4. Add Persistent Volume (for Gallery)

1. In Railway Dashboard, click **"+ New"** → **"Volume"**
2. Name: `gallery-storage`
3. Mount Path: `/app/public/gallery`
4. Size: **1GB**

### 5. Deploy!

Railway will automatically:
- Install dependencies
- Build your app
- Start the server
- Assign a public URL

**Deployment time:** ~3-5 minutes

---

## 🧪 Test After Deployment

### 1. Check Homepage
Visit: `https://your-app.railway.app`

### 2. Test Booking Form
1. Scroll to **"Book Your Repair Today"**
2. Fill out:
   - Name: Test User
   - Email: tarik788@gmail.com
   - Phone: 123-456-7890
   - Appliance: Refrigerator
   - Issue: Railway production test
3. Submit
4. Check confirmation message
5. Check emails at tarik788@gmail.com and khannoor710@gmail.com

### 3. Test Gallery
1. Visit `https://your-app.railway.app/admin`
2. Login: `admin` / `CareRefrig2024!`
3. Upload a test image
4. Verify it persists after redeploy

---

## 🌐 Custom Domain (Optional)

### Add carerefrigeration.com

1. In Railway → Settings → **Domains**
2. Click **"+ Custom Domain"**
3. Enter: `carerefrigeration.com`
4. Railway shows DNS records
5. Add to your domain registrar:
   - **CNAME** `www` → `your-app.railway.app`
   - **A** `@` → [Railway IP]
6. Wait 10-60 minutes for DNS propagation
7. ✅ SSL certificate auto-provisioned!

---

## 📊 What Works on Railway

| Feature | Status |
|---------|--------|
| Gmail SMTP | ✅ Works perfectly |
| Dynamic confirmation | ✅ No AI needed |
| Customer emails | ✅ Sent via Gmail |
| Business notifications | ✅ Sent via Gmail |
| Gallery uploads | ✅ With persistent volume |
| Admin panel | ✅ Working |
| Custom domain | ✅ Free SSL included |

---

## 💰 Pricing

- **Railway Starter:** $5/month
- **Gmail SMTP:** FREE (<500 emails/day)
- **SSL Certificate:** FREE (auto-provisioned)
- **Custom Domain:** FREE

**Total:** $5/month

---

## 🔧 Troubleshooting

### Emails Not Sending?

**Check:**
1. ✅ `EMAIL_PASSWORD` has no spaces (should be 16 chars)
2. ✅ 2-Step Verification enabled on Gmail
3. ✅ App password is valid (not expired)
4. ✅ All 5 environment variables are set

**Fix:** Regenerate app password at https://myaccount.google.com/apppasswords

### Gallery Images Disappear?

**Fix:** Add persistent volume at `/app/public/gallery` (see Step 4 above)

### Build Fails?

**Check Railway logs** for errors. Common issues:
- Missing environment variables
- TypeScript compilation errors (should auto-fix on Railway)

---

## ✅ Summary

**What You Need:**
1. ✅ GitHub account (already have)
2. ✅ Railway account (free to create)
3. ✅ Gmail app password (already have: `whwuxcfjdyzzyerq`)
4. ✅ 5 environment variables
5. ✅ 1 persistent volume

**What You DON'T Need:**
- ❌ SendGrid account
- ❌ Gemini API key
- ❌ Credit card (Railway Starter is $5/month, billed later)

---

**You're ready to deploy!** 🎉

Just follow the 5 steps above and your website will be live in ~8 minutes!
