"use client";

import { Edit, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
// Removed Metadata imports, as generateMetadata is being moved
import Link from "next/link";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import AddBlogModal from "@/components/AddBlogModal";
import { BlogPost } from "@/types";
import { useThemeStore } from "@/store/themeStore";

// This data is now for the page component's rendering purposes only.
// Metadata generation will use its own data source in the layout.tsx.

// const postDisplayData: BlogPost[] = [
//   {
//     title: "My First Blog Post",
//     description:
//       "This is the description for my first blog post about web development.",
//     slug: "first-post",
//     category: "Technology",
//     date: "October 26, 2023",
//     content: `
//       This is the full content of my first blog post. It's a great starting point for my blogging journey.
//       I plan to write about various topics, including web development, technology, and perhaps some personal interests.

//       ## Subheading for First Post
//       Here's a little more detail under a subheading. Content can be structured using Markdown-like conventions.
//       We can even include some basic HTML like <strong>strong text</strong> or <em>emphasized text</em>.

//       <p>Paragraphs are rendered well when using line breaks, which are converted to br tags in this example. For more structured content, consider using a Markdown-to-HTML converter and proper typography settings.</p>

//       <pre><code class="language-javascript">function greet() {\n  console.log("Hello, World!");\n}</code></pre>

//       <blockquote>This is a blockquote, useful for highlighting important information or quotes from other sources. It should stand out visually.</blockquote>

//       Stay tuned for more updates!
//     `,
//   },
//   {
//     title: "Another Interesting Article",
//     description:
//       "A brief overview of an interesting topic in the world of travel.",
//     slug: "interesting-article",
//     category: "Travel",
//     date: "October 27, 2023",
//     content: `
//       This article delves into a fascinating subject that has been on my mind lately regarding global travel trends.
//       It explores how backpacking has changed in the last decade and what new adventurers can expect.

//       ### Key Travel Insights
//       - Always pack light.
//       - Learn a few phrases in the local language.
//       - Be open to spontaneous detours.

//       <p>Travel broadens the mind, they say. And it's true! Getting out of your comfort zone is where real growth happens.</p>

//       Further research into specific destinations is encouraged if this piques your interest.
//     `,
//   },
//   {
//     title: "Next.js is Awesome",
//     description:
//       "Why I love working with Next.js and React for modern web apps.",
//     slug: "nextjs-awesome",
//     category: "Technology",
//     date: "October 28, 2023",
//     content: `
//       Next.js has revolutionized the way I build web applications. Its features like server-side rendering,
//       static site generation, and easy routing make development a breeze.

//       Working with React components within the Next.js framework is incredibly productive.
//       I particularly appreciate:
//       <ul>
//         <li>The file-system based routing.</li>
//         <li>API routes for backend functionality.</li>
//         <li>Built-in Image optimization.</li>
//         <li>Fast refresh for a great developer experience.</li>
//       </ul>

//       <p>If you haven't tried Next.js yet for your React projects, I highly recommend it! It simplifies so many common complexities in web development.</p>
//     `,
//   },
//   {
//     title: "Delicious Recipes",
//     description: "Sharing some of my favorite recipes for everyone to enjoy.",
//     slug: "delicious-recipes",
//     category: "Food",
//     date: "October 29, 2023",
//     content: `
//       Today, I'm sharing a recipe for a simple yet delicious pasta dish.
//       It's quick to make and perfect for a weeknight dinner.

//       #### Ingredients:
//       - Pasta of your choice
//       - Olive oil
//       - Garlic
//       - Cherry tomatoes
//       - Fresh basil
//       - Parmesan cheese (optional)

//       #### Instructions:
//       1. Cook pasta according to package directions.
//       2. While pasta cooks, heat olive oil in a pan, add minced garlic.
//       3. Add halved cherry tomatoes and cook until they soften.
//       4. Drain pasta, toss with tomato mixture and fresh basil.
//       5. Serve with Parmesan if desired.

//       Bon appétit!
//     `,
//   },
//   {
//     title: "Exploring National Parks",
//     description:
//       "A guide to the most beautiful national parks and hiking trails.",
//     slug: "national-parks",
//     category: "Travel",
//     date: "October 30, 2023",
//     content: `
//       National Parks offer a stunning escape into nature. This guide highlights a few must-visit parks.

//       ##### Yellowstone
//       Famous for its geysers and wildlife. Don't miss Old Faithful!

//       ##### Yosemite
//       Known for its giant sequoia trees, breathtaking waterfalls, and granite cliffs like El Capitan.

//       ##### Grand Canyon
//       A truly awe-inspiring geological wonder. Hiking down (even partway) is an unforgettable experience.

//       Remember to plan your trips, check for park alerts, and leave no trace.
//     `,
//   },
// ];

// Removed generateMetadata function and its specific data array.
// Metadata will be handled by src/app/blog/[slug]/layout.tsx.

export default function SingleBlogClientComponent({
  blog,
}: {
  blog: BlogPost;
}) {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(blog);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const handleUpdateBlog = async (updatedBlog: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog post");
      }

      const updatedPost = await response.json();
      setPost(updatedPost);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDeleteBlog = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog post");
      }

      router.push("/blog");
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center py-12">
          <svg
            className={`mx-auto h-16 w-16 ${
              isDarkMode ? "text-red-500" : "text-red-600"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <h1
            className={`mt-4 text-3xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            } sm:text-4xl`}
          >
            Post Not Found
          </h1>
          <p
            className={`mt-3 text-base ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Sorry, we couldn’t find the blog post you’re looking for.
          </p>
          <div className="mt-8">
            <Link
              href="/blog"
              className={`inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDarkMode
                  ? "border-gray-600 text-indigo-400 hover:bg-gray-700 focus:ring-indigo-500 focus:ring-offset-gray-800"
                  : "border-gray-300 text-indigo-600 hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-white"
              } transition-all`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen font-mono ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300 ease-in-out`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/blog"
            className={`inline-flex items-center text-sm font-medium ${
              isDarkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-800"
            } group transition-colors duration-150 ease-in-out`}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transform transition-transform duration-150 ease-in-out group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </div>

        <article
          className={`p-6 sm:p-8 md:p-10 rounded-xl shadow-xl ${
            isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <header className="mb-6 pb-6 border-b dark:border-gray-700">
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 ${
                isDarkMode ? "text-gray-50" : "text-gray-900"
              }`}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm">
              {post.category && (
                <div
                  className={`flex items-center mr-4 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  <Tag className="mr-1.5 h-4 w-4" />
                  <span className="font-medium uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              )}
              {post.createdAt && (
                <div
                  className={`flex items-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  <span>{post.createdAt.split("T")[0]}</span>
                </div>
              )}
            </div>
          </header>

          <div
            className={`prose prose-lg sm:prose-xl max-w-none ${
              isDarkMode ? "prose-invert" : ""
            }
                        prose-headings:font-bold ${
                          isDarkMode
                            ? "prose-headings:text-gray-100"
                            : "prose-headings:text-gray-900"
                        }
                        prose-p:${
                          isDarkMode
                            ? "text-gray-300 break-words"
                            : "text-gray-700 break-words"
                        }
                        prose-a:${
                          isDarkMode
                            ? "text-indigo-400 hover:text-indigo-300 break-all"
                            : "text-indigo-600 hover:text-indigo-800 break-all"
                        }
                        prose-strong:${
                          isDarkMode
                            ? "text-gray-100 break-words"
                            : "text-gray-900 break-words"
                        }
                        prose-blockquote:${
                          isDarkMode
                            ? "border-l-indigo-400 text-gray-300 break-words"
                            : "border-l-indigo-600 text-gray-700 break-words"
                        }
                        prose-code:${
                          isDarkMode
                            ? "bg-gray-700 text-indigo-300 p-1 rounded-md overflow-x-auto"
                            : "bg-gray-100 text-indigo-700 p-1 rounded-md overflow-x-auto"
                        }
                        prose-pre:${
                          isDarkMode
                            ? "bg-gray-700 overflow-x-auto"
                            : "bg-gray-100 overflow-x-auto"
                        }
                        prose-ul:${
                          isDarkMode
                            ? "marker:text-indigo-400"
                            : "marker:text-indigo-600"
                        }
                        prose-ol:${
                          isDarkMode
                            ? "marker:text-indigo-400"
                            : "marker:text-indigo-600"
                        }
                      `}
            dangerouslySetInnerHTML={{
              __html: post.content.replace(
                /\n(?!(?:<ul>|<ol>|<li>|<code>|<pre>|<blockquote>|<p>|<h1>|<h2>|<h3>|<h4>|<h5>|<h6>))(\s*)(?![^<]*>)/g,
                "<br />"
              ),
            }}
          />
          <footer className="mt-8 pt-6 border-t dark:border-gray-700 flex gap-6 justify-end">
            <button
              onClick={() => setShowEditModal(true)}
              className={`inline-flex items-center px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              } transition-colors`}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Post
            </button>

            <button
              onClick={handleDeleteBlog}
              disabled={isDeleting}
              className={`inline-flex items-center px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete Post"}
            </button>
          </footer>
        </article>
        {showEditModal && post && (
          <AddBlogModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onAddBlog={handleUpdateBlog}
            initialData={post}
            isEditMode={true}
          />
        )}
      </div>
    </div>
  );
}
