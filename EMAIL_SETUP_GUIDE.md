# 📧 Email Functionality - Complete Setup Guide

## ✅ Features Added

Your Care Refrigeration website now sends **automated emails** when customers book a service:

1. **📨 Customer Email**: Beautiful HTML confirmation email sent to the customer
2. **🔔 Business Notification**: Alert email sent to you with customer details
3. **🎨 Professional Templates**: Custom-designed HTML emails with your branding
4. **📱 Mobile-Responsive**: Emails look great on all devices

---

## 🎯 What Happens When Someone Books

### **Customer Experience:**
1. Fill out booking form (name, email, phone, appliance, issue)
2. Click "Request Service"
3. See AI-generated confirmation on screen
4. **Receive beautiful confirmation email** (if email provided)

### **Business Owner (You) Receives:**
1. **Instant notification email** with:
   - Customer name, email, phone
   - Appliance type and issue description
   - Booking reference number
   - Direct links to call/email customer
   - Timestamp

---

## 🚀 Quick Setup (5 Minutes)

### **Option 1: Gmail SMTP (Recommended - FREE)**

**Step 1: Enable 2-Step Verification**
1. Go to: https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow the setup instructions

**Step 2: Create App Password**
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and your device
3. Click "Generate"
4. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

**Step 3: Configure Environment Variables**

Edit your `.env.local` file and add:

```bash
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # Your app password from Step 2
BUSINESS_EMAIL=your-email@gmail.com  # Where you want to receive bookings
```

**Step 4: Restart Server**
```powershell
# Stop current server (Ctrl+C in terminal)
# Restart:
npm run server
```

**Done!** Test by submitting the booking form with your email.

---

### **Option 2: Custom SMTP Server**

If you have a business email with custom SMTP:

```bash
# Email Configuration
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASSWORD=your-password
BUSINESS_EMAIL=owner@carerefrigeration.com
```

Common SMTP providers:
- **Zoho Mail**: smtp.zoho.com (Port: 587)
- **Outlook/Hotmail**: smtp-mail.outlook.com (Port: 587)
- **Yahoo**: smtp.mail.yahoo.com (Port: 587)
- **SendGrid**: smtp.sendgrid.net (Port: 587)

---

## 📋 Environment Variables Reference

### **Required for Email Functionality:**

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_SERVICE` | Use "gmail" for Gmail SMTP | `gmail` |
| `EMAIL_USER` | Your Gmail address | `carerefrig@gmail.com` |
| `EMAIL_PASSWORD` | Gmail App Password (16 chars) | `abcd efgh ijkl mnop` |
| `BUSINESS_EMAIL` | Where to receive booking notifications | `owner@carerefrigeration.com` |

### **Alternative SMTP Configuration:**

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_SECURE` | Use TLS (true for 465, false for 587) | `false` |
| `SMTP_USER` | SMTP username | `user@example.com` |
| `SMTP_PASSWORD` | SMTP password | `your-password` |
| `BUSINESS_EMAIL` | Notification recipient | `owner@example.com` |

---

## 🧪 Testing Email Functionality

### **Test 1: Without Email Configuration**

1. Don't configure email variables
2. Submit booking form
3. **Expected**: Works fine, but no emails sent
4. **Backend logs**: "📧 Email not configured. Skipping..."

### **Test 2: With Email Configuration**

1. Configure email variables in `.env.local`
2. Restart backend server
3. Submit booking form with your email
4. **Expected**:
   - Confirmation message appears on screen
   - Customer receives email within 10-30 seconds
   - Business owner receives notification email
5. **Backend logs**: "✅ Customer email sent" and "✅ Business notification sent"

### **Test 3: Error Handling**

1. Provide invalid email in form
2. **Expected**: Form validation error
3. No API call made

---

## 📧 Email Templates Preview

### **Customer Confirmation Email**

```
┌─────────────────────────────────────────┐
│  🛠️ Care Refrigeration                 │
│  Your Trusted Appliance Repair Service  │
└─────────────────────────────────────────┘

Booking Confirmation
━━━━━━━━━━━━━━━━━━━

[AI-generated personalized message]

┌─────────────────────────────────────────┐
│ 📋 Booking Reference: CR-482751         │
└─────────────────────────────────────────┘

📝 Service Request Details
━━━━━━━━━━━━━━━━━━━━━━━━━━

Customer Name:      John Doe
Appliance Type:     Refrigerator
Issue Description:  Not cooling properly

┌─────────────────────────────────────────┐
│ 📞 Need Immediate Assistance?           │
│                                          │
│ Phone: +91 9819 124 194                 │
│ Email: info@carerefrigeration.com       │
│ Address: Mumbai, Maharashtra, India     │
└─────────────────────────────────────────┘

What happens next?
Our technical team will contact you within 
2-3 business hours to schedule your appointment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thank you for choosing Care Refrigeration!
      [Call Us] | [Email Us]
```

### **Business Notification Email**

```
┌─────────────────────────────────────────┐
│  🔔 New Booking Alert                   │
│  Care Refrigeration - Admin Notification│
│  [ACTION REQUIRED]                      │
└─────────────────────────────────────────┘

New Service Request Received

┌─────────────────────────────────────────┐
│ 📋 Booking Reference: CR-482751         │
└─────────────────────────────────────────┘

👤 Customer Information
━━━━━━━━━━━━━━━━━━━━━━

Customer Name:     John Doe
Phone Number:      +91 98765 43210
Email Address:     john@example.com
Appliance Type:    Refrigerator
Issue Description: Not cooling, strange noise
Submitted At:      Dec 7, 2025, 1:30 PM IST

┌─────────────────────────────────────────┐
│ ⏰ Response Required                    │
│                                          │
│ Please contact customer within 2-3      │
│ business hours to schedule appointment  │
└─────────────────────────────────────────┘

   [📞 Call Customer]  [✉️ Email Customer]
```

---

## 🔧 Troubleshooting

### **Issue: No emails being sent**

**Check:**
1. Email configuration in `.env.local`
2. Backend server restarted after adding config
3. Backend logs for errors

**Solution:**
```bash
# Check backend terminal for:
"📧 Email not configured" → Add EMAIL_SERVICE and credentials
"✅ Customer email sent" → Working!
"❌ Error sending email" → Check credentials
```

### **Issue: Gmail "Less secure app" error**

**Solution:**
- Don't use regular Gmail password
- **Must use App Password** (see Setup Step 2)
- Enable 2-Step Verification first

### **Issue: Emails in spam folder**

**Solution:**
1. Check spam folder and mark as "Not Spam"
2. For production: Use custom domain email
3. Consider using SendGrid/Mailgun for better deliverability

### **Issue: Customer doesn't receive email**

**Check:**
1. Customer provided valid email address
2. Check backend logs: "✅ Customer email sent"
3. Check spam folder
4. Email might take 10-60 seconds to arrive

**Logs to look for:**
```bash
✅ Customer email sent: <message-id>  # Success
⚠️  No customer email provided         # Customer didn't enter email
❌ Error sending customer email        # Configuration error
```

---

## 💰 Email Sending Costs

### **Gmail SMTP (Personal Account)**
- **FREE** for up to ~500 emails/day
- Perfect for small business
- No setup fees

### **Gmail Workspace (Business)**
- **$6/user/month**
- Higher limits (2,000 emails/day/user)
- Professional custom domain email

### **Third-Party Services**

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **SendGrid** | 100 emails/day | $15/month (40k emails) |
| **Mailgun** | 5,000 emails/month | $35/month (50k emails) |
| **Amazon SES** | 62,000 emails/month (if using AWS) | $0.10 per 1,000 emails |
| **Resend** | 3,000 emails/month | $20/month (50k emails) |

**Recommendation:** Start with **Gmail SMTP (FREE)**, upgrade later if needed.

---

## 🚀 Production Deployment (Railway)

### **Environment Variables to Set:**

In Railway dashboard → Your service → Variables tab:

```bash
# Required
GEMINI_API_KEY=your_gemini_key
NODE_ENV=production

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=carerefrig@gmail.com
EMAIL_PASSWORD=your_app_password
BUSINESS_EMAIL=owner@carerefrigeration.com
```

**Important:** 
- Use App Password, not regular Gmail password
- Test locally first before deploying
- Keep credentials secure (never commit to Git)

---

## 📊 Email Analytics

### **Track Email Success**

Backend logs show email status:
```bash
📧 Email results: {
  customer: { success: true, messageId: '<...>' },
  business: { success: true, messageId: '<...>' }
}
```

### **What Each Status Means:**

| Log Message | Meaning |
|-------------|---------|
| `✅ Customer email sent` | Email successfully sent to customer |
| `✅ Business notification sent` | Email successfully sent to you |
| `⚠️  No customer email provided` | Customer didn't enter email (optional) |
| `⚠️  BUSINESS_EMAIL not configured` | You didn't set your email in .env |
| `❌ Error sending email` | Configuration or network error |
| `📧 Email not configured` | No EMAIL_SERVICE or SMTP settings |

---

## 🎨 Customizing Email Templates

Email templates are in: `services/emailService.js`

### **To Customize:**

1. Open `services/emailService.js`
2. Find `generateCustomerEmailHTML()` or `generateBusinessEmailHTML()`
3. Modify HTML/CSS as needed
4. Test by submitting form

**Easy Customizations:**
- Change colors (search for `#667eea`, `#764ba2`)
- Update contact info (phone, email, address)
- Add your logo (replace 🛠️ emoji)
- Modify footer text

---

## ✅ Features Summary

| Feature | Status | Notes |
|---------|--------|-------|
| **AI Confirmation** | ✅ Working | Gemini generates personalized messages |
| **Customer Email** | ✅ Added | HTML email with booking details |
| **Business Notification** | ✅ Added | Instant alert with customer info |
| **Email Templates** | ✅ Created | Professional, mobile-responsive |
| **Gmail SMTP Support** | ✅ Ready | FREE email sending |
| **Custom SMTP Support** | ✅ Ready | Works with any SMTP provider |
| **Error Handling** | ✅ Included | Graceful fallbacks if email fails |
| **Production Ready** | ✅ Yes | Works on Railway with env vars |

---

## 🆘 Need Help?

### **Quick Checks:**

1. ✅ Email variables in `.env.local`
2. ✅ Backend server restarted
3. ✅ Gmail App Password (not regular password)
4. ✅ 2-Step Verification enabled
5. ✅ Valid email entered in form
6. ✅ Check backend terminal logs

### **Still Not Working?**

Check backend logs carefully:
```bash
# In backend terminal, look for:
[dotenv] injecting env (5) from .env.local  # Should see 5+ variables
📧 Email results: ...                        # Shows success/failure
✅ Customer email sent                       # Success!
❌ Error sending email                       # Check credentials
```

---

## 🎉 You're All Set!

**To test right now:**

1. Make sure email config is in `.env.local`
2. Restart backend: `npm run server`
3. Open website: http://localhost:5173
4. Fill booking form with your email
5. Submit and check your inbox!

**Emails typically arrive within 10-30 seconds.** Check spam folder if not in inbox.

---

## 📧 What's Next?

**Enhancements you can add later:**

- [ ] Save bookings to database
- [ ] Send reminder emails before appointment
- [ ] SMS notifications (Twilio)
- [ ] Calendar integration (Google Calendar)
- [ ] Booking status updates
- [ ] Customer portal to view bookings

**For now, enjoy automated email notifications!** 🚀
