import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  to: string;
  subject: string;
  auditSummary: string;
  totalSavings: number;
  publicUrl: string;
}

export const sendAuditEmail = async ({
  to,
  subject,
  auditSummary,
  totalSavings,
  publicUrl,
}: EmailParams) => {
  try {
    const primaryGreen = '#48BB78';
    const darkGreen = '#062D24';
    const adminEmail = 'vikasingh0897@gmail.com';

    const sender = 'Vikas from AuditAI <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [adminEmail],
      subject: `ACTION_REQUIRED: AI Audit - ${subject}`,
      headers: {
        'X-Entity-Ref-ID': Date.now().toString(),
        Priority: 'Urgent',
        'X-Auto-Response-Suppress': 'OOF, AutoReply',
      },
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
          .header { background-color: ${darkGreen}; padding: 30px; text-align: center; }
          .content { padding: 40px; background-color: #ffffff; }
          .savings-card {
            background-color: #f0fff4;
            border: 2px solid ${primaryGreen};
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            margin: 20px 0;
          }
          .savings-amount { font-size: 32px; font-weight: bold; color: ${darkGreen}; margin: 10px 0; }
          .summary-text { font-style: italic; color: #4a5568; margin-top: 15px; margin-bottom: 20px; display: block; }
          .btn {
            background-color: ${primaryGreen};
            color: white !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            display: inline-block;
            margin-top: 10px;
          }
          .footer { background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; }
          .social-links a { margin: 0 10px; color: ${primaryGreen}; text-decoration: none; font-weight: 600; font-size: 14px; }
          .dev-badge { font-size: 12px; color: #94a3b8; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div style="display: none; font-size: 1px; color: #ffffff;">Recipient: ${to}</div>
          <div class="header">
            <h1 style="color: ${primaryGreen}; margin: 0; font-size: 28px;">Audit AI</h1>
          </div>

          <div class="content">
            <h2 style="color: ${darkGreen}; margin-top: 0;">Your AI Spend Audit is Ready!</h2>
            <p>We analyzed your current SaaS stack. Based on our audit math and AI analysis, here is your optimization report:</p>

            <div class="savings-card">
              <span style="color: ${primaryGreen}; text-transform: uppercase; font-weight: bold; font-size: 14px;">Total Annual Savings</span>
              <div class="savings-amount">$${(totalSavings * 12).toLocaleString()}</div>
              <span class="summary-text">"${auditSummary}"</span>

              <a href="${publicUrl}" class="btn">View Full Report</a>
            </div>

            <p>If these savings exceed <strong>$500/year</strong>, you qualify for a Credex Consultation to claim your cloud credits.</p>
          </div>

          <div class="footer">
            <div class="social-links">
              <a href="https://github.com/vikasingh0897">GitHub</a>
              <a href="https://linkedin.com/in/vikasingh0897">LinkedIn</a>
            </div>
            <div class="dev-badge">
              Built by <strong>Vikas Singh</strong> • vikasingh0897
            </div>
          </div>
        </div>
      </body>
      </html>
`,
    });

    if (error) {
      console.error('Email Service Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected Email Error:', err);
    throw new Error('Failed to send audit email', { cause: err });
  }
};
