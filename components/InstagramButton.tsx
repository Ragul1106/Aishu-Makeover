"use client";

import { motion } from "framer-motion";

export default function SocialButtons() {
  const instagramUrl = "https://www.instagram.com/aishu_make_over/";
  const phoneNumber = "919342156033";

  const message = encodeURIComponent(
    "வணக்கம் Aishu Makeover 💄✨ எனக்கு Makeup Booking மற்றும் Packages பற்றிய details வேண்டும்."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* Instagram */}
      <motion.a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.12, rotate: -3 }}
        whileTap={{ scale: 0.92 }}
        className="
          relative
          w-14 h-14
          md:w-16 md:h-16
          rounded-full
          flex items-center justify-center
          text-white
          bg-gradient-to-tr
          from-[#feda75]
          via-[#d62976]
          to-[#4f5bd5]
          border-2 border-white/80
          shadow-[0_8px_30px_rgba(214,41,118,0.4)]
        "
        aria-label="Follow on Instagram"
      >
        <span className="absolute inset-[-5px] rounded-full border border-[#d62976]/30 animate-pulse" />

        <svg
          width="29"
          height="29"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="relative z-10"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.12, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        className="
          relative
          w-14 h-14
          md:w-16 md:h-16
          rounded-full
          flex items-center justify-center
          text-white
          bg-gradient-to-br
          from-[#25D366]
          via-[#20c964]
          to-[#128C7E]
          border-2 border-white/80
          shadow-[0_8px_30px_rgba(37,211,102,0.45)]
        "
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-[-5px] rounded-full border border-[#25D366]/30 animate-pulse" />

        <svg
          width="29"
          height="29"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative z-10"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884" />
        </svg>
      </motion.a>

    </div>
  );
}