# 📧 EmailJS Setup Guide for Contact Form

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions for your email provider
5. **Copy the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. **Copy your Public Key** (e.g., `user_abc123def456`)

### Step 5: Update Configuration
1. Open `src/config/emailjs.js`
2. Replace the placeholder values:

```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'service_abc123', // Your actual service ID
  templateId: 'template_xyz789', // Your actual template ID
  publicKey: 'user_abc123def456', // Your actual public key
  toEmail: 'hegdeshashidhar123@gmail.com'
}
```

## ✅ Testing Your Setup

1. Save the configuration file
2. Restart your development server: `npm run dev`
3. Go to your portfolio contact form
4. Fill out and submit the form
5. Check your email inbox!

## 🔧 Troubleshooting

### Common Issues:
- **"Service not found"**: Check your Service ID
- **"Template not found"**: Check your Template ID
- **"Invalid public key"**: Check your Public Key
- **Emails not received**: Check spam folder, verify email service setup

### Free Plan Limits:
- 200 emails per month
- Perfect for portfolio websites

## 📱 Features Included

✅ **Real email sending** to your inbox
✅ **Success/Error messages** with animations
✅ **Form validation** and error handling
✅ **Professional email templates**
✅ **Mobile-responsive** contact form
✅ **Smooth animations** and transitions

## 🎯 What Happens When Someone Submits

1. Form validates all fields
2. EmailJS sends email to your inbox
3. User sees success message
4. Form resets for next submission
5. You receive the message with sender details

Your contact form is now fully functional! 🎉
