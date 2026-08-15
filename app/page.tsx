import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ImageGallery from "../components/ImageGallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import InstagramButton from "@/components/InstagramButton";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <ImageGallery />
      <InstagramButton />
      <WhatsAppButton />
      <footer className="relative overflow-hidden bg-[#211b1d] text-white">
        {/* Decorative Background Glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#e8b4b8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-96 h-96 bg-[#c98992]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Main Footer */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
          {/* Top Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent to-[#c98992]" />

            <span className="text-[#e8b4b8] text-xl">✦</span>

            <span className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent to-[#c98992]" />
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
                {/* Logo */}
                <div className="w-14 h-14 rounded-full bg-white/5 border border-[#e8b4b8]/30 flex items-center justify-center">
                  <img
                    src="/images/logo.jpeg"
                    alt="Aishu Makeover Logo"
                    className="w-11 h-11 object-contain rounded-full"
                  />
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Aishu <span className="text-[#e8b4b8]">Makeover</span>
                  </h2>

                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#c9aeb2] mt-1">
                    Beauty • Bridal • Glamour
                  </p>
                </div>
              </div>

              <p className="text-white/60 text-sm leading-7 max-w-sm mx-auto md:mx-0">
                Enhancing your natural beauty with elegant makeup, stunning
                hairstyles and professional bridal services.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#e8b4b8] mb-6">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3">
                <a
                  href="/"
                  className="text-white/60 hover:text-[#e8b4b8] transition-colors duration-300"
                >
                  Home
                </a>

                <a
                  href="#gallery"
                  className="text-white/60 hover:text-[#e8b4b8] transition-colors duration-300"
                >
                  Gallery
                </a>

                <a
                  href="/services"
                  className="text-white/60 hover:text-[#e8b4b8] transition-colors duration-300"
                >
                  Services
                </a>

                <a
                  href="/admin"
                  className="text-white/60 hover:text-[#e8b4b8] transition-colors duration-300"
                >
                  Admin
                </a>
              </div>
            </div>

            {/* Contact / Booking */}
            <div className="text-center md:text-right">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#e8b4b8] mb-6">
                Book Your Glam
              </h3>

              <p className="text-white/60 text-sm leading-6 mb-5">
                Ready for your special day?
                <br />
                Let's create your perfect look.
              </p>

              <a
                href="https://wa.me/919342156033"
                target="_blank"
                rel="noopener noreferrer"
                className="
    inline-flex items-center justify-center gap-2
    px-6 py-3
    rounded-full
    bg-gradient-to-r from-[#e8b4b8] to-[#c98992]
    text-[#2d2224]
    font-medium
    text-sm
    shadow-[0_8px_25px_rgba(201,137,146,0.25)]
    hover:shadow-[0_10px_30px_rgba(201,137,146,0.4)]
    hover:-translate-y-0.5
    transition-all duration-300
  "
              >
                <MessageCircle size={18} strokeWidth={2} />
                WhatsApp Booking
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#c98992]/30 to-transparent" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Aishu Makeover. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>Made with</span>
              <span className="text-[#e8b4b8] text-base">♥</span>
              <span>for beauty & confidence</span>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-[#c98992] via-[#f0c4c8] to-[#c98992]" />
      </footer>
      ```
    </main>
  );
}
