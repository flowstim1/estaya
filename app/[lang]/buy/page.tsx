'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  FiX,
  FiSearch,
  FiStar
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import PriceDisplay from '@/components/PriceDisplay';
import ProtectedAction from '@/components/ProtectedAction';
import { isGuest, getGuestViewProperties, shouldShowUpgradeBanner, GUEST_LIMITS } from '@/lib/guestLimits';
import UpgradeBanner from '@/components/UpgradeBanner';

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  featured?: boolean;
  purpose: string;
}

export default function BuyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState('any');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const pathname = usePathname();

  // Fetch properties from API
  useEffect(() => {
    fetchProperties();

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [pathname]);
  
  const fetchProperties = async () => {
    try { // 👈 YOU WERE MISSING THIS TRY!
      setLoading(true);
      const response = await fetch('/api/properties?purpose=buy');
      const data = await response.json();
      
      if (data.success) {
        setProperties(data.data);
      } else {
        setError('Failed to load properties');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
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
    setPriceRange([0, 20000000]);
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
              <p className="text-dark-charcoal/60">Loading luxury properties...</p>
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
              Luxury <span className="text-gold">Properties</span>
            </h1>
            <p className="text-dark-charcoal/60 text-xl max-w-3xl mx-auto">
              {isGuest() 
                ? `Discover ${displayProperties.length} of ${filteredProperties.length} luxury properties`
                : `Discover ${filteredProperties.length} exceptional properties in Morocco`
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
                  <span className="font-bold text-gold">Guest mode:</span> Showing {displayProperties.length} of {filteredProperties.length} properties
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
                  <span className="font-bold text-gold">Guest mode:</span> Showing {displayProperties.length} of {filteredProperties.length} properties
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
                  <option value="newest">Newest First</option>
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
                        {['apartment', 'villa', 'house', 'commercial', 'land'].map((type) => (
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
                      <h3 className="font-playfair text-lg text-dark-charcoal mb-4">Price Range (MAD)</h3>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="20000000"
                          step="100000"
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
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 20000000])}
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
                        <option value="5">5+ Bedrooms</option>
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
              <span className="font-bold text-gold text-xl">{displayProperties.length}</span> luxury properties shown
              {isGuest() && filteredProperties.length > GUEST_LIMITS.MAX_PROPERTIES_VIEW && (
                <span className="text-sm text-dark-charcoal/40 ml-2">({filteredProperties.length - GUEST_LIMITS.MAX_PROPERTIES_VIEW} more with login)</span>
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
                          src={property.images?.[0] || property.image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'}
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
                            <FiHeart className={`text-lg ${favorites.includes(property._id) ? 'fill-red-500 text-red-500' : ''}`} />
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
                          <p className="text-gold font-bold text-2xl ml-4">
                            <PriceDisplay price={property.price || 0} />
                          </p>
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
                            src={property.images?.[0] || property.image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'}
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
                              <FiHeart className={`text-lg ${favorites.includes(property._id) ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                          </ProtectedAction>
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="font-playfair text-xl text-dark-charcoal mb-2">{property.title}</h3>
                          <p className="text-gold font-bold text-2xl mb-2">
                            <PriceDisplay price={property.price || 0} />
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
              <h3 className="font-playfair text-2xl text-dark-charcoal mb-2">No Properties Found</h3>
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