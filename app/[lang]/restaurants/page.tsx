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
  id: number;
  title: string;
  type: string;
  location: string;
  price: number;
  priceLabel: string;
  area: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  featured: boolean;
}

const commercialListings: CommercialProperty[] = [
  {
    id: 1,
    title: 'Modern Café in Corniche',
    type: 'Café',
    location: 'Corniche, Casablanca',
    price: 450000,
    priceLabel: 'MAD/year',
    area: '180 m²',
    rating: 4.8,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2047&q=80',
    features: ['Sea View', 'Terrace', 'Fully Equipped'],
    featured: true
  },
  {
    id: 2,
    title: 'Restaurant in Hivernage',
    type: 'Restaurant',
    location: 'Hivernage, Marrakech',
    price: 850000,
    priceLabel: 'MAD/year',
    area: '320 m²',
    rating: 4.9,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    features: ['Premium Location', 'Full Kitchen', 'Parking'],
    featured: true
  },
  {
    id: 3,
    title: 'Beachfront Restaurant',
    type: 'Restaurant',
    location: 'Saidia Beach',
    price: 1200000,
    priceLabel: 'MAD/year',
    area: '450 m²',
    rating: 5.0,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
    features: ['Direct Beach Access', 'Large Terrace', 'Tourist Zone'],
    featured: true
  },
  {
    id: 4,
    title: 'Artisan Café in Medina',
    type: 'Café',
    location: 'Medina, Fes',
    price: 280000,
    priceLabel: 'MAD/year',
    area: '120 m²',
    rating: 4.7,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    features: ['Traditional Decor', 'Tourist Area', 'Rooftop'],
    featured: false
  },
  {
    id: 5,
    title: 'Gourmet Restaurant',
    type: 'Restaurant',
    location: 'Guéliz, Marrakech',
    price: 950000,
    priceLabel: 'MAD/year',
    area: '280 m²',
    rating: 4.9,
    reviews: 27,
    image: 'https://images.unsplash.com/photo-1552566624-52f8b3add5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    features: ['High-end Finishes', 'Wine Cellar', 'Private Rooms'],
    featured: true
  },
  {
    id: 6,
    title: 'Coastal Café',
    type: 'Café',
    location: 'Mohammedia',
    price: 320000,
    priceLabel: 'MAD/year',
    area: '150 m²',
    rating: 4.6,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2078&q=80',
    features: ['Ocean View', 'Outdoor Seating', 'Established Business'],
    featured: false
  },
  {
    id: 7,
    title: 'Luxury Lounge Bar',
    type: 'Lounge',
    location: 'Corniche, Casablanca',
    price: 680000,
    priceLabel: 'MAD/year',
    area: '220 m²',
    rating: 4.8,
    reviews: 14,
    image: 'https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    features: ['Panoramic View', 'VIP Area', 'Bar'],
    featured: false
  },
  {
    id: 8,
    title: 'Boutique Hotel Café',
    type: 'Hotel',
    location: 'Medina, Marrakech',
    price: 1500000,
    priceLabel: 'MAD/year',
    area: '500 m²',
    rating: 4.9,
    reviews: 21,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    features: ['Rooftop Pool', 'Spa', 'Restaurant'],
    featured: true
  }
];

export default function RestaurantsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load favorites from localStorage
    const savedFavs = localStorage.getItem('restaurantFavorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  const filters = ['All', 'Restaurants', 'Cafés', 'Lounges', 'Hotels'];

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

  const toggleFavorite = (id: number) => {
    if (!isClient) return;
    
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('restaurantFavorites', JSON.stringify(newFavorites));
  };

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gold/10"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={listing.image}
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
                      onClick={() => toggleFavorite(listing.id)}
                      className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <FiHeart className={`text-lg ${favorites.includes(listing.id) ? 'fill-red-500 text-red-500' : ''}`} />
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
                    <div className="flex items-center gap-1 bg-gold/10 px-2 py-1 rounded-full">
                      <FiStar className="text-gold fill-gold text-xs" />
                      <span className="text-xs font-medium text-dark-charcoal">{listing.rating}</span>
                    </div>
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
                      <span className="text-xs text-dark-charcoal/40 ml-1">{listing.priceLabel}</span>
                    </div>
                    <div className="text-xs text-dark-charcoal/60 bg-sand-beige/10 px-2 py-1 rounded-full">
                      {listing.area}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {listing.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-gold/5 text-dark-charcoal/70 text-[10px] rounded-full border border-gold/10">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-xs text-dark-charcoal/40">{listing.reviews} reviews</span>
                  </div>

                  {/* View Details Button */}
                  <ProtectedAction action="contact">
                    <Link
                      href={`/property/${listing.id}`}

                      className="block w-full text-center py-2.5 border-2 border-gold/20 text-gold rounded-xl hover:bg-gold hover:text-dark-charcoal transition-all duration-300 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </ProtectedAction>
                </div>
              </motion.div>
            ))}
          </motion.div>

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