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

export default function ImageGallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        // API should return an array; handle wrapped or error responses defensively
        if (Array.isArray(data)) {
          setImages(data);
        } else if (data && Array.isArray((data as any).images)) {
          setImages((data as any).images);
        } else {
          console.warn("Unexpected images response:", data);
          setImages([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed fetching images:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block w-10 h-10 border-4 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="gallery" className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our Transformations
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Every look tells a story of confidence and beauty.
        </p>
      </motion.div>

      {images.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          No images yet. Admin can add beautiful makeovers here.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {images.map((img, index) => (
            <ImageCard key={img._id} image={img} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
