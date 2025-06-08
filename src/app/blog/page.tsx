import BlogClientComponent from "./BlogClientComponent";

async function getBlogPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/blog", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    return await res.json();
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
