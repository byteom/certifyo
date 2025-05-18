"use client";

import React, { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { BookOpen, Video, Users, Rocket, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LearningPage() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email submission logic
    router.push('/thank-you');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <h1 className="text-4xl font-bold mb-4">Interactive Learning Platform</h1>
          <p className={`text-xl mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A new way to learn and master skills with hands-on experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg`}>
            <Video className={`h-12 w-12 mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Video Courses
            </h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• High-quality video content</li>
              <li>• Expert instructors</li>
              <li>• Practical examples</li>
              <li>• Downloadable resources</li>
            </ul>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg`}>
            <BookOpen className={`h-12 w-12 mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Interactive Exercises
            </h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Hands-on practice</li>
              <li>• Real-time feedback</li>
              <li>• Progress tracking</li>
              <li>• Personalized learning path</li>
            </ul>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg mb-12`}>
          <div className="text-center mb-8">
            <Rocket className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Coming Soon!
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We're working hard to bring you the best learning experience.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email for early access"
                className={`flex-1 rounded-md ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300 placeholder-gray-400'
                }`}
              />
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}