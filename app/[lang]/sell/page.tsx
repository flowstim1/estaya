'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUpload,
  FiMapPin,
  FiHome,
  FiDollarSign,
  FiUser,
  FiMail,
  FiPhone,
  FiCheck,
  FiX,
  FiImage,
  FiMaximize,
  FiDroplet,
  FiNavigation,
  FiUsers,
  FiLoader,
  FiAlertCircle
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import { uploadMultipleImages } from '@/lib/upload';
import RequireAuth from '@/components/RequireAuth';

export default function SellPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Add state for terms checkbox
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    purpose: 'buy',
    price: '',
    city: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    name: '',
    email: '',
    phone: '',
  });
  
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles(prev => [...prev, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(uploadedImages[index]);
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (!formData.type || !formData.title || !formData.description || !formData.price) {
        setError('Please fill in all required fields');
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.city || !formData.location || !formData.area) {
        setError('Please fill in all required fields');
        return;
      }
    }
    setError('');
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check terms before anything else
    if (!acceptedTerms) {
      setError('You must accept the Terms of Service to continue');
      return;
    }
    
    console.log('🔥🔥🔥 HANDLE SUBMIT EXECUTING 🔥🔥🔥');
    console.log('🚀 SUBMIT BUTTON CLICKED - STARTING SUBMISSION');
    console.log('Form data:', formData);
    console.log('Images to upload:', imageFiles.length);
    
    setError('');
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please sign in to list a property');
        setTimeout(() => {
          router.push('/login?redirect=sell');
        }, 2000);
        setIsSubmitting(false);
        return;
      }

      let uploadedUrls: string[] = [];
      if (imageFiles.length > 0) {
        setUploadProgress(10);
        try {
          uploadedUrls = await uploadMultipleImages(imageFiles);
          setUploadProgress(50);
          console.log('Images uploaded:', uploadedUrls);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          setError('Failed to upload images. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      setUploadProgress(60);

      // Property data with Kamal's info (your agent)
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        location: `${formData.city}, ${formData.location}`,
        city: formData.city,
        type: formData.type,
        purpose: formData.purpose,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        area: parseInt(formData.area),
        image: uploadedUrls.length > 0 ? uploadedUrls[0] : 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        images: uploadedUrls,
        featured: false,
        agent: {
          name: 'Kamal',
          email: 'kamal@estaya.ma',
          phone: '+212 6600 99519',
        }
      };

      console.log('Sending property data:', JSON.stringify(propertyData, null, 2));
      setUploadProgress(80);

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData),
      });

      const data = await response.json();
      console.log('API response:', data);
      setUploadProgress(100);

      if (data.success) {
        // Send email notification to you with seller's contact info
        try {
          const emailResponse = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sellerName: formData.name,
              sellerEmail: formData.email,
              sellerPhone: formData.phone,
              propertyTitle: formData.title,
              propertyPrice: formData.price,
              propertyLocation: `${formData.city}, ${formData.location}`,
            }),
          });
          
          const emailData = await emailResponse.json();
          if (emailData.success) {
            console.log('📧 Email notification sent successfully');
          } else {
            console.error('Failed to send email:', emailData.error);
          }
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          // Don't block the user, just log the error
        }

        setIsSuccess(true);
        uploadedImages.forEach(url => URL.revokeObjectURL(url));
        
        setTimeout(() => {
          setIsSuccess(false);
          setCurrentStep(1);
          setFormData({
            title: '',
            description: '',
            type: '',
            purpose: 'buy',
            price: '',
            city: '',
            location: '',
            bedrooms: '',
            bathrooms: '',
            area: '',
            name: '',
            email: '',
            phone: '',
          });
          setUploadedImages([]);
          setImageFiles([]);
          setUploadProgress(0);
          setAcceptedTerms(false);
          router.replace('/sell/success');
        }, 2000);
      } else {
        console.error('API error:', data);
        setError(data.error || 'Failed to create property');
      }
    } catch (err: any) {
      console.error('Error submitting property:', err);
      setError(err.message || 'Failed to submit property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Property Details', icon: FiHome },
    { number: 2, title: 'Location & Features', icon: FiMapPin },
    { number: 3, title: 'Images & Contact', icon: FiImage },
  ];

  return (
    <RequireAuth>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-soft-white via-white to-sand-beige/20 pt-24 pb-16 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-10 text-[300px] font-playfair text-emerald-green rotate-12">K</div>
            <div className="absolute bottom-20 right-10 text-[350px] font-playfair text-gold -rotate-12">K</div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-playfair text-5xl md:text-6xl text-dark-charcoal mb-4">
              List Your <span className="text-gold">Luxury Property</span>
            </h1>
            <p className="text-dark-charcoal/60 text-xl max-w-2xl mx-auto">
              Sell or rent your property with ESTAYA. Reach qualified buyers and investors.
            </p>
          </motion.div>

          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700">Property Listed Successfully!</h3>
                    <p className="text-emerald-600">Your property has been added to our listings.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 flex items-center gap-3">
                  <FiAlertCircle className="text-red-500 text-xl" />
                  <p className="text-red-600">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gold/20 overflow-hidden"
          >
            <div className="p-8 pb-0">
              <div className="flex justify-between items-center mb-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;
                  
                  return (
                    <React.Fragment key={step.number}>
                      <div className="flex-1 flex flex-col items-center relative">
                        <div className="flex items-center w-full">
                          <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-emerald-green to-gold text-white scale-110 shadow-lg' 
                              : isCompleted
                                ? 'bg-gold text-white'
                                : 'bg-sand-beige/30 text-dark-charcoal/40'
                          }`}>
                            {isCompleted ? <FiCheck className="text-xl" /> : <Icon className="text-xl" />}
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                              isCompleted ? 'bg-gold' : 'bg-sand-beige/30'
                            }`} />
                          )}
                        </div>
                        <span className={`mt-2 text-sm font-medium ${
                          isActive ? 'text-gold' : 'text-dark-charcoal/40'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <form 
              onSubmit={handleSubmit}
              className="p-8 pt-4"
            >
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-playfair text-2xl text-dark-charcoal mb-6">Tell us about your property</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Property Type <span className="text-gold">*</span>
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                        >
                          <option value="">Select type</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="house">House</option>
                          <option value="land">Land</option>
                          <option value="commercial">Commercial</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="cafe">Café</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Purpose <span className="text-gold">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <label className={`flex items-center justify-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.purpose === 'buy' 
                              ? 'border-gold bg-gold/5 text-gold' 
                              : 'border-gold/10 hover:border-gold/30'
                          }`}>
                            <input
                              type="radio"
                              name="purpose"
                              value="buy"
                              checked={formData.purpose === 'buy'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <FiDollarSign />
                            <span>For Sale</span>
                          </label>
                          <label className={`flex items-center justify-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.purpose === 'rent' 
                              ? 'border-gold bg-gold/5 text-gold' 
                              : 'border-gold/10 hover:border-gold/30'
                          }`}>
                            <input
                              type="radio"
                              name="purpose"
                              value="rent"
                              checked={formData.purpose === 'rent'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <FiHome />
                            <span>For Rent</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                        Property Title <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Luxury Villa with Pool in Palmeraie"
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                        Description <span className="text-gold">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Describe your property's unique features, amenities, and selling points..."
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                        {formData.purpose === 'buy' ? 'Price (MAD)' : 'Monthly Rent (MAD)'} <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder={formData.purpose === 'buy' ? "e.g., 12500000" : "e.g., 25000"}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-playfair text-2xl text-dark-charcoal mb-6">Location & Features</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          City <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g., Marrakech"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Address <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <FiNavigation className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., 123 Palmeraie"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Bedrooms
                        </label>
                        <div className="relative">
                          <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                          <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleInputChange}
                            placeholder="e.g., 3"
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Bathrooms
                        </label>
                        <div className="relative">
                          <FiDroplet className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                          <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleInputChange}
                            placeholder="e.g., 2"
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Area (m²) <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <FiMaximize className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                          <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            placeholder="e.g., 150"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-playfair text-2xl text-dark-charcoal mb-6">Images & Contact Information</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                        Property Images
                      </label>
                      <div className="border-2 border-dashed border-gold/20 rounded-xl p-8 text-center hover:border-gold transition-all group">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          disabled={isSubmitting}
                        />
                        <label
                          htmlFor="image-upload"
                          className={`cursor-pointer flex flex-col items-center gap-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-all">
                            <FiUpload className="text-2xl text-gold" />
                          </div>
                          <span className="text-dark-charcoal/70">Click to upload images</span>
                          <span className="text-sm text-dark-charcoal/40">JPG, PNG up to 10MB each</span>
                        </label>
                      </div>

                      {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-dark-charcoal/60">Uploading...</span>
                            <span className="text-gold">{uploadProgress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gold/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${uploadProgress}%` }}
                              className="h-full bg-gradient-to-r from-emerald-green to-gold"
                            />
                          </div>
                        </div>
                      )}

                      {uploadedImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-4">
                          {uploadedImages.map((img, index) => (
                            <div key={index} className="relative group">
                              <div className="relative h-24 rounded-lg overflow-hidden">
                                <Image
                                  src={img}
                                  alt={`Preview ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                disabled={isSubmitting}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0"
                              >
                                <FiX className="text-sm" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Contact Name
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your name"
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-dark-charcoal/70 mb-2">
                          Phone
                        </label>
                        <div className="relative">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+212 6XX XXXXXX"
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gold/10 rounded-xl focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gold/30 text-gold focus:ring-gold"
                      />
                      <label htmlFor="terms" className="text-sm text-dark-charcoal/60">
                        I confirm that the information provided is accurate and I agree to the{' '}
                        <Link href="/terms" className="text-gold hover:text-emerald-green">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-gold hover:text-emerald-green">
                          Privacy Policy
                        </Link> <span className="text-gold">*</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8 pt-6 border-t border-gold/10">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className={`px-6 py-3 border-2 border-gold/20 rounded-xl hover:border-gold transition-all disabled:opacity-50 ${
                    currentStep === 1 ? 'invisible' : ''
                  }`}
                >
                  Previous
                </button>
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-green to-gold text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-green to-gold text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiCheck />
                        <span>List Property</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUser className="text-gold text-xl" />
              </div>
              <h3 className="font-medium text-dark-charcoal mb-2">Expert Support</h3>
              <p className="text-sm text-dark-charcoal/60">Our team will guide you through the listing process</p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUsers className="text-gold text-xl" />
              </div>
              <h3 className="font-medium text-dark-charcoal mb-2">Qualified Buyers</h3>
              <p className="text-sm text-dark-charcoal/60">Reach serious buyers and investors</p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiCheck className="text-gold text-xl" />
              </div>
              <h3 className="font-medium text-dark-charcoal mb-2">Free Listing</h3>
              <p className="text-sm text-dark-charcoal/60">No upfront costs, pay only when sold</p>
            </div>
          </motion.div>
        </div>
      </div>
    </RequireAuth>
  );
}