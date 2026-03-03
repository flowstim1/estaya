import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
// You'll need to add RESEND_API_KEY to your .env.local file
// const resend = new Resend(process.env.RESEND_API_KEY);

// For now, we'll use a mock implementation
// When you're ready to test, uncomment the Resend code above and add the API key

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, subject, message, propertyId } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save the contact inquiry to your database
    // 2. Send an email notification to the agent/admin
    // 3. Send an auto-reply to the user

    // Example: Save to database (when you have DB set up)
    // await prisma.contactInquiry.create({
    //   data: {
    //     name,
    //     email,
    //     phone,
    //     subject,
    //     message,
    //     propertyId,
    //     status: 'new'
    //   }
    // });

    // Example: Send email using Resend (when you have API key)
    /*
    await resend.emails.send({
      from: 'ESTAYA <contact@estaya.ma>',
      to: ['kamal@estaya.ma', 'info@estaya.ma'],
      subject: subject || `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        ${propertyId ? `<p><strong>Property ID:</strong> ${propertyId}</p>` : ''}
      `
    });
    */

    // For now, just log the submission
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      propertyId,
      timestamp: new Date().toISOString()
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for contacting us. We will get back to you soon.',
        data: {
          name,
          email,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    // Log the error for debugging
    console.error('Contact form error:', error);

    // Return error response
    return NextResponse.json(
      { 
        error: 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests if needed
export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint. Please use POST to submit forms.' },
    { status: 200 }
  );
}