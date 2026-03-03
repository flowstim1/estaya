'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiShield,
  FiLock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowLeft,
  FiUser,
  FiHome,
  FiDollarSign,
  FiGlobe,
  FiClock
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';

export default function TermsPage() {
  const sections = [
    {
      icon: FiFileText,
      title: 'Introduction',
      content: 'Welcome to ESTAYA ("Company," "we," "our," "us"). By accessing or using our luxury real estate platform, website, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.',
      note: 'ESTAYA is a Moroccan real estate platform that connects property buyers, sellers, renters, and investors with premium properties throughout Morocco. Our Services are provided to you by Abdellah Abouelmouroua.'
    },
    {
      icon: FiUser,
      title: 'Eligibility',
      content: 'By using our Services, you represent and warrant that:',
      list: [
        'You are at least 18 years of age',
        'You have the legal capacity to enter into binding contracts',
        'You will provide accurate and complete information when creating an account',
        'You will maintain the security of your account credentials',
        'Your use of the Services complies with all applicable laws and regulations in Morocco'
      ]
    },
    {
      icon: FiLock,
      title: 'Account Registration',
      content: 'To access certain features of our platform, you may need to create an account. You are responsible for:',
      list: [
        'Maintaining the confidentiality of your login credentials',
        'All activities that occur under your account',
        'Notifying us immediately of any unauthorized use',
        'Ensuring your account information is accurate and up-to-date'
      ]
    },
    {
      icon: FiHome,
      title: 'Property Listings',
      content: 'When listing a property on ESTAYA, you agree that:',
      list: [
        'You have the legal right to sell or rent the property',
        'All information provided is accurate and not misleading',
        'Property images accurately represent the current condition',
        'You will update listings promptly when properties are sold or rented',
        'You comply with all Moroccan real estate regulations'
      ]
    },
    {
      icon: FiDollarSign,
      title: 'Fees and Payments',
      content: 'ESTAYA may charge fees for certain services. By using these services, you agree to:',
      list: [
        'Pay all applicable fees as described on our platform',
        'Provide valid payment information',
        'Authorize us to charge your selected payment method',
        'All fees are in Moroccan Dirham (MAD) unless stated otherwise',
        'Fees are non-refundable except as required by law'
      ]
    },
    {
      icon: FiAlertCircle,
      title: 'Prohibited Activities',
      content: 'You agree not to:',
      list: [
        'Post false, inaccurate, or misleading information',
        'Violate any laws or regulations',
        'Infringe on intellectual property rights',
        'Attempt to gain unauthorized access to our systems',
        'Use the platform for fraudulent activities',
        'Harass, abuse, or harm other users',
        'Copy, modify, or distribute our content without permission'
      ]
    },
    {
      icon: FiShield,
      title: 'Intellectual Property',
      content: 'All content on ESTAYA, including but not limited to logos, designs, text, graphics, images, and software, is the property of Abdellah Abouelmouroua and is protected by Moroccan and international copyright laws. You may not use our content without express written permission.'
    },
    {
      icon: FiAlertCircle,
      title: 'Limitation of Liability',
      content: 'To the maximum extent permitted by law, ESTAYA and Abdellah Abouelmouroua shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use or inability to use the Services.'
    },
    {
      icon: FiGlobe,
      title: 'Governing Law',
      content: 'These Terms shall be governed by the laws of the Kingdom of Morocco. Any disputes arising under these Terms shall be resolved exclusively by the courts of Casablanca, Morocco.'
    },
    {
      icon: FiClock,
      title: 'Changes to Terms',
      content: 'We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on this page with a new "Last Updated" date. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.'
    }
  ];

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
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-dark-charcoal/60 hover:text-gold transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 bg-gold/10 rounded-full mb-4">
              <FiFileText className="text-4xl text-gold" />
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl text-dark-charcoal mb-4">
              Terms of <span className="text-gold">Service</span>
            </h1>
            <p className="text-dark-charcoal/60 text-xl max-w-2xl mx-auto">
              Please read these terms carefully before using ESTAYA platform
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <p className="text-gold">Last Updated: February 24, 2026</p>
              <div className="w-2 h-2 bg-gold rounded-full" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-emerald-green mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-gold/20">
              {/* Quick Navigation */}
              <div className="mb-10 pb-10 border-b border-gold/10">
                <h2 className="font-playfair text-xl text-dark-charcoal mb-4">Quick Navigation</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="text-sm text-dark-charcoal/60 hover:text-gold transition-colors flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-gold rounded-full" />
                      {section.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-10">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <motion.section
                      key={index}
                      id={`section-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="scroll-mt-24"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold to-emerald-green rounded-xl flex items-center justify-center">
                          <Icon className="text-white text-xl" />
                        </div>
                        <h2 className="font-playfair text-2xl text-dark-charcoal">
                          {section.title}
                        </h2>
                      </div>

                      <div className="pl-16">
                        {section.content && (
                          <p className="text-dark-charcoal/70 leading-relaxed mb-4">
                            {section.content}
                          </p>
                        )}

                        {section.list && (
                          <ul className="space-y-3 mb-4">
                            {section.list.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-dark-charcoal/70">
                                <FiCheckCircle className="text-gold mt-1 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.note && (
                          <div className="mt-4 p-4 bg-gradient-to-r from-gold/5 to-emerald-green/5 rounded-xl border border-gold/10">
                            <p className="text-dark-charcoal/80 font-medium">
                              {section.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.section>
                  );
                })}
              </div>

              {/* Contact Section */}
              <section className="mt-12 pt-8 border-t border-gold/10">
                <h2 className="font-playfair text-2xl text-dark-charcoal mb-6">
                  Questions About <span className="text-gold">These Terms?</span>
                </h2>
                <p className="text-dark-charcoal/70 mb-8">
                  If you have any questions about these Terms, please contact us:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gold/5 to-emerald-green/5 rounded-xl p-6 border border-gold/10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <FiMail className="text-gold" />
                      </div>
                      <h3 className="font-playfair text-lg text-dark-charcoal">Email</h3>
                    </div>
                    <p className="text-dark-charcoal font-medium">legal@estaya.ma</p>
                    <p className="text-dark-charcoal/60 text-sm mt-2">For legal inquiries</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gold/5 to-emerald-green/5 rounded-xl p-6 border border-gold/10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <FiPhone className="text-gold" />
                      </div>
                      <h3 className="font-playfair text-lg text-dark-charcoal">Phone</h3>
                    </div>
                    <p className="text-dark-charcoal font-medium">+212 6600 99519</p>
                    <p className="text-dark-charcoal/60 text-sm mt-2">Ask for our Legal Department</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gold/5 to-emerald-green/5 rounded-xl p-6 border border-gold/10 md:col-span-2"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <FiMapPin className="text-gold" />
                      </div>
                      <h3 className="font-playfair text-lg text-dark-charcoal">Address</h3>
                    </div>
                    <p className="text-dark-charcoal">ESTAYA Legal Department</p>
                    <p className="text-dark-charcoal">Casablanca Financial Center</p>
                    <p className="text-dark-charcoal">Casablanca, Morocco</p>
                  </motion.div>
                </div>
              </section>

              {/* Acceptance Note */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gold/5 to-emerald-green/5 rounded-xl border border-gold/10">
                <p className="text-dark-charcoal/70 text-center">
                  By using ESTAYA, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>

              {/* Back to Top */}
              <div className="mt-10 text-center">
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 text-gold hover:text-emerald-green transition-colors"
                >
                  <FiArrowLeft className="rotate-90" />
                  <span>Back to Top</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
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
  );
}