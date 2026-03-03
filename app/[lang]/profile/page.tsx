'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiHeart, 
  FiHome, 
  FiSettings, 
  FiLogOut,
  FiEdit2,
  FiSave,
  FiCalendar,
  FiStar,
  FiMaximize,
  FiDroplet,
  FiEye,
  FiMessageCircle
} from 'react-icons/fi';import Navbar from '@/components/Navbar';
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  memberSince?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.lang as string || 'en';
  const { t } = useTranslation();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'listings' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '' });
  
  // Real data states
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [userListings, setUserListings] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load user and data
  useEffect(() => {
    loadUserData();
    loadSavedProperties();
    loadUserListings();
  }, []);

  const loadUserData = () => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !userData) {
      router.push(`/${locale}/login`);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser({
        ...parsedUser,
        phone: parsedUser.phone || 'Not provided',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
      setEditForm({
        name: parsedUser.name || '',
        phone: parsedUser.phone || '',
      });
    } catch (e) {
      console.error('Failed to parse user data');
    }
  };

  const loadSavedProperties = async () => {
    try {
      // Load from localStorage
      const savedFavs = localStorage.getItem('favorites');
      let favIds: string[] = [];
      
      if (savedFavs) {
        favIds = JSON.parse(savedFavs);
        setFavorites(favIds);
      }

      // Fetch property details for saved IDs (in real app, this would be an API call)
      if (favIds.length > 0) {
        // For demo, we'll filter from mock data
        const mockSaved = mockProperties.filter(p => favIds.includes(p._id));
        setSavedProperties(mockSaved);
      }
    } catch (error) {
      console.error('Error loading saved properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserListings = async () => {
    try {
      // In a real app, this would fetch from your API
      // For now, empty array for new users
      setUserListings([]);
    } catch (error) {
      console.error('Error loading listings:', error);
    }
  };

  // Mock properties for saved items (only used if user has saved properties)
  const mockProperties: Property[] = [
    {
      _id: '1',
      title: 'Luxury Villa with Pool in Palmeraie',
      price: 12500000,
      location: 'Palmeraie, Marrakech',
      type: 'villa',
      bedrooms: 5,
      bathrooms: 6,
      area: 650,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      rating: 4.8,
      reviews: 24,
      purpose: 'sale'
    },
    {
      _id: '2',
      title: 'Modern Apartment with Ocean View',
      price: 3500000,
      location: 'Corniche, Casablanca',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.6,
      reviews: 18,
      purpose: 'sale'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push(`/${locale}`);
    router.refresh();
  };

  const handleEditToggle = () => {
    if (isEditing && user) {
      const updatedUser = { ...user, name: editForm.name, phone: editForm.phone };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    setIsEditing(!isEditing);
  };

  const removeFromFavorites = (propertyId: string) => {
    const newFavorites = favorites.filter(id => id !== propertyId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    setSavedProperties(prev => prev.filter(p => p._id !== propertyId));
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
                <p className="text-dark-charcoal/60">{t('common.loading')}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const tabs = [
    { id: 'overview', label: t('profile.overview'), icon: FiUser },
    { id: 'saved', label: t('profile.savedProperties'), icon: FiHeart },
    { id: 'listings', label: t('profile.myListings'), icon: FiHome },
    { id: 'settings', label: t('profile.settings'), icon: FiSettings },
  ];

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-playfair text-5xl md:text-6xl text-dark-charcoal mb-4">
              {t('profile.myProfile')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-emerald-green rounded-full"></div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gold/20 overflow-hidden mb-8"
          >
            {/* Cover with Avatar */}
            <div className="relative h-40 bg-gradient-to-r from-emerald-green to-gold">
              <div className="absolute -bottom-16 left-8">
                <div className="w-32 h-32 bg-white rounded-2xl shadow-2xl border-4 border-white flex items-center justify-center">
                  <span className="font-playfair text-5xl text-emerald-green">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-20 p-8">
              <div className="flex justify-between items-start">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="font-playfair text-3xl text-dark-charcoal bg-gold/5 border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                    />
                  ) : (
                    <h2 className="font-playfair text-3xl text-dark-charcoal">{user?.name}</h2>
                  )}
                  <p className="text-dark-charcoal/60 mt-1">{user?.email}</p>
                  <p className="text-sm text-gold mt-1 flex items-center gap-1">
                    <FiCalendar className="text-xs" />
                    {t('profile.memberSince')} {user?.memberSince}
                  </p>
                </div>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-xl hover:bg-gold/20 transition-colors"
                >
                  {isEditing ? <FiSave /> : <FiEdit2 />}
                  <span>{isEditing ? t('common.save') : t('profile.editProfile')}</span>
                </button>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                  <FiPhone className="text-gold text-xl" />
                  <div>
                    <p className="text-sm text-dark-charcoal/60">{t('common.phone')}</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        placeholder="+212 6XX XXXXXX"
                        className="bg-transparent border-b border-gold/30 focus:outline-none focus:border-gold"
                      />
                    ) : (
                      <p className="font-medium">{user?.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                  <FiMail className="text-gold text-xl" />
                  <div>
                    <p className="text-sm text-dark-charcoal/60">{t('common.email')}</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards - Real Data */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-gold/10">
              <FiHeart className="text-2xl text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-dark-charcoal">{savedProperties.length}</p>
              <p className="text-sm text-dark-charcoal/60">{t('profile.savedProperties')}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-gold/10">
              <FiHome className="text-2xl text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-dark-charcoal">{userListings.length}</p>
              <p className="text-sm text-dark-charcoal/60">{t('profile.myListings')}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-gold/10">
              <FiEye className="text-2xl text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-dark-charcoal">0</p>
              <p className="text-sm text-dark-charcoal/60">{t('profile.profileViews')}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-gold/10">
              <FiMessageCircle className="text-2xl text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-dark-charcoal">0</p>
              <p className="text-sm text-dark-charcoal/60">{t('profile.inquiries')}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gold/20 overflow-hidden">
            <div className="flex overflow-x-auto border-b border-gold/10">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-gold'
                        : 'text-dark-charcoal/60 hover:text-dark-charcoal'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="hidden md:inline">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h3 className="font-playfair text-2xl text-dark-charcoal mb-6">
                    {t('common.welcomeBack')}, <span className="text-gold">{user?.name?.split(' ')[0]}</span>!
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gold/5 to-emerald-green/5 rounded-xl p-6">
                      <h4 className="font-playfair text-lg text-gold mb-4">{t('profile.quickActions')}</h4>
                      <div className="space-y-3">
                        <Link href={`/${locale}/sell`} className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gold hover:text-white transition-colors">
                          + {t('profile.listProperty')}
                        </Link>
                        <Link href={`/${locale}/buy`} className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gold hover:text-white transition-colors">
                          🔍 {t('profile.browseProperties')}
                        </Link>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gold/5 to-emerald-green/5 rounded-xl p-6">
                      <h4 className="font-playfair text-lg text-gold mb-4">{t('profile.recentActivity')}</h4>
                      <div className="space-y-3">
                        <p className="text-dark-charcoal/60">No recent activity</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Properties Tab */}
              {activeTab === 'saved' && (
                <div>
                  <h3 className="font-playfair text-2xl text-dark-charcoal mb-6">
                    {t('profile.savedProperties')}
                  </h3>
                  
                  {savedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedProperties.map((property) => (
                        <div key={property._id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gold/10">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={property.image}
                              alt={property.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <button
                              onClick={() => removeFromFavorites(property._id)}
                              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <FiHeart className="text-lg fill-red-500 text-red-500" />
                            </button>
                            <div className="absolute bottom-4 left-4 z-10">
                              <span className="bg-emerald-green/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                                {property.type}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-playfair text-lg text-dark-charcoal group-hover:text-gold transition-colors">
                                {property.title}
                              </h4>
                              <p className="text-gold font-bold text-lg">
                                <PriceDisplay price={property.price} />
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-dark-charcoal/60 mb-3">
                              <FiMapPin className="text-gold flex-shrink-0" />
                              <span className="text-sm">{property.location}</span>
                            </div>
                            <div className="flex items-center gap-4 text-dark-charcoal/70 mb-4">
                              <div className="flex items-center gap-1">
<FiHome className="text-gold" />
                                <span className="text-sm">{property.bedrooms}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FiDroplet className="text-gold" />
                                <span className="text-sm">{property.bathrooms}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FiMaximize className="text-gold" />
                                <span className="text-sm">{property.area}m²</span>
                              </div>
                            </div>
                            <Link
                              href={`/${locale}/property/${property._id}`}
                              className="block w-full text-center py-2 border border-gold text-gold rounded-lg hover:bg-gold hover:text-white transition-colors"
                            >
                              {t('property.viewDetails')}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FiHeart className="text-5xl text-gold/30 mx-auto mb-4" />
                      <p className="text-dark-charcoal/60 mb-4">You haven't saved any properties yet</p>
                      <Link
                        href={`/${locale}/buy`}
                        className="inline-block bg-gradient-to-r from-emerald-green to-gold text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                      >
                        Browse Properties
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* My Listings Tab */}
              {activeTab === 'listings' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-playfair text-2xl text-dark-charcoal">{t('profile.myListings')}</h3>
                    <Link
                      href={`/${locale}/sell`}
                      className="bg-gradient-to-r from-emerald-green to-gold text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <FiHome />
                      <span>{t('profile.listProperty')}</span>
                    </Link>
                  </div>

                  {userListings.length > 0 ? (
                    <div className="space-y-4">
                      {/* Listings would appear here */}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FiHome className="text-5xl text-gold/30 mx-auto mb-4" />
                      <p className="text-dark-charcoal/60 mb-4">You haven't listed any properties yet</p>
                      <Link
                        href={`/${locale}/sell`}
                        className="inline-block bg-gradient-to-r from-emerald-green to-gold text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                      >
                        List Your First Property
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h3 className="font-playfair text-2xl text-dark-charcoal mb-6">{t('profile.settings')}</h3>
                  
                  <div className="max-w-2xl">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-dark-charcoal/70 mb-2">{t('common.fullName')}</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-dark-charcoal/70 mb-2">{t('common.phone')}</label>
                        <input
                          type="text"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="+212 6XX XXXXXX"
                          className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={handleEditToggle}
                          className="px-6 py-3 bg-gradient-to-r from-emerald-green to-gold text-white rounded-xl hover:shadow-lg transition-all"
                        >
                          {t('profile.saveChanges')}
                        </button>
                        
                        <button
                          onClick={handleLogout}
                          className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                        >
                          <FiLogOut />
                          {t('nav.signOut')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}