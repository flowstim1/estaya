'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ProtectedActionProps {
  children: React.ReactNode;
  action: 'save' | 'list' | 'contact';
  onAction?: () => void;
}

export default function ProtectedAction({ children, action, onAction }: ProtectedActionProps) {
  const [showModal, setShowModal] = useState(false);
  
  const isGuest = typeof window !== 'undefined' && !localStorage.getItem('token');

  const handleClick = (e: React.MouseEvent) => {
    if (isGuest) {
      e.preventDefault();
      setShowModal(true);
    } else if (onAction) {
      onAction();
    }
  };

  const messages = {
    save: {
      title: 'Save Properties',
      description: 'Create a free account to save your favorite properties and get updates.',
      icon: '❤️'
    },
    list: {
      title: 'List Your Property',
      description: 'Create an account to list your luxury property and reach qualified buyers.',
      icon: '🏠'
    },
    contact: {
      title: 'Contact Agents',
      description: 'Create an account to message agents and schedule property viewings.',
      icon: '📞'
    }
  };

  return (
    <>
      <div onClick={handleClick} className={isGuest ? 'cursor-pointer' : ''}>
        {children}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-dark-charcoal/40 hover:text-dark-charcoal"
              >
                <FiX className="text-xl" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{messages[action].icon}</span>
                </div>
                <h3 className="font-playfair text-2xl text-dark-charcoal mb-2">
                  {messages[action].title}
                </h3>
                <p className="text-dark-charcoal/60 mb-6">
                  {messages[action].description}
                </p>
                <div className="space-y-3">
                  <Link
                    href="/login"
                    className="block w-full bg-gradient-to-r from-emerald-green to-gold text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full border-2 border-gold text-gold py-3 rounded-xl hover:bg-gold hover:text-dark-charcoal transition-all font-medium"
                  >
                    Create Free Account
                  </Link>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-sm text-dark-charcoal/40 hover:text-dark-charcoal"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}