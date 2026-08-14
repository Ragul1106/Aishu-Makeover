"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  image: {
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
    category?: string;
  };
  index: number;
}

export default function ImageCard({ image, index }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Gallery Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-xs uppercase tracking-wider text-[#e8b4b8] mb-1">
            {image.category || "Makeover"}
          </p>
          <h3 className="text-xl font-semibold">{image.title}</h3>
          {image.description && (
            <p className="text-sm text-white/80 mt-1 line-clamp-2">
              {image.description}
            </p>
          )}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-[#e8b4b8] transition z-10"
            >
              <X size={32} />
            </button>

            {/* Large Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <p className="text-[#e8b4b8] text-sm uppercase tracking-wider mb-1">
                  {image.category || "Makeover"}
                </p>
                <h3 className="text-white text-2xl font-semibold">{image.title}</h3>
                {image.description && (
                  <p className="text-white/80 mt-2">{image.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}