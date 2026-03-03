'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiStar, FiHeart, FiHome, FiLogIn } from 'react-icons/fi';

interface UpgradeBannerProps {
  type: 'property' | 'save' | 'list' | 'contact';
}

export default function UpgradeBanner({ type }: UpgradeBannerProps) {
  const messages = {
    property: {
      title: 'See More Luxury Properties',
      description: 'Create a free account to view all 10+ exclusive properties',
      icon: FiHome
    },
    save: {
      title: 'Save Your Favorites',
      description: 'Create an account to save properties and get notified of price drops',
      icon: FiHeart
    },
    list: {
      title: 'List Your Property',
      description: 'Create an account to list your luxury property for sale or rent',
      icon: FiStar
    },
    contact: {
      title: 'Contact Agents',
      description: 'Create an account to message agents and schedule viewings',
      icon: FiStar
    }
  };

  const message = messages[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-emerald-green to-gold rounded-2xl p-6 text-white shadow-2xl my-8"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <message.icon className="text-2xl" />
        </div>
        <div className="flex-1">
          <h3 className="font-playfair text-xl font-bold mb-1">{message.title}</h3>
          <p className="text-white/80 text-sm mb-4">{message.description}</p>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="bg-white text-emerald-green px-4 py-2 rounded-lg hover:bg-gold hover:text-dark-charcoal transition-all font-medium text-sm flex items-center gap-2"
            >
              <FiLogIn />
              Sign In
            </Link>
            <Link
              href="/register"
              className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-green transition-all font-medium text-sm"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}