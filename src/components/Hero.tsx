
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Briefcase, Code, Database, Cloud, Lock, ChevronDown, Star, Zap } from 'lucide-react';
import { useThemeStore } from "../store/themeStore";
import Link from 'next/link';

export default function Hero() {
  const { isDarkMode } = useThemeStore();
  const MotionLink = motion(Link);
  
  const subjects = [
    { name: 'Web Development', icon: Code, color: 'text-blue-500' },
    { name: 'Data Science', icon: Database, color: 'text-emerald-500' },
    { name: 'Cloud Computing', icon: Cloud, color: 'text-sky-500' },
    { name: 'AI/ML Engineering', icon: BookOpen, color: 'text-purple-500' },
    { name: 'Cyber Security', icon: Lock, color: 'text-red-500' },
    { name: 'UX/UI Design', icon: Award, color: 'text-pink-500' },
    { name: 'DevOps', icon: Briefcase, color: 'text-amber-500' },
    { name: 'Blockchain', icon: Code, color: 'text-green-500' }
  ];

  return (
    <div className={`relative max-h-screen w-full overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Floating dots pattern */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-100/70'}`}
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 40 - 20],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Large gradient circles */}
        <div className={`absolute -top-64 -left-64 w-[600px] h-[600px] rounded-full ${
          isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-100/50'
        } filter blur-3xl`} />
        <div className={`absolute -bottom-64 -right-64 w-[600px] h-[600px] rounded-full ${
          isDarkMode ? 'bg-purple-900/20' : 'bg-purple-100/50'
        } filter blur-3xl`} />
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col justify-center items-center pt-24 pb-32 px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
            <Zap className="w-4 h-4 mr-2" />
            Trusted by 10,000+ professionals worldwide
          </div>

          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="relative">
              <span className={`absolute -bottom-2 left-0 w-full h-2 ${
                isDarkMode ? 'bg-indigo-500' : 'bg-indigo-400'
              }`} />
              <span className="relative">Master</span>
            </span>{' '}
            <span className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              In-Demand
            </span>{' '}
            Skills
          </h1>

          <p className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Accelerate your career with industry-recognized certifications and hands-on learning experiences.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <MotionLink
              href="/subjects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full font-semibold shadow-lg flex items-center transition-all ${
                isDarkMode 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20'
              }`}
            >
              Explore Exams
              <ArrowRight className="ml-2 h-5 w-5" />
            </MotionLink>

            <MotionLink
              href="/training"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full font-semibold shadow-lg transition-all ${
                isDarkMode 
                  ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-gray-400/10'
              }`}
            >
              View Training
            </MotionLink>
          </div>

          {/* Stats section */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto p-6 rounded-2xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
          } backdrop-blur-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          } shadow-lg`}>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}>100+</div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Courses</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>10K+</div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Students</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-amber-400' : 'text-amber-600'
              }`}>50+</div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Instructors</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>24/7</div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Support</div>
            </div>
          </div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className={`w-8 h-8 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </motion.div>

        {/* Infinite Sliding Subjects */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden h-24">
          <motion.div
            className="flex items-center h-full"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...subjects, ...subjects, ...subjects].map((subject, index) => (
              <motion.div
                key={`${subject.name}-${index}`}
                className={`mx-4 flex-shrink-0 flex items-center px-8 py-3 rounded-2xl ${
                  isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-700/80' 
                    : 'bg-white/90 border-gray-200 hover:bg-white'
                } border shadow-md backdrop-blur-sm`}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                } mr-3`}>
                  <subject.icon className={`h-6 w-6 ${subject.color}`} />
                </div>
                <span className={`font-medium text-lg ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {subject.name}
                </span>
                <Star className={`ml-3 h-4 w-4 ${
                  isDarkMode ? 'text-yellow-400' : 'text-amber-500'
                } fill-current`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t ${
        isDarkMode ? 'from-gray-900' : 'from-gray-50'
      } to-transparent z-20`} />
    </div>
  );
}