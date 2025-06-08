import BlogClientComponent from "./BlogClientComponent";
import { BlogPost } from "@/types";

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("http://localhost:3000/api/blog", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog posts: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogPosts();
  const categories = ["All", "Technology", "Travel", "Food"];

  return <BlogClientComponent blogs={blogs} categories={categories} />;
}
