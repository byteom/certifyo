import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';

interface LimitErrorPopupProps {
  onClose: () => void;
}

export default function LimitErrorPopup({ onClose }: LimitErrorPopupProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden`}
      >
        <div className="relative">
          {/* Header with close button */}
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
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            </motion.div>
            
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Application Limit Reached
            </h3>
            
            <p className={`mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You can only have <span className="font-semibold text-yellow-500">one active internship</span> at a time. 
              Please complete your current internship before applying for a new one.
            </p>
            
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-yellow-500/20 transition-all"
              >
                Understood
              </motion.button>
            </div>
          </div>
          
          {/* Footer decoration */}
          <div className={`h-2 w-full bg-gradient-to-r from-yellow-500/30 via-yellow-500/70 to-yellow-500/30`}></div>
        </div>
      </motion.div>
    </motion.div>
  );
}