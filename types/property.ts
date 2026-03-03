// types/property.ts
export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  purpose: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  featured?: boolean;
  rating?: number;
  reviews?: number;
  amenities?: string[];
  agent: {
    name: string;
    email: string;
    phone: string;
  };
}