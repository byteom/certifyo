'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { supabase } from '@/lib/supabase';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileView from '@/components/profile/ProfileView';

interface Profile {
  id: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  updated_at: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  skills: string[] | null;
  social_links: {
    github?: string;
    linkedin?: string;
    website?: string;
  } | null;
  interests: string[] | null;
  languages: string[] | null;
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    phone: '',
    location: '',
    skills: [] as string[],
    social_links: {
      github: '',
      linkedin: '',
      website: ''
    },
    interests: [] as string[],
    languages: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    if (!user?.id) {
      setError('No user ID available')
      setLoading(false)
      return
    }
  
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
  
      if (fetchError) throw fetchError
  
      if (data) {
        setProfile(data)
        setFormData({
          full_name: data.full_name || '',
          bio: data.bio || '',
          phone: data.phone || '',
          location: data.location || '',
          skills: data.skills || [],
          social_links: data.social_links || { github: '', linkedin: '', website: '' },
          interests: data.interests || [],
          languages: data.languages || [],
        })
      }
    } catch (error: unknown) {
      const err = error as Error
      console.error('Error loading profile:', err)
      setError(err.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }
    loadProfile()
  }, [user, router, loadProfile]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user?.id) {
      setError('No user ID available');
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          email: profile?.email,
          updated_at: new Date().toISOString(),
        });

      if (updateError) {
        console.error('Supabase update error:', updateError);
        throw new Error(updateError.message);
      }

      await loadProfile();
      setIsEditing(false);
    } catch (error: unknown) {
      const err = error as Error
      setError(err.message || 'Something went wrong')
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
          <ProfileHeader 
            profile={profile} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing}
          />
          
          <div className="px-6 py-8">
            {error && (
              <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md">
                {error}
              </div>
            )}

            {isEditing ? (
              <ProfileForm
                formData={formData}
                onSubmit={handleSubmit}
                onChange={setFormData}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              profile && <ProfileView profile={profile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}