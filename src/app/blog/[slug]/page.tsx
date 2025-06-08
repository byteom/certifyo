import SingleBlogClientComponent from "./BlogClientComponent";

async function getOneBlogPost(slug: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    return await res.json();
    
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const blog = await getOneBlogPost(slug);

  return <SingleBlogClientComponent blog={blog} />;
}
