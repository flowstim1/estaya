'use client'

import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Youssef Benjelloun',
      location: 'Casablanca',
      text: 'ESTAYA made buying our dream villa effortless. Their team understood exactly what we were looking for.',
      rating: 5
    },
    {
      id: 2,
      name: 'Fatima Zahra El Amrani',
      location: 'Marrakech',
      text: 'As an investor from abroad, I needed a trustworthy partner. ESTAYA exceeded all expectations.',
      rating: 5
    },
    {
      id: 3,
      name: 'Karim Tazi',
      location: 'Rabat',
      text: 'The team helped us sell our family riad at an exceptional price. Highly recommended!',
      rating: 5
    }
  ]

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
            What Our <span className="text-gold">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-dark-charcoal/70 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="font-playfair font-bold text-dark-charcoal">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gold">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-dark-charcoal/40 font-playfair text-sm">
            ESTAYA — Homes That Move You.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Testimonials