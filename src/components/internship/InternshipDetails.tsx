import React from 'react';
import { Building2, MapPin, Calendar, DollarSign, ArrowRight, XCircle, Zap, Award, Clock, UserCheck, Layers } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  duration: string;
  stipend: number;
  location: string;
  requirements: string;
  type: string;
}

interface InternshipDetailsProps {
  internship: Internship;
  onClose: () => void;
  onApply: (internshipId: string) => void;
}

export default function InternshipDetails({ internship, onClose, onApply }: InternshipDetailsProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`font-mono ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                {internship.title}
              </h2>
              <div className="flex items-center">
                <Building2 className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {internship.company}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <XCircle className={`h-6 w-6 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`} />
            </button>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 rounded-lg border border-dashed border-gray-400/30">
            <div className="flex items-center">
              <MapPin className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Location</p>
                <p className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{internship.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Duration</p>
                <p className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{internship.duration}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Stipend</p>
                <p className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>₹{internship.stipend.toLocaleString()}/month</p>
              </div>
            </div>
            <div className="flex items-center">
              <Layers className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Type</p>
                <p className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{internship.type}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></span>
              Description
            </h3>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {internship.description}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></span>
              Requirements
            </h3>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {internship.requirements}
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></span>
              What You'll Get
            </h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-start">
                <Award className={`h-5 w-5 mr-3 mt-0.5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <div>
                  <p className="font-medium">Certificate of Completion</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Upon successful completion</p>
                </div>
              </div>
              <div className="flex items-start">
                <UserCheck className={`h-5 w-5 mr-3 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <p className="font-medium">Letter of Recommendation</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Based on performance</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className={`h-5 w-5 mr-3 mt-0.5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <div>
                  <p className="font-medium">Flexible Hours</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Work at your convenience</p>
                </div>
              </div>
              <div className="flex items-start">
                <Zap className={`h-5 w-5 mr-3 mt-0.5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <div>
                  <p className="font-medium">Real Projects</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gain practical experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-medium ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={() => onApply(internship.id)}
              className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                isDarkMode
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition-colors`}
            >
              <Zap className="h-4 w-4 mr-2" />
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}