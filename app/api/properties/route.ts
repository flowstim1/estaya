import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';

// GET /api/properties - Get all properties with filters
export async function GET(request: Request) {
  try {
    // Connect to MongoDB Atlas
    await connectToDatabase();

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    
    // Build filter object
    const filter: any = {};
    
    // Filter by purpose (sale/rent)
    const purpose = searchParams.get('purpose');
    if (purpose) {
      filter.purpose = purpose;
    }
    
    // Filter by property type
    const type = searchParams.get('type');
    if (type) {
      filter.type = type;
    }
    
    // Filter by city
    const city = searchParams.get('city');
    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }
    
    // Filter by price range
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    
    // Filter by bedrooms
    const minBeds = searchParams.get('minBeds');
    if (minBeds) {
      filter.bedrooms = { $gte: parseInt(minBeds) };
    }
    
    // Search by text (searches in title, description, location, city)
    const search = searchParams.get('search');
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    // Sorting
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const sort: any = {};
    sort[sortBy] = sortOrder;

    console.log('Fetching properties from Atlas with filter:', JSON.stringify(filter));

    // Execute query
    const properties = await Property.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Property.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
    
  } catch (error) {
    console.error('Error fetching properties from Atlas:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch properties' 
      },
      { status: 500 }
    );
  }
}

// POST /api/properties - Create a new property
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectToDatabase();

    // Parse request body
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'price', 'location', 'city', 'type', 'purpose', 'area'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { 
            success: false, 
            error: `${field} is required` 
          },
          { status: 400 }
        );
      }
    }

    // Set default agent if not provided
    if (!body.agent) {
      body.agent = {
        name: 'Kamal',
        email: 'kamal@estaya.ma',
        phone: '+212 6600 99519',
      };
    }

    // Create property
    const property = await Property.create(body);

    return NextResponse.json({
      success: true,
      message: 'Property created successfully',
      data: property,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create property' 
      },
      { status: 500 }
    );
  }
}