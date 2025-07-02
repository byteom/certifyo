import BlogClientComponent from "./BlogClientComponent";
import { BlogPost } from "@/types";

export const runtime = 'edge';

// Static blog data instead of dynamic fetching
const staticBlogPosts: BlogPost[] = [
  {
    title: 'Getting Started with Next.js',
    description: 'Learn the basics of Next.js and how to build modern web applications.',
    slug: 'getting-started-with-nextjs',
    category: 'Technology',
    createdAt: new Date('2024-01-15').toISOString(),
    content: 'This is a sample blog post about Next.js...'
  },
  {
    title: 'The Future of Web Development',
    description: 'Explore the latest trends and technologies shaping the future of web development.',
    slug: 'future-of-web-development',
    category: 'Technology',
    createdAt: new Date('2024-01-20').toISOString(),
    content: 'Web development is evolving rapidly...'
  }
];

export default async function BlogPage() {
  const categories = ["All", "Technology", "Travel", "Food"];
  return <BlogClientComponent blogs={staticBlogPosts} categories={categories} />;
}
