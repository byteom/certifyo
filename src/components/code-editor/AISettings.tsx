import { useState, useEffect } from 'react';
import { X, Save, Key } from 'lucide-react';

interface AISettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AISettings({ isOpen, onClose }: AISettingsProps) {
  const [apiKey, setApiKey] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);
  const [isUsingDefault, setIsUsingDefault] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load saved API key when dialog opens
      const savedApiKey = typeof window !== 'undefined' ? localStorage.getItem('gemini-api-key') || '' : ''; // Added typeof window check
      setApiKey(savedApiKey);
      
      // Check if using default key from .env - This needs adaptation for Next.js environment variables
      // For now, we'll assume localStorage is the primary source or leave a TODO
      setIsUsingDefault(!savedApiKey);
    }
  }, [isOpen]);

  const handleSave = () => {
    // Save API key
    if (typeof window !== 'undefined') { // Added typeof window check
      if (apiKey.trim()) {
        localStorage.setItem('gemini-api-key', apiKey.trim());
        setIsUsingDefault(false);
      } else {
        // If the user clears the API key, remove it from localStorage
        localStorage.removeItem('gemini-api-key');
        setIsUsingDefault(true); // Assume using default if no local key is set
      }
    }
    
    // Show saved confirmation
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  // Handle using default API key (simplified for CertifyO context)
  const handleUseDefault = () => {
    if (typeof window !== 'undefined') { // Added typeof window check
      setApiKey('');
      localStorage.removeItem('gemini-api-key');
      setIsUsingDefault(true);
    }
    // Show saved confirmation
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl shadow-xl border border-purple-700/50 w-full max-w-md flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple-800/30">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-medium">Google Gemini API Settings</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Gemini API Key</label>
            <input 
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setIsUsingDefault(false);
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              placeholder="Enter your Gemini API key"
            />
            
            {/* Simplified the default key logic for CertifyO */}
            {isUsingDefault && !apiKey && (
              <div className="mt-3 flex items-center">
                <input 
                  type="checkbox" 
                  id="useDefault" 
                  checked={isUsingDefault}
                  onChange={() => handleUseDefault()}
                  className="mr-2 accent-purple-500"
                  disabled // Disable since it's the implied state if no local key exists
                />
                <label htmlFor="useDefault" className="text-sm text-gray-300">
                  Using locally stored API key.
                </label>
              </div>
            )}
            
            <p className="mt-2 text-xs text-gray-400">
              Get your key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google AI Studio</a>. 
              Your API key is stored locally in your browser.
            </p>
          </div>
          
          <div className="flex justify-end">
            {isSaved && (
              <div className="mr-3 flex items-center text-sm text-green-400">
                <span>✓ Settings saved</span>
              </div>
            )}
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white shadow-md transition-colors hover:bg-purple-700"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 