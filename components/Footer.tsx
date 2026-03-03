import React from 'react';
import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark-charcoal text-white relative overflow-hidden">
      {/* Decorative K Pattern in Footer */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='20' y='70' font-family='Playfair Display, serif' font-size='80' font-weight='300' fill='%23C6A75E'%3EK%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="font-playfair text-2xl text-gold mb-4">ESTAYA</h3>
            <p className="text-gray-400 mb-4">
              Luxury Real Estate in Morocco. Homes That Move You.
            </p>
            <div className="flex space-x-4">
              {/* Social icons placeholder */}
              <div className="w-10 h-10 bg-emerald-green/20 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                <span className="text-gold">f</span>
              </div>
              <div className="w-10 h-10 bg-emerald-green/20 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                <span className="text-gold">in</span>
              </div>
              <div className="w-10 h-10 bg-emerald-green/20 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                <span className="text-gold">ig</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/buy" className="text-gray-400 hover:text-gold transition-colors">Buy Property</Link></li>
              <li><Link href="/rent" className="text-gray-400 hover:text-gold transition-colors">Rent Property</Link></li>
              <li><Link href="/sell" className="text-gray-400 hover:text-gold transition-colors">Sell Property</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-4">Property Types</h4>
            <ul className="space-y-2">
              <li><Link href="/buy?type=apartment" className="text-gray-400 hover:text-gold transition-colors">Apartments</Link></li>
              <li><Link href="/buy?type=villa" className="text-gray-400 hover:text-gold transition-colors">Villas</Link></li>
              <li><Link href="/buy?type=house" className="text-gray-400 hover:text-gold transition-colors">Houses</Link></li>
              <li><Link href="/buy?type=land" className="text-gray-400 hover:text-gold transition-colors">Lands</Link></li>
              <li><Link href="/restaurants" className="text-gray-400 hover:text-gold transition-colors">Restaurants & Cafés</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <FiMapPin className="text-gold mt-1 flex-shrink-0" />
                <span>123 Mohamed V Boulevard, Casablanca, Morocco</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiPhone className="text-gold" />
                <a href="tel:+212660099519" className="hover:text-gold transition-colors">+212 6600 99519</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiMail className="text-gold" />
                <a href="mailto:info@estaya.ma" className="hover:text-gold transition-colors">info@estaya.ma</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © 2026 Abdellah Abouelmouroua. All rights reserved. Luxury Real Estate in Morocco.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;