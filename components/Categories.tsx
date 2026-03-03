'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FiHome,
  FiGrid,
  FiMap,
  FiCoffee,
  FiBriefcase
} from 'react-icons/fi'

const categories = [
  {
    name: 'Apartments',
    icon: FiGrid,
    href: '/buy?type=apartment',
    count: '150+',
    color: 'from-emerald-green to-emerald-green/80'
  },
  {
    name: 'Villas',
    icon: FiHome,
    href: '/buy?type=villa',
    count: '85+',
    color: 'from-gold to-gold/80'
  },
  {
    name: 'Houses',
    icon: FiHome,
    href: '/buy?type=house',
    count: '120+',
    color: 'from-emerald-green/80 to-emerald-green'
  },
  {
    name: 'Lands',
    icon: FiMap,
    href: '/buy?type=land',
    count: '60+',
    color: 'from-sand-beige to-sand-beige/80'
  },
  {
    name: 'Restaurants',
    icon: FiCoffee,
    href: '/restaurants',
    count: '45+',
    color: 'from-gold/80 to-gold'
  },
  {
    name: 'Commercial',
    icon: FiBriefcase,
    href: '/buy?type=commercial',
    count: '95+',
    color: 'from-emerald-green to-sand-beige'
  }
]

const Categories = () => {
  return (
    <section className="py-20 bg-soft-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-dark-charcoal mb-4">
            Explore <span className="text-gold">Categories</span>
          </h2>
          <p className="text-dark-charcoal/70 text-lg max-w-2xl mx-auto">
            Discover your perfect space with ESTAYA — where every property tells a story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={category.href}>
                  <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-3xl text-gold" />
                    </div>

                    {/* Content */}
                    <h3 className="font-playfair text-2xl font-bold text-dark-charcoal mb-2">
                      {category.name}
                    </h3>
                    <p className="text-dark-charcoal/60 mb-4">
                      {category.count} properties
                    </p>

                    {/* Explore Link */}
                    <span className="inline-flex items-center text-gold font-semibold group-hover:gap-2 transition-all">
                      Explore
                      <svg className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Welcoming Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='5' y='25' font-family='Playfair Display' font-size='20' fill='%23C6A75E'%3EE%3C/text%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }} />
            </div>

            <p className="font-playfair text-2xl md:text-3xl text-dark-charcoal relative z-10">
              <span className="text-gold font-bold text-4xl mr-2">✦</span>
              <span className="text-gold font-bold">ESTAYA</span> —
              <span className="italic"> "Homes That Move You."</span>
              <span className="text-gold font-bold text-4xl ml-2">✦</span>
            </p>
            <p className="text-dark-charcoal/50 text-sm mt-2">Exceptional Properties. Inspired Living.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Categories