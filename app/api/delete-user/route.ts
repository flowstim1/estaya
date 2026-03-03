import { NextResponse } from 'next/server'; 
import connectToDatabase from '@/lib/mongodb'; 
import User from '@/lib/models/User'; 
 
export async function POST(request: Request) { 
  try { 
    const body = await request.json(); 
    const { email } = body; 
 
    if (!email) { 
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 }); 
    } 
 
    await connectToDatabase(); 
 
    const result = await User.deleteOne({ email }); 
 
    if (result.deletedCount === 0) { 
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 404 }); 
    } 
 
    return NextResponse.json({ 
      success: true, 
      message: 'User deleted successfully' 
    }); 
 
  } catch (error) { 
    console.error('Delete error:', error); 
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete user' 
    }, { status: 500 }); 
  } 
} 
