// EmailJS Configuration
// You need to set up EmailJS to make the contact form work

// Step 1: Go to https://www.emailjs.com/ and create a free account
// Step 2: Create an email service (Gmail, Outlook, etc.)
// Step 3: Create an email template
// Step 4: Get your Public Key from the account settings

// Replace these values with your actual EmailJS credentials:
export const EMAILJS_CONFIG = {
  serviceId: 'service_3x2helv', // Replace with your service ID
  templateId: 'template_la6ubg5', // Replace with your template ID
  publicKey: 'LfDPt_QDE3MNNAroE', // Replace with your public key
  toEmail: 'hegde.shashi.123@gmail.com' // Your email address
}

// Email Template Variables:
// The template should include these variables:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{subject}} - Email subject
// {{message}} - Email message
// {{to_email}} - Your email address

// Example Email Template:
/*
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
*/