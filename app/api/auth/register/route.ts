import { NextResponse } from 'next/server'; 
import connectToDatabase from '@/lib/mongodb'; 
import bcrypt from 'bcryptjs'; 
import User from '@/lib/models/User'; 
import { generateToken } from '@/lib/auth/jwt'; 
 
export async function POST(request: Request) { 
  try { 
    await connectToDatabase(); 
 
    const body = await request.json(); 
    const { name, email, password } = body; 
 
    // Validate input 
      return NextResponse.json( 
        { success: false, error: 'Name, email and password are required' }, 
        { status: 400 } 
      ); 
    } 
 
      return NextResponse.json( 
        { success: false, error: 'Password must be at least 6 characters' }, 
        { status: 400 } 
      ); 
    } 
 
    // Check if user already exists 
    const existingUser = await User.findOne({ email }); 
    if (existingUser) { 
      return NextResponse.json( 
        { success: false, error: 'Email already registered' }, 
        { status: 400 } 
      ); 
    } 
 
    // Hash the password before saving 
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
 
    // Create new user with hashed password 
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: 'user', 
      savedProperties: [], 
    }); 
 
    // Generate token 
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
 
    return NextResponse.json({ 
      success: true, 
      message: 'User registered successfully', 
      data: userResponse, 
      token, 
    }, { status: 201 }); 
 
  } catch (error) { 
    console.error('Registration error:', error); 
    return NextResponse.json( 
      { success: false, error: 'Registration failed' }, 
      { status: 500 } 
    ); 
  } 
} 
