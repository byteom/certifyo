'use client'
import React from 'react';
import { useRouter } from 'next/navigation'


import { useThemeStore } from '@/store/themeStore';
import { Home,  Book, Award, Briefcase } from 'lucide-react';
 

export default function NotFound() {
  const router = useRouter();
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  const helpfulLinks = [
    { icon: Home, text: 'Home', path: '/' },
    { icon: Book, text: 'Subjects', path: '/subjects' },
    { icon: Award, text: 'Certificates', path: '/certificates' },
    { icon: Briefcase, text: 'Internships', path: '/internships' },
  ];

  return (
    <>
       
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-16 px-4 sm:px-6 lg:px-8 flex items-center`}>
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} sm:text-5xl`}>404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight sm:text-5xl`}>
                  Page not found
                </h1>
                <p className={`mt-1 text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Please check the URL or try one of the helpful links below.
                </p>
              </div>
              <div className="mt-8">
                <h2 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Popular Pages</h2>
                <div className="mt-4 space-y-4">
                  {helpfulLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => router.push(link.path)}
                      className={`inline-flex items-center px-4 py-2 mr-4 border rounded-md ${
                        isDarkMode
                          ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <link.icon className="h-5 w-5 mr-2" />
                      {link.text}
                    </button>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => router.push('/')}
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Back to Home
                      <Home className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}