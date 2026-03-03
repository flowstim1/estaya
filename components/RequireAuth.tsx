'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiLock, FiLogIn, FiUserPlus } from 'react-icons/fi';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gold/20 text-center"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiLock className="text-3xl text-gold" />
          </div>
          
          <h1 className="font-playfair text-3xl text-dark-charcoal mb-3">
            Authentication <span className="text-gold">Required</span>
          </h1>
          
          <p className="text-dark-charcoal/60 mb-8">
            You need to be signed in to list a property. Create an account or sign in to continue.
          </p>

          <div className="space-y-3">
            <Link
              href="/login?redirect=sell"
              className="block w-full bg-gradient-to-r from-emerald-green to-gold text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
            >
              <FiLogIn />
              Sign In
            </Link>
            
            <Link
              href="/register?redirect=sell"
              className="block w-full border-2 border-gold text-gold py-3 rounded-xl hover:bg-gold hover:text-dark-charcoal transition-all font-medium flex items-center justify-center gap-2"
            >
              <FiUserPlus />
              Create Account
            </Link>
            
            <Link
              href="/"
              className="block text-sm text-dark-charcoal/40 hover:text-gold transition-colors mt-4"
            >
              Return to Home
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gold/10">
            <p className="text-xs text-dark-charcoal/40">
              Listing a property is free. You only pay when your property is sold.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}