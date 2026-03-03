import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';

export async function DELETE() {
  try {
    await connectToDatabase();
    const result = await Property.deleteMany({});
    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedCount} properties`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}