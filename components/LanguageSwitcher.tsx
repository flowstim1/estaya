'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { locales, localeNames, localeDirections, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  mobile?: boolean;
}

export default function LanguageSwitcher({ isScrolled = false, mobile = false }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect current language from URL
  useEffect(() => {
    const pathLocale = pathname?.split('/')[1] as Locale;
    if (locales.includes(pathLocale)) {
      setCurrentLocale(pathLocale);
    }
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (locale: Locale) => {
    // Get the path without the current locale
    const pathParts = pathname?.split('/') || [];
    
    // Remove the current locale if it exists
    if (locales.includes(pathParts[1] as Locale)) {
      pathParts.splice(1, 1);
    }
    
    // Construct new path with new locale
    const newPath = `/${locale}${pathParts.join('/')}`;
    
    // Update HTML direction for RTL support
    document.documentElement.dir = localeDirections[locale];
    document.documentElement.lang = locale;
    
    router.push(newPath);
    setIsOpen(false);
  };

  // Flag emojis for visual representation
  const flagEmojis: Record<Locale, string> = {
    en: '🇬🇧',
    fr: '🇫🇷',
    ar: '🇲🇦',
  };

  // Mobile version
  if (mobile) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors ${
              currentLocale === locale
                ? 'bg-gold text-white'
                : 'bg-sand-beige/10 text-dark-charcoal/70 hover:bg-gold/20'
            }`}
          >
            <span>{flagEmojis[locale]}</span>
            <span className="text-sm font-medium">{localeNames[locale]}</span>
          </button>
        ))}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
          isScrolled 
            ? 'bg-emerald-green/10 text-emerald-green hover:bg-emerald-green/20' 
            : 'bg-white/10 text-white hover:bg-white/20'
        } ${isOpen ? 'ring-2 ring-gold/50' : ''}`}
        aria-label="Switch language"
      >
        <FiGlobe className={`text-lg ${isOpen ? 'text-gold' : ''}`} />
        <span className="hidden md:inline">{flagEmojis[currentLocale]} {localeNames[currentLocale]}</span>
        <FiChevronDown className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gold/20 overflow-hidden z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-sand-beige/20 transition-colors ${
                currentLocale === locale ? 'bg-gold/10 text-gold' : 'text-dark-charcoal'
              }`}
            >
              <span className="text-xl">{flagEmojis[locale]}</span>
              <span className="flex-1">{localeNames[locale]}</span>
              {currentLocale === locale && (
                <span className="w-2 h-2 bg-gold rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}