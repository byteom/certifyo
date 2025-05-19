"use client"
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { supabase } from '@/lib/supabase';
import { Award, Search, AlertTriangle, Share2, Linkedin, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { subjects } from '@/data/subjects';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation';

import { QRCodeSVG } from 'qrcode.react';
import { LinkedinShareButton, TwitterShareButton, FacebookShareButton, WhatsappShareButton } from 'react-share';
// import { XCircle } from 'lucide-react';
import { X } from 'lucide-react';
import Image from 'next/image';

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

export default function CertificatePage() {
  const { user } = useAuthStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [internshipCertificates, setInternshipCertificates] = useState<InternshipCertificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedInternshipCertificate, setSelectedInternshipCertificate] = useState<InternshipCertificate | null>(null);
  const [verificationId, setVerificationId] = useState('');
  const [verifiedCertificate, setVerifiedCertificate] = useState<Certificate | null>(null);
  const [verifiedInternshipCertificate, setVerifiedInternshipCertificate] = useState<InternshipCertificate | null>(null);
  const [verificationError, setVerificationError] = useState('');
  const [profileIncomplete, setProfileIncomplete] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {

    
  const checkProfileCompleteness = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfileIncomplete(!profile?.full_name || !profile?.phone);
    } catch (error) {
      console.error('Error checking profile:', error);
    }
  };

  const loadCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*, profiles (full_name, phone)')
        .eq('user_id', user?.id);

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error loading certificates:', error);
    }
  };

  const loadInternshipCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('internship_applications')
        .select('*, profiles (full_name, phone), internships (title, company, duration)')
        .eq('user_id', user?.id)
        .eq('status', 'completed');

      if (error) throw error;
      setInternshipCertificates(data || []);
    } catch (error) {
      console.error('Error loading internship certificates:', error);
    }
  };

    if (user) {
      loadCertificates();
      loadInternshipCertificates();
      checkProfileCompleteness();
    }
  }, [user]);

  // const checkProfileCompleteness = async () => {
  //   try {
  //     const { data: profile, error } = await supabase
  //       .from('profiles')
  //       .select('full_name, phone')
  //       .eq('id', user?.id)
  //       .single();

  //     if (error) throw error;
  //     setProfileIncomplete(!profile?.full_name || !profile?.phone);
  //   } catch (error) {
  //     console.error('Error checking profile:', error);
  //   }
  // };

  // const loadCertificates = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('certificates')
  //       .select('*, profiles (full_name, phone)')
  //       .eq('user_id', user?.id);

  //     if (error) throw error;
  //     setCertificates(data || []);
  //   } catch (error) {
  //     console.error('Error loading certificates:', error);
  //   }
  // };

  // const loadInternshipCertificates = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('internship_applications')
  //       .select('*, profiles (full_name, phone), internships (title, company, duration)')
  //       .eq('user_id', user?.id)
  //       .eq('status', 'completed');

  //     if (error) throw error;
  //     setInternshipCertificates(data || []);
  //   } catch (error) {
  //     console.error('Error loading internship certificates:', error);
  //   }
  // };

  const handleVerificationIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationId(e.target.value);
    setVerifiedCertificate(null);
    setVerifiedInternshipCertificate(null);
    setVerificationError('');
  };

  const verifyCertificate = async () => {
    if (!verificationId.trim()) {
      setVerificationError('Please enter a verification ID');
      return;
    }

    setVerificationError('');
    setVerifiedCertificate(null);
    setVerifiedInternshipCertificate(null);

    const trimmedId = verificationId.trim();

    try {
      const { data: examCertData, error: examError } = await supabase
        .from('certificates')
        .select('*, profiles (full_name, phone)')
        .eq('verification_id', trimmedId)
        .maybeSingle();

      if (examError) throw examError;

      if (examCertData) {
        setVerifiedCertificate(examCertData);
        return;
      }

      const { data: internshipCertData, error: internshipError } = await supabase
        .from('internship_applications')
        .select('*, profiles (full_name, phone), internships (title, company, duration)')
        .eq('id', trimmedId)
        .eq('status', 'completed')
        .maybeSingle();

      if (internshipError) throw internshipError;

      if (internshipCertData) {
        setVerifiedInternshipCertificate(internshipCertData);
        return;
      }

      setVerificationError('Certificate not found. Please check the verification ID and try again.');
    } catch (error) {
      console.error('Error verifying certificate:', error);
      setVerificationError('An error occurred while verifying the certificate. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      verifyCertificate();
    }
  };

  const getExamTitle = (examId: number) => {
    const exam = subjects.flatMap((s) => s.exams).find((e) => e.id === examId);
    return exam?.title || 'Unknown Exam';
  };

  const handleViewCertificate = (certificate: Certificate | InternshipCertificate) => {
    console.log('View button clicked', certificate); // Debugging line
    if (profileIncomplete) {
      const shouldNavigate = window.confirm(
        'Your profile is incomplete. Please update your full name and phone number in your profile before viewing certificates. Would you like to go to your profile now?'
      );
      if (shouldNavigate) {
        // navigate('/profile');
        router.push('/profile')
      }
      return;
    }

    if ('exam_id' in certificate) {
      setSelectedCertificate(certificate);
    } else {
      setSelectedInternshipCertificate(certificate);
    }
  };

  const handleShareToLinkedIn = (certificate: Certificate | InternshipCertificate) => {
    const isExamCert = 'exam_id' in certificate;
    const certTitle = isExamCert ? getExamTitle((certificate as Certificate).exam_id) : (certificate as InternshipCertificate).internships.title;
    const _company = isExamCert ? 'certifyo' : (certificate as InternshipCertificate).internships.company;
    const issueDate = new Date(isExamCert ? (certificate as Certificate).issued_at : (certificate as InternshipCertificate).completed_at);

    // LinkedIn Add to Profile URL with pre-filled data
    const linkedInUrl = new URL('https://www.linkedin.com/profile/add');
    linkedInUrl.searchParams.append('startTask', 'CERTIFICATION_NAME');
    linkedInUrl.searchParams.append('name', certTitle);
    linkedInUrl.searchParams.append('organizationId', '1'); // Your organization's LinkedIn ID
    linkedInUrl.searchParams.append('issueYear', issueDate.getFullYear().toString());
    linkedInUrl.searchParams.append('issueMonth', (issueDate.getMonth() + 1).toString());
    linkedInUrl.searchParams.append('certUrl', window.location.origin + '/verify/' + (isExamCert ? (certificate as Certificate).verification_id : certificate.id));

    window.open(linkedInUrl.toString(), '_blank');
  };

  const handleCopyVerificationLink = async (certificate: Certificate | InternshipCertificate) => {
    const isExamCert = 'exam_id' in certificate;
    const verificationUrl = `${window.location.origin}/verify/${isExamCert ? (certificate as Certificate).verification_id : certificate.id}`;

    try {
      await navigator.clipboard.writeText(verificationUrl);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  const CertificateModal = ({ certificate, type }: { certificate: Certificate | InternshipCertificate; type: 'exam' | 'internship' }) => {
    if (!certificate) return null;

    const certId = type === 'exam' ? (certificate as Certificate).verification_id : (certificate as InternshipCertificate).id;
    const issueDate = new Date(type === 'exam' ? (certificate as Certificate).issued_at : (certificate as InternshipCertificate).completed_at).toLocaleDateString();
    const title = type === 'exam' ? getExamTitle((certificate as Certificate).exam_id) : (certificate as InternshipCertificate).internships.title;
    const studentName = certificate.profiles?.full_name || (type === 'exam' ? (certificate as Certificate).student_name : null) || 'Anonymous';
    const verificationUrl = `${window.location.origin}/verify/${certId}`;

    const handleDownloadImage = () => {
      const certificateElement = document.getElementById('certificate-container');
      if (certificateElement) {
        html2canvas(certificateElement).then((canvas) => {
          const link = document.createElement('a');
          link.download = `certificate-${certId}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        });
      }
    };

    const handleDownloadPDF = () => {
      const certificateElement = document.getElementById('certificate-container');
      if (certificateElement) {
        html2canvas(certificateElement).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('landscape');
          const imgWidth = 297; // A4 width in mm (landscape)
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save(`certificate-${certId}.pdf`);
        });
      }
    };

    const handleCopyVerificationLink = async () => {
      try {
        await navigator.clipboard.writeText(verificationUrl);
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        {/* Share Options on the Left Side */}
        <div className="fixed left-8 bottom-8 flex flex-col space-y-4 z-50">
          {/* Share Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>

            {/* Share Options (Horizontal Layout) */}
            {showShareOptions && (
              <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg p-4 z-10">
                <div className="flex gap-4">
                  <LinkedinShareButton url={verificationUrl} title={`Check out my ${title} certificate!`}>
                    <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <Linkedin className="h-5 w-5 text-[#0077B5]" />
                    </div>
                  </LinkedinShareButton>

                  <TwitterShareButton url={verificationUrl} title={`Check out my ${title} certificate!`}>
                    <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <svg className="h-5 w-5 text-[#1DA1F2]" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                  </TwitterShareButton>

                  <FacebookShareButton url={verificationUrl}
                    hashtag="#example"
                    // quote={`Check out my ${title} certificate!`}
                    >
                    <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <svg className="h-5 w-5 text-[#1877F2]" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                  </FacebookShareButton>

                  <WhatsappShareButton url={verificationUrl} title={`Check out my ${title} certificate!`}>
                    <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <svg className="h-5 w-5 text-[#25D366]" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                  </WhatsappShareButton>
                </div>
              </div>
            )}
          </div>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyVerificationLink}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            {copiedToClipboard ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 mr-2" />
                Copy Link
              </>
            )}
          </button>

          {/* Download Buttons */}
          <button
            onClick={handleDownloadImage}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Image
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </button>

          {/* Close Button */}
          <button
            onClick={() => {
              setSelectedCertificate(null);
              setSelectedInternshipCertificate(null);
              setShowShareOptions(false);
            }}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
          >
            <X className="h-5 w-5 mr-2" />
            Close
          </button>
        </div>

        {/* Certificate Container */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 w-[95%] max-w-5xl mx-4 shadow-2xl relative">
          {/* Certificate Content */}
          <div id="certificate-container" className="border-4 border-indigo-600 p-8 rounded-lg relative bg-white font-mono">
            {/* QR Code at Top Left Corner */}
            <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md">
              <QRCodeSVG value={verificationUrl} size={100} />
              <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
            </div>

            {/* Certificate Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-indigo-600">CertifyO</h1>
              <h2 className="text-4xl font-bold mt-4 text-gray-900">
                {type === 'exam' ? 'Certificate of Achievement' : 'Certificate of Completion'}
              </h2>
            </div>

            {/* Certificate Body */}
            <div className="text-center">
              <p className="text-gray-600">This certifies that</p>
              <p className="text-3xl font-bold mb-4 text-indigo-600">{studentName}</p>
              <p className="text-gray-600">
                {type === 'exam' ? 'has successfully completed' : 'has successfully completed the internship program in'}
              </p>
              <p className="text-2xl font-semibold mb-4 text-gray-800">{title}</p>

              {type === 'exam' ? (
                <>
                  <p className="text-gray-600">with a score of</p>
                  <p className="text-5xl font-bold mb-6 text-indigo-600">{(certificate as Certificate).score}%</p>
                </>
              ) : (
                <>
                  <p className="text-gray-600">at</p>
                  <p className="text-2xl font-semibold mb-2 text-gray-800">{(certificate as InternshipCertificate).internships.company}</p>
                  <p className="mb-6 text-gray-500">Duration: {(certificate as InternshipCertificate).internships.duration}</p>
                </>
              )}

              {/* Signatures Section */}
              <div className="flex justify-between items-center mt-8">
                <div className="text-center">
                  <Image src="/ins.svg" alt="Instructor Signature" className="h-16 mx-auto mb-2" />
                  <div className="border-b-2 border-indigo-600 w-24 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Instructor</p>
                </div>
                <div className="text-center">
                  <Image src="/ceo.svg" alt="CEO Signature" className="h-16 mx-auto mb-2" />
                  <div className="border-b-2 border-indigo-600 w-24 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">CEO</p>
                </div>
              </div>
            </div>

            {/* All Logos at Bottom */}
            <div className="flex justify-center items-center gap-6 mt-8 pt-4 border-t">
              <Image src="/certifyoLogo.PNG" alt="CertifyO Logo" className="h-14" />
              <Image src="/skill.png" alt="Skill India" className="h-12" />
              <Image src="/ncs.png" alt="NCS" className="h-12" />
              <Image src="/msme.png" alt="MSME Registered" className="h-12" />

            </div>
            <br />
            {/* Certificate Footer */}
            <div className="absolute bottom-4 left-4 text-left">
              <p className="text-sm text-gray-500">Certificate ID: {certId}</p>
              <p className="text-sm text-gray-500">Issue Date: {issueDate}</p>
            </div>

            <div className="absolute bottom-4 right-4 text-right">
              <p className="text-sm text-gray-500">certifyo.tech</p>
            </div>
          </div>
        </div>
      </div>
    );
  };


  // Rest of the component remains the same...
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="verify-certificate-section" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8 mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Verify Certificate</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Paste your certificate verification ID"
              value={verificationId}
              onChange={handleVerificationIdChange}
              onKeyPress={handleKeyPress}
              className={`flex-1 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-400'
                }`}
            />
            <button
              onClick={verifyCertificate}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2"
            >
              <Search className="h-5 w-5" />
              Verify
            </button>
          </div>

          {verificationError && <p className="mt-4 text-red-500">{verificationError}</p>}

          {(verifiedCertificate || verifiedInternshipCertificate) && (
            <div
              className={`mt-6 p-6 border rounded-lg ${isDarkMode ? 'border-green-600 bg-green-900' : 'border-green-200 bg-green-50'
                }`}
            >
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>
                Certificate Verified!
              </h3>
              <div className={`space-y-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                {verifiedCertificate ? (
                  <>
                    <p>Student: {verifiedCertificate.profiles?.full_name || verifiedCertificate.student_name || 'Anonymous'}</p>
                    <p>Exam: {getExamTitle(verifiedCertificate.exam_id)}</p>
                    <p>Score: {verifiedCertificate.score}%</p>
                    <p>Issue Date: {new Date(verifiedCertificate.issued_at).toLocaleDateString()}</p>
                  </>
                ) : verifiedInternshipCertificate ? (
                  <>
                    <p>Student: {verifiedInternshipCertificate.profiles?.full_name || 'Anonymous'}</p>
                    <p>Internship: {verifiedInternshipCertificate.internships.title}</p>
                    <p>Company: {verifiedInternshipCertificate.internships.company}</p>
                    <p>Duration: {verifiedInternshipCertificate.internships.duration}</p>
                    <p>Completion Date: {new Date(verifiedInternshipCertificate.completed_at).toLocaleDateString()}</p>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {user && (
          <>
            <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Certificates</h1>

            {profileIncomplete && (
              <div className={`mb-8 p-4 rounded-lg ${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50'} flex items-center gap-3`}>
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>
                  Please update your profile with your full name and phone number to access your certificates.{' '}
                  <button onClick={() => router.push('/profile')} className="underline hover:text-yellow-600">
                    Go to Profile
                  </button>
                </p>
              </div>
            )}

            {certificates.length === 0 && internshipCertificates.length === 0 ? (
              <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
                <Award className={`h-12 w-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  No certificates yet
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  Complete exams or internships to earn your certificates!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {certificates.length > 0 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Exam Certificates
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-lg'
                            } rounded-lg shadow-md p-6 transition-all`}
                        >
                          <Award className={`h-8 w-8 mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {getExamTitle(cert.exam_id)}
                          </h3>
                          <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Score: {cert.score}%
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                            Issued: {new Date(cert.issued_at).toLocaleDateString()}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() => handleViewCertificate(cert)}
                              className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </button>
                            {/* <button
                              onClick={() => handleShareToLinkedIn(cert)}
                              className="flex items-center px-3 py-1 bg-[#0077B5] text-white rounded-md hover:bg-[#006399]"
                            >
                              <Linkedin className="h-4 w-4 mr-1" />
                              LinkedIn
                            </button> */}
                            <button
                              onClick={() => handleCopyVerificationLink(cert)}
                              className="flex items-center px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                              {copiedToClipboard ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {internshipCertificates.length > 0 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Internship Certificates
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {internshipCertificates.map((cert) => (
                        <div
                          key={cert.id}
                          className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-lg'
                            } rounded-lg shadow-md p-6 transition-all`}
                        >
                          <Award className={`h-8 w-8 mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {cert.internships.title}
                          </h3>
                          <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {cert.internships.company}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                            Completed: {new Date(cert.completed_at).toLocaleDateString()}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() => handleViewCertificate(cert)}
                              className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => handleShareToLinkedIn(cert)}
                              className="flex items-center px-3 py-1 bg-[#0077B5] text-white rounded-md hover:bg-[#006399]"
                            >
                              <Linkedin className="h-4 w-4 mr-1" />
                              LinkedIn
                            </button>
                            <button
                              onClick={() => handleCopyVerificationLink(cert)}
                              className="flex items-center px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                              {copiedToClipboard ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {selectedCertificate && <CertificateModal certificate={selectedCertificate} type="exam" />}
        {selectedInternshipCertificate && <CertificateModal certificate={selectedInternshipCertificate} type="internship" />}
      </div>
    </div>
  );
}