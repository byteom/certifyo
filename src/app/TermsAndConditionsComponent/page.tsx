'use client';

import React from 'react';
import { useThemeStore } from '@/store/themeStore';

// Define the TermsAndConditions interface
interface TermsAndConditions {
  lastUpdated: string;
  introduction: string;
  servicesProvided: string[];
  userResponsibilities: string[];
  paymentsAndSubscriptions: {
    subscriptionDetails: string;
    paymentTerms: string;
    refundPolicy: string;
  };
  intellectualProperty: string;
  userConduct: string[];
  termination: string;
  disclaimer: string;
  governingLaw: string;
  changesToTerms: string;
  contactUs: string;
}

// Define the termsAndConditions object
const termsAndConditions: TermsAndConditions = {
  lastUpdated: '2023-10-15',
  introduction: `
    Welcome to Certifyo ("we," "our," or "us"). These Terms and Conditions govern your use of our website and services, including but not limited to internships, exams, certifications, competitions, learning courses, and subscription plans. By accessing or using our services, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our services.
  `,
  servicesProvided: [
    'Internship opportunities and placement services.',
    'Examinations and certifications.',
    'Competitions and contests.',
    'Learning courses and educational content.',
    'Subscription plans for premium features.',
  ],
  userResponsibilities: [
    'Provide accurate and complete information during registration.',
    'Maintain the confidentiality of your account credentials.',
    'Use our services only for lawful purposes.',
    'Do not engage in any activity that disrupts or interferes with the functioning of our website.',
    'Comply with all applicable laws and regulations.',
  ],
  paymentsAndSubscriptions: {
    subscriptionDetails: `
      We offer subscription plans for access to premium features. By subscribing, you agree to pay the applicable fees and authorize us to charge your payment method on a recurring basis.
    `,
    paymentTerms: `
      All payments must be made in Indian Rupees (INR). Payment methods include credit/debit cards, net banking, and other supported payment gateways. You are responsible for ensuring that your payment information is accurate and up-to-date.
    `,
    refundPolicy: `
      We do not offer strict refunds for subscriptions or payments made for services. Refunds, if applicable, will be at the sole discretion of Certifyo and will be processed only under exceptional circumstances.
    `,
  },
  intellectualProperty: `
    All content, trademarks, logos, and intellectual property on our website are owned by or licensed to Certifyo. You may not use, reproduce, or distribute any content without our prior written permission.
  `,
  userConduct: [
    'Do not upload or share content that is offensive, illegal, or violates the rights of others.',
    'Do not attempt to gain unauthorized access to our systems or data.',
    'Do not use our services to promote or engage in any fraudulent activity.',
    'Respect the privacy and rights of other users.',
  ],
  termination: `
    We reserve the right to suspend or terminate your account and access to our services at any time, without notice, for any violation of these terms or for any other reason at our sole discretion.
  `,
  disclaimer: `
    Our services are provided "as is" and "as available" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of any content or services. Your use of our services is at your own risk.
  `,
  governingLaw: `
    These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts located in India.
  `,
  changesToTerms: `
    We may update these terms and conditions from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the revised terms.
  `,
  contactUs: `
    If you have any questions or concerns about these terms and conditions, please contact us at:
    Email: support@certifyo.tech
    Contact Page: https://certifyo.tech/contact
  `,
};

// TermsAndConditions Component
export default function TermsAndConditionsComponent() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode); // Get dark mode state

  return (
    <div
      className={`min-h-screen p-8 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
          Last Updated: {termsAndConditions.lastUpdated}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.introduction}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Services Provided</h2>
          <ul className="list-disc list-inside">
            {termsAndConditions.servicesProvided.map((service, index) => (
              <li key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {service}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <ul className="list-disc list-inside">
            {termsAndConditions.userResponsibilities.map((responsibility, index) => (
              <li key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {responsibility}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Payments and Subscriptions</h2>
          <h3 className="text-xl font-medium mb-2">Subscription Details</h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.paymentsAndSubscriptions.subscriptionDetails}
          </p>
          <h3 className="text-xl font-medium mb-2">Payment Terms</h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.paymentsAndSubscriptions.paymentTerms}
          </p>
          <h3 className="text-xl font-medium mb-2">Refund Policy</h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.paymentsAndSubscriptions.refundPolicy}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.intellectualProperty}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Conduct</h2>
          <ul className="list-disc list-inside">
            {termsAndConditions.userConduct.map((conduct, index) => (
              <li key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {conduct}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.termination}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.disclaimer}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.governingLaw}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {termsAndConditions.changesToTerms}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className={`whitespace-pre-line ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {termsAndConditions.contactUs}
          </p>
        </section>
      </div>
    </div>
  );
}
