'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Globe, MapPin, Phone, User, BookOpen, Languages, Key } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';

interface ProfileFormProps {
  formData: {
    full_name: string;
    bio: string;
    phone: string;
    location: string;
    skills: string[];
    social_links: {
      github: string;
      linkedin: string;
      website: string;
    };
    interests: string[];
    languages: string[];
    groq_api_key: string | undefined;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: ProfileFormProps['formData']) => void;
  onCancel: () => void;
}

export default function ProfileForm({ formData, onSubmit, onChange, onCancel }: ProfileFormProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleAddSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      onChange({
        ...formData,
        skills: [...formData.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    onChange({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const handleAddLanguage = () => {
    if (newLanguage && !formData.languages.includes(newLanguage)) {
      onChange({
        ...formData,
        languages: [...formData.languages, newLanguage]
      });
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (language: string) => {
    onChange({
      ...formData,
      languages: formData.languages.filter(l => l !== language)
    });
  };

  const handleAddInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      onChange({
        ...formData,
        interests: [...formData.interests, newInterest]
      });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    onChange({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-white">Profile Information</h2>
        <p className="text-indigo-100 mt-1">Update your personal details and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <User className="mr-2 h-4 w-4" /> Full Name
          </label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => onChange({ ...formData, full_name: e.target.value })}
            className={`mt-1 block w-full rounded-lg px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
            }`}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-1">
          <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Phone className="mr-2 h-4 w-4" /> Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange({ ...formData, phone: e.target.value })}
            className={`mt-1 block w-full rounded-lg px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
            }`}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-1">
          <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <MapPin className="mr-2 h-4 w-4" /> Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => onChange({ ...formData, location: e.target.value })}
            className={`mt-1 block w-full rounded-lg px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
            }`}
            placeholder="San Francisco, CA"
          />
        </div>

        {/* Groq API Key Field */}
        <div className="space-y-1">
          <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Key className="mr-2 h-4 w-4" /> Groq API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={formData.groq_api_key || ''}
              onChange={(e) => onChange({ ...formData, groq_api_key: e.target.value })}
              className={`mt-1 block w-full rounded-lg px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                  : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
              }`}
              placeholder="Enter your Groq API key"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {showApiKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Required for AI Quiz feature. Get your API key at{' '}
            <a 
              href="https://console.groq.com/keys" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} underline`}
            >
              Groq Console
            </a>
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <BookOpen className="mr-2 h-4 w-4" /> Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => onChange({ ...formData, bio: e.target.value })}
          rows={4}
          className={`mt-1 block w-full rounded-lg px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
              : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
          }`}
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="bg-opacity-50 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700">
        <h3 className={`flex items-center text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <Globe className="mr-2 h-5 w-5" /> Social Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Github className="mr-2 h-4 w-4" /> GitHub
            </label>
            <div className="mt-1 relative">
              <input
                type="url"
                value={formData.social_links.github}
                onChange={(e) => onChange({
                  ...formData,
                  social_links: { ...formData.social_links, github: e.target.value }
                })}
                className={`pl-10 block w-full rounded-lg px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                    : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
                }`}
                placeholder="https://github.com/username"
              />
              <Github className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </label>
            <div className="mt-1 relative">
              <input
                type="url"
                value={formData.social_links.linkedin}
                onChange={(e) => onChange({
                  ...formData,
                  social_links: { ...formData.social_links, linkedin: e.target.value }
                })}
                className={`pl-10 block w-full rounded-lg px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                    : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
                }`}
                placeholder="https://linkedin.com/in/username"
              />
              <Linkedin className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Globe className="mr-2 h-4 w-4" /> Website
            </label>
            <div className="mt-1 relative">
              <input
                type="url"
                value={formData.social_links.website}
                onChange={(e) => onChange({
                  ...formData,
                  social_links: { ...formData.social_links, website: e.target.value }
                })}
                className={`pl-10 block w-full rounded-lg px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                    : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
                }`}
                placeholder="https://yourwebsite.com"
              />
              <Globe className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className={`flex items-center text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <Languages className="mr-2 h-5 w-5" /> Skills & Languages
        </h3>
        
        <div className="space-y-1">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Skills
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  isDarkMode
                    ? 'bg-indigo-900 text-indigo-100 hover:bg-indigo-800'
                    : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                }`}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="mt-3 flex space-x-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              placeholder="Add a skill (e.g., React, Python)"
              className={`flex-1 rounded-lg px-4 py-2 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                  : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
              }`}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
            >
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Languages
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.languages.map((language) => (
              <span
                key={language}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  isDarkMode
                    ? 'bg-purple-900 text-purple-100 hover:bg-purple-800'
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                }`}
              >
                {language}
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(language)}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="mt-3 flex space-x-2">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
              placeholder="Add a language (e.g., English, Spanish)"
              className={`flex-1 rounded-lg px-4 py-2 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                  : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
              }`}
            />
            <button
              type="button"
              onClick={handleAddLanguage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
            >
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Interests
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.interests.map((interest) => (
            <span
              key={interest}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
                isDarkMode
                  ? 'bg-emerald-900 text-emerald-100 hover:bg-emerald-800'
                  : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              }`}
            >
              {interest}
              <button
                type="button"
                onClick={() => handleRemoveInterest(interest)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-3 flex space-x-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
            placeholder="Add an interest (e.g., Hiking, Photography)"
            className={`flex-1 rounded-lg px-4 py-2 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                : 'border-gray-300 placeholder-gray-500 focus:border-gray-400'
            }`}
          />
          <button
            type="button"
            onClick={handleAddInterest}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}