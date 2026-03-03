import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  type: 'apartment' | 'villa' | 'house' | 'land' | 'commercial' | 'restaurant' | 'cafe';
  purpose: 'buy' | 'rent';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  featured: boolean;
  rating?: number;
  reviews?: number;
  amenities?: string[];
  agent?: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    id: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['apartment', 'villa', 'house', 'land', 'commercial', 'restaurant', 'cafe'],
      required: true 
    },
    purpose: { 
      type: String, 
      enum: ['buy', 'rent'], // This expects 'buy' NOT 'sale'
      required: true 
    },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    area: { type: Number, required: true },
    images: { type: [String], required: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    amenities: { type: [String], default: [] },
    agent: {
      name: { type: String },
      email: { type: String },
      phone: { type: String }
    }
  },
  { timestamps: true }
);

// Check if the model already exists to prevent overwriting during hot reload
export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);