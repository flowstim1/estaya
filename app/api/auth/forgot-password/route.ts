import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    console.log('🔵 FORGOT PASSWORD API CALLED');
    
    const { email } = await request.json();
    console.log('📧 Email received:', email);

    if (!email) {
      console.log('❌ No email provided');
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('🔄 Connecting to database...');
    await connectToDatabase();
    console.log('✅ Database connected');

    // Find user
    console.log('🔍 Searching for user with email:', email);
    const user = await User.findOne({ email });
    console.log('👤 User found:', user ? 'YES' : 'NO');

    // For security, don't reveal if user exists or not
    if (!user) {
      console.log('❌ User not found - returning success for security');
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive reset instructions'
      });
    }

    console.log('✅ User found, generating reset token...');
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    console.log('🔑 Reset token generated');

    // Save token to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    console.log('💾 Token saved to user');

    // Create reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    console.log('🔗 Reset link created:', resetLink);

    // Configure email transporter
    console.log('📧 Configuring email transporter...');
    console.log('GMAIL_USER:', process.env.GMAIL_USER);
    console.log('GMAIL_APP_PASSWORD length:', process.env.GMAIL_APP_PASSWORD?.length);
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    console.log('✅ Transporter created');

    // Email content
    const mailOptions = {
      from: `"ESTAYA Luxury Real Estate" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Reset Your ESTAYA Password',
      html: `
        <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #C6A75E; font-size: 42px; margin: 0;">ESTAYA</h1>
            <p style="color: #1E1E1E; opacity: 0.6; font-size: 14px;">Luxury Real Estate in Morocco</p>
          </div>
          
          <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid rgba(198,167,94,0.2);">
            <h2 style="color: #1E1E1E; font-size: 24px; margin-bottom: 20px;">Reset Your Password</h2>
            <p style="color: #1E1E1E; opacity: 0.7; line-height: 1.6; margin-bottom: 30px;">
              We received a request to reset your password for your ESTAYA account. 
              Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetLink}" 
                 style="background: linear-gradient(135deg, #0F3D3E 0%, #C6A75E 100%); 
                        color: white; 
                        padding: 15px 40px; 
                        border-radius: 30px; 
                        text-decoration: none; 
                        font-weight: 600;
                        display: inline-block;
                        box-shadow: 0 5px 15px rgba(198,167,94,0.3);">
                Reset Password
              </a>
            </div>
            
            <p style="color: #1E1E1E; opacity: 0.7; line-height: 1.6; margin-bottom: 20px;">
              Or copy this link to your browser:
            </p>
            <p style="background: #F5F5F5; padding: 15px; border-radius: 10px; word-break: break-all; font-size: 14px;">
              ${resetLink}
            </p>
            
            <p style="color: #1E1E1E; opacity: 0.6; font-size: 14px; margin-top: 30px;">
              This link will expire in 1 hour. If you didn't request this, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #1E1E1E; opacity: 0.4; font-size: 12px;">
            <p>ESTAYA — Homes That Move You.</p>
            <p>&copy; 2026 ESTAYA. All rights reserved.</p>
          </div>
        </div>
      `,
    };
    console.log('📧 Mail options prepared');

    // Send email
    console.log('📤 Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully! Message ID:', info.messageId);
    console.log('📨 Check inbox at:', email);

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive reset instructions'
    });

  } catch (error: any) {
    console.error('❌ Forgot password error:', error);
    console.error('❌ Error stack:', error.stack);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}