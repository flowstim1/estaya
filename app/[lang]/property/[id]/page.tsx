'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiMaximize, 
  FiHome, 
  FiDroplet, 
  FiHeart, 
  FiShare2, 
  FiPrinter, 
  FiPhone, 
  FiMail, 
  FiUser, 
  FiCheck, 
  FiArrowLeft,
  FiStar,
  FiGrid,
  FiCopy,
  FiCheckCircle
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import { getPropertyById } from '@/lib/api';
import { Property } from '@/types/property';
import PriceDisplay from '@/components/PriceDisplay';

// Mock properties for fallback - UPDATED TO MATCH DATABASE
const mockProperties: Property[] = [
  {
    _id: '1',
    title: 'Luxury Villa with Pool in Palmeraie',
    description: 'Stunning villa nestled in the heart of Palmeraie, featuring traditional Moroccan architecture with modern amenities. The property includes a large swimming pool, lush gardens, and panoramic views of the Atlas Mountains. This exceptional villa offers 5 bedrooms, 6 bathrooms, and 650m² of living space. Features include a gourmet kitchen, home theater, spa, and staff quarters.',
    price: 12500000,
    location: 'Palmeraie, Marrakech',
    type: 'villa',
    purpose: 'buy', // Changed from 'sale' to 'buy'
    bedrooms: 5,
    bathrooms: 6,
    area: 650,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    rating: 4.8,
    reviews: 24,
    featured: true,
    agent: {
      name: 'Kamal',
      email: 'kamal@estaya.ma',
      phone: '+212 6600 99519'
    }
  },
  {
    _id: '2',
    title: 'Modern Apartment with Ocean View',
    description: 'Luxurious apartment in the heart of Casablanca with breathtaking ocean views and high-end finishes. Features include floor-to-ceiling windows, smart home technology, and premium appliances. This stunning apartment offers 3 bedrooms, 2 bathrooms, and 180m² of living space with direct ocean views.',
    price: 3500000,
    location: 'Corniche, Casablanca',
    type: 'apartment',
    purpose: 'buy', // Changed from 'sale' to 'buy'
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.6,
    reviews: 18,
    featured: false,
    agent: {
      name: 'Kamal',
      email: 'kamal@estaya.ma',
      phone: '+212 6600 99519'
    }
  },
  {
    _id: '3',
    title: 'Traditional Riad in Medina',
    description: 'Beautifully restored riad featuring authentic Moroccan architecture with a peaceful interior courtyard. This traditional riad offers 4 bedrooms, 4 bathrooms, and 320m² of living space. Features include a fountain courtyard, rooftop terrace with city views, and traditional Moroccan craftsmanship throughout.',
    price: 8500000,
    location: 'Medina, Marrakech',
    type: 'house',
    purpose: 'buy', // Changed from 'sale' to 'buy'
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.9,
    reviews: 32,
    featured: true,
    agent: {
      name: 'Kamal',
      email: 'kamal@estaya.ma',
      phone: '+212 6600 99519'
    }
  },
  {
    _id: '4',
    title: 'Contemporary Penthouse in Marina',
    description: 'Exclusive penthouse with panoramic views of the Mediterranean Sea and modern luxury finishes. This stunning penthouse offers 4 bedrooms, 4 bathrooms, and 300m² of living space. Features include a private terrace, jacuzzi, smart home technology, and direct elevator access.',
    price: 18000000,
    location: 'Marina, Tangier',
    type: 'apartment',
    purpose: 'buy', // Changed from 'sale' to 'buy'
    bedrooms: 4,
    bathrooms: 4,
    area: 300,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
    rating: 4.7,
    reviews: 15,
    featured: true,
    agent: {
      name: 'Kamal',
      email: 'kamal@estaya.ma',
      phone: '+212 6600 99519'
    }
  },
  {
    _id: '5',
    title: 'Private Estate with Garden',
    description: 'Magnificent estate with lush gardens, perfect for those seeking privacy and luxury. This exceptional estate offers 6 bedrooms, 7 bathrooms, and 800m² of living space on a large plot. Features include a tennis court, pool house, staff quarters, and wine cellar.',
    price: 22000000,
    location: 'Anfa, Casablanca',
    type: 'villa',
    purpose: 'buy', // Changed from 'sale' to 'buy'
    bedrooms: 6,
    bathrooms: 7,
    area: 800,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80',
    rating: 5.0,
    reviews: 8,
    featured: true,
    agent: {
      name: 'Kamal',
      email: 'kamal@estaya.ma',
      phone: '+212 6600 99519'
    }
  },
  // Add mock rental properties for completeness
  {
    _id: 'r1',
    title: 'Luxury Apartment in Corniche',
    description: 'Stunning apartment with direct ocean view, fully furnished with high-end finishes. Includes pool access and 24/7 security.',
    price: 25000,
    location: 'Corniche, Casablanca',
    type: 'apartment',
    purpose: 'rent',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    reviews: 18,
    featured: true,
    agent: {
      name: 'Kamal',
      email: 'kamal@estaya.ma',
      phone: '+212 6600 99519'
    }
  },
  {
    _id: 'r2',
    title: 'Modern Villa with Pool',
    description: 'Beautiful villa in quiet neighborhood with private pool, garden, and terrace. Perfect for families.',
    price: 45000,
    location: 'Anfa, Casablanca',
    type: 'villa',
    purpose: 'rent',
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    rating: 4.9,
    reviews: 24,
    featured: true,
    agent: {
      name: 'Kamal',
      email: 'kamal@estaya.ma',
      phone: '+212 6600 99519'
    }
  },
  {
    _id: 'r3',
    title: 'Traditional Riad Experience',
    description: 'Authentic Moroccan riad in the heart of Medina, beautifully restored with modern comforts. Rooftop terrace with city views.',
    price: 18000,
    location: 'Medina, Marrakech',
    type: 'house',
    purpose: 'rent',
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.8,
    reviews: 32,
    featured: false,
    agent: {
      name: 'Kamal',
      email: 'kamal@estaya.ma',
      phone: '+212 6600 99519'
    }
  }
];

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
    
    // Check if property is favorited
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const favIds = JSON.parse(favorites);
      setIsFavorited(favIds.includes(id));
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      console.log('Fetching property:', id);
      
      // Try API first
      const result = await getPropertyById(id);
      
      if (result.success && result.data) {
        setProperty(result.data);
      } else {
        // Fallback to mock data
        console.log('Using mock property as fallback');
        const mockProperty = mockProperties.find(p => p._id === id);
        if (mockProperty) {
          setProperty(mockProperty);
        } else {
          setError('Property not found');
        }
      }
    } catch (err) {
      console.error('Error fetching property:', err);
      
      // Try mock data on error
      const mockProperty = mockProperties.find(p => p._id === id);
      if (mockProperty) {
        setProperty(mockProperty);
      } else {
        setError('Property not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    const newFavorited = !isFavorited;
    setIsFavorited(newFavorited);
    
    // Update localStorage
    const favorites = localStorage.getItem('favorites');
    let favIds: string[] = favorites ? JSON.parse(favorites) : [];
    
    if (newFavorited) {
      if (!favIds.includes(id)) {
        favIds.push(id);
      }
    } else {
      favIds = favIds.filter(favId => favId !== id);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favIds));
    
    // Show message for non-logged in users
    if (!localStorage.getItem('token') && newFavorited) {
      setTimeout(() => {
        alert('Sign in to save favorites permanently to your account!');
      }, 100);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send the form data to your API
    console.log('Contact form submitted:', {
      propertyId: property?._id,
      propertyTitle: property?.title,
      ...contactForm
    });
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 3000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-dark-charcoal/60">Loading property details...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center text-red-500 p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg mx-auto border border-gold/20">
              <p className="text-xl mb-4">{error || 'Property not found'}</p>
              <Link 
                href="/buy"
                className="inline-block bg-gradient-to-r from-emerald-green to-gold text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                Back to Properties
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Create images array for gallery
  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.image, property.image, property.image]; // Duplicate for demo

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
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link 
              href="/buy" 
              className="inline-flex items-center gap-2 text-dark-charcoal/60 hover:text-gold transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Properties</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl mb-8 border border-gold/20"
              >
                {/* Main Image */}
                <div className="relative h-96 md:h-[500px] w-full">
                  <Image
                    src={images[selectedImage]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={toggleFavorite}
                      className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300"
                    >
                      <FiHeart className={`text-xl ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300">
                      <FiShare2 className="text-xl" />
                    </button>
                  </div>

                  {/* Property Type Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-gradient-to-r from-emerald-green to-gold text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                      For {property.purpose === 'buy' ? 'Sale' : 'Rent'}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  {property.rating && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                      <FiStar className="text-gold fill-gold" />
                      <span className="font-medium text-dark-charcoal">{property.rating}</span>
                      <span className="text-dark-charcoal/40">({property.reviews} reviews)</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="p-4 border-t border-gold/10">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                            selectedImage === index ? 'border-gold scale-105' : 'border-transparent hover:border-gold/50'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${property.title} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Property Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gold/20"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="font-playfair text-3xl md:text-4xl text-dark-charcoal mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-dark-charcoal/60">
                      <FiMapPin className="text-gold" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gold font-bold text-3xl">
                      <PriceDisplay 
                        price={property.price} 
                        period={property.purpose === 'rent' ? '/month' : ''} 
                      />
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gold/10 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-gold/5 to-transparent rounded-xl">
                    <FiHome className="text-2xl text-gold mx-auto mb-2" />
                    <p className="text-sm text-dark-charcoal/60">Type</p>
                    <p className="font-medium capitalize text-dark-charcoal">{property.type}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-gold/5 to-transparent rounded-xl">
                    <FiMaximize className="text-2xl text-gold mx-auto mb-2" />
                    <p className="text-sm text-dark-charcoal/60">Area</p>
                    <p className="font-medium text-dark-charcoal">{property.area} m²</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-gold/5 to-transparent rounded-xl">
                    <FiHome className="text-2xl text-gold mx-auto mb-2" />
                    <p className="text-sm text-dark-charcoal/60">Bedrooms</p>
                    <p className="font-medium text-dark-charcoal">{property.bedrooms}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-gold/5 to-transparent rounded-xl">
                    <FiDroplet className="text-2xl text-gold mx-auto mb-2" />
                    <p className="text-sm text-dark-charcoal/60">Bathrooms</p>
                    <p className="font-medium text-dark-charcoal">{property.bathrooms}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="font-playfair text-2xl text-dark-charcoal mb-4">Description</h2>
                  <p className="text-dark-charcoal/70 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Agent & Contact */}
            <div className="lg:col-span-1">
              {/* Agent Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sticky top-24 mb-8 border border-gold/20"
              >
                <h2 className="font-playfair text-2xl text-dark-charcoal mb-6">
                  Contact <span className="text-gold">Agent</span>
                </h2>
                
                {/* Agent Info */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-br from-gold/5 to-emerald-green/5 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-emerald-green rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">K</span>
                  </div>
                  <div>
                    <p className="font-playfair text-xl font-bold text-dark-charcoal">{property.agent.name}</p>
                    <p className="text-sm text-dark-charcoal/60">Senior Property Advisor</p>
                    <p className="text-xs text-gold flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Available now
                    </p>
                  </div>
                </div>

                {/* Contact Info with Copy */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                    <div className="flex items-center gap-3">
                      <FiPhone className="text-gold" />
                      <span className="text-dark-charcoal">{property.agent.phone}</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(property.agent.phone, 'phone')}
                      className="flex items-center gap-1 text-xs bg-gold/10 px-3 py-1 rounded-full hover:bg-gold/20 transition-colors"
                    >
                      {copied === 'phone' ? <FiCheck className="text-green-500" /> : <FiCopy />}
                      <span>{copied === 'phone' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                    <div className="flex items-center gap-3">
                      <FiMail className="text-gold" />
                      <span className="text-dark-charcoal">{property.agent.email}</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(property.agent.email, 'email')}
                      className="flex items-center gap-1 text-xs bg-gold/10 px-3 py-1 rounded-full hover:bg-gold/20 transition-colors"
                    >
                      {copied === 'email' ? <FiCheck className="text-green-500" /> : <FiCopy />}
                      <span>{copied === 'email' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Contact Form */}
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-500 rounded-xl p-6 text-center"
                  >
                    <FiCheckCircle className="text-4xl text-emerald-500 mx-auto mb-3" />
                    <p className="font-bold text-emerald-700">Message Sent!</p>
                    <p className="text-sm text-emerald-600">Agent will contact you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                      required
                    />
                    
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                      required
                    />
                    
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone"
                      className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                    />
                    
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      placeholder="I'm interested in this property. Please contact me."
                      rows={4}
                      className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all resize-none"
                      required
                    ></textarea>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-green to-gold text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gold/20"
              >
                <h2 className="font-playfair text-2xl text-dark-charcoal mb-4">
                  <span className="text-gold">Location</span>
                </h2>
                <div className="bg-gradient-to-br from-gold/5 to-emerald-green/5 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, #C6A75E 0px, #C6A75E 2px, transparent 2px, transparent 20px)`,
                    }} />
                  </div>
                  <p className="text-dark-charcoal/40 relative z-10">Map Integration Coming Soon</p>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                  <FiMapPin className="inline text-gold mr-2" />
                  <span className="text-dark-charcoal/70">{property.location}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}