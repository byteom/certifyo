import React from 'react';
import { Building2, MapPin, Calendar, DollarSign, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  duration: string;
  stipend: number;
  location: string;
  type: string;
}

interface InternshipCardProps {
  internship: Internship;
  isApplied: boolean;
  onViewDetails: (internship: Internship) => void;
}

export default function InternshipCard({ internship, isApplied, onViewDetails }: InternshipCardProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <div
      className={`font-mono ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700/90' : 'bg-white hover:bg-gray-50'
      } rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} 
      shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer p-6`}
      onClick={() => onViewDetails(internship)}
    >
      {/* Header with title and type badge */}
      <div className="flex justify-between items-start mb-5">
        <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {internship.title}
        </h3>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          internship.type === 'remote' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {internship.type.toUpperCase()}
        </span>
      </div>

      {/* Company info */}
      <div className="flex items-center mb-4">
        <Building2 className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
        <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {internship.company}
        </span>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <MapPin className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {internship.location}
          </span>
        </div>
        <div className="flex items-center">
          <Calendar className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {internship.duration}
          </span>
        </div>
        <div className="flex items-center col-span-2">
          <DollarSign className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ₹{internship.stipend.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {/* Action button */}
      {isApplied ? (
        <button
          className="w-full bg-green-600/90 text-white px-4 py-3 rounded-lg flex items-center justify-center 
          opacity-90 cursor-not-allowed font-medium text-sm"
          disabled
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          APPLICATION SUBMITTED
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(internship);
          }}
          className={`w-full px-4 py-3 rounded-lg flex items-center justify-center font-medium text-sm
          ${isDarkMode ? 
            'bg-indigo-600 hover:bg-indigo-700 text-white' : 
            'bg-indigo-600 hover:bg-indigo-700 text-white'}
          transition-colors duration-200`}
        >
          <Zap className="h-4 w-4 mr-2" />
          VIEW DETAILS
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      )}
    </div>
  );
}