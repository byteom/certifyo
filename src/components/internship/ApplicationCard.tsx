import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Clock, CheckCircle, XCircle, Calendar, Briefcase } from 'lucide-react';

interface Application {
  id: string;
  status: string;
  applied_at: string;
  completed_at: string | null;
  internships: {
    title: string;
    company: string;
  };
}

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  const StatusIcon = () => {
    switch (application.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return <XCircle className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className={`font-mono ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
      rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} 
      shadow-sm hover:shadow-md transition-shadow duration-300 p-6`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center mb-1">
            <Briefcase className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {application.internships.title}
            </h3>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ml-6`}>
            @ {application.internships.company}
          </p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          application.status === 'completed'
            ? 'bg-green-100 text-green-800'
            : application.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          <StatusIcon />
          {application.status.toUpperCase()}
        </span>
      </div>

      <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center mb-2">
          <Calendar className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            APPLIED: <span className="font-semibold">{new Date(application.applied_at).toLocaleDateString()}</span>
          </p>
        </div>
        {application.completed_at && (
          <div className="flex items-center">
            <Calendar className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              COMPLETED: <span className="font-semibold">{new Date(application.completed_at).toLocaleDateString()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}