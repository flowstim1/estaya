import { NextResponse } from 'next/server'; 
import connectToDatabase from '@/lib/mongodb'; 
import User from '@/lib/models/User'; 
 
export async function POST(request: Request) { 
  try { 
    const { email } = await request.json(); 
 
    if (!email) { 
      return NextResponse.json({ error: 'Email required' }, { status: 400 }); 
    } 
 
    await connectToDatabase(); 
 
    const result = await User.deleteOne({ email }); 
 
    return NextResponse.json({ 
      success: true, 
      deleted: result.deletedCount 
      message: result.deletedCount  ? 'User deleted' : 'User not found' 
    }); 
  } catch (error) { 
    return NextResponse.json({ error: String(error) }, { status: 500 }); 
  } 
} 
