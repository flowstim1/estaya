'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiHome, 
  FiArrowRight, 
  FiEye,
  FiPlusCircle
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';

export default function SellSuccessPage() {
  const router = useRouter();

  // Auto redirect to home after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);
    return () => clearTimeout(timer);
  }, [router]);

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Success Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gold/20 overflow-hidden">
              {/* Header with decorative element */}
              <div className="relative h-32 bg-gradient-to-r from-emerald-green to-gold flex items-center justify-center">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                    <div className="w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="text-6xl text-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-20 p-8 text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-playfair text-4xl md:text-5xl text-dark-charcoal mb-4"
                >
                  Property <span className="text-gold">Listed!</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-dark-charcoal/60 text-lg mb-8 max-w-lg mx-auto"
                >
                  Congratulations! Your luxury property has been successfully listed on ESTAYA. It will be reviewed by our team and visible to potential buyers shortly.
                </motion.p>

                {/* Stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8"
                >
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <FiEye className="text-2xl text-emerald-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-emerald-500">1k+</p>
                    <p className="text-xs text-dark-charcoal/60">Daily Views</p>
                  </div>
                  <div className="bg-gold/10 rounded-xl p-4">
                    <FiHome className="text-2xl text-gold mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gold">24h</p>
                    <p className="text-xs text-dark-charcoal/60">Listing Active</p>
                  </div>
                </motion.div>

                {/* Agent Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-gold/5 to-emerald-green/5 rounded-xl p-6 mb-8 border border-gold/10"
                >
                  <p className="text-dark-charcoal/70 italic">
                    "Our team will contact you within 24 hours to verify your listing. 
                    In the meantime, your property is live and visible to our network of qualified buyers."
                  </p>
                  <p className="text-gold font-medium mt-2">— Kamal, Senior Property Advisor</p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link
                    href="/buy"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-green to-gold text-white rounded-xl hover:shadow-lg transition-all font-medium group"
                  >
                    <FiEye className="group-hover:scale-110 transition-transform" />
                    <span>View Properties</span>
                  </Link>
                  <Link
                    href="/sell"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold rounded-xl hover:bg-gold hover:text-white transition-all font-medium group"
                  >
                    <FiPlusCircle className="group-hover:scale-110 transition-transform" />
                    <span>List Another</span>
                  </Link>
                </motion.div>

                {/* Auto-redirect message */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-dark-charcoal/40 mt-8"
                >
                  You will be redirected to the home page in 10 seconds...
                </motion.p>
              </div>
            </div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-dark-charcoal/40 text-sm mb-3">Share your success</p>
              <div className="flex justify-center gap-4">
                {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((social) => (
                  <button
                    key={social}
                    className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all border border-gold/20"
                  >
                    <span className="capitalize text-sm font-medium">{social[0]}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-dark-charcoal/30 font-playfair text-lg italic">
                ESTAYA — Homes That Move You.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}