import React from 'react';
import { GraduationCap, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import Image from 'next/image';

export default function Footer() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <footer className={`font-mono ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center">
              <GraduationCap className={`h-8 w-8 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span className="ml-2 text-xl font-bold tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CertifyO
              </span>
            </div>
            <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Empowering learners worldwide with professional certifications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { text: 'About Us', href: '/about' },
                { text: 'Subjects', href: '/subjects' },
                { text: 'Exams', href: '/exams' },
                { text: 'Certificates', href: '/certificates' },
              ].map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-tight">Support</h3>
            <ul className="space-y-3">
              {[
                { text: 'Help Center', href: '/help' },
                { text: 'Contact Us', href: '/contact' },
                { text: 'Privacy Policy', href: '/privacy' },
                { text: 'Terms of Service', href: '/terms' },
                { text: 'Refund Policy', href: '/refund' },
              ].map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-tight">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { 
                  icon: <Instagram className="h-5 w-5" />, 
                  href: 'https://www.instagram.com/certifyo2025',
                  label: 'Instagram'
                },
                { 
                  icon: <Twitter className="h-5 w-5" />, 
                  href: 'https://x.com/certifyo',
                  label: 'Twitter'
                },
                { 
                  icon: <Linkedin className="h-5 w-5" />, 
                  href: 'https://www.linkedin.com/company/certifyo',
                  label: 'LinkedIn'
                },
              ].map((social) => (
                <a 
                  key={social.href}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-indigo-400 hover:text-indigo-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-indigo-600 hover:text-indigo-700'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Certification Logos Section */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {[
            { src: '/images/msme.png', alt: 'MSME Registered', text: 'MSME Registered' },
            { src: '/images/ncs.png', alt: 'NCS Certified', text: 'NCS Certified' },
            { src: '/images/skill.png', alt: 'Skill India Certified', text: 'Skill India Certified' },
          ].map((cert) => (
            <div key={cert.alt} className="flex items-center space-x-2">
              <div className="relative h-12 w-12">
                <Image 
                  src={cert.src} 
                  alt={cert.alt}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                {cert.text}
              </p>
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className={`mt-8 pt-8 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        } text-center text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          <p>&copy; {new Date().getFullYear()} CertifyO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
