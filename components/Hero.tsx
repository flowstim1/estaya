'use client'

import { motion } from 'framer-motion'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-charcoal/90 via-dark-charcoal/70 to-dark-charcoal/30" />
      </div>

      {/* Content */}
      <div className="container-custom relative text-center px-4 sm:px-6 pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white drop-shadow-[0_4px_12px_rgba(198,167,94,0.4)] tracking-wide">
            ESTAYA
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#F5E6D3] mb-2 drop-shadow-lg">
            Exceptional Properties.
          </h2>
          <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-5xl text-[#E4C9A7] italic mb-3 sm:mb-4 drop-shadow-md">
            Inspired Living.
          </h3>

          <div className="space-y-1 sm:space-y-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5E6D3]/90 font-light drop-shadow">
              Buy. Sell. Rent. Invest with Confidence.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light italic drop-shadow flex items-center justify-center gap-2">
              <span className="text-[#E4C9A7]">ESTAYA</span> 
              <span className="text-white/60">—</span> 
              <span className="text-[#F5E6D3]">Homes That Move You.</span>
            </p>
          </div>
        </motion.div>

        {/* Search Bar with refined styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero