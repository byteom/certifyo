'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { BookOpen, Award, Briefcase, Video, Trophy, ArrowRight, Globe, LucideIcon } from 'lucide-react';
import Hero from '@/components/Hero';

interface StatProps {
  count: string;
  label: string;
  color: string;
  isDarkMode: boolean;
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  onClick: () => void;
  isDarkMode: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, delay, onClick, isDarkMode }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl border transition-all cursor-pointer h-full ${
        isDarkMode 
          ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20'
          : 'bg-white shadow-md border-gray-200 hover:border-indigo-300'
      }`}
      onClick={onClick}
    >
      <div className={`p-3 rounded-lg inline-flex ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-100'} mb-4`}>
        <Icon className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      <p className={isDarkMode ? 'text-indigo-200' : 'text-gray-600'}>{description}</p>
    </motion.div>
  );
};

function HomePage() {
  const router = useRouter();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const featuresRef = useRef(null);

  const features = [
    { icon: Award, title: "Professional Certifications", description: "Earn industry-recognized certificates through comprehensive exams and practical assessments.", link: "/certificates" },
    { icon: BookOpen, title: "Expert-Led Learning", description: "Access high-quality courses taught by industry professionals with real-world experience.", link: "/learning" },
    { icon: Briefcase, title: "Career Internships", description: "Gain hands-on experience through our partnered internship programs with top companies.", link: "/internships" },
    { icon: Video, title: "Video Tutorials", description: "Learn at your own pace with our extensive library of high-quality video content.", link: "/learning" },
    { icon: Trophy, title: "Skill Competitions", description: "Test your knowledge against peers and win exciting prizes and recognition.", link: "/competitions" },
    { icon: Globe, title: "Global Community", description: "Connect with professionals worldwide through our exclusive networking platform.", link: "/community" }
  ];

  const testimonials = [
    {
      quote: "CertifyO helped me transition from marketing to UX design in just 6 months. The certifications opened doors I never thought possible!",
      author: "Priya Sharma",
      role: "UX Designer at TechSolutions"
    },
    {
      quote: "The cloud computing certification program was exactly what I needed to get promoted to a senior position at my company.",
      author: "Rahul Patel",
      role: "Cloud Architect"
    },
    {
      quote: "As a working professional, the flexible learning options allowed me to upskill without compromising my job responsibilities.",
      author: "Ananya Gupta",
      role: "Product Manager"
    }
  ];

  return (
    <>
      

      <Hero />

      {/* Features Section */}
      <section ref={featuresRef} className={`relative overflow-hidden py-16 md:py-24 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Transform Your Career Path
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our comprehensive programs are designed to give you the competitive edge in todays job market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
                onClick={() => router.push(feature.link)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => router.push('/subjects')}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center mx-auto shadow-lg"
            >
              Explore All Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 md:py-24 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Stat count="15,000+" label="Active Learners" color="indigo" isDarkMode={isDarkMode} />
            <Stat count="50+" label="Certification Programs" color="purple" isDarkMode={isDarkMode} />
            <Stat count="15+" label="Industry Partners" color="pink" isDarkMode={isDarkMode} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-16 md:py-24 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Success Stories
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Hear from professionals who transformed their careers with CertifyO
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className={`text-2xl mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>❝</div>
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.quote}</p>
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.author}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 md:py-24 ${isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ready to Transform Your Career?
            </h2>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-indigo-200' : 'text-gray-700'}`}>
              Join thousands of professionals who have accelerated their careers with CertifyO
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center shadow-lg"
                onClick={() => router.push('/signup')}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-lg font-semibold border ${
                  isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                } transition-all`}
                onClick={() => router.push('/demo')}
              >
                Take a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Stats Component
const Stat = ({ count, label, color, isDarkMode }: StatProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <h3 className={`text-5xl font-bold mb-2 ${isDarkMode ? `text-${color}-400` : `text-${color}-700`}`}>{count}</h3>
    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</p>
  </motion.div>
);

export default HomePage;
