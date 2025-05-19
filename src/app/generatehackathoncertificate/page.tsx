"use client"

import React, { useState } from 'react';
// import { supabase } from '../lib/supabase';
import { supabase } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';
import { Loader2, Search, Download } from 'lucide-react';

interface HackathonCertificate {
  id: string;
  participant_name: string;
  email: string;
  college_name: string;
  team_name: string;
  hackathon_name: string;
  start_date: string;
  end_date: string;
  verification_code: string;
  certificate_url: string;
  created_at: string;
  rank?: string; // Added rank field
  prize_details?: string; // Added prize details field
}

export default function CeHackathonCertificateGeneratorPage() {
  const [email, setEmail] = useState('');
  const [certificates, setCertificates] = useState<HackathonCertificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<HackathonCertificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setCertificates([]);
    setSelectedCertificate(null);

    const { data, error } = await supabase
      .from('hackathon_certificates')
      .select('*')
      .eq('email', email.trim().toLowerCase());

    if (error || !data || data.length === 0) {
      setError('No certificate found for this email.');
    } else {
      setCertificates(data as HackathonCertificate[]);
      if (data.length === 1) {
        setSelectedCertificate(data[0]);
      }
    }

    setLoading(false);
  };

  const downloadCertificate = () => {
    const element = document.getElementById('certificate-area');
    if (!element) return;

    import('html-to-image').then(htmlToImage => {
      htmlToImage.toPng(element).then(dataUrl => {
        const link = document.createElement('a');
        const fileName = selectedCertificate?.rank 
          ? 'hackathon-winner-certificate.png' 
          : 'hackathon-participation-certificate.png';
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      });
    });
  };

  const getDurationText = (start: string, end: string): string => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hours = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));

    if (hours >= 22 && hours <= 26) return 'a 24-hour hackathon';
    if (hours >= 6 && hours <= 12) return 'an 8-hour hackathon';
    return `a ${hours}-hour hackathon`;
  };

  const getRankText = (rank?: string): string => {
    if (!rank) return '';
    switch (rank.toLowerCase()) {
      case 'first place': return '1st Place Winner';
      case 'second place': return '2nd Place Winner';
      case 'third place': return '3rd Place Winner';
      default: return rank;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🎓 Generate Hackathon Certificate</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !email}
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded flex items-center gap-2 font-semibold"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Search className="h-5 w-5" />}
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {/* Show list if multiple certificates */}
        {certificates.length > 1 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Select your name:</h2>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCertificate(cert)}
                  className="block w-full text-left px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                >
                  {cert.participant_name} - {cert.team_name} {cert.rank && `(${getRankText(cert.rank)})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Show certificate only if selected */}
        {selectedCertificate && (
          <>
            <div
              id="certificate-area"
              className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl border border-gray-800"
              style={{
                backgroundImage: selectedCertificate.rank 
                  ? `url('hackthon-certificate.png')` 
                  : `url('hackthon-certificate.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '768px',
                width: '1086px',
              }}
            >
              {/* Certificate content */}
              <div className="absolute top-[180px] w-full text-center px-8">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                  {selectedCertificate.rank 
                    ? 'Certificate of Achievement' 
                    : 'Certificate of Participation'}
                </h2>
              </div>

              <div className="absolute top-[300px] w-full text-center px-10 text-lg leading-relaxed text-white drop-shadow-md">
                <p>
                  This is to certify that <strong>{selectedCertificate.participant_name}</strong> from<br />
                  <span className="block">{selectedCertificate.college_name}</span>, representing<br />
                  Team <strong>{selectedCertificate.team_name}</strong>, has {selectedCertificate.rank ? 'won ' : 'actively participated in '} the<br />
                  <strong>
                    &quot;{selectedCertificate.hackathon_name}, {getDurationText(selectedCertificate.start_date, selectedCertificate.end_date)}&quot;
                  </strong>{' '}
                  organized by CertifyO.
                </p>
                
                {selectedCertificate.rank && (
                  <div className="mt-6">
                    <p className="text-2xl font-bold text-yellow-300">
                      {getRankText(selectedCertificate.rank)}
                    </p>
                    {selectedCertificate.prize_details && (
                      <p className="text-lg mt-2">
                        Prize: {selectedCertificate.prize_details}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="absolute bottom-[80px] right-[40px]">
                <QRCodeSVG
                  value={selectedCertificate.certificate_url}
                  size={140}
                  level="H"
                  includeMargin
                  bgColor="transparent"
                  fgColor="#ffffff"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={downloadCertificate}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
              >
                <Download className="h-5 w-5" />
                Download Certificate
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}