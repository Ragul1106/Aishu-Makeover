"use client";

import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { motion } from "framer-motion";

interface ImageType {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
}

interface PaginationType {
  currentPage: number;
  totalPages: number;
  totalImages: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const IMAGES_PER_PAGE = 10;

export default function ImageGallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] =
    useState<PaginationType | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/images?page=${currentPage}&limit=${IMAGES_PER_PAGE}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await res.json();

        setImages(data.images || []);
        setPagination(data.pagination || null);
      } catch (error) {
        console.error("Failed fetching images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (!pagination) return;

    if (page < 1 || page > pagination.totalPages) {
      return;
    }

    setCurrentPage(page);

    setTimeout(() => {
      document.getElementById("gallery")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  if (loading) {
    return (
      <div className="py-20 text-center bg-[#fff8f9]">
        <div className="inline-block w-10 h-10 border-4 border-[#b9798b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section
      id="gallery"
      className="
        py-16 md:py-24 px-4 max-w-7xl mx-auto
        bg-gradient-to-b from-[#fffafb] via-[#fdf2f5] to-[#f8e8ed]
      "
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2
          className="
            text-4xl md:text-5xl font-bold mb-4
            bg-gradient-to-r from-[#80505f] via-[#b9798b] to-[#6f3f4d]
            bg-clip-text text-transparent
          "
        >
          Our Transformations
        </h2>

        <p className="text-[#806a70] max-w-xl mx-auto">
          Every look tells a story of confidence and beauty.
        </p>
      </motion.div>

      {/* Images */}
      {images.length === 0 ? (
        <p className="text-center text-[#806a70] py-20">
          No images yet. Admin can add beautiful makeovers here.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
            {images.map((img, index) => (
              <ImageCard
                key={img._id}
                image={img}
                index={index}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div
              className="
                flex justify-center items-center
                gap-2 mt-12 flex-wrap
              "
            >
              {/* Previous */}
              <button
                onClick={() =>
                  goToPage(currentPage - 1)
                }
                disabled={!pagination.hasPreviousPage}
                className="
                  px-4 py-2 rounded-xl
                  border border-[#d8b0ba]
                  bg-[#fffafb]
                  text-[#80505f]
                  transition-all duration-300
                  disabled:opacity-30
                  disabled:cursor-not-allowed
                  hover:bg-[#b9798b]
                  hover:border-[#b9798b]
                  hover:text-white
                  hover:shadow-lg
                "
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from(
                { length: pagination.totalPages },
                (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`
                        w-10 h-10
                        rounded-xl
                        border
                        font-medium
                        transition-all duration-300

                        ${
                          currentPage === page
                            ? "bg-gradient-to-br from-[#b9798b] to-[#80505f] text-white border-[#b9798b] shadow-lg shadow-[#b9798b]/30 scale-105"
                            : "bg-[#fffafb] text-[#80505f] border-[#d8b0ba] hover:bg-[#e5bbc5] hover:text-[#6f3f4d] hover:border-[#b9798b]"
                        }
                      `}
                    >
                      {page}
                    </button>
                  );
                }
              )}

              {/* Next */}
              <button
                onClick={() =>
                  goToPage(currentPage + 1)
                }
                disabled={!pagination.hasNextPage}
                className="
                  px-4 py-2 rounded-xl
                  border border-[#d8b0ba]
                  bg-[#fffafb]
                  text-[#80505f]
                  transition-all duration-300
                  disabled:opacity-30
                  disabled:cursor-not-allowed
                  hover:bg-[#b9798b]
                  hover:border-[#b9798b]
                  hover:text-white
                  hover:shadow-lg
                "
              >
                Next
              </button>
            </div>
          )}

          {/* Image Count */}
          {pagination && (
            <p className="text-center text-sm text-[#806a70] mt-5">
              Showing{" "}
              {(currentPage - 1) * IMAGES_PER_PAGE + 1}–
              {Math.min(
                currentPage * IMAGES_PER_PAGE,
                pagination.totalImages
              )}{" "}
              of {pagination.totalImages} images
            </p>
          )}
        </>
      )}
    </section>
  );
}