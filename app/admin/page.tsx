"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AdminImageForm from "../../components/AdminImageForm";
import AdminImageList from "../../components/AdminImageList";
import Link from "next/link";

interface ImageType {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  order?: number;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [images, setImages] = useState<ImageType[]>([]);
  const [loadingImages, setLoadingImages] =
    useState(true);

  /* =====================================================
     FETCH ALL IMAGES
     ===================================================== */

  const fetchImages = useCallback(async () => {
    try {
      setLoadingImages(true);

      /*
       * Admin gets all images.
       * Gallery uses limit=10.
       */
      const res = await fetch(
        "/api/images?page=1&limit=1000",
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch images"
        );
      }

      const data = await res.json();

      console.log(
        "Admin images response:",
        data
      );

      /*
       * New API response:
       *
       * {
       *   images: [],
       *   pagination: {}
       * }
       */
      if (
        data &&
        Array.isArray(data.images)
      ) {
        setImages(data.images);
      }

      /*
       * Backward compatibility
       */
      else if (Array.isArray(data)) {
        setImages(data);
      }

      else {
        console.error(
          "Unexpected API response:",
          data
        );

        setImages([]);
      }
    } catch (error) {
      console.error(
        "Failed to fetch admin images:",
        error
      );

      setImages([]);
    } finally {
      setLoadingImages(false);
    }
  }, []);

  /* =====================================================
     AUTH REDIRECT
     ===================================================== */

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  /* =====================================================
     LOAD IMAGES AFTER LOGIN
     ===================================================== */

  useEffect(() => {
    if (status === "authenticated") {
      fetchImages();
    }
  }, [status, fetchImages]);

  /* =====================================================
     LOADING
     ===================================================== */

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center">
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              mx-auto
              mb-4
              border-4
              border-[#d4a5a5]
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          <p className="text-gray-500">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  /* =====================================================
     ADMIN PAGE
     ===================================================== */

  return (
    <div className="min-h-screen bg-[#fdf8f5]">

      {/* =================================================
          HEADER
          ================================================= */}

      <header
        className="
          bg-white
          border-b
          border-[#eadde0]
          px-6
          py-4
          flex
          flex-col
          sm:flex-row
          justify-between
          items-start
          sm:items-center
          gap-4
        "
      >
        <div>
          <h1 className="text-2xl font-bold text-[#3a272c]">
            Aishu{" "}
            <span className="text-[#c98992]">
              Admin
            </span>
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Manage your makeover gallery
          </p>
        </div>

        <div className="flex items-center gap-3">

          <Link
            href="/"
            className="
              px-4
              py-2
              rounded-lg
              text-sm
              font-medium
              text-[#7d4d59]
              bg-[#fdf0f2]
              hover:bg-[#f4dce0]
              transition
            "
          >
            View Website
          </Link>

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="
              px-4
              py-2
              bg-gray-100
              hover:bg-gray-200
              rounded-lg
              text-sm
              font-medium
              text-gray-700
              transition
            "
          >
            Logout
          </button>

        </div>
      </header>

      {/* =================================================
          MAIN
          ================================================= */}

      <main className="max-w-6xl mx-auto px-4 py-10">

        {/* Page Heading */}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#3a272c]">
            Gallery Dashboard
          </h2>

          <p className="text-gray-500 mt-1">
            Upload and manage your makeover
            images.
          </p>
        </div>

        {/* =================================================
            UPLOAD + LIST
            ================================================= */}

        <div
          className="
            grid
            lg:grid-cols-[380px_1fr]
            gap-8
            items-start
          "
        >

          {/* Upload */}

          <div>
            <AdminImageForm
              onSuccess={fetchImages}
            />
          </div>

          {/* Image List */}

          <div
            className="
              bg-white
              rounded-2xl
              p-5
              md:p-6
              border
              border-[#eadde0]
              shadow-[0_8px_30px_rgba(80,50,60,0.06)]
            "
          >
            {loadingImages ? (
              <div className="py-16 text-center">

                <div
                  className="
                    inline-block
                    w-10
                    h-10
                    border-4
                    border-[#d4a5a5]
                    border-t-transparent
                    rounded-full
                    animate-spin
                  "
                />

                <p className="text-gray-500 text-sm mt-4">
                  Loading images...
                </p>

              </div>
            ) : (
              <AdminImageList
                images={images}
                onUpdate={fetchImages}
              />
            )}
          </div>

        </div>
      </main>
    </div>
  );
}