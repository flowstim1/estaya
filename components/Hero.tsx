'use client'

import { motion } from 'framer-motion'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-charcoal/80 via-dark-charcoal/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="font-playfair text-7xl md:text-9xl font-bold text-white">
            ESTAYA
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-3">
            Exceptional Properties.
          </h2>
          <h3 className="font-playfair text-3xl md:text-5xl text-gold italic mb-4">
            Inspired Living.
          </h3>

          <div className="space-y-2">
            <p className="text-xl md:text-2xl text-sand-beige font-light">
              Buy. Sell. Rent. Invest with Confidence.
            </p>
            <p className="text-lg md:text-xl text-white/80 font-light italic">
              ESTAYA — Homes That Move You.
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero  // Make sure this line exists