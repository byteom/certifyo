import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const posts = await BlogPost.find()
      .sort({ date: -1 })
      .select("title description slug category");
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const newPost = new BlogPost(body);
    await newPost.save();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
