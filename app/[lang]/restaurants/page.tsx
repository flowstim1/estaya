'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiStar,
  FiHeart,
  FiFilter
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import PriceDisplay from '@/components/PriceDisplay';
import ProtectedAction from '@/components/ProtectedAction';
import { isGuest, getGuestViewProperties, shouldShowUpgradeBanner, GUEST_LIMITS } from '@/lib/guestLimits';
import UpgradeBanner from '@/components/UpgradeBanner';

interface CommercialProperty {
  _id: string;
  id?: number;
  title: string;
  type: string;
  location: string;
  price: number;
  area: number;
  rating?: number;
  reviews?: number;
  images?: string[];
  image?: string;
  features?: string[];
  featured?: boolean;
    purpose?: 'buy' | 'rent'; 
}

export default function RestaurantsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [commercialListings, setCommercialListings] = useState<CommercialProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // Load favorites from localStorage
    const savedFavs = localStorage.getItem('restaurantFavorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  const filters = ['All', 'Restaurants', 'Cafés', 'Lounges', 'Hotels'];

  // Fetch from API
  useEffect(() => {
    fetchCommercialProperties();
  }, []);

  const fetchCommercialProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/properties?type=restaurant,cafe,commercial');
      const data = await response.json();
      if (data.success) {
        // Transform data to match the component's expected format
const transformedData = data.data.map((item: any) => ({
  ...item,
  id: item._id,
  image: item.images?.[0] || item.image,
  priceLabel: item.purpose === 'rent' ? '/year' : '',
  area: `${item.area} m²`,
  features: item.amenities || [],
  type: item.type === 'restaurant' ? 'Restaurant' : 
        item.type === 'cafe' ? 'Café' : 
        item.type === 'commercial' ? 'Commercial' : item.type,
  purpose: item.purpose
}));        setCommercialListings(transformedData);
      } else {
        setCommercialListings([]);
      }
    } catch (error) {
      console.error('Error fetching commercial properties:', error);
      setCommercialListings([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = commercialListings.filter(listing => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Restaurants' && listing.type === 'Restaurant') return true;
    if (selectedFilter === 'Cafés' && listing.type === 'Café') return true;
    if (selectedFilter === 'Lounges' && listing.type === 'Lounge') return true;
    if (selectedFilter === 'Hotels' && listing.type === 'Hotel') return true;
    return false;
  });

  // Guest limits
  const displayListings = isClient && isGuest() 
    ? filteredListings.slice(0, GUEST_LIMITS.MAX_PROPERTIES_VIEW)
    : filteredListings;
  
  const showUpgradeBanner = isClient && isGuest() && filteredListings.length > GUEST_LIMITS.MAX_PROPERTIES_VIEW;

  const toggleFavorite = (id: string) => {
    if (!isClient) return;
    
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('restaurantFavorites', JSON.stringify(newFavorites));
  };

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
              <p className="text-dark-charcoal/60">Loading commercial spaces...</p>
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
            <div className="absolute top-1/3 right-1/4 text-[200px] font-playfair text-sand-beige rotate-45">K</div>
          </div>
          
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C6A75E 0px, #C6A75E 2px, transparent 2px, transparent 30px)`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-playfair text-5xl md:text-7xl text-dark-charcoal mb-4">
              Restaurants & <span className="text-gold">Cafés</span>
            </h1>
            <p className="text-dark-charcoal/60 text-xl max-w-3xl mx-auto">
              {isClient && isGuest() 
                ? `Discover ${displayListings.length} of ${filteredListings.length} premium commercial spaces`
                : `Discover ${filteredListings.length} exceptional hospitality opportunities across Morocco`
              }
            </p>
          </motion.div>

          {/* Guest Info Banner */}
          {isClient && isGuest() && filteredListings.length > GUEST_LIMITS.MAX_PROPERTIES_VIEW && (
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
                  <span className="font-bold text-gold">Guest mode:</span> Showing {displayListings.length} of {filteredListings.length} commercial spaces
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

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-emerald-green to-gold text-white shadow-lg' 
                    : 'bg-white/80 backdrop-blur-sm border border-gold/20 text-dark-charcoal/70 hover:border-gold hover:text-gold'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-dark-charcoal/60">
              <span className="font-bold text-gold text-xl">{displayListings.length}</span> commercial spaces shown
              {isClient && isGuest() && filteredListings.length > GUEST_LIMITS.MAX_PROPERTIES_VIEW && (
                <span className="text-sm text-dark-charcoal/40 ml-2">
                  ({filteredListings.length - GUEST_LIMITS.MAX_PROPERTIES_VIEW} more with login)
                </span>
              )}
            </p>
          </div>

          {/* Listings Grid */}
          {displayListings.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayListings.map((listing, index) => (
                <motion.div
                  key={listing._id || listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gold/10"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={listing.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2047&q=80'}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Featured Badge */}
                    {listing.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-gradient-to-r from-gold to-emerald-green text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-white/90 backdrop-blur-sm text-dark-charcoal px-3 py-1 rounded-full text-xs font-medium border border-gold/20">
                        {listing.type}
                      </span>
                    </div>

                    {/* Favorite Button with Guest Protection */}
                    <ProtectedAction action="save">
                      <button 
                        onClick={() => toggleFavorite(listing._id || listing.id?.toString() || '')}
                        className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <FiHeart className={`text-lg ${favorites.includes(listing._id || listing.id?.toString() || '') ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </ProtectedAction>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title & Rating */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair text-lg text-dark-charcoal group-hover:text-gold transition-colors line-clamp-1">
                        {listing.title}
                      </h3>
                      {listing.rating && (
                        <div className="flex items-center gap-1 bg-gold/10 px-2 py-1 rounded-full">
                          <FiStar className="text-gold fill-gold text-xs" />
                          <span className="text-xs font-medium text-dark-charcoal">{listing.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-dark-charcoal/60 mb-3">
                      <FiMapPin className="text-gold text-xs flex-shrink-0" />
                      <span className="text-xs truncate">{listing.location}</span>
                    </div>

                    {/* Price & Area */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <PriceDisplay price={listing.price} />
                        <span className="text-xs text-dark-charcoal/40 ml-1">{listing.purpose === 'rent' ? '/year' : ''}</span>
                      </div>
                      <div className="text-xs text-dark-charcoal/60 bg-sand-beige/10 px-2 py-1 rounded-full">
                        {listing.area} m²
                      </div>
                    </div>

                    {/* Features */}
                    {listing.features && listing.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {listing.features.slice(0, 3).map((feature, i) => (
                          <span key={i} className="px-2 py-1 bg-gold/5 text-dark-charcoal/70 text-[10px] rounded-full border border-gold/10">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Reviews */}
                    {listing.reviews && (
                      <div className="flex items-center gap-1 mb-4">
                        <span className="text-xs text-dark-charcoal/40">{listing.reviews} reviews</span>
                      </div>
                    )}

                    {/* View Details Button */}
                    <ProtectedAction action="contact">
                      <Link
                        href={`/property/${listing._id || listing.id}`}
                        className="block w-full text-center py-2.5 border-2 border-gold/20 text-gold rounded-xl hover:bg-gold hover:text-dark-charcoal transition-all duration-300 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </ProtectedAction>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-white/90 rounded-3xl p-16 text-center border border-gold/20">
              <h3 className="font-playfair text-2xl text-dark-charcoal mb-2">No Commercial Spaces Yet</h3>
              <p className="text-dark-charcoal/60 mb-6">Be the first to list your restaurant or café!</p>
              <Link
                href="/sell"
                className="inline-block bg-gradient-to-r from-emerald-green to-gold text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                List Your Property
              </Link>
            </div>
          )}

          {/* Upgrade Banner */}
          {showUpgradeBanner && (
            <div className="mt-8">
              <UpgradeBanner type="property" />
            </div>
          )}

          {/* Footer with Agent Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gold/20">
              <span className="text-dark-charcoal/60">Contact our commercial agent</span>
              <span className="w-1 h-1 bg-gold rounded-full"></span>
              <span className="text-gold font-medium">Kamal</span>
              <span className="w-1 h-1 bg-gold rounded-full"></span>
              <a href="tel:+212660099519" className="text-emerald-green font-medium hover:text-gold transition-colors">
                +212 6600 99519
              </a>
            </div>
            
            <div className="mt-6">
              <p className="text-dark-charcoal/30 font-playfair text-sm italic">
                ESTAYA — Homes That Move You.
              </p>
              <p className="text-dark-charcoal/20 text-xs mt-2">
                Website crafted by <span className="text-gold">Abdellah Abouelmouroua</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}