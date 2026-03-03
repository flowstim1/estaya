// lib/api.ts

const API_BASE = '/api';

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city?: string;
  type: string;
  purpose: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  featured?: boolean;
  rating?: number;
  reviews?: number;
  amenities?: string[];
  agent?: {
    name: string;
    email: string;
    phone: string;
  };
}

// Get all properties with optional filters
export async function getProperties(filters?: {
  purpose?: 'sale' | 'rent';
  type?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  try {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE}/properties?${params.toString()}`);
    const data = await response.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return { success: true, data, pagination: null };
    } else if (data.success) {
      return data;
    } else {
      return { success: false, error: data.error || 'Failed to fetch properties' };
    }
  } catch (error) {
    console.error('Error fetching properties:', error);
    return { success: false, error: 'Network error' };
  }
}

// Get single property by ID
export async function getPropertyById(id: string) {
  try {
    const response = await fetch(`${API_BASE}/properties/${id}`);
    const data = await response.json();
    
    if (data.success) {
      return { success: true, data: data.data };
    } else if (data._id) {
      return { success: true, data };
    } else {
      return { success: false, error: data.error || 'Property not found' };
    }
  } catch (error) {
    console.error('Error fetching property:', error);
    return { success: false, error: 'Network error' };
  }
}

// Create new property (for Sell page)
export async function createProperty(propertyData: Omit<Property, '_id'>) {
  try {
    const response = await fetch(`${API_BASE}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating property:', error);
    return { success: false, error: 'Network error' };
  }
}

// Update property
export async function updateProperty(id: string, propertyData: Partial<Property>) {
  try {
    const response = await fetch(`${API_BASE}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating property:', error);
    return { success: false, error: 'Network error' };
  }
}

// Delete property
export async function deleteProperty(id: string) {
  try {
    const response = await fetch(`${API_BASE}/properties/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting property:', error);
    return { success: false, error: 'Network error' };
  }
}

// Get user favorites
export async function getFavorites(token: string) {
  try {
    const response = await fetch(`${API_BASE}/user/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return { success: false, error: 'Network error' };
  }
}

// Toggle favorite
export async function toggleFavorite(propertyId: string, token: string, action?: 'add' | 'remove') {
  try {
    const response = await fetch(`${API_BASE}/user/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ propertyId, action }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return { success: false, error: 'Network error' };
  }
}