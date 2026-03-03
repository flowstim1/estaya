import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to } = await request.json();
    
    // Configure transporter with your Gmail settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Simple test email
    const mailOptions = {
      from: `"ESTAYA Test" <${process.env.GMAIL_USER}>`,
      to: to || process.env.GMAIL_USER, // Send to yourself if no recipient specified
      subject: 'ESTAYA Email Test',
      text: 'This is a test email from ESTAYA. If you receive this, email is working!',
      html: '<h1>ESTAYA Email Test</h1><p>This is a test email. If you receive this, email is working!</p>',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}