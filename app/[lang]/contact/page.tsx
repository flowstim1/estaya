'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiSend, 
  FiUser,
  FiClock,
  FiCheck,
  FiCopy
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import ProtectedAction from '@/components/ProtectedAction'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
    
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24 pb-16 relative overflow-hidden">
        {/* Luxury K Pattern Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-10 text-[300px] font-playfair text-emerald-green rotate-12">K</div>
            <div className="absolute bottom-20 right-10 text-[350px] font-playfair text-gold -rotate-12">K</div>
            <div className="absolute top-1/3 right-1/4 text-[200px] font-playfair text-sand-beige rotate-45">K</div>
          </div>
          
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C6A75E 0px, #C6A75E 2px, transparent 2px, transparent 30px)`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-playfair text-5xl md:text-7xl text-dark-charcoal mb-4">
              Get in <span className="text-gold">Touch</span>
            </h1>
            <p className="text-dark-charcoal/60 text-xl max-w-2xl mx-auto">
              We're here to help you find your perfect property. Reach out anytime.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-emerald-green mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700">Message Sent!</h3>
                    <p className="text-emerald-600">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gold/10 h-full">
                <h2 className="font-playfair text-2xl font-bold text-dark-charcoal mb-6">
                  Send us a <span className="text-gold">Message</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-dark-charcoal/70 mb-2 text-sm">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                      placeholder="Ahmed Benani"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-dark-charcoal/70 mb-2 text-sm">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                      placeholder="ahmed@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-dark-charcoal/70 mb-2 text-sm">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all"
                      placeholder="+212 6XX XXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-dark-charcoal/70 mb-2 text-sm">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:border-gold focus:outline-none transition-all resize-none"
                      placeholder="I'm interested in luxury properties in Casablanca..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-emerald-green to-gold text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gold/10">
                <h2 className="font-playfair text-2xl font-bold text-dark-charcoal mb-6">
                  Contact <span className="text-gold">Information</span>
                </h2>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4 group p-4 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark-charcoal mb-1">Address</h3>
                      <p className="text-dark-charcoal/60">123 Mohamed V Boulevard, Casablanca, Morocco</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group p-4 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiPhone className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark-charcoal mb-1">Phone</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-dark-charcoal/60">+212 6600 99519</p>
                        <button
                          onClick={() => copyToClipboard('+212660099519', 'phone')}
                          className="flex items-center gap-1 text-xs bg-gold/10 px-3 py-1 rounded-full hover:bg-gold/20 transition-colors"
                        >
                          {copied === 'phone' ? <FiCheck className="text-green-500" /> : <FiCopy />}
                          <span>{copied === 'phone' ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-gold mt-1">Contact Kamal directly</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group p-4 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMail className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark-charcoal mb-1">Email</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-dark-charcoal/60">info@estaya.ma</p>
                        <button
                          onClick={() => copyToClipboard('info@estaya.ma', 'email')}
                          className="flex items-center gap-1 text-xs bg-gold/10 px-3 py-1 rounded-full hover:bg-gold/20 transition-colors"
                        >
                          {copied === 'email' ? <FiCheck className="text-green-500" /> : <FiCopy />}
                          <span>{copied === 'email' ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
// For contact agent button
<ProtectedAction action="contact">
  <button className="w-full bg-gold hover:bg-gold/80 text-dark-charcoal font-bold py-3 px-6 rounded-xl transition-colors duration-300">
    Contact Agent
  </button>
</ProtectedAction>
                {/* Agent Info */}
                <div className="mt-6 pt-6 border-t border-gold/10">
                  <h3 className="font-playfair text-lg font-bold text-gold mb-4">Your Personal Agent</h3>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-green/5 to-transparent rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold to-emerald-green rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">K</span>
                    </div>
                    <div>
                      <p className="font-playfair text-xl font-bold text-dark-charcoal">Kamal</p>
                      <p className="text-sm text-dark-charcoal/60">Senior Property Advisor</p>
                      <p className="text-xs text-gold flex items-center gap-1 mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Available 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gold/10">
                <h2 className="font-playfair text-2xl font-bold text-dark-charcoal mb-4">
                  Our <span className="text-gold">Location</span>
                </h2>
                <div className="bg-gradient-to-br from-gold/5 to-emerald-green/5 rounded-xl h-64 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, #C6A75E 0px, #C6A75E 2px, transparent 2px, transparent 20px)`,
                    }} />
                  </div>
                  <p className="text-dark-charcoal/40 relative z-10">Map Integration Coming Soon</p>
                </div>
                <p className="text-sm text-dark-charcoal/60 mt-4">
                  <FiMapPin className="inline text-gold mr-1" />
                  Casablanca Financial Center, Morocco
                </p>
              </div>

              {/* Business Hours */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gold/10">
                <div className="flex items-center gap-3 mb-4">
                  <FiClock className="text-2xl text-gold" />
                  <h2 className="font-playfair text-2xl font-bold text-dark-charcoal">
                    Business <span className="text-gold">Hours</span>
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                    <span className="text-dark-charcoal/70">Monday - Friday</span>
                    <span className="font-semibold text-gold">9:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                    <span className="text-dark-charcoal/70">Saturday</span>
                    <span className="font-semibold text-gold">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gold/5 to-transparent rounded-xl">
                    <span className="text-dark-charcoal/70">Sunday</span>
                    <span className="font-semibold text-red-400">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-dark-charcoal/30 font-playfair text-lg italic">
              ESTAYA — Homes That Move You.
            </p>
            <p className="text-dark-charcoal/20 text-xs mt-2">
              Website crafted by <span className="text-gold">Abdellah Abouelmouroua</span>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}