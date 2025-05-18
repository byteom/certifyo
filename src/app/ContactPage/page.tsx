"use client"
import React, { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, MapPin, Send, Clock, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error loading competition:', error);
    setError(error.message);
  } else {
    console.error('Unexpected error', error);
    setError('An unexpected error occurred');
  }
}

  };

  return (
    <div className={`min-h-screen font-mono ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="inline-block">Contact_
            </span>
            <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have questions? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Send className="h-6 w-6 mr-3 text-indigo-500" />
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="text-indigo-500">01.</span> Your Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Enter your name"
                      className={`pl-10 w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="text-indigo-500">02.</span> Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                      className={`pl-10 w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="text-indigo-500">03.</span> Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    placeholder="What's this about?"
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="text-indigo-500">04.</span> Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Write your message here..."
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm">
                    Error: {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium ${
                    status === 'submitting' 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  } text-white shadow-md transition-all`}
                >
                  {status === 'submitting' ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-3 px-4 bg-green-500/10 text-green-600 rounded-lg"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} h-full`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <User className="h-6 w-6 mr-3 text-indigo-500" />
                Contact Information
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'} mr-4`}>
                    <Mail className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Email
                    </h3>
                    <a 
                      href="mailto:support@certifyo.tech" 
                      className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      support@certifyo.tech
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'} mr-4`}>
                    <Phone className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Phone
                    </h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Not available
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'} mr-4`}>
                    <MapPin className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Address
                    </h3>
                    <address className={`not-italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      533 A, Phagwara<br />
                      
                      Jalandhar, Punjab<br />
                      India
                    </address>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h3 className={`text-lg font-medium mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Clock className="h-6 w-6 mr-3 text-indigo-500" />
                    Office Hours
                  </h3>
                  <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-indigo-500" />
                      <span>Monday - Friday: 9:00 AM - 12:00 PM (IST)</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-indigo-500" />
                      <span>Saturday: 09:00 AM - 12:00 PM (IST)</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-indigo-500" />
                      <span>Sunday: 09:00 AM - 12:00 PM (IST)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}