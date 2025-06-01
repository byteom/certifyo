'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Removed Metadata import as it's no longer used here
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Import card components
import { ArrowRight } from 'lucide-react'; // For "Read More" link

// Removed the metadata export block

interface BlogPost {
  title: string;
  description:string;
  slug: string;
  category?: string;
}

const samplePostsData: BlogPost[] = [
  {
    title: 'My First Blog Post',
    description: 'This is the description for my first blog post about web development, exploring the basics of React and Next.js.',
    slug: 'first-post',
    category: 'Technology',
  },
  {
    title: 'Another Interesting Article',
    description: 'A brief overview of an interesting topic in the world of travel, focusing on sustainable tourism.',
    slug: 'interesting-article',
    category: 'Travel',
  },
  {
    title: 'Next.js is Awesome',
    description: 'Why I love working with Next.js and React for modern web apps, covering features like SSR and SSG.',
    slug: 'nextjs-awesome',
    category: 'Technology',
  },
  {
    title: 'Delicious Recipes for Quick Meals',
    description: 'Sharing some of my favorite recipes for everyone to enjoy, especially when you are short on time.',
    slug: 'delicious-recipes',
    category: 'Food',
  },
  {
    title: 'Exploring National Parks: A Hiker\'s Guide',
    description: 'A guide to the most beautiful national parks and hiking trails, with tips for beginners and experienced hikers.',
    slug: 'national-parks',
    category: 'Travel',
  }
];

const categories = ["All", "Technology", "Travel", "Food"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(samplePostsData);
  const [isDarkMode, setIsDarkMode] = useState(false); // Basic dark mode state, ideally from theme store

  // Simulate theme store for styling consistency
  useEffect(() => {
    // In a real app, this would come from useThemeStore()
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(matcher.matches);
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    matcher.addEventListener('change', listener);
    return () => matcher.removeEventListener('change', listener);
  }, []);


  useEffect(() => {
    let posts = samplePostsData;
    if (searchTerm) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    setFilteredPosts(posts);
  }, [searchTerm, selectedCategory]);

  const inputBaseClasses = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-150 ease-in-out";
  const lightInputClasses = "bg-white border-gray-300 placeholder-gray-400 text-gray-900";
  const darkInputClasses = "bg-gray-700 border-gray-600 placeholder-gray-400 text-white";
  const currentInputClasses = isDarkMode ? darkInputClasses : lightInputClasses;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 ease-in-out`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-10 text-center">
          <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>CertifyO Blog</h1>
        </header>

        <section aria-labelledby="filter-heading" className={`max-w-3xl mx-auto mb-10 p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 id="filter-heading" className="sr-only">Filter Controls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="search" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Search Posts
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className={`${inputBaseClasses} ${currentInputClasses}`}
              />
            </div>
            <div>
              <label htmlFor="category" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Filter by Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`${inputBaseClasses} ${currentInputClasses}`}
              >
                {categories.map(category => (
                  <option key={category} value={category} className={isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <main>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.slug} className={`flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl dark:border-gray-700 ${isDarkMode ? 'bg-gray-800 hover:border-gray-600' : 'bg-white hover:border-gray-300'}`}>
                  <CardHeader>
                    <CardTitle className="text-lg lg:text-xl">
                      <Link href={`/blog/${post.slug}`} className={`hover:text-indigo-600 dark:hover:text-indigo-400 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-150 ease-in-out`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    {post.category && (
                      <CardDescription className={`text-xs pt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Category: {post.category}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blog/${post.slug}`} className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'} transition-colors duration-150 ease-in-out group`}>
                      Read More
                      <ArrowRight className="ml-1.5 h-4 w-4 transform transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className={`mt-2 text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No posts found</h3>
              <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No blog posts matched your current search or filter criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
