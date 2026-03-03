'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({ 
  phoneNumber = '+212660099519', 
  message = 'Hello, I am interested in your luxury properties.' 
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a small delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

  const predefinedMessages = [
    'Hello, I am interested in your luxury properties.',
    'I would like to schedule a visit.',
    'Do you have any new listings in Casablanca?',
    'I need more information about the villas.',
    'I am interested in commercial spaces.'
  ];

  return (
    <>
      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
          >
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-dark-charcoal text-white text-sm py-2 px-4 rounded-lg mb-2 shadow-lg relative"
                >
                  Chat with Kamal on WhatsApp
                  <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-dark-charcoal transform rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowPopup(true)}
              className="bg-[#25D366] hover:bg-[#20BA5C] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
            >
              <FaWhatsapp className="text-3xl relative z-10" />
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Pulse Effect */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-[#25D366]/30 rounded-full -z-10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-dark-charcoal/40 hover:text-dark-charcoal transition-colors"
              >
                <FiX className="text-xl" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaWhatsapp className="text-4xl text-[#25D366]" />
                </div>
                <h3 className="font-playfair text-2xl text-dark-charcoal mb-2">
                  Chat with <span className="text-gold">Kamal</span>
                </h3>
                <p className="text-dark-charcoal/60 text-sm">
                  Our luxury property expert is here to help you
                </p>
              </div>

              {/* Agent Info */}
              <div className="bg-gradient-to-r from-gold/5 to-emerald-green/5 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-emerald-green rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">K</span>
                  </div>
                  <div>
                    <p className="font-playfair text-lg text-dark-charcoal">Kamal</p>
                    <p className="text-sm text-dark-charcoal/60">Senior Property Advisor</p>
                    <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Online now
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Messages */}
              <div className="mb-6">
                <p className="text-sm text-dark-charcoal/60 mb-3">Quick messages:</p>
                <div className="space-y-2">
                  {predefinedMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                        setShowPopup(false);
                      }}
                      className="w-full text-left p-3 bg-sand-beige/10 rounded-xl hover:bg-gold/10 transition-colors text-sm text-dark-charcoal/80"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message Input */}
              <div className="mb-4">
                <label className="block text-sm text-dark-charcoal/60 mb-2">Or write your own message:</label>
                <textarea
                  placeholder="Type your message here..."
                  rows={3}
                  className="w-full p-3 border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all resize-none text-sm"
                  id="customMessage"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={() => {
                  const customMessage = (document.getElementById('customMessage') as HTMLTextAreaElement)?.value;
                  const finalMessage = customMessage || message;
                  window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(finalMessage)}`, '_blank');
                  setShowPopup(false);
                }}
                className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5C] text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" />
                Start WhatsApp Chat
              </button>

              {/* Footer */}
              <p className="text-center text-xs text-dark-charcoal/40 mt-4">
                Kamal typically replies within 5 minutes
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}