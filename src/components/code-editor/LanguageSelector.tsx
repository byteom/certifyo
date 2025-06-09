import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/constants/editor-config'; // Adjusted import
import { useThemeStore } from '@/store/themeStore'; // Import useThemeStore

// Import language icons
import { FaJava, FaPython, FaRust } from "react-icons/fa";
import { SiJavascript, SiTypescript } from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { TbBrandCpp, TbLetterC } from "react-icons/tb";
import { DiRuby } from "react-icons/di";

export interface LanguageSelectorProps {
    selectedLanguageId: string;
    onSelectLanguage: (languageId: string) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    maxHeight?: number | string; // For vertical scroll container
    showTitle?: boolean;
}

// Language icons with their custom colors
const languageIcons: Record<string, { icon: React.ReactElement; color: string }> = {
    java: { icon: <FaJava size={30} />, color: 'text-orange-400' },
    cpp: { icon: <TbBrandCpp size={30} />, color: 'text-blue-400' },
    c: { icon: <TbLetterC size={30} />, color: 'text-blue-500' },
    python: { icon: <FaPython size={30} />, color: 'text-yellow-400' },
    javascript: { icon: <SiJavascript size={30} />, color: 'text-yellow-300' },
    typescript: { icon: <SiTypescript size={30} />, color: 'text-blue-400' },
    go: { icon: <FaGolang size={30} />, color: 'text-cyan-400' },
    rust: { icon: <FaRust size={30} />, color: 'text-orange-500' },
    ruby: { icon: <DiRuby size={30} />, color: 'text-red-500' }
};

export default function LanguageSelector({
    selectedLanguageId: propSelectedLanguageId,
    onSelectLanguage,
    orientation = 'horizontal',
    className = '',
    maxHeight = '100%',
}: LanguageSelectorProps) {
    // Reference for the scrollable container
    const scrollerRef = useRef<HTMLDivElement>(null);
    const { isDarkMode } = useThemeStore(); // Access isDarkMode

    // Use state for selectedLanguageId, initialized with the prop value for server render
    const [selectedLanguageId, setSelectedLanguageId] = useState(propSelectedLanguageId);
    // State to track if the component has mounted on the client
    const [isMounted, setIsMounted] = useState(false);

    // Effect to read from localStorage on the client after mount (hydration)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLangId = localStorage.getItem('selected-language');
            if (savedLangId && SUPPORTED_LANGUAGES.some(lang => lang.id === savedLangId)) {
                setSelectedLanguageId(savedLangId);
            }
            // Set isMounted to true after client-side initialization
            setIsMounted(true);
        }
    }, []); // Empty dependency array ensures this runs only once after mount

    // Effect to update localStorage when selectedLanguageId changes, only after mounted
    useEffect(() => {
      if (isMounted && typeof window !== 'undefined') {
        localStorage.setItem('selected-language', selectedLanguageId);
      }
    }, [selectedLanguageId, isMounted]); // Depend on isMounted as well

    // Effect to scroll the selected language into view whenever selectedLanguageId or orientation changes
    useEffect(() => {
        if (scrollerRef.current) {
            const selectedElement = scrollerRef.current.querySelector(`[data-language="${selectedLanguageId}"]`);
            if (selectedElement) {
                // Calculate the position to scroll to center the element
                if (orientation === 'horizontal') {
                    const containerWidth = scrollerRef.current.offsetWidth;
                    const elementOffset = (selectedElement as HTMLElement).offsetLeft;
                    const elementWidth = (selectedElement as HTMLElement).offsetWidth;
                    scrollerRef.current.scrollLeft = elementOffset - containerWidth / 2 + elementWidth / 2;
                } else {
                    const containerHeight = scrollerRef.current.offsetHeight;
                    const elementOffset = (selectedElement as HTMLElement).offsetTop;
                    const elementHeight = (selectedElement as HTMLElement).offsetHeight;
                    scrollerRef.current.scrollTop = elementOffset - containerHeight / 2 + elementHeight / 2;
                }
            }
        }
    }, [selectedLanguageId, orientation]);

    // Scroll the language selector in a certain direction
    const scroll = (direction: 'left' | 'right' | 'up' | 'down') => {
        if (scrollerRef.current) {
            const scrollAmount = 150; // pixels to scroll

            if (direction === 'left') {
                scrollerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else if (direction === 'right') {
                scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else if (direction === 'up') {
                scrollerRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            } else if (direction === 'down') {
                scrollerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Render the horizontal language selector
    if (orientation === 'horizontal') {
        return (
            <div className={`relative ${className}`}>
                {/* Left scroll button */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                    <button
                        onClick={() => scroll('left')}
                        className={`flex items-center justify-center w-8 h-8 rounded-full border text-white shadow-lg ${
                          isDarkMode ? 'bg-gray-800/80 border-purple-900/50' : 'bg-gray-200/80 border-purple-300/50 text-gray-800'
                        }`}
                        aria-label="Scroll languages left"
                    >
                        <ChevronLeft size={18} />
                    </button>
                </div>

                {/* Right scroll button */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                    <button
                        onClick={() => scroll('right')}
                        className={`flex items-center justify-center w-8 h-8 rounded-full border text-white shadow-lg ${
                          isDarkMode ? 'bg-gray-800/80 border-purple-900/50' : 'bg-gray-200/80 border-purple-300/50 text-gray-800'
                        }`}
                        aria-label="Scroll languages right"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Scrollable container */}
                <div
                    ref={scrollerRef}
                    className="overflow-x-auto px-10 py-3 scrollbar-hide"
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    <div className="flex space-x-4">
                        {SUPPORTED_LANGUAGES.map((lang) => {
                            const langIcon = languageIcons[lang.id] || { icon: <span>?</span>, color: 'text-gray-400' };
                            return (
                                <button
                                    key={lang.id}
                                    data-language={lang.id}
                                    onClick={() => onSelectLanguage(lang.id)}
                                    className={`group flex-shrink-0 flex items-center justify-center rounded-lg p-3 transition-all duration-300 ${
                                        isMounted && selectedLanguageId === lang.id
                                            ? `${isDarkMode ? 'bg-gradient-to-br from-purple-800/80 to-indigo-900/90 shadow-lg shadow-purple-800/30' : 'bg-gradient-to-br from-purple-300/80 to-indigo-400/90 shadow-lg shadow-purple-300/30'} scale-110`
                                            : `${isDarkMode ? 'bg-gray-800/60 hover:bg-gray-700/60' : 'bg-gray-200/60 hover:bg-gray-300/60'} hover:scale-105`
                                    }`}
                                    aria-label={`Select ${lang.name}`}
                                >
                                    <div className={`w-10 h-10 flex items-center justify-center ${
                                        isMounted && selectedLanguageId === lang.id
                                            ? langIcon.color
                                            : `${isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-800'}`
                                    }`}>
                                        {langIcon.icon}
                                    </div>

                                    {/* File extension badge */}
                                    <div className={`absolute -bottom-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[9px] font-mono font-bold ${
                                        isMounted && selectedLanguageId === lang.id
                                            ? `${isDarkMode ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'}`
                                            : `${isDarkMode ? 'bg-gray-700 text-gray-300 group-hover:bg-gray-600' : 'bg-gray-300 text-gray-700 group-hover:bg-gray-400'}`
                                    }`}>
                                        {lang.extension}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // Render the vertical language selector
    return (
        <div className={`pt-8 rounded-2xl shadow-lg backdrop-blur-sm flex flex-col relative ${className} ${isDarkMode ? 'bg-gray-900/80 border border-purple-900/50' : 'bg-gray-100/80 border border-purple-200/50'}`}>

            {/* Up scroll button */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
                <button
                    onClick={() => scroll('up')}
                    className={`flex items-center justify-center w-6 h-6 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-800/80 text-white' : 'bg-gray-200/80 text-gray-800'}`}
                    aria-label="Scroll languages up"
                >
                    <ChevronUp size={14} />
                </button>
            </div>

            {/* Scrollable container */}
            <div
                ref={scrollerRef}
                className="flex-1 overflow-y-auto py-2 scrollbar-hide"
                style={{
                    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                }}
            >
                <div className="flex flex-col items-center space-y-5">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                        const langIcon = languageIcons[lang.id] || { icon: <span>?</span>, color: 'text-gray-400' };
                        const isSelected = isMounted && selectedLanguageId === lang.id;
                        const buttonClasses = `relative w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
                            isSelected
                                ? isDarkMode ? 'bg-gradient-to-br from-purple-800/80 to-indigo-900/80 text-white shadow-lg shadow-purple-900/30 ring-2 ring-purple-400/50' : 'bg-gradient-to-br from-purple-300/80 to-indigo-400/80 text-gray-900 shadow-lg shadow-purple-300/30 ring-2 ring-purple-500/50'
                                : isDarkMode ? 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700/60' : 'bg-gray-200/60 text-gray-600 hover:text-gray-800 hover:bg-gray-300/60'
                        } ${isSelected ? 'scale-110 z-10' : 'hover:scale-105'}`;

                        const iconSpanClasses = isSelected ? langIcon.color : `${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-gray-900'}`;

                        const badgeClasses = `absolute -bottom-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[9px] font-mono font-bold ${
                            isSelected
                                ? isDarkMode ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'
                                : isDarkMode ? 'bg-gray-700 text-gray-300 group-hover:bg-gray-600' : 'bg-gray-300 text-gray-700 group-hover:bg-gray-400'
                        }`;

                        const indicatorClasses = `absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-7 rounded-full shadow-md ${isDarkMode ? 'bg-gradient-to-b from-purple-400 to-indigo-500' : 'bg-gradient-to-b from-purple-500 to-indigo-600'}`;

                        return (
                            <div key={lang.id} className="relative w-full flex flex-col items-center">
                                <button
                                    data-language={lang.id}
                                    onClick={() => onSelectLanguage(lang.id)}
                                    className={buttonClasses}
                                    aria-label={`Select ${lang.name}`}
                                >
                                    <span className={iconSpanClasses}>
                                        {langIcon.icon}
                                    </span>

                                    {/* File extension badge */}
                                    <div className={badgeClasses}>
                                        {lang.extension}
                                    </div>

                                    {/* Selection indicator */}
                                    {isSelected && (
                                        <span className={indicatorClasses}></span>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Down scroll button */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10">
                <button
                    onClick={() => scroll('down')}
                    className={`flex items-center justify-center w-6 h-6 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-800/80 text-white' : 'bg-gray-200/80 text-gray-800'}`}
                    aria-label="Scroll languages down"
                >
                    <ChevronDown size={14} />
                </button>
            </div>
        </div>
    );
} 