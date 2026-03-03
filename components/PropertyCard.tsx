'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Property {
  id: string
  title: string
  price: number
  location: string
  type: string
  purpose: string
  area: number
  images: string[]
}

interface PropertyCardProps {
  property: Property
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-charcoal text-sm font-semibold rounded-full">
          {property.type}
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-2xl font-bold">{property.price} MAD</p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-playfair text-xl font-bold mb-2">
          <Link href={`/property/${property.id}`}>
            {property.title}
          </Link>
        </h3>
        
        <p className="text-charcoal/60 mb-4">{property.location}</p>
        
        <p className="text-sm text-charcoal/70 mb-4">{property.area} m²</p>

        <Link
          href={`/property/${property.id}`}
          className="block w-full text-center py-3 border border-gold text-gold rounded-xl hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default PropertyCard