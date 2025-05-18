"use client"
import React from 'react';
// import { useThemeStore } from '../store/themeStore';
import { useThemeStore } from '@/store/themeStore';
import { Calendar,  Trophy,  Clock, Users, Zap, Award, Code,  } from 'lucide-react';
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import Link from 'next/link';

interface Event {
  id: number;
  title: string;
  date: string;
  type: string;
  description: string;
  participants: number;
  status: 'Ongoing' | 'Completed';
  featured?: boolean;
}

const EventsPage: React.FC = () => {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  // Dummy events data with TypeScript typing
  const ongoingEvents: Event[] = [
    // {
    //   id: 1,
    //   title: "Hack the Model",
    //   date: "April 19-20, 2024",
    //   type: "Hackathon",
    //   description: "24-hour online coding competition with ₹4000 prize pool",
    //   participants: 120,
    //   status: "Ongoing",
    //   featured: true
    // },
    // {
    //   id: 2,
    //   title: "Web Dev Workshop",
    //   date: "April 15-18, 2024",
    //   type: "Workshop",
    //   description: "Learn modern web development with React and Node.js",
    //   participants: 85,
    //   status: "Ongoing",
    //   featured: false
    // }
  ];

  const pastEvents: Event[] = [
    // {
    //   id: 3,
    //   title: "AI Conference",
    //   date: "March 10, 2024",
    //   type: "Conference",
    //   description: "Annual artificial intelligence summit with industry leaders",
    //   participants: 200,
    //   status: "Completed"
    // },
    // {
    //   id: 4,
    //   title: "Code Sprint",
    //   date: "February 5-6, 2024",
    //   type: "Coding Competition",
    //   description: "48-hour competitive programming challenge",
    //   participants: 150,
    //   status: "Completed"
    // },
    // {
    //   id: 5,
    //   title: "Tech Bootcamp",
    //   date: "January 15-30, 2024",
    //   type: "Training",
    //   description: "Intensive technical skills development program",
    //   participants: 75,
    //   status: "Completed"
    // }
  ];

  return (
    <div className={`min-h-screen py-12 font-mono ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certificate Generator Card (Always on top) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 rounded-xl overflow-hidden shadow-lg ${
            isDarkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-100 to-purple-100'
          }`}
        >
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
              <div className={`p-5 rounded-full ${isDarkMode ? 'bg-indigo-800/50' : 'bg-white'}`}>
                <Trophy className={`h-12 w-12 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Certificate Generator
              </h2>
              <p className={`text-lg mb-4 ${isDarkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
                Generate your participation certificates for attended events
              </p>
              <Link href="/hackathon-certificate-generate">
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`px-6 py-3 rounded-lg font-bold flex items-center ${
      isDarkMode 
        ? 'bg-white text-indigo-900 hover:bg-gray-100' 
        : 'bg-indigo-600 text-white hover:bg-indigo-700'
    }`}
  >
    <Zap className="h-4 w-4 mr-2" />
    Generate Now
  </motion.button>
</Link>
            </div>
          </div>
        </motion.div>

        {/* Ongoing Events Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className={`p-2 rounded-full mr-3 ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'}`}>
              <Clock className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ongoing Events
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {ongoingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden border ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 hover:border-green-500' 
                    : 'bg-white border-gray-200 hover:border-green-400'
                } transition-all duration-300 hover:shadow-lg`}
              >
                {event.featured && (
                  <div className={`px-4 py-1 text-sm font-medium ${
                    isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                  }`}>
                    Featured Event
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {event.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode 
                        ? event.status === 'Ongoing' ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'
                        : event.status === 'Ongoing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {event.description}
                  </p>
                  
                  <div className={`flex flex-wrap gap-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.participants} participants
                    </div>
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-1" />
                      {event.type}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        isDarkMode 
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                      }`}
                    >
                      View Details
                    </motion.button>
                    
                    {event.status === 'Ongoing' && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                          isDarkMode 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-green-100 hover:bg-green-200 text-green-800'
                        }`}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Register Now
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Past Events Section */}
        <section>
          <div className="flex items-center mb-8">
            <div className={`p-2 rounded-full mr-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <Award className={`h-5 w-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Past Events
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden border ${
                  isDarkMode 
                    ? 'bg-gray-800/30 border-gray-700 hover:border-indigo-500' 
                    : 'bg-white border-gray-200 hover:border-indigo-400'
                } transition-all duration-300 hover:shadow-lg`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {event.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                      Completed
                    </span>
                  </div>
                  
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {event.description}
                  </p>
                  
                  <div className={`flex flex-wrap gap-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.participants} participants
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        isDarkMode 
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                      }`}
                    >
                      View Details
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <Trophy className="h-4 w-4 mr-1" />
                      Get Certificate
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventsPage;