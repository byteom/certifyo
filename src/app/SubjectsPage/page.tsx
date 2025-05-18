'use client';

import React from 'react';
import { subjects } from '@/data/subjects';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, Award, Star, Users, Clock, Target } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { motion } from 'framer-motion';
import { Exam } from '@/components/types';

export default function SubjectsPage() {
  const router = useRouter();
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  // Enhanced particle animation with different shapes
  const particles = Array(20).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 7,
    shape: Math.random() > 0.5 ? 'circle' : 'square',
    opacity: isDarkMode ? Math.random() * 0.3 + 0.1 : Math.random() * 0.2 + 0.05
  }));

  return (
    <div className={`min-h-screen overflow-hidden relative font-mono ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute ${particle.shape === 'circle' ? 'rounded-full' : 'rounded-sm'} ${
              isDarkMode ? 'bg-indigo-400/20' : 'bg-indigo-300/20'
            }`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: particle.shape === 'square' ? [0, 180, 360] : [0, 0, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Enhanced Title with Typing Effect */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block"
            >
              Explore
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
            >
              Subjects
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
          >
            Start your learning journey today with our comprehensive courses.
          </motion.p>
        </motion.div>

        {/* Enhanced Cards with Unique Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
              whileHover={{ 
                y: -15,
                boxShadow: isDarkMode 
                  ? '0 25px 50px -12px rgba(99, 102, 241, 0.25)' 
                  : '0 20px 25px -5px rgba(99, 102, 241, 0.15)'
              }}
              className={`relative overflow-hidden rounded-2xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg border-2 ${
                isDarkMode ? 'border-gray-700 hover:border-indigo-500' : 'border-gray-200 hover:border-indigo-400'
              } transition-all duration-300`}
            >
              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 overflow-hidden`}>
                <div className={`absolute -right-8 -top-8 w-16 h-16 rotate-45 ${
                  isDarkMode ? 'bg-indigo-600/30' : 'bg-indigo-400/30'
                }`} />
              </div>
              
              {/* Subject Image */}
              <div className="relative h-52 overflow-hidden group">
                <motion.img
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h2 className="text-2xl font-bold tracking-tight">{subject.name}</h2>
                  <div className="flex items-center mt-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="text-sm">{subject.exams.length} {subject.exams.length === 1 ? 'exam' : 'exams'}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                  {subject.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: <Target className="h-5 w-5 mr-2 text-indigo-500" />, text: 'Tests' },
                    { icon: <Award className="h-5 w-5 mr-2 text-indigo-500" />, text: 'Certs' },
                    { icon: <Users className="h-5 w-5 mr-2 text-indigo-500" />, text: 'Support' },
                    { icon: <Clock className="h-5 w-5 mr-2 text-indigo-500" />, text: 'Flexible' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className={`flex items-center text-xs font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  {subject.exams.map((exam: Exam) => (
                    <motion.button
                      key={exam.id}
                      whileHover={{ 
                        x: 5,
                        backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/exam/${exam.id}`)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700/50 border-gray-700 hover:border-indigo-500 text-white'
                          : 'bg-gray-50 border-gray-200 hover:border-indigo-400 text-gray-900'
                      } transition-all`}
                    >
                      <div className="flex items-center">
                        <Star className={`h-4 w-4 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                        <span className="font-medium text-sm">{exam.title}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs mr-3 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {exam.duration}m
                        </span>
                        <ArrowRight className={`h-4 w-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
