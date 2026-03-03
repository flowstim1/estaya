// app/api/auth/me/route.ts

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyToken, getTokenFromHeader } from '@/lib/auth/jwt';

export async function GET(request: Request) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization');
    const token = getTokenFromHeader(authHeader || undefined);

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find user
    const user = await User.findById(payload.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      savedProperties: user.savedProperties,
    };

    return NextResponse.json({
      success: true,
      data: userResponse,
    });

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}