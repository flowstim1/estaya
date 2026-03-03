import mongoose from 'mongoose';
import { properties } from '../data/properties';
// Hardcode the connection string for testing (REMOVE AFTER TESTING)
const MONGODB_URI = "mongodb+srv://estaya-kamal:3yluJUWHJRkMwmSP@kamal.cakfh4j.mongodb.net/estaya?retryWrites=true&w=majority&appName=kamal";
async function migrateData() {
  try {
    console.log('🚀 Starting migration to MongoDB Atlas...');
    console.log('Connecting with URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@'));
    
    // Connect directly without dotenv
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Define schema directly in migration file (temporary)
    const propertySchema = new mongoose.Schema({
      id: String,
      title: String,
      description: String,
      price: Number,
      location: String,
      city: String,
      type: String,
      purpose: String,
      bedrooms: Number,
      bathrooms: Number,
      area: Number,
      images: [String],
      featured: Boolean,
      rating: Number,
      reviews: Number,
      amenities: [String],
      agent: {
        name: String,
        email: String,
        phone: String
      }
    }, { timestamps: true });

    const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

    // Clear existing properties
    await Property.deleteMany({});
    console.log('✅ Cleared existing properties');

    // Transform and insert properties
    const propertiesToInsert = properties.map((prop: any) => ({
      id: prop.id,
      title: prop.title,
      description: prop.description || 'Beautiful luxury property in a prime location.',
      price: prop.price,
      location: prop.location,
      city: prop.location.split(',')[0]?.trim() || 'Casablanca',
      type: prop.type,
      purpose: prop.purpose || 'buy',
      bedrooms: prop.bedrooms || 3,
      bathrooms: prop.bathrooms || 2,
      area: prop.area || 150,
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

    const result = await Property.insertMany(propertiesToInsert);
    console.log(`✅ Successfully migrated ${result.length} properties to Atlas`);

    console.log('\n📊 Sample property in Atlas:');
    console.log({
      id: result[0]._id,
      title: result[0].title,
      type: result[0].type,
      price: result[0].price,
    });

    console.log('\n🎉 Migration complete!');
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Migration error:', error);
  }
  process.exit(0);
}

migrateData();