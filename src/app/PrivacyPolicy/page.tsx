"use client";

import React from 'react';
import { useThemeStore } from '@/store/themeStore';

interface PrivacyPolicy {
  lastUpdated: string;
  introduction: string;
  informationWeCollect: {
    personalInformation: string[];
    nonPersonalInformation: string[];
  };
  howWeUseYourInformation: string[];
  howWeShareYourInformation: string[];
  dataRetention: string;
  cookiesAndTrackingTechnologies: string;
  yourRights: string[];
  security: string;
  thirdPartyLinks: string;
  childrensPrivacy: string;
  changesToThisPolicy: string;
  contactUs: string;
}


const privacyPolicy: PrivacyPolicy = {
  lastUpdated: '2023-10-15',
  introduction: `
    Welcome to [Your Website Name] ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, including exam certification, learning courses, internships, competitions, certificate verification, and certificate management.

    By accessing or using our website, you agree to the terms of this Privacy Policy. If you do not agree with this policy, please do not use our services.
  `,
  informationWeCollect: {
    personalInformation: [
      'Name',
      'Email Address',
      'Phone Number',
      'Mailing Address',
      'Date of Birth',
      'Payment Information (for paid services)',
      'Educational Background (for certifications and internships)',
      'Certification Details (e.g., exam results, certificates issued)',
    ],
    nonPersonalInformation: [
      'Browser Type',
      'IP Address',
      'Device Information',
      'Usage Data (e.g., pages visited, time spent on the site)',
      'Cookies and Tracking Technologies',
    ],
  },
  howWeUseYourInformation: [
    'To process and issue certifications based on your exam results.',
    'To provide access to courses and track your progress.',
    'To match you with internship opportunities and communicate with internship providers.',
    'To register you for competitions and notify you of results.',
    'To allow third parties to verify the authenticity of your certificates.',
    'To store and display your earned certificates.',
    'To send you updates, newsletters, and promotional materials (you can opt-out at any time).',
    'To analyze usage data and improve our website and services.',
    'To protect against fraud, unauthorized access, and other illegal activities.',
  ],
  howWeShareYourInformation: [
    'With third-party vendors who assist us in providing services (e.g., payment processors, hosting providers).',
    'With organizations offering internships to facilitate your placement.',
    'With sponsors of competitions you participate in.',
    'When required by law or to protect our rights, property, or safety.',
    'In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.',
  ],
  dataRetention: `
    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
  `,
  cookiesAndTrackingTechnologies: `
    We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us analyze web traffic, remember your preferences, and improve our services. You can disable cookies in your browser settings, but this may affect your ability to use certain features of our website.
  `,
  yourRights: [
    'Access and update your personal information.',
    'Request deletion of your personal information.',
    'Opt-out of receiving promotional communications.',
    'Withdraw consent for data processing (where applicable).',
    'Lodge a complaint with a data protection authority.',
  ],
  security: `
    We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
  `,
  thirdPartyLinks: `
    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
  `,
  childrensPrivacy: `
    Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete such information.
  `,
  changesToThisPolicy: `
    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
  `,
  contactUs: `
    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
    Email: support@certifyo.tech
     
  `,
};

export default function PrivacyPolicy() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode); // Get dark mode state

  return (
    <div
      className={`min-h-screen p-8 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
          Last Updated: {privacyPolicy.lastUpdated}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {privacyPolicy.introduction}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-medium mb-2">Personal Information</h3>
          <ul className="list-disc list-inside mb-4">
            {privacyPolicy.informationWeCollect.personalInformation.map((info, index) => (
              <li key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {info}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-medium mb-2">Non-Personal Information</h3>
          <ul className="list-disc list-inside">
            {privacyPolicy.informationWeCollect.nonPersonalInformation.map((info, index) => (
              <li key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {info}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside">
            {privacyPolicy.howWeUseYourInformation.map((use, index) => (
              <li key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {use}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Share Your Information</h2>
          <ul className="list-disc list-inside">
            {privacyPolicy.howWeShareYourInformation.map((share, index) => (
              <li key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {share}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {privacyPolicy.dataRetention}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {privacyPolicy.cookiesAndTrackingTechnologies}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <ul className="list-disc list-inside">
            {privacyPolicy.yourRights.map((right, index) => (
              <li key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {right}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{privacyPolicy.security}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {privacyPolicy.thirdPartyLinks}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {privacyPolicy.childrensPrivacy}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {privacyPolicy.changesToThisPolicy}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className={`whitespace-pre-line ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {privacyPolicy.contactUs}
          </p>
        </section>
      </div>
    </div>
  );
};

