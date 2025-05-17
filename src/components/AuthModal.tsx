import React, { useState, useCallback } from 'react';
import { X, Mail, Lock, Github, Chrome, Sun, Moon, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  // State management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Store hooks
  const { signIn, signUp } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  // Style constants
  const inputClasses = `w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
    isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'border-gray-300 placeholder-gray-400'
  }`;

  const buttonClasses = `w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-75 ${
    isLoading ? 'cursor-not-allowed' : ''
  }`;

  // Validation functions
  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone: string) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10 && digitsOnly.length <= 12;
  }, []);

  // Form handlers
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (mode === 'signup') {
      if (!validatePhone(phone)) {
        setError('Please enter a valid phone number (10-12 digits)');
        setIsLoading(false);
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        setIsLoading(false);
        return;
      }
    }

    try {
      if (mode === 'signup') {
        await signUp(email, password, phone);
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, phone, mode, signUp, signIn, onClose, validateEmail, validatePhone]);

  const handleSocialLogin = useCallback(async (provider: 'github' | 'google') => {
    try {
      setError('');
      setIsLoading(true);
      const redirectTo = window.location.origin;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          skipBrowserRedirect: false
        }
      });
      
      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate with social provider');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleModeSwitch = useCallback(() => {
    const newMode = mode === 'signin' ? 'signup' : 'signin';
    onModeChange(newMode);
    setError('');
  }, [mode, onModeChange]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isDarkMode ? 'dark' : ''}`}>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 max-w-md w-full relative transform transition-all duration-300 ease-in-out`}>
        {/* Header with theme toggle and close button */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 rounded-full ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
            disabled={isLoading}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={onClose}
            aria-label="Close modal"
            title="Close modal"
            className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            disabled={isLoading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Title */}
        <h2 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </h2>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Main form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          {/* Password field */}
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Phone field (signup only) */}
          {mode === 'signup' && (
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClasses}
                  placeholder="+1234567890"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
          
          {/* Remember me and forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className={`rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : ''
                }`}
                disabled={isLoading}
              />
              <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Remember me
              </span>
            </label>
            <a 
              href="#" 
              className={`text-sm text-indigo-600 hover:text-indigo-500 ${
                isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                // Handle forgot password
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={buttonClasses}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Processing...' : mode === 'signup' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Mode switch */}
        <div className={`mt-6 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button 
            onClick={handleModeSwitch}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
            disabled={isLoading}
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </div>

        {/* Social login */}
        <div className={`mt-6 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>Or continue with</span>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleSocialLogin('google')}
              className={`flex-1 py-2 px-4 rounded-md border ${
                isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              } transition-colors flex items-center justify-center space-x-2`}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5 text-red-500" />
              <span className={isDarkMode ? 'text-white' : 'text-gray-700'}>Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className={`flex-1 py-2 px-4 rounded-md border ${
                isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              } transition-colors flex items-center justify-center space-x-2`}
              disabled={isLoading}
            >
              <Github className="h-5 w-5" />
              <span className={isDarkMode ? 'text-white' : 'text-gray-700'}>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}