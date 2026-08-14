"use client";

import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Soft decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e8b4b8]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white/90 tracking-[0.35em] uppercase text-xs md:text-sm mb-6 font-medium"
        >
          Beauty • Transformation • Confidence
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Aishu{" "}
          <span className="text-[#e8b4b8]">Makeover</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover stunning transformations. From bridal elegance to glamorous party looks — crafted with love and perfection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#gallery"
            className="px-8 py-3.5 bg-[#e8b4b8] text-[#2d2a26] font-medium rounded-full hover:bg-[#d4a5a5] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View Gallery
          </a>

          <a
            href="/admin"
            className="px-8 py-3.5 border border-white/40 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Admin Panel
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fdf8f5] to-transparent" />
    </section>
  );
}