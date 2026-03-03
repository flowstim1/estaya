'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, 
  FiMaximize, 
  FiHome, 
  FiDroplet, 
  FiHeart, 
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
  FiSearch,
  FiStar
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import PriceDisplay from '@/components/PriceDisplay';
import { getProperties, Property } from '@/lib/api';
import ProtectedAction from '@/components/ProtectedAction';
import { isGuest, getGuestViewProperties, shouldShowUpgradeBanner, GUEST_LIMITS } from '@/lib/guestLimits';
import UpgradeBanner from '@/components/UpgradeBanner';

// Mock rental properties for fallback
const mockRentalProperties: Property[] = [
  {
    _id: 'r1',
    title: 'Luxury Apartment in Corniche',
    description: 'Stunning apartment with direct ocean view, fully furnished with high-end finishes. Includes pool access and 24/7 security.',
    price: 25000,
    location: 'Corniche, Casablanca',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    reviews: 18,
    featured: true,
    purpose: 'rent'
  },
  {
    _id: 'r2',
    title: 'Modern Villa with Pool',
    description: 'Beautiful villa in quiet neighborhood with private pool, garden, and terrace. Perfect for families.',
    price: 45000,
    location: 'Anfa, Casablanca',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    rating: 4.9,
    reviews: 24,
    featured: true,
    purpose: 'rent'
  },
  {
    _id: 'r3',
    title: 'Traditional Riad Experience',
    description: 'Authentic Moroccan riad in the heart of Medina, beautifully restored with modern comforts. Rooftop terrace with city views.',
    price: 18000,
    location: 'Medina, Marrakech',
    type: 'house',
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.8,
    reviews: 32,
    featured: false,
    purpose: 'rent'
  },
  {
    _id: 'r4',
    title: 'Beachfront Apartment',
    description: 'Direct access to the beach, spectacular views, and modern amenities. Includes parking and pool.',
    price: 35000,
    location: 'Saidia Beach, Saidia',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.6,
    reviews: 15,
    featured: true,
    purpose: 'rent'
  },
  {
    _id: 'r5',
    title: 'Commercial Space in Downtown',
    description: 'Prime commercial location perfect for restaurant or retail. High foot traffic area.',
    price: 40000,
    location: 'Downtown, Casablanca',
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 180,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    rating: 4.5,
    reviews: 8,
    featured: false,
    purpose: 'rent'
  },
  {
    _id: 'r6',
    title: 'Luxury Penthouse',
    description: 'Top floor penthouse with panoramic city views, private terrace, and premium finishes.',
    price: 55000,
    location: 'Marina, Casablanca',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
    rating: 5.0,
    reviews: 12,
    featured: true,
    purpose: 'rent'
  },
  {
    _id: 'r7',
    title: 'Mountain View House',
    description: 'Peaceful house with stunning mountain views, large garden, and fireplace.',
    price: 22000,
    location: 'Ourika, Marrakech',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    reviews: 14,
    featured: false,
    purpose: 'rent'
  },
  {
    _id: 'r8',
    title: 'Café/Restaurant Space',
    description: 'Fully equipped café/restaurant space in busy area. Ready to operate with existing license.',
    price: 30000,
    location: 'Gauthier, Casablanca',
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2047&q=80',
    rating: 4.4,
    reviews: 6,
    featured: true,
    purpose: 'rent'
  }
];

// Custom hook for favorites
function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error parsing favorites');
      }
    }
    setLoading(false);
  }, []);

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorited = (propertyId: string) => favorites.includes(propertyId);

  return { favorites, loading, toggleFavorite, isFavorited };
}

export default function RentPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState('any');
  
  const { toggleFavorite, isFavorited } = useFavorites();

  // Fetch properties from API with mock fallback
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const result = await getProperties({ purpose: 'rent' });
      
      if (result.success && result.data && result.data.length > 0) {
        setProperties(result.data);
      } else {
        console.log('Using mock rental data as fallback');
        setProperties(mockRentalProperties);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setProperties(mockRentalProperties);
    } finally {
      setLoading(false);
    }
  };

  // Get unique cities
  const cities = properties.length > 0
    ? Array.from(new Set(properties.map(p => p.location?.split(',')[0]?.trim() || 'Morocco')))
    : [];

  // Filter and sort properties
  const filteredProperties = properties
    .filter(property => {
      if (!property) return false;
      
      if (searchTerm && !property.title?.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !property.location?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      if (selectedTypes.length > 0 && !selectedTypes.includes(property.type)) return false;
      
      if (selectedCities.length > 0 && property.location) {
        const propertyCity = property.location.split(',')[0]?.trim() || '';
        if (!selectedCities.includes(propertyCity)) return false;
      }
      
      if (property.price < priceRange[0] || property.price > priceRange[1]) return false;
      
      if (bedrooms !== 'any') {
        const minBeds = parseInt(bedrooms);
        if ((property.bedrooms || 0) < minBeds) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-asc': return (a.price || 0) - (b.price || 0);
        case 'price-desc': return (b.price || 0) - (a.price || 0);
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  // Guest limits
  const displayProperties = getGuestViewProperties(filteredProperties);
  const showUpgradeBanner = shouldShowUpgradeBanner() && filteredProperties.length > GUEST_LIMITS.MAX_PROPERTIES_VIEW;

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleCityChange = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setPriceRange([0, 100000]);
    setSelectedCities([]);
    setBedrooms('any');
    setSearchTerm('');
  };

  const activeFiltersCount = selectedTypes.length + selectedCities.length + (bedrooms !== 'any' ? 1 : 0) + (searchTerm ? 1 : 0);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center justify-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full mb-4"
              />
              <p className="text-dark-charcoal/60">Loading luxury rentals...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24 relative overflow-hidden">
        {/* Luxury K Pattern Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-10 text-[300px] font-playfair text-emerald-green rotate-12">K</div>
            <div className="absolute bottom-20 right-10 text-[350px] font-playfair text-gold -rotate-12">K</div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="font-playfair text-5xl md:text-7xl text-dark-charcoal mb-4">
              Luxury <span className="text-gold">Rentals</span>
            </h1>
            <p className="text-dark-charcoal/60 text-xl max-w-3xl mx-auto">
              {isGuest() 
                ? `Discover ${displayProperties.length} of ${filteredProperties.length} luxury rentals`
                : `Discover ${filteredProperties.length} exclusive rental properties in Morocco`
              }
            </p>
          </motion.div>

          {/* Guest Info Banner */}
          {isGuest() && filteredProperties.length > GUEST_LIMITS.MAX_PROPERTIES_VIEW && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                  <FiStar className="text-gold" />
                </div>
                <p className="text-dark-charcoal/70 text-sm">
                  <span className="font-bold text-gold">Guest mode:</span> Showing {displayProperties.length} of {filteredProperties.length} rentals
                </p>
              </div>
              <Link
                href="/login"
                className="text-sm bg-gold text-dark-charcoal px-4 py-2 rounded-lg hover:bg-emerald-green hover:text-white transition-all"
              >
                Sign in to see all
              </Link>
            </motion.div>
          )}

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 mb-8 border border-gold/20"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gold text-xl" />
                <input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 border-2 border-gold/10 rounded-2xl focus:border-gold focus:outline-none transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative px-6 py-4 bg-white border-2 border-gold/10 rounded-2xl hover:border-gold hover:bg-gold/5 transition-all flex items-center gap-2"
                >
                  <FiFilter className="text-gold text-xl" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-white text-xs rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-6 py-4 bg-white border-2 border-gold/10 rounded-2xl focus:border-gold focus:outline-none pr-12"
                >
                  <option value="newest">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                <div className="flex border-2 border-gold/10 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-4 transition-all ${
                      viewMode === 'grid' ? 'bg-gold text-white' : 'text-dark-charcoal/60 hover:text-gold'
                    }`}
                  >
                    <FiGrid className="text-xl" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-4 transition-all ${
                      viewMode === 'list' ? 'bg-gold text-white' : 'text-dark-charcoal/60 hover:text-gold'
                    }`}
                  >
                    <FiList className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 mt-6 border-t border-gold/10">
                    <div>
                      <h3 className="font-playfair text-lg text-dark-charcoal mb-4">Property Type</h3>
                      <div className="space-y-3">
                        {['apartment', 'villa', 'house', 'commercial'].map((type) => (
                          <label key={type} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type)}
                              onChange={() => handleTypeChange(type)}
                              className="w-5 h-5 rounded border-2 border-gold/30 text-gold focus:ring-gold"
                            />
                            <span className="text-dark-charcoal/70 capitalize">{type}s</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-playfair text-lg text-dark-charcoal mb-4">Price Range (MAD/month)</h3>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="5000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full accent-gold"
                        />
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-1/2 p-3 border-2 border-gold/10 rounded-xl"
                            placeholder="Min"
                          />
                          <span className="text-gold">-</span>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                            className="w-1/2 p-3 border-2 border-gold/10 rounded-xl"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-playfair text-lg text-dark-charcoal mb-4">City</h3>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {cities.map((city) => (
                          <label key={city} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCities.includes(city)}
                              onChange={() => handleCityChange(city)}
                              className="w-5 h-5 rounded border-2 border-gold/30 text-gold focus:ring-gold"
                            />
                            <span className="text-dark-charcoal/70">{city}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-playfair text-lg text-dark-charcoal mb-4">Bedrooms</h3>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full p-3 border-2 border-gold/10 rounded-xl"
                      >
                        <option value="any">Any</option>
                        <option value="1">1+ Bedroom</option>
                        <option value="2">2+ Bedrooms</option>
                        <option value="3">3+ Bedrooms</option>
                        <option value="4">4+ Bedrooms</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gold/10">
                    <button onClick={clearFilters} className="px-6 py-3 border-2 border-gold/20 rounded-xl hover:border-gold transition-all">
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-green to-gold text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-dark-charcoal/60">
              <span className="font-bold text-gold text-xl">{displayProperties.length}</span> luxury rentals shown
              {isGuest() && filteredProperties.length > GUEST_LIMITS.MAX_PROPERTIES_VIEW && (
                <span className="text-sm text-dark-charcoal/40 ml-2">
                  ({filteredProperties.length - GUEST_LIMITS.MAX_PROPERTIES_VIEW} more with login)
                </span>
              )}
            </p>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="text-gold hover:text-emerald-green transition-colors flex items-center gap-1">
                <FiX /> Clear filters
              </button>
            )}
          </div>

          {/* Properties Grid */}
          {displayProperties.length > 0 ? (
            <motion.div
              layout
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                : "space-y-6"
              }
            >
              {displayProperties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  {viewMode === 'grid' ? (
                    // Grid View Card
                    <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold/10">
                      {property.featured && (
                        <div className="absolute top-4 left-4 z-20">
                          <span className="bg-gradient-to-r from-gold to-emerald-green text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                            Featured
                          </span>
                        </div>
                      )}
                      
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={property.images?.[0] || property.image}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Favorite Button with Guest Protection */}
                        <ProtectedAction action="save">
                          <button
                            onClick={() => toggleFavorite(property._id)}
                            className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300"
                          >
                            <FiHeart className={`text-lg ${isFavorited(property._id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                        </ProtectedAction>

                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="bg-emerald-green/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium capitalize">
                            {property.type}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-playfair text-xl text-dark-charcoal group-hover:text-gold transition-colors line-clamp-1">
                            {property.title}
                          </h3>
                          <div className="text-right ml-4">
                            <p className="text-gold font-bold text-2xl">
                              <PriceDisplay price={property.price || 0} period="/month" />
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-dark-charcoal/60 mb-4">
                          <FiMapPin className="text-gold" />
                          <span className="text-sm">{property.location}</span>
                        </div>

                        {property.rating && (
                          <div className="flex items-center gap-2 mb-4">
                            <FiStar className="text-gold fill-gold" />
                            <span className="text-sm font-bold">{property.rating}</span>
                            <span className="text-dark-charcoal/40">•</span>
                            <span className="text-sm text-dark-charcoal/60">{property.reviews} reviews</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-dark-charcoal/70 mb-4">
                          <div className="flex items-center gap-2">
                            <FiHome className="text-gold" />
                            <span className="text-sm">{property.bedrooms || 0} beds</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiDroplet className="text-gold" />
                            <span className="text-sm">{property.bathrooms || 0} baths</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiMaximize className="text-gold" />
                            <span className="text-sm">{property.area || 0} m²</span>
                          </div>
                        </div>

                        <Link
                          href={`/property/${property._id}`}
                          className="block w-full text-center bg-gradient-to-r from-emerald-green to-gold text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ) : (
                    // List View Card
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gold/10">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-72 h-56 md:h-auto overflow-hidden">
                          <Image
                            src={property.images?.[0] || property.image}
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform"
                          />
                          {property.featured && (
                            <div className="absolute top-4 left-4 z-10">
                              <span className="bg-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            </div>
                          )}
                          
                          {/* Favorite Button with Guest Protection */}
                          <ProtectedAction action="save">
                            <button
                              onClick={() => toggleFavorite(property._id)}
                              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all"
                            >
                              <FiHeart className={`text-lg ${isFavorited(property._id) ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                          </ProtectedAction>
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="font-playfair text-xl text-dark-charcoal mb-2">{property.title}</h3>
                          <p className="text-gold font-bold text-2xl mb-1">
                            <PriceDisplay price={property.price || 0} period="/month" />
                          </p>
                          <p className="text-dark-charcoal/60 line-clamp-2 mb-4">{property.description}</p>
                          <Link
                            href={`/property/${property._id}`}
                            className="inline-block px-6 py-2 bg-emerald-green text-white rounded-lg hover:bg-gold transition-all"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-white/90 rounded-3xl p-16 text-center border border-gold/20">
              <h3 className="font-playfair text-2xl text-dark-charcoal mb-2">No Rentals Found</h3>
              <p className="text-dark-charcoal/60 mb-6">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-emerald-green to-gold text-white px-8 py-3 rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Upgrade Banner */}
          {showUpgradeBanner && (
            <UpgradeBanner type="property" />
          )}
        </div>
      </div>
    </>
  );
}