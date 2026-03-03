'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiLock, 
  FiUser, 
  FiEye, 
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle 
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
const { data: session, status } = useSession();

useEffect(() => {
  if (session) {
    router.push('/');
    router.refresh();
  }
}, [session, router]);
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.data));
  window.dispatchEvent(new Event('userUpdate'));
  setSuccess('Login successful! Redirecting...');
  
  // Force immediate redirect
  router.push('/');
  router.refresh();
} else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1500);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-green/5 via-soft-white to-gold/5 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Large K Monograms */}
        <div className="absolute top-20 left-10 text-[200px] font-playfair text-emerald-green/5 rotate-12">K</div>
        <div className="absolute bottom-20 right-10 text-[250px] font-playfair text-gold/5 -rotate-12">K</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[300px] font-playfair text-sand-beige/10">K</div>
        
        {/* Decorative Lines */}
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(198, 167, 94, 0.03)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Orbs */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-40 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-40 w-80 h-80 bg-emerald-green/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <Link href="/" className="inline-block">
              <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-emerald-green to-gold bg-clip-text text-transparent">
                ESTAYA
              </h1>
              <p className="text-dark-charcoal/40 text-sm mt-1">Luxury Real Estate</p>
            </Link>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gold/20 overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex p-1 bg-sand-beige/10 m-4 rounded-xl">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 text-center font-medium rounded-lg transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'bg-white text-emerald-green shadow-lg'
                    : 'text-dark-charcoal/60 hover:text-dark-charcoal'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 text-center font-medium rounded-lg transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'bg-white text-emerald-green shadow-lg'
                    : 'text-dark-charcoal/60 hover:text-dark-charcoal'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form Container */}
            <div className="p-8 pt-4">
              {/* Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl"
                >
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}
              
              {success && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center gap-3"
                >
                  <FiCheckCircle className="text-emerald-500 text-xl" />
                  <p className="text-emerald-600 text-sm">{success}</p>
                </motion.div>
              )}

              {/* Login Form */}
              {activeTab === 'login' && (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleLogin}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-dark-charcoal/60 text-sm mb-2">Email Address</label>
                    <div className="relative group">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:text-emerald-green transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-3 bg-sand-beige/5 border border-gold/20 rounded-xl focus:outline-none focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-dark-charcoal/60 text-sm mb-2">Password</label>
                    <div className="relative group">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:text-emerald-green transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3 bg-sand-beige/5 border border-gold/20 rounded-xl focus:outline-none focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/20 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-charcoal/40 hover:text-gold transition-colors"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gold/30 text-gold focus:ring-gold" />
                      <span className="text-sm text-dark-charcoal/60">Remember me</span>
                    </label>
                    <Link 
                      href="/forgot-password"
                      className="text-sm text-gold hover:text-emerald-green transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-green to-gold text-white py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-green/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleRegister}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-dark-charcoal/60 text-sm mb-2">Full Name</label>
                    <div className="relative group">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:text-emerald-green transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        placeholder="Ahmed Benani"
                        className="w-full pl-12 pr-4 py-3 bg-sand-beige/5 border border-gold/20 rounded-xl focus:outline-none focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-dark-charcoal/60 text-sm mb-2">Email Address</label>
                    <div className="relative group">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:text-emerald-green transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-3 bg-sand-beige/5 border border-gold/20 rounded-xl focus:outline-none focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-dark-charcoal/60 text-sm mb-2">Password</label>
                    <div className="relative group">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:text-emerald-green transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3 bg-sand-beige/5 border border-gold/20 rounded-xl focus:outline-none focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/20 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-charcoal/40 hover:text-gold transition-colors"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    <p className="text-xs text-dark-charcoal/40 mt-2">Minimum 6 characters</p>
                  </div>

                  <div>
                    <label className="block text-dark-charcoal/60 text-sm mb-2">Confirm Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-3 bg-sand-beige/5 border border-gold/20 rounded-xl focus:outline-none focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 rounded border-gold/30 text-gold focus:ring-gold"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-dark-charcoal/60">
                      I agree to the{' '}
                      <Link href="/terms" className="text-gold hover:text-emerald-green">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-gold hover:text-emerald-green">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-green to-gold text-white py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-green/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gold/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-dark-charcoal/40">Or continue with</span>
                </div>
              </div>

              {/* Google Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="w-full bg-white border-2 border-gold/20 text-dark-charcoal py-3 rounded-xl hover:border-gold hover:bg-gold/5 transition-all duration-300 flex items-center justify-center gap-3 font-medium group"
              >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-dark-charcoal/40 text-sm mt-8"
          >
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-gold hover:text-emerald-green">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-gold hover:text-emerald-green">Privacy Policy</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}