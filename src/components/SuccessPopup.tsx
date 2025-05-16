// components/SuccessPopup.tsx
import { CheckCircle, Mail } from 'lucide-react';

interface SuccessPopupProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export const SuccessPopup = ({ isDarkMode, onClose }: SuccessPopupProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-center`}>
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Application Submitted!
      </h3>
      <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Thanks for applying to the internship on CertifyO. You will receive your Letter of Recommendation (LOR) within 24-48 hours, after which you can begin your internship journey.
      </p>
      <div className="flex items-center justify-center gap-2 mb-6">
        <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Check your email for updates
        </span>
      </div>
      <button
        onClick={onClose}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
      >
        Got it!
      </button>
    </div>
  </div>
);