'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiEye, 
  FiLock, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiCheck,
  FiArrowLeft,
  FiFileText,
  FiGlobe,
  FiUsers,
  FiClock
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';

export default function PrivacyPage() {
  const sections = [
    {
      icon: FiShield,
      title: 'Our Commitment to Privacy',
      content: 'At ESTAYA, your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our real estate platform services. Please read this policy carefully. By accessing or using our Services, you consent to the practices described in this Privacy Policy.'
    },
    {
      icon: FiEye,
      title: 'Information We Collect',
      subsections: [
        {
          title: 'Personal Information',
          content: 'We may collect personal information that you voluntarily provide to us when you:',
          list: [
            'Create an account or register on our platform',
            'List a property for sale or rent',
            'Express interest in a property',
            'Contact us through forms or email',
            'Subscribe to our newsletters',
            'Participate in promotions or surveys'
          ]
        },
        {
          title: 'This information may include:',
          list: [
            'Name and contact information (email, phone number, address)',
            'Payment information (processed securely through third-party providers)',
            'Property details you choose to share',
            'Communication preferences'
          ]
        },
        {
          title: 'Automatic Information',
          content: 'When you visit our website, we may automatically collect certain information about your device and usage, including:',
          list: [
            'IP address and browser type',
            'Pages visited and time spent',
            'Referring website addresses',
            'Device information (operating system, device type)',
            'Cookies and similar technologies'
          ]
        }
      ]
    },
    {
      icon: FiLock,
      title: 'How We Use Your Information',
      list: [
        'Providing and maintaining our Services',
        'Processing property listings and inquiries',
        'Communicating with you about properties and services',
        'Sending administrative information (updates, security alerts)',
        'Personalizing your experience on our platform',
        'Improving our website and services',
        'Complying with legal obligations',
        'Preventing fraud and enhancing security'
      ]
    },
    {
      icon: FiUsers,
      title: 'Sharing Your Information',
      content: 'We may share your information in the following circumstances:',
      list: [
        'With Property Agents: When you express interest in a property, we share your information with the relevant agent (like Kamal, our Senior Property Advisor).',
        'Service Providers: With trusted third-party vendors who assist in operating our website and serving you.',
        'Legal Requirements: When required by law or to protect our rights and safety.',
        'Business Transfers: In connection with a merger, acquisition, or sale of assets.'
      ],
      note: 'We do not sell your personal information to third parties.'
    },
    {
      icon: FiShield,
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'
    },
    {
      icon: FiEye,
      title: 'Your Privacy Rights',
      content: 'Depending on your location, you may have certain rights regarding your personal information, including:',
      list: [
        'Access to your personal information',
        'Correction of inaccurate or incomplete information',
        'Deletion of your personal information',
        'Restriction or objection to processing',
        'Data portability',
        'Withdrawal of consent at any time'
      ],
      note: 'To exercise these rights, please contact us using the information below.'
    },
    {
      icon: FiFileText,
      title: 'Cookies and Tracking Technologies',
      content: 'We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us:',
      list: [
        'Remember your preferences',
        'Understand how you use our site',
        'Improve site functionality',
        'Provide personalized content'
      ],
      note: 'You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.'
    },
    {
      icon: FiUsers,
      title: "Children's Privacy",
      content: 'Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.'
    },
    {
      icon: FiGlobe,
      title: 'International Users',
      content: 'Our Services are based in Morocco. If you are accessing our Services from outside Morocco, please be aware that your information may be transferred to, stored, and processed in Morocco. By using our Services, you consent to the transfer of your information to Morocco, which may have different data protection laws than your country of residence.'
    },
    {
      icon: FiClock,
      title: 'Changes to This Privacy Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.'
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
              <FiShield className="text-4xl text-gold" />
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl text-dark-charcoal mb-4">
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="text-dark-charcoal/60 text-xl max-w-2xl mx-auto">
              How we collect, use, and protect your personal information
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

                        {section.subsections && section.subsections.map((sub, i) => (
                          <div key={i} className="mb-6">
                            <h3 className="font-playfair text-lg text-gold mb-3">
                              {sub.title}
                            </h3>
                            {sub.content && (
                              <p className="text-dark-charcoal/70 leading-relaxed mb-3">
                                {sub.content}
                              </p>
                            )}
                            {sub.list && (
                              <ul className="space-y-2">
                                {sub.list.map((item, j) => (
                                  <li key={j} className="flex items-start gap-3 text-dark-charcoal/70">
                                    <FiCheck className="text-gold mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}

                        {section.list && !section.subsections && (
                          <ul className="space-y-2 mb-4">
                            {section.list.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-dark-charcoal/70">
                                <FiCheck className="text-gold mt-1 flex-shrink-0" />
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
                  Contact <span className="text-gold">Us</span>
                </h2>
                <p className="text-dark-charcoal/70 mb-8">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
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
                    <p className="text-dark-charcoal font-medium">privacy@estaya.ma</p>
                    <p className="text-dark-charcoal/60 text-sm mt-2">For privacy-related inquiries</p>
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
                    <p className="text-dark-charcoal/60 text-sm mt-2">Ask for our Data Protection Officer</p>
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
                    <p className="text-dark-charcoal">ESTAYA Privacy Department</p>
                    <p className="text-dark-charcoal">Casablanca Financial Center</p>
                    <p className="text-dark-charcoal">Casablanca, Morocco</p>
                  </motion.div>
                </div>
              </section>

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