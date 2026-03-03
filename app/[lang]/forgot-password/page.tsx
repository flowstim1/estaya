'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiArrowLeft, 
  FiCheckCircle,
  FiLock,
  FiAlertCircle
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // Always show success even if email doesn't exist (security best practice)
      setIsSubmitted(true);
      
      // Log error for debugging but don't show to user
      if (!data.success) {
        console.log('Forgot password API returned:', data.error);
      }
    } catch (err) {
      console.error('Network error:', err);
      // Still show success for security (don't reveal if email exists)
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
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
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            {/* Back to Login Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-dark-charcoal/60 hover:text-gold transition-colors mb-8 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Login</span>
              </Link>
            </motion.div>

            {/* Forgot Password Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gold/20"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiLock className="text-3xl text-gold" />
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="font-playfair text-3xl text-dark-charcoal mb-2">
                  Forgot <span className="text-gold">Password?</span>
                </h1>
                <p className="text-dark-charcoal/60">
                  {!isSubmitted 
                    ? "Enter your email and we'll send you reset instructions"
                    : "Check your email for reset instructions"
                  }
                </p>
              </div>

              {/* Error Message - Only shown for validation errors */}
              <AnimatePresence>
                {error && !isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3"
                  >
                    <FiAlertCircle className="text-red-500 text-xl" />
                    <p className="text-red-600 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSubmitted ? (
                /* Email Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-dark-charcoal/70 mb-2 text-sm font-medium">
                      Email Address
                    </label>
                    <div className="relative group">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:text-emerald-green transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kamal@estaya.ma"
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-green to-gold text-white py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </button>

                  {/* Additional Help */}
                  <p className="text-center text-sm text-dark-charcoal/60">
                    Remember your password?{' '}
                    <Link href="/login" className="text-gold hover:text-emerald-green transition-colors font-medium">
                      Sign in
                    </Link>
                  </p>
                </form>
              ) : (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="text-5xl text-emerald-500" />
                  </div>
                  
                  <h2 className="font-playfair text-2xl text-dark-charcoal mb-4">
                    Check Your Email
                  </h2>
                  
                  <div className="bg-gradient-to-r from-gold/5 to-emerald-green/5 rounded-xl p-4 mb-6">
                    <p className="text-dark-charcoal/70 mb-2">
                      If an account exists with this email, we've sent reset instructions to:
                    </p>
                    <p className="text-gold font-medium text-lg">{email}</p>
                  </div>

                  <p className="text-dark-charcoal/60 text-sm mb-8">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-gold hover:text-emerald-green transition-colors font-medium"
                    >
                      try again
                    </button>
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block w-full bg-gradient-to-r from-emerald-green to-gold text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      Return to Login
                    </Link>
                    
                    <Link
                      href="/contact"
                      className="block w-full border-2 border-gold text-gold py-3 rounded-xl hover:bg-gold hover:text-dark-charcoal transition-all font-medium"
                    >
                      Contact Support
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-gold/10">
                <p className="text-xs text-dark-charcoal/40 text-center">
                  Having trouble? Contact our support team at{' '}
                  <a href="mailto:support@estaya.ma" className="text-gold hover:underline">
                    support@estaya.ma
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Security Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-dark-charcoal/30 flex items-center justify-center gap-2">
                <FiLock className="text-gold" />
                We'll never ask for your password via email. Stay safe.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}