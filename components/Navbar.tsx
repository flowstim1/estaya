'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/contexts/CurrencyContext';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { 
  FiHome, 
  FiSearch, 
  FiUser, 
  FiLogOut, 
  FiHeart, 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiGlobe,
  FiDollarSign,
  FiStar
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/i18n/useTranslation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency(); // REMOVED the duplicate currency state

  const router = useRouter();
  const params = useParams();
  const locale = params?.lang as string || 'en';
  const { t } = useTranslation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error('Failed to parse user data');
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    window.addEventListener('userUpdate', checkUser);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userUpdate', checkUser);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    window.dispatchEvent(new Event('userUpdate'));
    router.push(`/${locale}`);
    router.refresh();
  };

  const navLinks = [
    { href: `/${locale}/buy`, label: t('nav.buy'), icon: FiSearch },
    { href: `/${locale}/rent`, label: t('nav.rent'), icon: FiHome },
    { href: `/${locale}/sell`, label: t('nav.sell'), icon: FiDollarSign },
    { href: `/${locale}/restaurants`, label: t('nav.commercial'), icon: FiStar },
    { href: `/${locale}/about`, label: t('nav.about'), icon: FiHeart },
    { href: `/${locale}/contact`, label: t('nav.contact'), icon: FiUser },
  ];

  const currencies = [
    { code: 'MAD', symbol: 'DH', flag: '🇲🇦' },
    { code: 'EUR', symbol: '€', flag: '🇪🇺' },
    { code: 'USD', symbol: '$', flag: '🇺🇸' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo - Full ESTAYA */}
            <Link 
              href={`/${locale}`} 
              className="group relative"
            >
              <span className={`font-playfair text-2xl md:text-3xl font-bold transition-all duration-300 ${
                isScrolled ? 'text-emerald-green' : 'text-white'
              }`}>
                ESTAYA
              </span>
            </Link>

            {/* Desktop Navigation - Icons Only */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(link.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isScrolled 
                          ? isActive
                            ? 'text-gold bg-gold/10'
                            : 'text-dark-charcoal/70 hover:text-gold hover:bg-gold/5'
                          : isActive
                            ? 'text-gold bg-white/10'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="text-lg" />
                    </Link>
                    
                    {/* Tooltip on hover */}
                    {hoveredItem === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-dark-charcoal text-white text-xs py-1 px-2 rounded-lg z-50"
                      >
                        {link.label}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Section - Small Icons */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Currency Selector - Small Icon */}
              <div className="relative">
                <button
                  onClick={() => setShowCurrency(!showCurrency)}
                  onMouseEnter={() => setHoveredItem('currency')}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isScrolled 
                      ? 'text-dark-charcoal/70 hover:text-emerald-green hover:bg-emerald-green/5' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm">{currencies.find(c => c.code === currency)?.flag}</span>
                </button>

                {/* Currency tooltip */}
                {hoveredItem === 'currency' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-dark-charcoal text-white text-xs py-1 px-2 rounded-lg z-50"
                  >
                    {currency}
                  </motion.div>
                )}

                {/* Currency Dropdown */}
                <AnimatePresence>
                  {showCurrency && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-2xl border border-gold/20 overflow-hidden z-50"
                    >
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setCurrency(curr.code as 'MAD' | 'EUR' | 'USD');
                            setShowCurrency(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-sand-beige/20 transition-colors text-sm ${
                            currency === curr.code ? 'bg-gold/10 text-gold' : 'text-dark-charcoal'
                          }`}
                        >
                          <span>{curr.flag}</span>
                          <span>{curr.code}</span>
                          <span className="ml-auto text-dark-charcoal/60">{curr.symbol}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Switcher - Small Icon */}
              <LanguageSwitcher isScrolled={isScrolled} />

              {/* User Menu - Profile Circle */}
              <div className="relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      onMouseEnter={() => setHoveredItem('profile')}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden ${
                        isScrolled 
                          ? 'bg-gradient-to-br from-emerald-green to-gold text-white shadow-md' 
                          : 'bg-white/20 text-white border border-white/30'
                      }`}
                    >
                      <span className="font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </button>

                    {/* Profile tooltip */}
                    {hoveredItem === 'profile' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 right-0 whitespace-nowrap bg-dark-charcoal text-white text-xs py-1 px-2 rounded-lg z-50"
                      >
                        {user.name.split(' ')[0]}
                      </motion.div>
                    )}

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gold/20 overflow-hidden z-50"
                        >
                          <div className="p-3 bg-gradient-to-r from-gold/10 to-emerald-green/10 border-b border-gold/20">
                            <p className="text-xs text-dark-charcoal/60 truncate">{user.email}</p>
                          </div>
                          
                          <Link
                            href={`/${locale}/profile`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-dark-charcoal hover:bg-sand-beige/20 transition-colors"
                            onClick={() => setShowDropdown(false)}
                          >
                            <FiUser className="text-gold text-sm" />
                            <span>{t('nav.profile')}</span>
                          </Link>
                          
                          <Link
                            href={`/${locale}/profile/saved`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-dark-charcoal hover:bg-sand-beige/20 transition-colors"
                            onClick={() => setShowDropdown(false)}
                          >
                            <FiHeart className="text-gold text-sm" />
                            <span>{t('nav.saved')}</span>
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gold/10"
                          >
                            <FiLogOut className="text-sm" />
                            <span>{t('nav.signOut')}</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/${locale}/login`}
                      onMouseEnter={() => setHoveredItem('login')}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isScrolled 
                          ? 'bg-emerald-green text-white hover:bg-gold' 
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      <FiUser className="text-lg" />
                    </Link>

                    {/* Login tooltip */}
                    {hoveredItem === 'login' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 right-0 whitespace-nowrap bg-dark-charcoal text-white text-xs py-1 px-2 rounded-lg z-50"
                      >
                        {t('nav.signIn')}
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'text-dark-charcoal/70 hover:text-emerald-green hover:bg-emerald-green/5' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>

{/* Mobile Navigation */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden overflow-hidden"
    >
      <div className="pt-4 pb-2 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-charcoal hover:bg-sand-beige/20 transition-colors"
            >
              <Icon className="text-gold text-lg" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        {/* Mobile Currency & Language */}
        <div className="flex items-center gap-2 px-4 py-3">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as 'MAD' | 'EUR' | 'USD')}
            className="flex-1 px-3 py-2 bg-white border border-gold/20 rounded-xl text-sm"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.flag} {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>

          <LanguageSwitcher mobile />
        </div>

        {/* FIXED: Show profile options when logged in */}
        {user ? (
          <>
            {/* User Profile Link */}
            <Link
              href={`/${locale}/profile`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-charcoal hover:bg-sand-beige/20 transition-colors border-t border-gold/10"
            >
              <FiUser className="text-gold text-lg" />
              <div>
                <span className="font-medium">{t('nav.profile')}</span>
                <p className="text-xs text-dark-charcoal/60 truncate">{user.email}</p>
              </div>
            </Link>

            {/* Saved Properties Link */}
            <Link
              href={`/${locale}/profile/saved`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-charcoal hover:bg-sand-beige/20 transition-colors"
            >
              <FiHeart className="text-gold text-lg" />
              <span>{t('nav.saved')}</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors border-t border-gold/10"
            >
              <FiLogOut className="text-lg" />
              <span>{t('nav.signOut')}</span>
            </button>
          </>
        ) : (
          /* Show Sign In when NOT logged in */
          <Link
            href={`/${locale}/login`}
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-3 bg-emerald-green text-white rounded-xl mx-4"
          >
            {t('nav.signIn')}
          </Link>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>      
    </div>
      </motion.nav>
    </>
  );
}