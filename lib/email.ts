/**
 * Email service utilities for Gmail API integration
 * Handles email template generation and Gmail API communication
 */

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export interface EmailTemplate {
  subject: string
  text: string
  html: string
  replyTo: string
}

/**
 * Generate email template for contact form submission
 */
export function generateEmailTemplate(data: EmailData): EmailTemplate {
  const { name, email, subject, message } = data

  const text = `
New Portfolio Contact Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio website contact form.
Reply-To: ${email}
  `.trim()

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
      .header h2 { margin: 0 0 10px 0; color: #000; }
      .field { margin-bottom: 15px; }
      .field-label { font-weight: bold; color: #555; }
      .field-value { margin-top: 5px; color: #333; }
      .message-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px; margin: 20px 0; }
      .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Portfolio Contact</h2>
        <p>You have received a new message from your portfolio website.</p>
      </div>

      <div class="field">
        <div class="field-label">From:</div>
        <div class="field-value">${escapeHtml(name)}</div>
      </div>

      <div class="field">
        <div class="field-label">Email:</div>
        <div class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>

      <div class="field">
        <div class="field-label">Subject:</div>
        <div class="field-value">${escapeHtml(subject)}</div>
      </div>

      <div class="message-box">
        <div class="field-label">Message:</div>
        <div class="field-value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
      </div>

      <div class="footer">
        <p>This email was sent from your portfolio website contact form.</p>
        <p>To reply, use the email address above or click the reply button in your email client.</p>
      </div>
    </div>
  </body>
</html>
  `.trim()

  return {
    subject: `Portfolio Contact: ${subject}`,
    text,
    html,
    replyTo: email,
  }
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

/**
 * Create Gmail API message format (RFC 2822)
 * 
 * This function creates a properly formatted email message that can be sent via Gmail API
 */
export function createGmailMessage(
  to: string,
  template: EmailTemplate
): string {
  const headers = [
    `To: ${to}`,
    `From: ${process.env.GMAIL_FROM_EMAIL || process.env.GMAIL_USER_EMAIL}`,
    `Reply-To: ${template.replyTo}`,
    `Subject: ${template.subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
  ]

  const message = `${headers.join('\r\n')}\r\n\r\n${template.html}`

  // Encode to base64url format required by Gmail API
  return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * Validate email configuration
 */
export function validateEmailConfig(): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!process.env.GMAIL_USER_EMAIL) {
    errors.push('GMAIL_USER_EMAIL environment variable is not set')
  }

  if (!process.env.GMAIL_FROM_EMAIL) {
    errors.push('GMAIL_FROM_EMAIL environment variable is not set')
  }

  // Note: Gmail API credentials should be stored securely
  // This is a placeholder for actual credential validation
  if (!process.env.GMAIL_API_KEY && !process.env.GMAIL_REFRESH_TOKEN) {
    errors.push('Gmail API credentials are not configured')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
