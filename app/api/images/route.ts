import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Image from "../../../models/Image";
import cloudinary from "../../../lib/cloudinary";
import {
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

/* =========================================================
   GET IMAGES
   Supports:
   /api/images?page=1&limit=10
   ========================================================= */

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const pageParam = Number(searchParams.get("page"));
    const limitParam = Number(searchParams.get("limit"));

    const page =
      Number.isFinite(pageParam) && pageParam > 0
        ? Math.floor(pageParam)
        : 1;

    const limit =
      Number.isFinite(limitParam) && limitParam > 0
        ? Math.min(Math.floor(limitParam), 1000)
        : 10;

    const skip = (page - 1) * limit;

    const [images, totalImages] = await Promise.all([
      Image.find()
        .sort({
          order: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      Image.countDocuments(),
    ]);

    const totalPages =
      totalImages === 0
        ? 0
        : Math.ceil(totalImages / limit);

    return NextResponse.json({
      images,
      pagination: {
        currentPage: page,
        totalPages,
        totalImages,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("GET /api/images error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch images",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST IMAGE
   ========================================================= */

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;

    const description =
      (formData.get("description") as string) || "";

    const category =
      (formData.get("category") as string) ||
      "Makeover";

    if (!file || !title?.trim()) {
      return NextResponse.json(
        {
          error: "Title and image are required",
        },
        {
          status: 400,
        }
      );
    }

    /* ============================
       Convert file to buffer
       ============================ */

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /* ============================
       Upload to Cloudinary
       ============================ */

    const result: UploadApiResponse =
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "aishu-makeover",
              resource_type: "image",
            },
            (
              error:
                | UploadApiErrorResponse
                | undefined,
              res: UploadApiResponse | undefined
            ) => {
              if (error) {
                reject(error);
              } else if (!res) {
                reject(
                  new Error(
                    "No response from Cloudinary"
                  )
                );
              } else {
                resolve(res);
              }
            }
          )
          .end(buffer);
      });

    /* ============================
       Save to MongoDB
       ============================ */

    await connectDB();

    /*
     * Find the highest order so the new
     * image is placed at the bottom.
     */
    const lastImage = await Image.findOne()
      .sort({ order: -1 })
      .select("order");

    const nextOrder =
      typeof lastImage?.order === "number"
        ? lastImage.order + 1
        : 0;

    const newImage = await Image.create({
      title: title.trim(),
      description: description.trim(),
      category,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      order: nextOrder,
    });

    return NextResponse.json(
      newImage,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/images error:", error);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}