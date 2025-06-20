import SingleBlogClientComponent from "./BlogClientComponent";

async function getOneBlogPost(slug: string) {
  try {
    const res = await fetch(`https://certifyo.vercel.app/api/blog/${slug}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    return await res.json();
    
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getOneBlogPost(slug);
  return <SingleBlogClientComponent blog={blog} />;
}
