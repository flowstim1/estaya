import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'ok',
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'not set',
      api_key: process.env.CLOUDINARY_API_KEY ? 'set (hidden)' : 'not set',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'set (hidden)' : 'not set',
      node_env: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}