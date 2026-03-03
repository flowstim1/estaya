// lib/data/migrate.ts
// Run this script once to import your dummy data into MongoDB

import connectToDatabase from '../mongodb';
import Property from '../../models/Property';
import { properties as dummyProperties } from '../../data/properties';

async function migrateData() {
  try {
    // Connect to database
    await connectToDatabase();
    console.log('Connected to database');

    // Clear existing properties
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Transform dummy data to match our schema
    const propertiesToInsert = dummyProperties.map((prop: any) => ({
      title: prop.title,
      description: prop.description || 'Beautiful luxury property in a prime location.',
      price: prop.price,
      location: prop.location,
      city: prop.location.split(',')[0] || 'Casablanca',
      type: prop.type,
      purpose: prop.purpose || 'sale',
      bedrooms: prop.bedrooms || 3,
      bathrooms: prop.bathrooms || 2,
      area: prop.area || 150,
      image: prop.image,
      images: prop.images || [prop.image],
      featured: prop.featured || false,
      rating: prop.rating || 4.5,
      reviews: prop.reviews || 10,
      amenities: prop.amenities || ['Pool', 'Garden', 'Parking'],
      agent: {
        name: 'Kamal',
        email: 'kamal@estaya.ma',
        phone: '+212 6600 99519',
      },
    }));

    // Insert properties
    const result = await Property.insertMany(propertiesToInsert);
    console.log(`Successfully migrated ${result.length} properties`);

    // Log first property as example
    console.log('Sample property:', {
      id: result[0]._id,
      title: result[0].title,
      type: result[0].type,
    });

    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();