import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Image from "../../../models/Image";
import cloudinary from "../../../lib/cloudinary";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET() {
  try {
    await connectDB();
    const images = await Image.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";
    const category = (formData.get("category") as string) || "Makeover";

    if (!file || !title) {
      return NextResponse.json(
        { error: "Title and image are required" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "aishu-makeover", resource_type: "image" },
          (
            error: UploadApiErrorResponse | undefined,
            res: UploadApiResponse | undefined,
          ) => {
            if (error) reject(error);
            else if (!res) reject(new Error("No response from Cloudinary"));
            else resolve(res);
          },
        )
        .end(buffer);
    });

    await connectDB();

    const newImage = await Image.create({
      title,
      description,
      category,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
