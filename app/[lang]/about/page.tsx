'use client';

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FiAward, 
  FiUsers, 
  FiGlobe, 
  FiHeart,
  FiStar,
  FiShield,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Properties Sold' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Expert Agents' },
    { number: '8', label: 'Cities Covered' }
  ]

  const values = [
    { 
      icon: FiAward, 
      title: 'Excellence', 
      desc: 'Premium service at every step',
      color: 'from-gold to-gold/80'
    },
    { 
      icon: FiUsers, 
      title: 'Trust', 
      desc: 'Your peace of mind, our priority',
      color: 'from-emerald-green to-emerald-green/80'
    },
    { 
      icon: FiGlobe, 
      title: 'Reach', 
      desc: 'Serving local & global clients',
      color: 'from-gold to-emerald-green'
    },
    { 
      icon: FiHeart, 
      title: 'Passion', 
      desc: 'Love for Moroccan real estate',
      color: 'from-sand-beige to-gold'
    }
  ]

  const team = [
    {
      name: 'Kamal',
      role: 'Senior Property Advisor',
      phone: '+212 6600 99519',
      email: 'kamal@estaya.ma',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80'
    },
    {
      name: 'Fatima Zahra',
      role: 'Luxury Property Specialist',
      phone: '+212 6612 34567',
      email: 'fatima@estaya.ma',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=988&q=80'
    },
    {
      name: 'Youssef',
      role: 'International Investments',
      phone: '+212 6623 45678',
      email: 'youssef@estaya.ma',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ]

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
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-playfair text-6xl md:text-7xl text-dark-charcoal mb-6">
              Our <span className="text-gold">Story</span>
            </h1>
            <p className="text-dark-charcoal/60 text-xl max-w-3xl mx-auto leading-relaxed">
              ESTAYA was born from a vision to transform the Moroccan real estate experience — 
              combining luxury, trust, and deep local expertise.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-emerald-green mx-auto mt-8 rounded-full" />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-gold/10 hover:border-gold/30 transition-all"
              >
                <div className="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-dark-charcoal/60 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gold/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full" />
              <h2 className="font-playfair text-3xl font-bold text-gold mb-4">Our Mission</h2>
              <p className="text-dark-charcoal/70 leading-relaxed text-lg">
                To connect people with spaces that inspire, through exceptional service, 
                transparency, and a deep understanding of Morocco's unique property landscape.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-emerald-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gold/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-green/5 rounded-br-full" />
              <h2 className="font-playfair text-3xl font-bold text-emerald-green mb-4">Our Vision</h2>
              <p className="text-dark-charcoal/70 leading-relaxed text-lg">
                To become Morocco's most trusted real estate platform, recognized for excellence 
                in serving both local and international clients.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-green to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-20"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-dark-charcoal mb-4">
              What We Stand <span className="text-gold">For</span>
            </h2>
            <p className="text-dark-charcoal/60 text-lg mb-12 max-w-2xl mx-auto">
              Our core values guide everything we do
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gold/10 hover:-translate-y-2"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-3xl text-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-dark-charcoal mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-dark-charcoal/60">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-dark-charcoal text-center mb-4">
              Meet Our <span className="text-gold">Experts</span>
            </h2>
            <p className="text-dark-charcoal/60 text-lg text-center mb-12 max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gold/10"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-playfair text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-gold text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-dark-charcoal/60">
                      <FiPhone className="text-gold text-sm" />
                      <a href={`tel:${member.phone}`} className="text-sm hover:text-gold transition-colors">
                        {member.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-dark-charcoal/60">
                      <FiMail className="text-gold text-sm" />
                      <a href={`mailto:${member.email}`} className="text-sm hover:text-gold transition-colors">
                        {member.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-emerald-green/90 to-gold/90 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, #FFFFFF 0px, #FFFFFF 2px, transparent 2px, transparent 20px)`,
              }} />
            </div>
            
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 relative z-10">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Let our luxury property experts guide you to the perfect investment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/buy"
                className="bg-white text-emerald-green px-8 py-4 rounded-xl hover:bg-gold hover:text-dark-charcoal transition-all duration-300 font-medium shadow-lg"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-emerald-green transition-all duration-300 font-medium"
              >
                Contact an Agent
              </Link>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
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