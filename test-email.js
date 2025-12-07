/**
 * Email Service Test Script
 * Tests both Resend API and Gmail SMTP email functionality
 * 
 * Usage:
 * 1. Ensure .env.local is configured with your email settings
 * 2. Run: node test-email.js
 * 
 * This will test:
 * - Gmail SMTP (local development)
 * - Resend API (if RESEND_API_KEY is provided)
 */

import dotenv from 'dotenv';
import { sendCustomerEmail, sendBusinessEmail, sendBookingEmails } from './services/emailService.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('\n🧪 Email Service Test Script\n');
console.log('='.repeat(50));

// Display current configuration
console.log('\n📋 Current Configuration:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE || 'not set');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '***@' + process.env.EMAIL_USER.split('@')[1] : 'not set');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***' + process.env.EMAIL_PASSWORD.slice(-4) : 'not set');
console.log('BUSINESS_EMAIL:', process.env.BUSINESS_EMAIL || 'not set');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 're_***' + process.env.RESEND_API_KEY.slice(-4) : 'not set');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM || 'not set');

console.log('\n' + '='.repeat(50));

// Test booking data
const testBookingData = {
  name: 'Test Customer',
  email: process.env.BUSINESS_EMAIL || 'test@example.com', // Send test email to yourself
  phone: '+91 9819 124 194',
  appliance: 'Refrigerator',
  issue: 'Not cooling properly - test booking',
  bookingRef: 'CR-TEST-' + Math.floor(100000 + Math.random() * 900000),
  confirmationMessage: `Thank you, Test Customer! We've received your service request for your Refrigerator.

Our technical team will review your request and contact you within 2-3 business hours to schedule a convenient appointment time.

Your booking reference is: CR-TEST-123456

If you need immediate assistance, please call us at +91 9819 124 194.

Best regards,
Care Refrigeration Team`,
};

console.log('\n📦 Test Booking Data:');
console.log('Customer Name:', testBookingData.name);
console.log('Customer Email:', testBookingData.email);
console.log('Phone:', testBookingData.phone);
console.log('Appliance:', testBookingData.appliance);
console.log('Issue:', testBookingData.issue);
console.log('Booking Ref:', testBookingData.bookingRef);

console.log('\n' + '='.repeat(50));

// Test function
async function runEmailTests() {
  console.log('\n🚀 Starting Email Tests...\n');

  try {
    // Test 1: Customer Email
    console.log('📧 Test 1: Sending Customer Confirmation Email...');
    const customerResult = await sendCustomerEmail({
      name: testBookingData.name,
      email: testBookingData.email,
      appliance: testBookingData.appliance,
      issue: testBookingData.issue,
      confirmationMessage: testBookingData.confirmationMessage,
      bookingRef: testBookingData.bookingRef,
    });

    console.log('   Result:', customerResult.success ? '✅ SUCCESS' : '❌ FAILED');
    console.log('   Message:', customerResult.message);
    if (customerResult.messageId) {
      console.log('   Message ID:', customerResult.messageId);
    }
    if (customerResult.error) {
      console.log('   Error:', customerResult.error);
    }

    console.log('');

    // Test 2: Business Email
    console.log('📧 Test 2: Sending Business Notification Email...');
    const businessResult = await sendBusinessEmail(testBookingData);

    console.log('   Result:', businessResult.success ? '✅ SUCCESS' : '❌ FAILED');
    console.log('   Message:', businessResult.message);
    if (businessResult.messageId) {
      console.log('   Message ID:', businessResult.messageId);
    }
    if (businessResult.error) {
      console.log('   Error:', businessResult.error);
    }

    console.log('');

    // Test 3: Both Emails (Full Booking Flow)
    console.log('📧 Test 3: Sending Both Emails (Full Booking Flow)...');
    const bothResults = await sendBookingEmails(testBookingData);

    console.log('   Customer Email:', bothResults.customer?.success ? '✅ SUCCESS' : '❌ FAILED');
    console.log('   Business Email:', bothResults.business?.success ? '✅ SUCCESS' : '❌ FAILED');

    console.log('\n' + '='.repeat(50));

    // Summary
    console.log('\n📊 Test Summary:');
    console.log('');
    
    const allSuccess = customerResult.success && businessResult.success;
    
    if (allSuccess) {
      console.log('✅ All tests passed!');
      console.log('');
      console.log('📬 Check your inbox:');
      console.log('   Email address:', testBookingData.email);
      console.log('   Expected emails: 3 emails total');
      console.log('   - 1 customer confirmation (Test 1)');
      console.log('   - 1 business notification (Test 2)');
      console.log('   - 1 customer confirmation (Test 3)');
      console.log('   - 1 business notification (Test 3)');
      console.log('');
      console.log('⚠️  Total: 4 emails (2 customer + 2 business)');
      console.log('');
      console.log('If using Gmail SMTP:');
      console.log('   - Check inbox and spam folder');
      console.log('   - Delivery usually takes 1-10 seconds');
      console.log('');
      console.log('If using Resend:');
      console.log('   - Check logs: https://resend.com/logs');
      console.log('   - Delivery usually instant');
      console.log('');
    } else {
      console.log('❌ Some tests failed. Check error messages above.');
      console.log('');
      console.log('Common issues:');
      console.log('');
      console.log('1. Gmail SMTP not configured:');
      console.log('   - Add EMAIL_SERVICE=gmail to .env.local');
      console.log('   - Add EMAIL_USER and EMAIL_PASSWORD');
      console.log('');
      console.log('2. Gmail App Password incorrect:');
      console.log('   - Remove all spaces from app password');
      console.log('   - Generate new app password: https://myaccount.google.com/apppasswords');
      console.log('');
      console.log('3. Resend API key invalid:');
      console.log('   - Check RESEND_API_KEY in .env.local');
      console.log('   - Generate new key: https://resend.com/api-keys');
      console.log('');
      console.log('4. BUSINESS_EMAIL not set:');
      console.log('   - Add BUSINESS_EMAIL to .env.local');
      console.log('');
    }

    console.log('='.repeat(50));
    console.log('');

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    console.error('\nFull Error:');
    console.error(error);
    console.log('');
    console.log('='.repeat(50));
    console.log('');
    process.exit(1);
  }
}

// Run tests
runEmailTests()
  .then(() => {
    console.log('✅ Test script completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test script failed:', error);
    process.exit(1);
  });
