import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { sellerName, sellerEmail, sellerPhone, propertyTitle, propertyPrice, propertyLocation } = await request.json();

    // Create transporter (using Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Sends to yourself
      subject: `🏠 New Property Listing from ${sellerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #C6A75E; border-radius: 10px;">
          <h1 style="color: #0F3D3E; text-align: center;">New Property Listing Alert</h1>
          
          <div style="background-color: #F9F9F9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #C6A75E; border-bottom: 2px solid #C6A75E; padding-bottom: 10px;">Seller Information</h2>
            <p><strong>Name:</strong> ${sellerName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sellerEmail}">${sellerEmail}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${sellerPhone}">${sellerPhone}</a></p>
          </div>
          
          <div style="background-color: #F9F9F9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #C6A75E; border-bottom: 2px solid #C6A75E; padding-bottom: 10px;">Property Details</h2>
            <p><strong>Title:</strong> ${propertyTitle}</p>
            <p><strong>Price:</strong> ${propertyPrice} MAD</p>
            <p><strong>Location:</strong> ${propertyLocation}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666;">
            <p>Login to your dashboard to view all listings</p>
            <a href="http://localhost:4000/admin" style="display: inline-block; background-color: #0F3D3E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}