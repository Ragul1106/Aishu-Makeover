"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/10">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold text-[#2d2a26]"
          >
            Aishu <span className="text-[#d4a5a5]">Makeover</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-[#d4a5a5] transition">
              Home
            </Link>
            <Link href="#gallery" className="hover:text-[#d4a5a5] transition">
              Gallery
            </Link>
            <Link
              href="/admin"
              className="px-5 py-2 bg-[#d4a5a5] text-white rounded-full hover:bg-[#c99494] transition text-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="flex flex-col px-6 py-4 gap-4 text-[#2d2a26]">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="#gallery" onClick={() => setIsOpen(false)}>
                Gallery
              </Link>
              <Link href="/admin" onClick={() => setIsOpen(false)}>
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
