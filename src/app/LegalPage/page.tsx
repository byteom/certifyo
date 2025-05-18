"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useThemeStore } from '@/store/themeStore';
import { supabase } from '@/lib/supabase';
import { FileText } from 'lucide-react';

interface LegalPage {
  title: string;
  content: string;
  updated_at: string;
}

export default function LegalPage() {
  const { slug } = useParams();
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const [page, setPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPage = async () => {
      try {
        const { data, error } = await supabase
          .from('legal_pages')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPage(data);
      } catch (err: any) {
        console.error('Error loading legal page:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md text-center`}>
          <FileText className={`h-12 w-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Page Not Found
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            The requested legal page could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8`}>
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {page.title}
          </h1>
          
          <div className={`prose max-w-none ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {page.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className={`mt-8 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Last updated: {new Date(page.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}