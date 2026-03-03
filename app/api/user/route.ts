import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Connect to database
    const conn = await connectToDatabase();
    console.log('Connected to MongoDB');
    
    // Get the database instance
    const db = mongoose.connection.db;
    
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);
    
    // Get the users collection
    const usersCollection = db.collection('users');
    
    // Clear existing users
    await usersCollection.deleteMany({});
    
    // Insert test users
    const result = await usersCollection.insertMany([
      {
        name: 'Test User',
        email: 'test@estaya.ma',
        password: hashedPassword,
        role: 'user',
        savedProperties: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kamal',
        email: 'kamal@estaya.ma',
        password: hashedPassword,
        role: 'agent',
        savedProperties: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
    
    // Verify the users were created
    const users = await usersCollection.find({}).toArray();
    
    return NextResponse.json({
      success: true,
      message: 'Users created successfully!',
      insertedCount: result.insertedCount,
      users: users.map(u => ({
        name: u.name,
        email: u.email,
        role: u.role,
        hasPassword: !!u.password
      }))
    });
    
  } catch (error) {
    console.error('Error creating users:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: String(error),
        stack: error instanceof Error ? error.stack : null
      },
      { status: 500 }
    );
  }
}