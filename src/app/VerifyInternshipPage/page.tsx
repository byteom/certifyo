'use client';
export const runtime = "edge";

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useThemeStore } from '@/store/themeStore';
import { supabase } from '@/lib/supabase';
import { Award, Calendar, Building2, Mail, Phone, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface CustomInternship {
  id: string;
  intern_name: string;
  email: string;
  internship_title: string;
  company_name: string;
  company_logo_url: string | null;
  start_date: string;
  end_date: string;
  responsibilities: string;
  skills_gained: string[];
  performance_evaluation: string;
  issuer_name: string;
  issuer_designation: string;
  issuer_signature_url: string | null;
  issue_date: string;
  verification_code: string;
  verification_url: string;
  company_address: string | null;
  company_email: string | null;
  company_phone: string | null;
}

function VerifyInternshipContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const [internship, setInternship] = useState<CustomInternship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const verifyInternship = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('custom_internships')
        .select('*')
        .eq('verification_code', code)
        .single();

      if (fetchError) throw fetchError;
      setInternship(data);
    } catch (err: unknown) {
      console.error('Error verifying internship:', err);
      setError('Internship certificate not found. Please check the verification code.');
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    if (!code) return;
    verifyInternship();
  }, [code, verifyInternship]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-xl text-center max-w-md mx-4`}>
          <ExternalLink className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Verification Failed
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Internship Certificate Verified</h1>
            <p className="text-indigo-100">Verification Code: {internship.verification_code}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Intern Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {internship.intern_name}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {internship.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Building2 className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {internship.internship_title}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {internship.company_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Duration
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(internship.start_date)} - {formatDate(internship.end_date)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Skills Gained
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills_gained.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Performance & Verification
                </h2>

                <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Performance Evaluation
                  </h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {internship.performance_evaluation}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Issued By
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {internship.issuer_name}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {internship.issuer_designation}
                    </p>
                  </div>

                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Issue Date
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDate(internship.issue_date)}
                    </p>
                  </div>

                  {(internship.company_address || internship.company_email || internship.company_phone) && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Company Contact
                      </h3>
                      
                      {internship.company_address && (
                        <div className="flex items-center mb-2">
                          <MapPin className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {internship.company_address}
                          </span>
                        </div>
                      )}
                      
                      {internship.company_email && (
                        <div className="flex items-center mb-2">
                          <Mail className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {internship.company_email}
                          </span>
                        </div>
                      )}
                      
                      {internship.company_phone && (
                        <div className="flex items-center">
                          <Phone className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {internship.company_phone}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <QRCodeSVG 
                      value={internship.verification_url}
                      size={150}
                      level="H"
                      includeMargin={true}
                    />
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Scan to verify
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Responsibilities & Achievements
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {internship.responsibilities}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyInternshipPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <VerifyInternshipContent />
    </Suspense>
  );
}
