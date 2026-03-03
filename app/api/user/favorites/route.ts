import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyToken, getTokenFromHeader } from '@/lib/auth/jwt';

// GET /api/user/favorites - Get user's favorite properties
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

    // Find user with populated favorites
    const user = await User.findById(payload.id).populate('savedProperties');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user.savedProperties
    });

  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

// POST /api/user/favorites - Add/remove favorite
export async function POST(request: Request) {
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

    // Parse request body
    const body = await request.json();
    const { propertyId, action } = body; // action: 'add' or 'remove'

    if (!propertyId) {
      return NextResponse.json(
        { success: false, error: 'Property ID is required' },
        { status: 400 }
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

    // Update favorites
    if (action === 'add') {
      // Check if already favorited
      if (!user.savedProperties.includes(propertyId)) {
        user.savedProperties.push(propertyId);
      }
    } else if (action === 'remove') {
      user.savedProperties = user.savedProperties.filter(
        (id: any) => id.toString() !== propertyId
      );
    } else {
      // Toggle favorite
      const index = user.savedProperties.findIndex(
        (id: any) => id.toString() === propertyId
      );
      
      if (index === -1) {
        user.savedProperties.push(propertyId);
      } else {
        user.savedProperties.splice(index, 1);
      }
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Favorites updated successfully',
      data: user.savedProperties
    });

  } catch (error) {
    console.error('Error updating favorites:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update favorites' },
      { status: 500 }
    );
  }
}