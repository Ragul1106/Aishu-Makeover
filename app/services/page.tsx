"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Sparkles,
  Heart,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Bridal Makeup",
    subtitle: "Your Dream Bridal Look",
    description:
      "Elegant and long-lasting bridal makeup designed to make you feel confident, beautiful and unforgettable on your special day.",
    image: "/images/bridal.jpg",
    tag: "Most Popular",
  },
  {
    id: 2,
    title: "HD Makeup",
    subtitle: "Flawless • Natural • Camera Ready",
    description:
      "Professional HD makeup that creates a smooth, natural finish and looks stunning under photography, video and special event lighting.",
    image: "/images/hdmakeup.jpg",
    tag: "Premium",
  },
  {
    id: 3,
    title: "Mehandi",
    subtitle: "Beautiful Traditional Art",
    description:
      "Beautiful and detailed mehandi designs created with care for weddings, engagements, festivals and other special occasions.",
    image: "/images/mehandi.jpg",
    tag: "Traditional",
  },
  {
    id: 4,
    title: "Hairstyle",
    subtitle: "Perfect Hair • Perfect Look",
    description:
      "From elegant bridal buns to modern curls and stylish hairstyles, choose the perfect hairstyle to complete your makeover.",
    image: "/images/hairstyle.jpeg",
    tag: "Trending",
  },
  {
    id: 5,
    title: "Saree Pre-Plated",
    subtitle: "Perfect Draping • Effortless Elegance",
    description:
      "Professionally pre-plated saree styling for a neat, elegant and comfortable look that stays perfect throughout your event.",
    image: "/images/saree.jpg",
    tag: "Elegant",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#fff9f8] text-[#30282a]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#e8b4b8]/20 blur-3xl" />

        <div className="absolute top-20 -left-32 w-72 h-72 rounded-full bg-[#f4d6d9]/40 blur-3xl" />

        <div className="absolute bottom-0 -right-32 w-80 h-80 rounded-full bg-[#d7b5ba]/20 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#e8c9cd] shadow-sm mb-6"
          >
            <Sparkles size={15} className="text-[#c98992]" />

            <span className="text-xs uppercase tracking-[0.3em] text-[#9b777c]">
              Aishu Makeover
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-serif font-semibold leading-tight"
          >
            Beauty Services
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 90, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="h-[2px] bg-gradient-to-r from-[#dba7ad] to-[#c98992] mx-auto mt-6 mb-7"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl mx-auto text-[#78676a] text-base md:text-lg leading-8"
          >
            Discover our collection of professional beauty and bridal services,
            specially designed to make every special moment beautiful and
            unforgettable.
          </motion.p>
        </div>
      </section>

   
      {/* ================= SERVICES ================= */}
      <section className="relative pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="
            group
            relative
            overflow-hidden
            rounded-[28px]
            bg-white
            border border-[#eadbdd]
            shadow-[0_10px_35px_rgba(100,60,65,0.08)]
            hover:shadow-[0_20px_50px_rgba(160,100,110,0.18)]
            transition-all
            duration-500
            flex
            flex-col
            h-full
          "
              >
                {/* ================= IMAGE ================= */}
                <div
                  className="
              relative
              w-full
              aspect-[4/3]
              overflow-hidden
              bg-gradient-to-br
              from-[#fff5f5]
              via-[#f9eeee]
              to-[#f2dfe2]
              flex
              items-center
              justify-center
            "
                >
                  {/* Soft background glow */}
                  <div
                    className="
                absolute
                w-56
                h-56
                rounded-full
                bg-[#e8b4b8]/20
                blur-3xl
              "
                  />

                  {/* Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="
                relative
                z-10
                w-full
                h-full
                object-contain
                object-center
                p-3
                sm:p-4
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.04]
              "
                  />

                  {/* Bottom gradient */}
                  <div
                    className="
                absolute
                inset-x-0
                bottom-0
                h-36
                bg-gradient-to-t
                from-black/65
                via-black/20
                to-transparent
                z-20
                pointer-events-none
              "
                  />

                  {/* ================= TAG ================= */}
                  <div className="absolute top-4 left-4 z-30">
                    <span
                      className="
                  inline-flex
                  items-center
                  gap-1.5
                  px-3.5
                  py-1.5
                  rounded-full
                  bg-white/90
                  backdrop-blur-md
                  border
                  border-white/60
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  font-semibold
                  text-[#9a6870]
                  shadow-[0_5px_15px_rgba(80,40,50,0.12)]
                "
                    >
                      <Sparkles size={12} className="text-[#c98992]" />

                      {service.tag}
                    </span>
                  </div>

                  {/* ================= IMAGE TITLE ================= */}
                  <div
                    className="
                absolute
                left-0
                right-0
                bottom-0
                z-30
                p-5
                sm:p-6
              "
                  >
                    <p
                      className="
                  text-[#f3cdd1]
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-[0.2em]
                  mb-1.5
                  font-medium
                "
                    >
                      {service.subtitle}
                    </p>

                    <h2
                      className="
                  text-2xl
                  sm:text-3xl
                  font-serif
                  font-semibold
                  text-white
                  leading-tight
                "
                    >
                      {service.title}
                    </h2>
                  </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div
                  className="
              flex
              flex-col
              flex-1
              p-5
              sm:p-6
              md:p-7
            "
                >
                  <p
                    className="
                text-[#76676a]
                text-sm
                leading-7
                flex-1
              "
                  >
                    {service.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="
                h-px
                w-full
                bg-gradient-to-r
                from-transparent
                via-[#eadbdd]
                to-transparent
                my-5
              "
                  />

                  {/* Book Button */}
                  <a
                    href={`https://wa.me/919342156033?text=${encodeURIComponent(
                      `வணக்கம் Aishu Makeover 💄✨\n\nஎனக்கு ${service.title} Booking பற்றி details வேண்டும்.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                inline-flex
                items-center
                justify-between
                w-full
                px-4
                py-3
                rounded-xl
                bg-[#fff5f6]
                border
                border-[#f0d9dc]
                text-[#b97882]
                text-sm
                font-semibold
                hover:bg-[#f8e5e7]
                hover:border-[#e1b9be]
                transition-all
                duration-300
              "
                  >
                    <span>Book This Service</span>

                    <span
                      className="
                  w-8
                  h-8
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  shadow-sm
                  group-hover:bg-[#c98992]
                  group-hover:text-white
                  transition-all
                  duration-300
                "
                    >
                      <ArrowRight
                        size={16}
                        className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                      />
                    </span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden pb-24 px-6">
        <div
          className="
          relative
          max-w-6xl mx-auto
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-br
          from-[#f3d4d7]
          via-[#e8b4b8]
          to-[#c98992]
          px-7 py-14
          md:px-16 md:py-16
          text-center
          shadow-[0_20px_60px_rgba(180,110,120,0.2)]
        "
        >
          {/* Decorative Circles */}
          <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-white/15" />

          <div className="absolute -bottom-32 -right-20 w-72 h-72 rounded-full bg-white/10" />

          <div className="relative">
            <div className="flex justify-center mb-5">
              <div
                className="
                w-14 h-14
                rounded-full
                bg-white/20
                border border-white/40
                flex items-center justify-center
              "
              >
                <Heart size={25} className="text-white" fill="currentColor" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-white mb-5">
              Ready for Your Perfect Look?
            </h2>

            <p className="max-w-xl mx-auto text-white/80 text-sm md:text-base leading-7 mb-8">
              Book your appointment with Aishu Makeover and let us create a
              beautiful look that is uniquely yours.
            </p>

            <a
              href="https://wa.me/919342156033"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                px-7 py-3.5
                rounded-full
                bg-white
                text-[#a66c74]
                font-semibold
                shadow-xl
                hover:-translate-y-1
                hover:shadow-2xl
                transition-all duration-300
              "
            >
              <MessageCircle size={18} />
              Book Your Appointment
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
