import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { ids } = body;
    
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { success: false, error: 'Invalid IDs' },
        { status: 400 }
      );
    }

    const properties = await Property.find({
      _id: { $in: ids }
    });

    return NextResponse.json({
      success: true,
      data: properties
    });

  } catch (error) {
    console.error('Error fetching properties by IDs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}