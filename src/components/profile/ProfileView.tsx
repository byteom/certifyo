'use client';

import React from 'react';
import { Github, Linkedin, Globe, MapPin, Phone, Mail, Sparkles, User, BookOpen, Languages, Heart, Code, Globe2 } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface ProfileViewProps {
  profile: {
    full_name: string | null;
    email: string | null;
    bio: string | null;
    location: string | null;
    phone: string | null;
    social_links: {
      github?: string;
      linkedin?: string;
      website?: string;
    } | null;
    skills: string[] | null;
    languages: string[] | null;
    interests: string[] | null;
  };
}

export default function ProfileView({ profile }: ProfileViewProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="space-y-8 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Header section */}
      <div className="relative group">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-100'}`}>
            <User className={`h-8 w-8 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </div>
          <div>
            <h2 className={`text-3xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {profile.full_name || profile.email}
              <span className="text-2xl animate-wiggle">👋</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Mail className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio section */}
      {profile.bio && (
        <div className={`p-6 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-indigo-50 hover:bg-indigo-100'}`}>
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About</h3>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
            {profile.bio}
          </p>
        </div>
      )}

      {/* Contact info */}
      <div className={`p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 ${isDarkMode ? 'bg-gray-800/50' : 'bg-indigo-50'}`}>
        {profile.location && (
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-100'}`}>
              <MapPin className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
              <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {profile.location}
              </p>
            </div>
          </div>
        )}

        {profile.phone && (
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-100'}`}>
              <Phone className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
              <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {profile.phone}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Social links */}
      {profile.social_links && (
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-indigo-50'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Globe2 className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Connect With Me
            </h3>
          </div>
          <div className="flex gap-4">
            {profile.social_links.github && (
              <a
                href={profile.social_links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-white hover:bg-indigo-100 text-gray-800 shadow-md'
                }`}
              >
                <Github className="h-6 w-6" />
              </a>
            )}
            {profile.social_links.linkedin && (
              <a
                href={profile.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-white hover:bg-indigo-100 text-gray-800 shadow-md'
                }`}
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {profile.social_links.website && (
              <a
                href={profile.social_links.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-white hover:bg-indigo-100 text-gray-800 shadow-md'
                }`}
              >
                <Globe className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Skills section */}
      {profile.skills && profile.skills.length > 0 && (
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-indigo-50'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Code className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-indigo-900/80 text-indigo-100 hover:bg-indigo-800'
                    : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages section */}
      {profile.languages && profile.languages.length > 0 && (
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-indigo-50'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Languages className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Languages
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.languages.map((language) => (
              <span
                key={language}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-purple-900/80 text-purple-100 hover:bg-purple-800'
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                }`}
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests section */}
      {profile.interests && profile.interests.length > 0 && (
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-indigo-50'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Heart className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Interests
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-emerald-900/80 text-emerald-100 hover:bg-emerald-800'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                }`}
              >
                <span className="mr-1">❤️</span> {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}