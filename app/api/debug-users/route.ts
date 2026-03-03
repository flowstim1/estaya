import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Find all users (without passwords for safety)
    const users = await User.find({}).select('-password');
    
    return NextResponse.json({
      success: true,
      count: users.length,
      users: users.map(u => ({
        id: u._id,
        email: u.email,
        name: u.name,
        role: u.role
      }))
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}