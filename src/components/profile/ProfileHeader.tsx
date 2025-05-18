'use client';

import React from 'react';
import { User, Camera, Edit2, Sparkles } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import Image from 'next/image';

interface ProfileHeaderProps {
  profile: {
    avatar_url: string | null;
    full_name: string | null;
    email: string | null;
  } | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export default function ProfileHeader({ profile, isEditing, setIsEditing }: ProfileHeaderProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-400/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-pink-300/30 rounded-full filter blur-xl"></div>
      </div>
      
      {/* Floating emoji decoration */}
      <div className="absolute top-8 left-8 text-4xl animate-bounce">👋</div>
      <div className="absolute bottom-8 right-8 text-3xl animate-pulse">✨</div>
      
      <div className="relative px-6 py-16">
        <div className="absolute top-6 right-6 z-10">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg ${
                isDarkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105'
              }`}
            >
              <Edit2 size={16} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative group">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || ''}
                width={160}
                height={160}
                className="h-40 w-40 rounded-full border-4 border-white/80 shadow-xl transition-transform duration-300 group-hover:scale-105 object-cover"
              />
            ) : (
              <div className="h-40 w-40 rounded-full bg-indigo-400 flex items-center justify-center border-4 border-white/80 shadow-xl transition-transform duration-300 group-hover:scale-105">
                <User className="h-20 w-20 text-white" />
              </div>
            )}
            
            {isEditing && (
              <button 
                className={`absolute bottom-2 right-2 flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-white hover:bg-indigo-100 text-indigo-600'
                }`}
              >
                <Camera className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              {profile?.full_name || 'Your Name'} <span className="text-2xl ml-2">😊</span>
            </h1>
            <p className="text-white/90 mt-2 flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-yellow-300" />
              {profile?.email || 'your.email@example.com'}
              <Sparkles size={16} className="text-yellow-300" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}