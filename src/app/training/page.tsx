"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Trophy, Monitor, AlertTriangle } from 'lucide-react';
import InternshipCard from '@/components/internship/InternshipCard';
import ApplicationCard from '@/components/internship/ApplicationCard';
import InternshipDetails from '@/components/internship/InternshipDetails';
import SuccessPopup from '@/components/internship/SuccessPopup';
import LimitErrorPopup from '@/components/internship/LimitErrorPopup';

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  duration: string;
  stipend: number;
  location: string;
  type: string;
  requirements: string[];
}

interface Application {
  id: string;
  internship_id: string;
  status: string;
  applied_at: string;
  completed_at: string | null;
  internships: Internship;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
}

export default function InternshipPage() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const { user } = useAuthStore();
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLimitError, setShowLimitError] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: unknown) {
      console.error('Error loading profile:', error);
    }
  }, [user]);

  const loadInternships = async () => {
    try {
      const { data, error } = await supabase
        .from('internships')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      setInternships(data || []);
    } catch (error: unknown) {
      console.error('Error loading internships:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('internship_applications')
        .select(`
          *,
          internships (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setApplications(data || []);
    } catch (error: unknown) {
      console.error('Error loading applications:', error);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        setShowMobileWarning(true);
      }

      const handleResize = () => {
        setShowMobileWarning(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    loadInternships();
    if (user) {
      loadApplications();
      loadProfile();
    }
  }, [user, loadApplications, loadProfile]);

  const checkApplicationLimit = () => {
    const activeApplications = applications.filter(app => 
      app.status !== 'completed' && app.status !== 'rejected'
    );
    return activeApplications.length >= 1;
  };

  const handleViewDetails = (internship: Internship) => {
    if (checkApplicationLimit()) {
      setShowLimitError(true);
    } else {
      setSelectedInternship(internship);
    }
  };

  const applyForInternship = async (internshipId: string) => {
    if (!user) {
      setError('Please sign in to apply for internships');
      return;
    }

    if (!profile?.full_name || !profile?.phone) {
      const shouldNavigate = window.confirm(
        'Please update your profile with your full name and phone number before applying for internships. Would you like to go to your profile now?'
      );
      if (shouldNavigate) {
        router.push('/profile');
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('internship_applications')
        .insert([{
          user_id: user.id,
          internship_id: internshipId
        }]);

      if (error) throw error;

      setShowSuccessPopup(true);
      loadApplications();
      setSelectedInternship(null);
    } catch (error: unknown) {
      console.error('Error applying for internship:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setTimeout(() => setError(''), 3000);
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {showMobileWarning && (
        <div className="fixed inset-x-0 top-0 z-50 bg-yellow-500 text-white p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Monitor className="h-5 w-5" />
            <p>For the best experience, please use a desktop browser.</p>
          </div>
        </div>
      )}

      {showSuccessPopup && <SuccessPopup onClose={() => setShowSuccessPopup(false)} />}
      {showLimitError && <LimitErrorPopup onClose={() => setShowLimitError(false)} />}
      {selectedInternship && (
        <InternshipDetails
          internship={selectedInternship}
          onClose={() => setSelectedInternship(null)}
          onApply={applyForInternship}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Available Internships
          </h1>
          <div className="flex items-center space-x-4">
            <span className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Trophy className="h-5 w-5 mr-2" />
              {internships.length} Positions
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!profile?.full_name || !profile?.phone ? (
          <div className="mb-8 bg-yellow-100 border-l-4 border-yellow-500 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-yellow-700">
                Please{' '}
                <button
                  onClick={() => router.push('/profile')}
                  className="underline font-medium hover:text-yellow-800"
                >
                  update your profile
                </button>{' '}
                with your full name and phone number to apply for internships.
              </p>
            </div>
          </div>
        ) : null}

        {applications.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              My Applications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              isApplied={applications.some(app => app.internship_id === internship.id)}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}