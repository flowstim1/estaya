'use client'

import { motion } from 'framer-motion'
import { FiShield, FiClock, FiUsers, FiAward, FiGlobe, FiHeart } from 'react-icons/fi'

const reasons = [
  {
    icon: FiShield,
    title: 'Secure Transactions',
    description: 'Your investment is protected with our secure payment and legal framework.',
    color: 'from-emerald-green to-emerald-green/80'
  },
  {
    icon: FiAward,
    title: 'Premium Properties',
    description: 'Curated selection of the finest properties across Morocco\'s prime locations.',
    color: 'from-gold to-gold/80'
  },
  {
    icon: FiUsers,
    title: 'Expert Advisors',
    description: 'Local market experts with deep knowledge of Moroccan real estate.',
    color: 'from-emerald-green/80 to-emerald-green'
  },
  {
    icon: FiGlobe,
    title: 'International Reach',
    description: 'Serving Moroccan diaspora and global investors with multilingual support.',
    color: 'from-sand-beige to-sand-beige/80'
  },
  {
    icon: FiClock,
    title: 'Fast & Efficient',
    description: 'Streamlined process from search to signature, saving you time and effort.',
    color: 'from-gold/80 to-gold'
  },
  {
    icon: FiHeart,
    title: 'Personalized Service',
    description: 'Tailored property matches based on your unique preferences and needs.',
    color: 'from-emerald-green to-sand-beige'
  }
]

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-dark-charcoal mb-4">
            Why Choose <span className="text-gold">ESTAYA</span>
          </h2>
          <p className="text-dark-charcoal/70 text-lg max-w-2xl mx-auto">
            Experience excellence in every step of your property journey with our premium services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-soft-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${reason.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-3xl text-gold" />
                </div>

                {/* Content */}
                <h3 className="font-playfair text-xl font-bold text-dark-charcoal mb-3">
                  {reason.title}
                </h3>
                <p className="text-dark-charcoal/70 leading-relaxed">
                  {reason.description}
                </p>

                {/* Decorative Line */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${reason.color} group-hover:w-full transition-all duration-500`} />
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '500+', label: 'Properties Sold' },
            { number: '15+', label: 'Years Experience' },
            { number: '50+', label: 'Expert Agents' },
            { number: '8', label: 'Cities Covered' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
                {stat.number}
              </div>
              <div className="text-dark-charcoal/60 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ESTAYA Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-dark-charcoal/30 font-playfair text-sm italic">
            ESTAYA — Homes That Move You.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs