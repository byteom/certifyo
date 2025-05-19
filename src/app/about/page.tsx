"use client"
import React from 'react';
// import { useThemeStore } from '../store/themeStore';
import { useThemeStore } from '@/store/themeStore';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, Clock, BookOpen, Code, Rocket, Briefcase, Mail, Globe } from 'lucide-react';
import Image from 'next/image';

const AboutUs: React.FC = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Team Member Data with GitHub usernames
  const teamMembers = [
    {
      name: 'Om Singh',
      github: 'byteom',
      role: 'CEO & CTO',
      description: 'Visionary leader with a passion for innovation and education.',
    },
    {
      name: 'Vaishnavi Raj',
      github: 'vaishnavirajj',
      role: 'CO-Founder & Chief Operating Officer',
      description: 'Expert in curriculum design and lifelong learning.',
    },
    {
      name: 'Divya Sharma',
      github: 'divyasharma00',
      role: 'CTO',
      description: 'Tech enthusiast driving our platform\'s cutting-edge features.',
    },
    {
      name: 'Aviral Shukla',
      github: 'aviralshukla12',
      role: 'Chief Operating Officer',
      description: 'Expert in curriculum design and lifelong learning.',
    },
  ];

  // Function to get GitHub avatar URL
  const getGithubAvatar = (username: string) => {
    return `https://github.com/${username}.png`;
  };

  // Services Data with Lucide Icons
  const services = [
    {
      title: 'Professional Certifications',
      description: 'Earn industry-recognized certificates through comprehensive exams.',
      icon: <Award className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: 'Expert-Led Learning',
      description: 'Access high-quality courses taught by industry professionals.',
      icon: <Users className="w-8 h-8 text-blue-500" />,
    },
    {
      title: 'Career Internships',
      description: 'Gain real-world experience through our internship programs.',
      icon: <Briefcase className="w-8 h-8 text-green-500" />,
    },
    {
      title: 'Video Tutorials',
      description: 'Learn at your own pace with our comprehensive video library.',
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
    },
    {
      title: 'Skill Competitions',
      description: 'Test your knowledge and win prizes in our competitions.',
      icon: <CheckCircle className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: 'Verified Credentials',
      description: 'Get your certificates verified by potential employers.',
      icon: <Globe className="w-8 h-8 text-red-500" />,
    },
  ];

  // Future Plans Data with Lucide Icons
  const futurePlans = [
    {
      title: 'AI Integration',
      description: 'AI-powered mock interviews to prepare students for real-world interviews.',
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: 'AI Coding Platform',
      description: 'A full-fledged platform to practice DSA and coding challenges.',
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: 'National Level Hackathons',
      description: 'Host large-scale hackathons to foster innovation.',
      icon: <Rocket className="w-8 h-8" />,
    },
    {
      title: 'Paid Internships',
      description: 'Provide paid internship opportunities to students.',
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      title: 'Job Assistance',
      description: 'Help students land their dream jobs with career guidance and placement support.',
      icon: <Mail className="w-8 h-8" />,
    },
  ];

  // Team Member Component
  const TeamMemberCard: React.FC<{
    name: string;
    role: string;
    github: string;
    description: string;
  }> = ({ name, role, github, description }) => {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Image
              src={getGithubAvatar(github)}
              alt={name}
              width={20}
              height={20}
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500/20"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'certifyoLogo.PNG';
              }}
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white p-2 rounded-full">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
            {name}
          </h3>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-3`}>
            {role}
          </p>
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </motion.div>
    );
  };

  // Section Header Component
  const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
          isDarkMode ? 'from-indigo-400 to-purple-500' : 'from-indigo-600 to-purple-700'
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className={`relative py-24 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About <span className="text-indigo-500">CertifyO</span>
            </h1>
            <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Empowering learners worldwide through innovation and excellence in education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Are Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader 
            title="Our Purpose" 
            subtitle="We are an online education platform dedicated to helping technical students gain valuable skills and knowledge." 
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`p-8 rounded-2xl shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } max-w-4xl mx-auto`}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bridging the Skills Gap
                </h3>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  In today&apos;s rapidly evolving tech landscape, we recognized the growing gap between academic knowledge and industry requirements. CertifyO was born to bridge this gap by providing practical, industry-relevant education.
                </p>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                    <Clock className={`w-6 h-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Founded in 2025 • Serving 15,00+ students
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className={`aspect-w-16 aspect-h-9 rounded-xl overflow-hidden ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {/* Placeholder for image/video */}
                  <div className="w-full h-full flex items-center justify-center">
                    <Code className={`w-16 h-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader 
            title="Our Offerings" 
            subtitle="Comprehensive learning solutions designed for your success" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-xl shadow-md transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full mb-4 ${
                    isDarkMode ? 'bg-gray-600' : 'bg-indigo-50'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Plans Section - Roadmap */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader 
            title="Our Roadmap" 
            subtitle="Exciting innovations coming your way" 
          />
          
          <div className="relative">
            {/* Roadmap Line */}
            <div className={`absolute left-1/2 h-full w-1 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            } hidden md:block`}></div>
            
            {/* Roadmap Items */}
            <div className="space-y-16">
              {futurePlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center w-full`}
                >
                  {/* Timeline Dot */}
                  <div className={`hidden md:flex w-1/2 items-center justify-center ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    <div className={`w-6 h-6 rounded-full ${
                      isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'
                    } border-4 ${
                      isDarkMode ? 'border-gray-800' : 'border-white'
                    } z-10`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 p-4 ${
                    index % 2 === 0 ? 'md:pr-8 md:pl-0' : 'md:pl-8 md:pr-0'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 rounded-xl shadow-lg ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                      } border-l-4 ${
                        isDarkMode ? 'border-indigo-500' : 'border-indigo-600'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${
                          isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'
                        }`}>
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold mb-2 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {plan.title}
                          </h3>
                          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {plan.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader 
            title="Meet Our Team" 
            subtitle="The passionate people behind CertifyO" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  github={member.github}
                  description={member.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-8 md:p-12 rounded-2xl shadow-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } text-center`}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to start your learning journey?
            </h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto`}>
              Join thousands of students who are advancing their careers with CertifyO.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-lg font-bold text-lg ${
                isDarkMode
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition-colors`}
            >
              Explore Courses
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;