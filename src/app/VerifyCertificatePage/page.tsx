'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useThemeStore } from '@/store/themeStore';
import { supabase } from '@/lib/supabase';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { subjects } from '@/data/subjects';

interface Certificate {
  id: string;
  user_id: string;
  exam_id: number;
  score: number;
  issued_at: string;
  verification_id: string;
  student_name: string | null;
  profiles: {
    full_name: string | null;
    phone: string | null;
  } | null;
}

interface InternshipCertificate {
  id: string;
  user_id: string;
  internship_id: string;
  status: string;
  completed_at: string;
  profiles: {
    full_name: string | null;
    phone: string | null;
  } | null;
  internships: {
    title: string;
    company: string;
    duration: string;
  };
}

function VerifyCertificateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [internshipCertificate, setInternshipCertificate] = useState<InternshipCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const verifyCertificate = useCallback(async () => {
    if (!id) return;
    
    try {
      // Try to find exam certificate
      const { data: examCertData, error: examError } = await supabase
        .from('certificates')
        .select('*, profiles (full_name, phone)')
        .eq('verification_id', id)
        .maybeSingle();

      if (examError) throw examError;

      if (examCertData) {
        setCertificate(examCertData);
        setLoading(false);
        return;
      }

      // Try to find internship certificate
      const { data: internshipCertData, error: internshipError } = await supabase
        .from('internship_applications')
        .select('*, profiles (full_name, phone), internships (title, company, duration)')
        .eq('id', id)
        .eq('status', 'completed')
        .maybeSingle();

      if (internshipError) throw internshipError;

      if (internshipCertData) {
        setInternshipCertificate(internshipCertData);
        setLoading(false);
        return;
      }

      setError('Certificate not found');
      setLoading(false);
    } catch (error: unknown) {
      console.error('Error verifying certificate:', error);
      setError('An error occurred while verifying the certificate');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    verifyCertificate();
  }, [id, verifyCertificate]);

  const getExamTitle = (examId: number) => {
    const exam = subjects.flatMap((s) => s.exams).find((e) => e.id === examId);
    return exam?.title || 'Unknown Exam';
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-xl text-center max-w-md mx-4`}>
          <ExternalLink className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Certificate Not Found
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            {error}. Please check the verification ID and try again.
          </p>
        </div>
      </div>
    );
  }

  const certData = certificate || internshipCertificate;
  if (!certData) return null;

  const isExamCert = 'exam_id' in certData;
  const title = isExamCert ? getExamTitle((certData as Certificate).exam_id) : (certData as InternshipCertificate).internships.title;
  const issueDate = new Date(isExamCert ? (certData as Certificate).issued_at : (certData as InternshipCertificate).completed_at).toLocaleDateString();
  const studentName = certData.profiles?.full_name || (isExamCert ? (certData as Certificate).student_name : null) || 'Anonymous';
  const verificationUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl overflow-hidden`}>
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
            <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white">Verified Certificate</h1>
            <p className="text-gray-200 mt-2">This certificate has been verified as authentic</p>
          </div>

          {/* Certificate Content */}
          <div className="p-8">
            <div className="border-4 border-indigo-600 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 p-8 relative">
              {/* Logo and Title */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-4xl font-bold text-indigo-600">CertifyO</h1>
                </div>
                <h2 className="text-4xl font-bold mt-4 text-gray-900">
                  {isExamCert ? 'Certificate of Achievement' : 'Certificate of Completion'}
                </h2>
              </div>

              {/* Student Details */}
              <div className="text-center">
                <p className="text-gray-600">This certifies that</p>
                <p className="text-3xl font-bold mb-4 text-indigo-600">{studentName}</p>
                <p className="text-gray-600">
                  {isExamCert ? 'has successfully completed' : 'has successfully completed the internship program in'}
                </p>
                <p className="text-2xl font-semibold mb-4 text-gray-800">{title}</p>

                {/* Exam or Internship Details */}
                {isExamCert ? (
                  <>
                    <p className="text-gray-600">with a score of</p>
                    <p className="text-5xl font-bold mb-6 text-indigo-600">{(certData as Certificate).score}%</p>
                    <br />
                    <br />
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">at</p>
                    <p className="text-2xl font-semibold mb-2 text-gray-800">
                      {(certData as InternshipCertificate).internships.company}
                    </p>
                    <p className="mb-6 text-gray-500">
                      Duration: {(certData as InternshipCertificate).internships.duration}
                    </p>
                  </>
                )}

                {/* QR Code */}
                <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-md">
                  <QRCodeSVG value={verificationUrl} size={100} />
                  <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
                </div>

                {/* Certificate ID and Issue Date */}
                <div className="absolute bottom-8 left-8">
                  <p className="text-sm text-gray-500">Certificate ID: {id}</p>
                  <p className="text-sm text-gray-500">Issue Date: {issueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyCertificatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <VerifyCertificateContent />
    </Suspense>
  );
}
