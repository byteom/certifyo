'use client';

import React from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function RefundPolicy() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8`}>
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Refund Policy
          </h1>

          <div className={`prose max-w-none ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <h2 className={`text-xl font-semibold mt-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              1. General Policy
            </h2>
            <p>
              We offer refunds within 30 days of purchase if you&apos;re not satisfied with our product.
              To be eligible, your item must be unused and in the same condition you received it.
            </p>


            <h2 className={`text-xl font-semibold mt-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              2. Digital Products
            </h2>
            <p>
              For digital products, refunds are available within 14 days of purchase if you haven&apos;t downloaded
              or accessed the content.
            </p>


            <h2 className={`text-xl font-semibold mt-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              3. How to Request
            </h2>
            <p>
              Email us at support@certifyo.tech with your order number and reason for refund.
              We&apos;ll process your request within 5 business days.
            </p>


            <h2 className={`text-xl font-semibold mt-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              4. Non-Refundable Items
            </h2>
            <ul className="list-disc pl-5 mt-2">
              <li>Custom or personalized orders</li>
              <li>Downloaded software or digital content</li>
              <li>Services already performed</li>
            </ul>
          </div>

          <div className={`mt-8 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
