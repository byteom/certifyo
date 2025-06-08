"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// Removed Metadata import as it's no longer used here
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import card components
import { ArrowRight, Plus, Search } from "lucide-react"; // For "Read More" link
import AddBlogModal from "../../components/AddBlogModal";
import { useThemeStore } from "@/store/themeStore";
import DropdownMenu from "@/components/Dropdowmenu";
import { motion } from "framer-motion";
// Removed the metadata export block

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  category?: string;
  content?: string;
}

interface BlogClientComponentProps {
  blogs: BlogPost[];
  categories: string[];
}

// const categories = ["All", "Technology", "Travel", "Food"];

export default function BlogClientComponent({
  blogs,
  categories,
}: BlogClientComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(blogs);
  const [loading, setLoading] = useState(false);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const handleAddBlog = async (newBlog: BlogPost) => {
    // Add the new blog to our posts array
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        const addedPost = await response.json();
        console.log();
        setPosts((prev) => [...prev, addedPost]);
        setFilteredPosts((prev) => [...prev, addedPost]);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  useEffect(() => {
    if (!posts) return; // Ensure `posts` is defined and not empty

    let filtered = [...posts]; // Use state `posts` directly
    if (searchTerm) {
      filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = posts.filter((post) => post.category === selectedCategory);
    }
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const inputClasses = `w-full pl-10 px-4 py-1.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      : "border-gray-300 placeholder-gray-400"
  }`;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-mono">
        <header className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-center mb-16"
          >
            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block"
              >
                CertifyO
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
              >
                Blog
              </motion.span>
            </h1>
          </motion.div>
          <div
            className={`fixed bottom-6 right-6 z-50 ${
              showAddModal && "hidden"
            }`}
          >
            <button
              onClick={() => setShowAddModal(true)}
              className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg 
                   bg-indigo-600 hover:bg-indigo-700 text-white
                   transition-all transform hover:scale-110`}
              aria-label="Add new blog post"
            >
              <Plus size={24} />
            </button>
          </div>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <section
            aria-labelledby="filter-heading"
            className={`max-w-3xl mx-auto mb-10 p-6 rounded-xl shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 id="filter-heading" className="sr-only">
              Filter Controls
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="search"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Search Posts
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                    <Search
                      className={`h-5 w-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title or description..."
                    className={`border rounded-lg shadow-sm  ${inputClasses}`}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Filter by Category
                </label>
                <div
                  className={`${isDarkMode ? " text-white" : " text-black"}`}
                >
                  <DropdownMenu
                    categories={categories}
                    isDarkMode={isDarkMode}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                  />
                </div>
              </div>
            </div>
          </section>
        </motion.div>
        {loading ? (
          <div
            className={`flex items-center justify-center ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <main>
            {filteredPosts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                      whileHover={{
                        y: -15,
                        boxShadow: isDarkMode
                          ? "0 25px 50px -12px rgba(99, 102, 241, 0.25)"
                          : "0 20px 25px -5px rgba(99, 102, 241, 0.15)",
                      }}
                      className={`relative overflow-hidden rounded-2xl ${
                        isDarkMode ? "bg-gray-800" : "bg-white"
                      } shadow-lg border-2 ${
                        isDarkMode
                          ? "border-gray-700 hover:border-indigo-500"
                          : "border-gray-200 hover:border-indigo-400"
                      } transition-all duration-300`}
                    >
                      <Card
                        className={`flex flex-col transition-all duration-300 ease-in-out  hover:shadow-xl dark:border-gray-700 rounded-xl ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white "
                        }`}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg lg:text-xl">
                            <Link
                              href={`/blog/${post.slug}`}
                              className={`hover:text-indigo-600 dark:hover:text-indigo-400 ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              } transition-colors duration-150 ease-in-out`}
                            >
                              {post.title}
                            </Link>
                          </CardTitle>
                          {post.category && (
                            <CardDescription
                              className={`text-xs pt-1 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Category: {post.category}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {post.description}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Link
                            href={`/blog/${post.slug}`}
                            className={`flex items-center text-sm font-medium ${
                              isDarkMode
                                ? "text-indigo-400 hover:text-indigo-300"
                                : "text-indigo-600 hover:text-indigo-800"
                            } transition-colors duration-150 ease-in-out group`}
                          >
                            Read More
                            <ArrowRight className="ml-1.5 h-4 w-4 transform transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className={`mx-auto h-12 w-12 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3
                  className={`mt-2 text-lg font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  No posts found
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No blog posts matched your current search or filter criteria.
                </p>
              </div>
            )}
          </main>
        )}
        <AddBlogModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddBlog={handleAddBlog}
        />
      </div>
    </div>
  );
}
