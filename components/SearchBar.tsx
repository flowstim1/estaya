'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin, FiHome, FiDollarSign, FiArrowRight } from 'react-icons/fi'

const SearchBar = () => {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Build query parameters
    const params = new URLSearchParams()
    if (location) params.append('city', location)
    if (propertyType) params.append('type', propertyType)
    if (priceRange) params.append('priceRange', priceRange)
    
    router.push(`/buy?${params.toString()}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20"
    >
      {/* Main Search Bar */}
      <form 
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2 border border-gold/20"
      >
        <div className="flex flex-col lg:flex-row items-stretch gap-2">
          {/* Location */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/70 group-focus-within:text-gold transition-colors">
              <FiMapPin className="text-xl" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-transparent rounded-xl focus:border-gold/30 outline-none transition-all placeholder:text-dark-charcoal/40 text-dark-charcoal"
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
            />
          </div>

          {/* Property Type */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/70 group-focus-within:text-gold transition-colors">
              <FiHome className="text-xl" />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-transparent rounded-xl focus:border-gold/30 outline-none appearance-none cursor-pointer text-dark-charcoal"
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartments</option>
              <option value="villa">Villas</option>
              <option value="house">Houses</option>
              <option value="commercial">Commercial</option>
              <option value="land">Lands</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/70 group-focus-within:text-gold transition-colors">
              <FiDollarSign className="text-xl" />
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-transparent rounded-xl focus:border-gold/30 outline-none appearance-none cursor-pointer text-dark-charcoal"
            >
              <option value="">Price Range</option>
              <option value="0-1M">Under 1M MAD</option>
              <option value="1M-3M">1M - 3M MAD</option>
              <option value="3M-5M">3M - 5M MAD</option>
              <option value="5M+">5M+ MAD</option>
            </select>
          </div>

          {/* Search Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="lg:w-auto w-full bg-gradient-to-r from-emerald-green to-gold text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <FiSearch className="text-xl group-hover:scale-110 transition-transform" />
            <span className="lg:hidden">Search</span>
            <FiArrowRight className="hidden lg:block text-xl group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Quick Filters (Optional - can be expanded) */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-2 border-t border-gold/10 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-sand-beige/10 rounded-xl text-sm text-dark-charcoal/70 hover:bg-gold hover:text-white transition-colors">
              Furnished
            </button>
            <button className="px-4 py-2 bg-sand-beige/10 rounded-xl text-sm text-dark-charcoal/70 hover:bg-gold hover:text-white transition-colors">
              Pool
            </button>
            <button className="px-4 py-2 bg-sand-beige/10 rounded-xl text-sm text-dark-charcoal/70 hover:bg-gold hover:text-white transition-colors">
              Garden
            </button>
            <button className="px-4 py-2 bg-sand-beige/10 rounded-xl text-sm text-dark-charcoal/70 hover:bg-gold hover:text-white transition-colors">
              Parking
            </button>
            <button className="px-4 py-2 bg-sand-beige/10 rounded-xl text-sm text-dark-charcoal/70 hover:bg-gold hover:text-white transition-colors">
              Sea View
            </button>
          </div>
        </motion.div>
      </form>

      {/* Popular Searches */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-dark-charcoal/40">Popular:</span>
        {['Marrakech', 'Casablanca', 'Villas', 'Pool', 'Furnished'].map((item) => (
          <button
            key={item}
            onClick={() => {
              if (item === 'Marrakech' || item === 'Casablanca') {
                setLocation(item)
              } else if (item === 'Villas') {
                setPropertyType('villa')
              }
              router.push(`/buy?${item.toLowerCase()}=true`)
            }}
            className="px-3 py-1 text-dark-charcoal/60 hover:text-gold transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default SearchBar