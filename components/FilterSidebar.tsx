'use client'

import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const FilterSidebar = () => {
  const [priceOpen, setPriceOpen] = useState(true)
  const [bedroomsOpen, setBedroomsOpen] = useState(true)
  const [citiesOpen, setCitiesOpen] = useState(true)

  const cities = ['Casablanca', 'Marrakech', 'Rabat', 'Tangier', 'Fes', 'Agadir']
  const propertyTypes = ['Apartment', 'Villa', 'House', 'Land', 'Commercial']

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <h3 className="font-playfair text-xl font-bold text-charcoal mb-6">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-charcoal mb-3"
        >
          Price Range
          {priceOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {priceOpen && (
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              className="w-full accent-gold"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 px-3 py-2 border border-sand/30 rounded-lg focus:border-gold outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 px-3 py-2 border border-sand/30 rounded-lg focus:border-gold outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Cities */}
      <div className="mb-6">
        <button
          onClick={() => setCitiesOpen(!citiesOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-charcoal mb-3"
        >
          Cities
          {citiesOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {citiesOpen && (
          <div className="space-y-2">
            {cities.map((city) => (
              <label key={city} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-sand/30 text-gold focus:ring-gold" />
                <span className="text-charcoal/70">{city}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <button
          onClick={() => setCitiesOpen(!citiesOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-charcoal mb-3"
        >
          Property Type
          {citiesOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {citiesOpen && (
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-sand/30 text-gold focus:ring-gold" />
                <span className="text-charcoal/70">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Bedrooms */}
      <div className="mb-6">
        <button
          onClick={() => setBedroomsOpen(!bedroomsOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-charcoal mb-3"
        >
          Bedrooms
          {bedroomsOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {bedroomsOpen && (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, '5+'].map((num) => (
              <button
                key={num}
                className="px-4 py-2 border border-sand/30 rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Apply Filters Button */}
      <button className="w-full py-3 bg-gold text-charcoal rounded-xl font-semibold hover:bg-gold-dark transition-colors">
        Apply Filters
      </button>
    </div>
  )
}

export default FilterSidebar