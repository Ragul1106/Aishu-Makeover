"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Crown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3">
        <div className="max-w-7xl mx-auto">

          {/* Main Navbar */}
          <div
            className="
              relative
              h-16 md:h-[76px]
              px-5 md:px-8
              flex items-center justify-between
              rounded-2xl md:rounded-[22px]
              bg-white/75
              backdrop-blur-xl
              border border-white/70
              shadow-[0_8px_35px_rgba(80,40,50,0.12)]
            "
          >

            {/* Decorative Glow */}
            <div className="absolute inset-0 rounded-2xl md:rounded-[22px] bg-gradient-to-r from-[#fff5f6]/50 via-transparent to-[#f8e1e4]/40 pointer-events-none" />

            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center gap-3 group"
            >
              {/* Crown Logo */}
              <div
                className="
                  flex items-center justify-center
                  w-10 h-10 md:w-11 md:h-11
                  rounded-full
                  bg-gradient-to-br from-[#dca7ad] to-[#b97882]
                  shadow-[0_5px_18px_rgba(185,120,130,0.35)]
                  group-hover:scale-105
                  transition-transform duration-300
                "
              >
                <Crown
                  size={21}
                  strokeWidth={1.7}
                  className="text-white"
                />
              </div>

              {/* Brand Name */}
              <div className="flex flex-col leading-none">
                <span
                  className={`${playfair.className} text-[21px] md:text-[26px] font-semibold tracking-tight text-[#30282a]`}
                >
                  Aishu
                  <span className="text-[#c98992]"> Makeover</span>
                </span>

                <span className="hidden sm:block mt-1 text-[8px] md:text-[9px] uppercase tracking-[0.35em] text-[#9b777c]">
                  Beauty • Bridal • Glamour
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex relative z-10 items-center gap-2">

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
                    relative
                    px-5 py-2.5
                    text-[14px]
                    font-medium
                    text-[#403638]
                    rounded-full
                    hover:bg-[#f9e8ea]
                    hover:text-[#b97882]
                    transition-all duration-300
                    group
                  "
                >
                  {item.name}

                  <span
                    className="
                      absolute
                      left-5 right-5 bottom-1
                      h-[1.5px]
                      bg-[#c98992]
                      scale-x-0
                      group-hover:scale-x-100
                      transition-transform duration-300
                      origin-center
                    "
                  />
                </Link>
              ))}

              {/* Divider */}
              <div className="h-7 w-px bg-[#d8c5c7] mx-2" />

              {/* Admin Button */}
              <Link
                href="/admin"
                className="
                  group
                  relative
                  flex items-center gap-2
                  px-5 py-2.5
                  rounded-full
                  bg-gradient-to-r from-[#dba7ad] to-[#c4868e]
                  text-white
                  text-sm
                  font-medium
                  shadow-[0_5px_18px_rgba(196,134,142,0.3)]
                  hover:shadow-[0_7px_24px_rgba(196,134,142,0.45)]
                  hover:-translate-y-0.5
                  transition-all duration-300
                "
              >
                <Sparkles
                  size={15}
                  className="group-hover:rotate-12 transition-transform"
                />
                Admin
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="
                relative z-10
                md:hidden
                flex items-center justify-center
                w-10 h-10
                rounded-full
                bg-[#f8e5e7]
                text-[#8f6269]
                hover:bg-[#f1d4d8]
                transition
              "
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -15,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  md:hidden
                  mt-2
                  overflow-hidden
                  rounded-2xl
                  bg-white/95
                  backdrop-blur-xl
                  border border-white
                  shadow-[0_15px_40px_rgba(80,40,50,0.15)]
                "
              >
                <div className="p-3">

                  {/* Mobile Brand */}
                  <div className="px-4 py-4 mb-2 rounded-xl bg-gradient-to-r from-[#fff5f6] to-[#f9e7e9]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#c98992] flex items-center justify-center">
                        <Crown
                          size={18}
                          className="text-white"
                        />
                      </div>

                      <div>
                        <p
                          className={`${playfair.className} text-lg font-semibold text-[#30282a]`}
                        >
                          Aishu Makeover
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-[#9b777c]">
                          Beauty & Glamour
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Links */}
                  <div className="space-y-1">

                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="
                        flex items-center
                        px-4 py-3.5
                        rounded-xl
                        text-[#403638]
                        font-medium
                        hover:bg-[#f9e8ea]
                        hover:text-[#b97882]
                        transition
                      "
                    >
                      Home
                    </Link>

                    <Link
                      href="#gallery"
                      onClick={() => setIsOpen(false)}
                      className="
                        flex items-center
                        px-4 py-3.5
                        rounded-xl
                        text-[#403638]
                        font-medium
                        hover:bg-[#f9e8ea]
                        hover:text-[#b97882]
                        transition
                      "
                    >
                      Gallery
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="
                        mt-2
                        flex items-center justify-center gap-2
                        px-4 py-3.5
                        rounded-xl
                        bg-gradient-to-r from-[#dba7ad] to-[#c4868e]
                        text-white
                        font-medium
                        shadow-lg
                      "
                    >
                      <Sparkles size={16} />
                      Admin Panel
                    </Link>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </nav>
    </>
  );
}