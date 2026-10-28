import { createTransport } from 'nodemailer';
import { Resend } from 'resend';

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

/**
 * Email Service for Care Refrigeration
 * Handles sending booking confirmations to customers and notifications to business
 * Supports:
 * - Resend API (for Railway production - recommended)
 * - Gmail SMTP (for local development only)
 */

// Read configuration when sending, after the server has loaded .env.local.
const getResend = () => process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Create email transporter based on environment configuration
 */
function createTransporter() {
  // For Gmail SMTP (recommended for local development)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password, not regular password
      },
    });
  }
  
  // For custom SMTP server
  if (process.env.SMTP_HOST) {
    return createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  
  // For development: Use Ethereal (fake SMTP for testing)
  // This won't send real emails but will show you what they'd look like
  console.warn('⚠️  No email configuration found. Emails will not be sent.');
  console.warn('📧 To enable emails, configure EMAIL_SERVICE or SMTP settings in .env.local');
  return null;
}

/**
 * Generate HTML email template for customer confirmation
 */
function generateCustomerEmailHTML(name, appliance, issue, confirmationMessage, bookingRef) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Care Refrigeration</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 30px 20px;
        }
        .confirmation-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .booking-details {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 20px;
          margin: 20px 0;
        }
        .booking-details h3 {
          margin-top: 0;
          color: #667eea;
        }
        .detail-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: bold;
          width: 140px;
          color: #666;
        }
        .detail-value {
          flex: 1;
          color: #333;
        }
        .booking-ref {
          background: #667eea;
          color: white;
          padding: 10px 15px;
          border-radius: 6px;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
        }
        .contact-info {
          background: #fffbea;
          border: 1px solid #ffd700;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .contact-info h4 {
          margin-top: 0;
          color: #b8860b;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .footer a {
          color: #667eea;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛠️ Care Refrigeration</h1>
          <p>Your Trusted Appliance Repair Service</p>
        </div>
        
        <div class="content">
          <h2>Booking Confirmation</h2>
          
          <div class="confirmation-box">
            <p>${confirmationMessage.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div class="booking-ref">
            📋 Booking Reference: ${bookingRef}
          </div>
          
          <div class="booking-details">
            <h3>📝 Service Request Details</h3>
            <div class="detail-row">
              <span class="detail-label">Customer Name:</span>
              <span class="detail-value">${name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Appliance Type:</span>
              <span class="detail-value">${appliance}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Issue Description:</span>
              <span class="detail-value">${issue}</span>
            </div>
          </div>
          
          <div class="contact-info">
            <h4>📞 Need Immediate Assistance?</h4>
            <p><strong>Phone:</strong> +91 9819 124 194</p>
            <p><strong>Email:</strong> asadcare94@gmail.com</p>
            <p><strong>Service area:</strong> Andheri West, Mumbai</p>
          </div>
          
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            <strong>What happens next?</strong><br>
            Our technical team will review your request and contact you within 2-3 business hours 
            to schedule a convenient appointment time. Please keep your phone handy!
          </p>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing Care Refrigeration!</p>
          <p>
            <a href="tel:+919819124194">Call Us</a> | 
            <a href="mailto:asadcare94@gmail.com">Email Us</a>
          </p>
          <p style="margin-top: 15px; font-size: 12px; color: #999;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate HTML email template for business notification
 */
function generateBusinessEmailHTML(name, appliance, issue, phone, email, area, bookingRef) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking - Care Refrigeration</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .alert-badge {
          background: #ff4444;
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          display: inline-block;
          margin-top: 10px;
        }
        .content {
          padding: 30px 20px;
        }
        .booking-ref {
          background: #667eea;
          color: white;
          padding: 15px;
          border-radius: 6px;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
        }
        .customer-details {
          background: #fff;
          border: 2px solid #667eea;
          border-radius: 6px;
          padding: 20px;
          margin: 20px 0;
        }
        .customer-details h3 {
          margin-top: 0;
          color: #667eea;
        }
        .detail-row {
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: bold;
          color: #666;
          display: block;
          margin-bottom: 5px;
        }
        .detail-value {
          color: #333;
          font-size: 16px;
        }
        .action-buttons {
          margin: 30px 0;
          text-align: center;
        }
        .action-buttons a {
          display: inline-block;
          padding: 12px 30px;
          margin: 5px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        }
        .action-buttons a:hover {
          background: #5568d3;
        }
        .urgent-notice {
          background: #fff3cd;
          border: 1px solid #ffc107;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .urgent-notice h4 {
          margin-top: 0;
          color: #856404;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Booking Alert</h1>
          <p>Care Refrigeration - Admin Notification</p>
          <span class="alert-badge">ACTION REQUIRED</span>
        </div>
        
        <div class="content">
          <h2>New Service Request Received</h2>
          
          <div class="booking-ref">
            📋 Booking Reference: ${bookingRef}
          </div>
          
          <div class="customer-details">
            <h3>👤 Customer Information</h3>
            <div class="detail-row">
              <span class="detail-label">Customer Name:</span>
              <span class="detail-value">${name}</span>
            </div>
            ${phone ? `
            <div class="detail-row">
              <span class="detail-label">Phone Number:</span>
              <span class="detail-value"><a href="tel:${phone}">${phone}</a></span>
            </div>
            ` : ''}
            ${email ? `
            <div class="detail-row">
              <span class="detail-label">Email Address:</span>
              <span class="detail-value"><a href="mailto:${email}">${email}</a></span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="detail-label">Appliance Type:</span>
              <span class="detail-value">${appliance}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Service area:</span>
              <span class="detail-value">${area}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Issue Description:</span>
              <span class="detail-value">${issue}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submitted At:</span>
              <span class="detail-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
            </div>
          </div>
          
          <div class="urgent-notice">
            <h4>⏰ Response Required</h4>
            <p>Please contact the customer within <strong>2-3 business hours</strong> to schedule their appointment.</p>
          </div>
          
          <div class="action-buttons">
            ${phone ? `<a href="tel:${phone}">📞 Call Customer</a>` : ''}
            ${email ? `<a href="mailto:${email}">✉️ Email Customer</a>` : ''}
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from your website booking system.</p>
          <p style="margin-top: 10px; font-size: 12px; color: #999;">
            Care Refrigeration - Appliance Repair Services
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send confirmation email to customer
 */
export async function sendCustomerEmail(customerData) {
  const { name, email, appliance, issue, confirmationMessage, bookingRef } = customerData;
  const resend = getResend();
  
  if (!email) {
    console.log('⚠️  No customer email provided. Skipping customer email.');
    return { success: false, message: 'No customer email provided' };
  }
  
  // Use Resend if available (for Railway production)
  if (resend && process.env.RESEND_API_KEY) {
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: email,
        subject: `Service Request Confirmed - ${bookingRef}`,
        html: generateCustomerEmailHTML(...[name, appliance, issue, confirmationMessage, bookingRef].map(escapeHtml)),
      });

      if (error) {
        console.error('❌ Resend error:', error);
        return {
          success: false,
          error: error.message,
          message: 'Failed to send confirmation email'
        };
      }

      console.log('✅ Customer email sent via Resend:', data.id);
      return {
        success: true,
        messageId: data.id,
        message: 'Confirmation email sent to customer'
      };
    } catch (error) {
      console.error('❌ Error sending customer email:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send confirmation email'
      };
    }
  }
  
  // Fallback to Gmail SMTP (for local development only)
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('📧 Email not configured. Skipping customer email.');
    return { success: false, message: 'Email service not configured' };
  }
  
  try {
    const mailOptions = {
      from: `"Care Refrigeration" <${process.env.EMAIL_USER || 'noreply@carerefrigeration.com'}>`,
      to: email,
      subject: `Service Request Confirmed - ${bookingRef}`,
      html: generateCustomerEmailHTML(...[name, appliance, issue, confirmationMessage, bookingRef].map(escapeHtml)),
      text: confirmationMessage, // Plain text fallback
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Customer email sent via Gmail:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Confirmation email sent to customer'
    };
  } catch (error) {
    console.error('❌ Error sending customer email:', error);
    return { 
      success: false, 
      error: error.message,
      message: 'Failed to send confirmation email'
    };
  }
}

/**
 * Send notification email to business owner
 */
export async function sendBusinessEmail(bookingData) {
  const resend = getResend();
  const businessEmail = process.env.BUSINESS_EMAIL;
  
  if (!businessEmail) {
    console.log('⚠️  BUSINESS_EMAIL not configured. Skipping business notification.');
    return { success: false, message: 'Business email not configured' };
  }
  
  const { name, email, phone, area, appliance, issue, bookingRef } = bookingData;
  
  // Use Resend if available (for Railway production)
  if (resend && process.env.RESEND_API_KEY) {
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: businessEmail,
        subject: `🚨 New Service Request - ${bookingRef}`,
        html: generateBusinessEmailHTML(...[name, appliance, issue, phone, email, area, bookingRef].map(escapeHtml)),
      });

      if (error) {
        console.error('❌ Resend error:', error);
        return {
          success: false,
          error: error.message,
          message: 'Failed to send business notification'
        };
      }

      console.log('✅ Business notification sent via Resend:', data.id);
      return {
        success: true,
        messageId: data.id,
        message: 'Notification sent to business'
      };
    } catch (error) {
      console.error('❌ Error sending business email:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send business notification'
      };
    }
  }
  
  // Fallback to Gmail SMTP (for local development only)
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('📧 Email not configured. Skipping business notification.');
    return { success: false, message: 'Email service not configured' };
  }
  
  try {
    const mailOptions = {
      from: `"Care Refrigeration System" <${process.env.EMAIL_USER || 'system@carerefrigeration.com'}>`,
      to: businessEmail,
      subject: `🚨 New Service Request - ${bookingRef}`,
      html: generateBusinessEmailHTML(...[name, appliance, issue, phone, email, area, bookingRef].map(escapeHtml)),
      text: `New booking received!\n\nReference: ${bookingRef}\nCustomer: ${name}\nArea: ${area}\nAppliance: ${appliance}\nIssue: ${issue}\n${phone ? `Phone: ${phone}` : ''}\n${email ? `Email: ${email}` : ''}`,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Business notification sent via Gmail:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Notification sent to business'
    };
  } catch (error) {
    console.error('❌ Error sending business email:', error);
    return { 
      success: false, 
      error: error.message,
      message: 'Failed to send business notification'
    };
  }
}

/**
 * Send both customer and business emails
 */
export async function sendBookingEmails(bookingData) {
  const results = {
    customer: null,
    business: null,
  };
  
  // Notify the business first; do not confirm a request the business never received.
  results.business = await sendBusinessEmail(bookingData);
  if (results.business.success && bookingData.email) {
    results.customer = await sendCustomerEmail({
      name: bookingData.name,
      email: bookingData.email,
      appliance: bookingData.appliance,
      issue: bookingData.issue,
      confirmationMessage: bookingData.confirmationMessage,
      bookingRef: bookingData.bookingRef,
    });
  }
  
  return results;
}
