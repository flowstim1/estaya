import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/auth/jwt';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  console.log('🔵 LOGIN API CALLED');
  
  try {
    const body = await request.json();
    console.log('📦 Request body:', body);
    
    const { email, password } = body;
    console.log('📧 Email:', email);
    console.log('🔑 Password provided:', password ? 'Yes' : 'No');

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('🔄 Connecting to database...');
    await connectToDatabase();
    console.log('✅ Connected to database');

    // Find user with password field
    console.log('🔍 Searching for user with email:', email);
    const user = await User.findOne({ email }).select('+password');
    console.log('👤 User found in DB:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('❌ No user found with this email');
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('📋 User details:');
    console.log('   - ID:', user._id);
    console.log('   - Email:', user.email);
    console.log('   - Name:', user.name);
    console.log('   - Has password field:', !!user.password);
    console.log('   - Password length:', user.password?.length || 0);

    // Check password
    console.log('🔐 Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    console.log('✅ Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Password invalid');
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    console.log('🎫 Generating token...');
    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      savedProperties: user.savedProperties,
    };

    console.log('✅ Login successful for:', email);
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: userResponse,
      token,
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}