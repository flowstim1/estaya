export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  city: string
  type: 'apartment' | 'villa' | 'house' | 'land' | 'commercial' | 'restaurant' | 'cafe'
  purpose: 'buy' | 'rent'
  bedrooms?: number
  bathrooms?: number
  area: number
  images: string[]
  featured: boolean
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa with Pool in Palmeraie',
    description: 'Stunning villa nestled in the heart of Palmeraie, featuring traditional Moroccan architecture with modern amenities. The property includes a large swimming pool, lush gardens, and panoramic views of the Atlas Mountains.',
    price: 12500000,
    location: 'Palmeraie, Marrakech',
    city: 'Marrakech',
    type: 'villa',
    purpose: 'buy',
    bedrooms: 5,
    bathrooms: 6,
    area: 650,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80'
    ],
    featured: true,
  },
  {
    id: '2',
    title: 'Modern Apartment with Ocean View',
    description: 'Luxurious apartment in the heart of Casablanca with breathtaking ocean views and high-end finishes. Features include floor-to-ceiling windows, smart home technology, and premium appliances.',
    price: 3500000,
    location: 'Corniche, Casablanca',
    city: 'Casablanca',
    type: 'apartment',
    purpose: 'buy',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    images: [
'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: true,
  },
  {
    id: '3',
    title: 'Traditional Riad in Medina',
    description: 'Beautifully restored riad featuring authentic Moroccan architecture with a peaceful interior courtyard, fountain, and rooftop terrace with city views.',
    price: 8500000,
    location: 'Medina, Marrakech',
    city: 'Marrakech',
    type: 'house',
    purpose: 'buy',
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    images: [
'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: true,
  },
  {
    id: '4',
    title: 'Commercial Space in Business District',
    description: 'Prime commercial space in Casablanca\'s financial district, perfect for a restaurant or cafe. High foot traffic area with modern infrastructure.',
    price: 25000,
    location: 'Sidi Maarouf, Casablanca',
    city: 'Casablanca',
    type: 'commercial',
    purpose: 'rent',
    area: 250,
    images: [
'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: true,
  },
  {
    id: '5',
    title: 'Luxury Penthouse in Marina',
    description: 'Exclusive penthouse with panoramic views of the Mediterranean Sea and modern luxury finishes. Private terrace, jacuzzi, and direct elevator access.',
    price: 18000000,
    location: 'Marina, Tangier',
    city: 'Tangier',
    type: 'apartment',
    purpose: 'buy',
    bedrooms: 4,
    bathrooms: 4,
    area: 300,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: true,
  },
  {
    id: '6',
    title: 'Agricultural Land in Meknes',
    description: 'Prime agricultural land with olive groves, perfect for investment or development. Water access and road frontage included.',
    price: 4500000,
    location: 'Meknes',
    city: 'Meknes',
    type: 'land',
    purpose: 'buy',
    area: 5000,
    images: [
'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: false,
  },
  {
    id: '7',
    title: 'Beachfront Restaurant',
    description: 'Established restaurant on Saidia Beach with direct sea views, full kitchen equipment, and outdoor terrace. Turnkey opportunity.',
    price: 1200000,
    location: 'Saidia Beach',
    city: 'Saidia',
    type: 'restaurant',
    purpose: 'rent',
    area: 450,
    images: [
'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: true,
  },
  {
    id: '8',
    title: 'Modern Café in Corniche',
    description: 'Contemporary café space in prime Casablanca location. Fully equipped, sea views, and established clientele.',
    price: 450000,
    location: 'Corniche, Casablanca',
    city: 'Casablanca',
    type: 'cafe',
    purpose: 'rent',
    area: 180,
    images: [
'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: true,
  }
]