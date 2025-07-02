import SingleBlogClientComponent from "./BlogClientComponent";
import { BlogPost } from "@/types";

export const runtime = 'edge';

// Static blog data
const staticBlogPosts: BlogPost[] = [
  {
    title: 'Getting Started with Next.js',
    description: 'Learn the basics of Next.js and how to build modern web applications.',
    slug: 'getting-started-with-nextjs',
    category: 'Technology',
    createdAt: new Date('2024-01-15').toISOString(),
    content: 'This is a comprehensive guide to getting started with Next.js. Next.js is a powerful React framework that makes building full-stack web applications simple and efficient. In this post, we\'ll cover the basics of setting up a Next.js project, understanding the file-based routing system, and deploying your first application.'
  },
  {
    title: 'The Future of Web Development',
    description: 'Explore the latest trends and technologies shaping the future of web development.',
    slug: 'future-of-web-development',
    category: 'Technology',
    createdAt: new Date('2024-01-20').toISOString(),
    content: 'Web development is evolving rapidly with new technologies and frameworks emerging constantly. From serverless architectures to AI-powered development tools, the landscape is changing faster than ever. This post explores the key trends that will shape the future of web development and how developers can stay ahead of the curve.'
  }
];

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = staticBlogPosts.find(post => post.slug === slug) || {
    title: 'Blog Post Not Found',
    description: 'The requested blog post could not be found.',
    slug: slug,
    category: 'General',
    createdAt: new Date().toISOString(),
    content: 'This blog post does not exist or has been removed.'
  };
  return <SingleBlogClientComponent blog={blog} />;
}
