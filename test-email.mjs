// test-email.mjs
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') });

async function testEmail() {
  console.log('📧 Testing email configuration...');
  console.log('GMAIL_USER:', process.env.GMAIL_USER);
  console.log('GMAIL_APP_PASSWORD length:', process.env.GMAIL_APP_PASSWORD?.length);
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    console.log('✅ Transporter created, verifying connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified!');
    
    // Send test email
    const info = await transporter.sendMail({
      from: `"ESTAYA Test" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: 'ESTAYA Email Test',
      text: 'If you receive this, email is working!',
      html: '<h1>ESTAYA Email Test</h1><p>If you receive this, email is working!</p>',
    });
    
    console.log('✅ Email sent! Message ID:', info.messageId);
    console.log('📨 Check your inbox at:', process.env.GMAIL_USER);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testEmail();