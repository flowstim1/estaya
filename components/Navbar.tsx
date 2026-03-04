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
  const { currency, setCurrency } = useCurrency();

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
            <Link href={`/${locale}`} className="group relative">
<span className="font-playfair text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#F5E6D3] to-[#E4C9A7] bg-clip-text text-transparent drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] tracking-wide">
  ESTAYA
</span>
  </Link>

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

            <div className="hidden lg:flex items-center space-x-1">
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

                {hoveredItem === 'currency' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-dark-charcoal text-white text-xs py-1 px-2 rounded-lg z-50"
                  >
                    {currency}
                  </motion.div>
                )}

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

              <LanguageSwitcher isScrolled={isScrolled} />

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

                    {hoveredItem === 'profile' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 right-0 whitespace-nowrap bg-dark-charcoal text-white text-xs py-1 px-2 rounded-lg z-50"
                      >
                        {user.name.split(' ')[0]}
                      </motion.div>
                    )}

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

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden overflow-y-auto max-h-[80vh] bg-white shadow-xl rounded-b-2xl mt-2 border-t border-gold/10"
              >
                <div className="pt-4 pb-6 px-2">
                  {/* SECTION 1 - MAIN NAVIGATION */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gold uppercase tracking-wider px-4 mb-2">Navigation</p>
                    {navLinks.slice(0, 4).map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-4 py-4 rounded-xl text-dark-charcoal hover:bg-gradient-to-r hover:from-gold/10 hover:to-emerald-green/10 active:bg-gold/20 transition-all duration-200"
                        >
                          <Icon className="text-gold text-xl w-6" />
                          <span className="font-medium text-base">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* DIVIDER */}
                  <div className="border-t border-gold/10 my-4 mx-4"></div>

                  {/* SECTION 2 - COMPANY */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gold uppercase tracking-wider px-4 mb-2">Company</p>
                    {navLinks.slice(4, 6).map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-4 py-4 rounded-xl text-dark-charcoal hover:bg-gradient-to-r hover:from-gold/10 hover:to-emerald-green/10 active:bg-gold/20 transition-all duration-200"
                        >
                          <Icon className="text-gold text-xl w-6" />
                          <span className="font-medium text-base">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* DIVIDER */}
                  <div className="border-t border-gold/10 my-4 mx-4"></div>

                  {/* SECTION 3 - PREFERENCES */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-gold uppercase tracking-wider px-4 mb-2">Preferences</p>
                    <div className="flex items-center gap-2 px-4">
                      {/* Currency Selector */}
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as 'MAD' | 'EUR' | 'USD')}
                        className="flex-1 px-4 py-3 bg-sand-beige/10 border border-gold/20 rounded-xl text-sm text-dark-charcoal focus:outline-none focus:border-gold"
                      >
                        {currencies.map((curr) => (
                          <option key={curr.code} value={curr.code}>
                            {curr.flag} {curr.code}
                          </option>
                        ))}
                      </select>

                      {/* Language Icons - FR/EN */}
                      <div className="flex gap-1">
                        <Link
                          href="/fr"
                          onClick={() => setIsOpen(false)}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                            locale === 'fr' 
                              ? 'bg-gradient-to-r from-emerald-green to-gold text-white' 
                              : 'bg-sand-beige/10 text-dark-charcoal/70 hover:bg-gold/10 border border-gold/20'
                          }`}
                        >
                          FR
                        </Link>
                        <Link
                          href="/en"
                          onClick={() => setIsOpen(false)}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                            locale === 'en' 
                              ? 'bg-gradient-to-r from-emerald-green to-gold text-white' 
                              : 'bg-sand-beige/10 text-dark-charcoal/70 hover:bg-gold/10 border border-gold/20'
                          }`}
                        >
                          EN
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="border-t border-gold/10 my-4 mx-4"></div>

                  {/* SECTION 4 - ACCOUNT */}
                  {user ? (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gold uppercase tracking-wider px-4 mb-2">Account</p>
                      
                      {/* Profile Card */}
                      <Link
                        href={`/${locale}/profile`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl bg-gradient-to-r from-gold/5 to-emerald-green/5 border border-gold/10 mb-2"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-green to-gold flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-dark-charcoal">{user.name}</p>
                          <p className="text-xs text-dark-charcoal/60 truncate">{user.email}</p>
                        </div>
                      </Link>

                      {/* Saved Properties */}
                      <Link
                        href={`/${locale}/profile/saved`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-dark-charcoal hover:bg-sand-beige/20 transition-colors"
                      >
                        <FiHeart className="text-gold text-xl w-6" />
                        <span className="text-base">{t('nav.saved')}</span>
                      </Link>

                      {/* Sign Out */}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="text-xl w-6" />
                        <span className="text-base font-medium">{t('nav.signOut')}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-gold uppercase tracking-wider px-4 mb-2">Account</p>
                      <Link
                        href={`/${locale}/login`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 mx-4 px-4 py-4 bg-gradient-to-r from-emerald-green to-gold text-white rounded-xl font-medium"
                      >
                        <FiUser className="text-lg" />
                        <span>{t('nav.signIn')}</span>
                      </Link>
                    </div>
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