'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PropertyCard from './PropertyCard'
import Link from 'next/link'

interface Property {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  type: string;
  purpose: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  featured: boolean;
}

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        // Handle both array response and {success, data} response
        let propertiesData = [];
        if (Array.isArray(data)) {
          propertiesData = data;
        } else if (data.success && Array.isArray(data.data)) {
          propertiesData = data.data;
        }
        
        // Filter only featured properties
        const featured = propertiesData.filter((p: Property) => p.featured === true)
        setProperties(featured)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching properties:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <p className="text-dark-charcoal/60">Loading featured properties...</p>
        </div>
      </section>
    )
  }

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
            Featured <span className="text-gold">Properties</span>
          </h2>
          <p className="text-dark-charcoal/70 text-lg max-w-2xl mx-auto">
            Curated just for you — exceptional spaces that redefine luxury living.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/buy"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gold text-gold rounded-xl hover:bg-gold hover:text-dark-charcoal transition-all duration-300 font-semibold text-lg group"
          >
            View All Properties
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* ESTAYA Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-dark-charcoal/40 font-playfair text-sm"
        >
          <p>ESTAYA — Homes That Move You.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProperties