'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeart, 
  FiMapPin, 
  FiHome, 
  FiDroplet, 
  FiMaximize, 
  FiStar,
  FiArrowLeft,
  FiTrash2,
  FiLoader
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import PriceDisplay from '@/components/PriceDisplay';
import { useTranslation } from '@/i18n/useTranslation';

interface Property {
  _id: string;
  title: string;
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
  purpose?: string;
}

export default function SavedPropertiesPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.lang as string || 'en';
  const { t } = useTranslation();
  
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch all properties and load favorites
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch real properties from API
        const response = await fetch('/api/properties');
        const data = await response.json();
        
        let realProps: Property[] = [];
        
        if (data.success) {
          realProps = data.data;
        }
        
        // Combine real and mock properties
        const allProps = [...realProps];
        setAllProperties(allProps);
        
        // Load favorites from localStorage
        const savedFavs = localStorage.getItem('favorites');
        let favIds: string[] = [];
        
        if (savedFavs) {
          favIds = JSON.parse(savedFavs);
          setFavorites(favIds);
          
          // Filter properties based on favorites
          const saved = allProps.filter((p: Property) => favIds.includes(p._id));
          setSavedProperties(saved);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const removeFromFavorites = async (propertyId: string) => {
    setDeletingId(propertyId);
    
    // Small delay for animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newFavorites = favorites.filter(id => id !== propertyId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    setSavedProperties(prev => prev.filter(p => p._id !== propertyId));
    setDeletingId(null);
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all saved properties?')) {
      localStorage.setItem('favorites', JSON.stringify([]));
      setFavorites([]);
      setSavedProperties([]);
    }
  };

  // Shimmer loading component
  const ShimmerCard = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/10 animate-pulse">
      <div className="h-56 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-gold/10 rounded-lg w-3/4"></div>
        <div className="h-4 bg-gold/5 rounded-lg w-1/2"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-gold/10 rounded-lg w-20"></div>
          <div className="h-8 bg-gold/10 rounded-lg w-20"></div>
          <div className="h-8 bg-gold/10 rounded-lg w-20"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <div className="h-16 bg-gold/5 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-8 bg-gold/5 rounded-lg w-96 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <ShimmerCard key={i} />)}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24 pb-16 relative overflow-hidden">
        {/* Luxury K Pattern Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-10 text-[300px] font-playfair text-emerald-green rotate-12">K</div>
            <div className="absolute bottom-20 right-10 text-[350px] font-playfair text-gold -rotate-12">K</div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header with Back Button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-dark-charcoal/60 hover:text-gold transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Profile</span>
            </button>
            
            {savedProperties.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFavorites}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
              >
                <FiTrash2 />
                <span>Clear All</span>
              </motion.button>
            )}
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-playfair text-5xl md:text-6xl text-dark-charcoal mb-4">
              Saved <span className="text-gold">Properties</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-dark-charcoal/60 text-xl"
            >
              {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
            </motion.p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-emerald-green mt-4 rounded-full"></div>
          </motion.div>

          {/* Properties Grid */}
          {savedProperties.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {savedProperties.map((property, index) => (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gold/10 ${
                      deletingId === property._id ? 'opacity-50 scale-95' : ''
                    }`}
                  >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={property.images?.[0] || property.image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromFavorites(property._id)}
                        disabled={deletingId === property._id}
                        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        {deletingId === property._id ? (
                          <FiLoader className="text-lg animate-spin" />
                        ) : (
                          <FiHeart className="text-lg fill-red-500 text-red-500" />
                        )}
                      </motion.button>

                      {/* Property Type Badge */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="bg-emerald-green/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {property.type}
                        </span>
                      </div>

                      {/* Purpose Badge */}
                      {property.purpose && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                            property.purpose === 'buy' 
                              ? 'bg-gold text-dark-charcoal' 
                              : 'bg-emerald-green text-white'
                          }`}>
                            {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-playfair text-lg text-dark-charcoal group-hover:text-gold transition-colors line-clamp-1 flex-1">
                          {property.title}
                        </h3>
                        <div className="text-right ml-2">
                          <p className="text-gold font-bold text-lg">
                            <PriceDisplay price={property.price} />
                            {property.purpose === 'rent' && (
                              <span className="text-xs font-normal text-dark-charcoal/40">/month</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-dark-charcoal/60 mb-3">
                        <FiMapPin className="text-gold text-xs flex-shrink-0" />
                        <span className="text-xs truncate">{property.location}</span>
                      </div>

                      {/* Rating */}
                      {property.rating && (
                        <div className="flex items-center gap-1 mb-3">
                          <FiStar className="text-gold fill-gold text-xs" />
                          <span className="text-xs font-medium">{property.rating}</span>
                          <span className="text-xs text-dark-charcoal/40">({property.reviews} reviews)</span>
                        </div>
                      )}

                      {/* Features */}
                      <div className="flex items-center justify-between text-dark-charcoal/70 mb-4">
                        <div className="flex items-center gap-1">
                          <FiHome className="text-gold text-sm" />
                          <span className="text-xs">{property.bedrooms} beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiDroplet className="text-gold text-sm" />
                          <span className="text-xs">{property.bathrooms} baths</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiMaximize className="text-gold text-sm" />
                          <span className="text-xs">{property.area} m²</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/${locale}/property/${property._id}`}
                          className="flex-1 text-center py-2 bg-gradient-to-r from-emerald-green to-gold text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => removeFromFavorites(property._id)}
                          disabled={deletingId === property._id}
                          className="px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                        >
                          {deletingId === property._id ? (
                            <FiLoader className="text-sm animate-spin" />
                          ) : (
                            <FiTrash2 className="text-sm" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 text-center border border-gold/20 max-w-2xl mx-auto"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FiHeart className="text-4xl text-gold" />
              </motion.div>
              <h3 className="font-playfair text-2xl text-dark-charcoal mb-2">No Saved Properties</h3>
              <p className="text-dark-charcoal/60 mb-8">
                You haven't saved any properties yet. Browse our listings and click the heart icon to save your favorites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/buy`}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-green to-gold text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Browse Properties
                </Link>
                <Link
                  href={`/${locale}/rent`}
                  className="px-8 py-3 border-2 border-gold text-gold rounded-xl hover:bg-gold hover:text-dark-charcoal transition-all"
                >
                  Browse Rentals
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}