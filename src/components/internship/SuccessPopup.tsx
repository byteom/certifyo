import React from 'react';
import { CheckCircle, Mail, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';

interface SuccessPopupProps {
  onClose: () => void;
}

export default function SuccessPopup({ onClose }: SuccessPopupProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 1.5 }}
            >
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            </motion.div>
            
            <h3 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Application Submitted!
            </h3>
            
            <p className={`mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Thanks for applying to the internship on <span className="font-semibold text-green-500">CertifyO</span>. 
              You&apos;ll receive your <span className="font-semibold">Letter of Recommendation (LOR)</span> within 
              <span className="font-semibold"> 24-48 hours</span>, after which you can begin your internship journey.
            </p>
            
            <div className={`flex items-center justify-center gap-3 mb-8 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-green-50'}`}>
              <Mail className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Check your email for updates
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-green-500/20 transition-all"
            >
              Got it!
            </motion.button>
          </div>

          {/* Decorative footer */}
          <div className="h-2 w-full bg-gradient-to-r from-green-500/30 via-green-500/70 to-green-500/30"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}