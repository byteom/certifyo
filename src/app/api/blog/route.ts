import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .select("title description slug category createdAt")
      .lean();

    if (!posts) {
      return NextResponse.json(
        { error: "No blog posts found" },
        { status: 404 }
      );
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    const existingPost = await BlogPost.findOne({ slug: body.slug });
    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const post = await BlogPost.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
