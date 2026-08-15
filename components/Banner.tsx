"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function Banner() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const titleWords = ["Aishu", "Makeover"];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[calc(100svh-64px)]
        md:min-h-[92vh]
        lg:min-h-[94vh]
        flex
        items-center
        justify-center
        overflow-hidden
        pt-16
        md:pt-20
        bg-[#160f11]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
        }}
        className="
          absolute
          -inset-[5%]
          bg-cover
          bg-center
          bg-no-repeat
          will-change-transform
        "
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* =====================================================
          IMAGE DARK OVERLAY
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-black/35"
      />

      {/* =====================================================
          LEFT CINEMATIC GRADIENT
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/85
          via-black/55
          via-50%
          to-black/10
        "
      />

      {/* =====================================================
          TOP / BOTTOM GRADIENT
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/55
          via-transparent
          to-black/80
        "
      />

      {/* =====================================================
          SOFT PINK LIGHT
      ===================================================== */}

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -35, 0],
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[10%]
          top-[25%]
          w-[280px]
          h-[280px]
          md:w-[500px]
          md:h-[500px]
          rounded-full
          bg-[#e8b4b8]
          blur-[120px]
          pointer-events-none
        "
      />

      {/* =====================================================
          SECOND GLOW
      ===================================================== */}

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[5%]
          bottom-[10%]
          w-[250px]
          h-[250px]
          md:w-[450px]
          md:h-[450px]
          rounded-full
          bg-[#f6d9dc]
          blur-[130px]
          pointer-events-none
        "
      />

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: "12%", top: "20%", delay: 0 },
          { left: "28%", top: "70%", delay: 1.2 },
          { left: "45%", top: "18%", delay: 2.2 },
          { left: "62%", top: "78%", delay: 0.8 },
          { left: "78%", top: "28%", delay: 1.7 },
          { left: "90%", top: "62%", delay: 2.8 },
          { left: "38%", top: "45%", delay: 3.2 },
          { left: "72%", top: "52%", delay: 1.4 },
        ].map((particle, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              y: [0, -35, -70],
            }}
            transition={{
              duration: 4 + (index % 3),
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              w-1
              h-1
              md:w-1.5
              md:h-1.5
              rounded-full
              bg-[#f8dfe2]
              shadow-[0_0_12px_rgba(248,223,226,0.9)]
            "
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      {/* =====================================================
          SUBTLE GRAIN
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          pointer-events-none
          bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            max-w-3xl
            text-center
            md:text-left
          "
        >
          {/* =================================================
              PREMIUM LABEL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              inline-flex
              items-center
              gap-2.5
              px-4
              py-2
              rounded-full
              bg-white/[0.08]
              backdrop-blur-xl
              border
              border-white/20
              shadow-[0_8px_30px_rgba(0,0,0,0.15)]
              mb-6
              overflow-hidden
            "
          >
            {/* Moving shine */}
            <motion.span
              animate={{
                x: ["-120%", "120%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              className="
                absolute
                inset-y-0
                w-20
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                skew-x-[-20deg]
              "
            />

            <motion.span
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles
                size={14}
                className="relative z-10 text-[#f3c6ca]"
              />
            </motion.span>

            <span
              className="
                relative
                z-10
                text-[10px]
                md:text-xs
                uppercase
                tracking-[0.3em]
                text-white/90
                font-medium
              "
            >
              Beauty • Bridal • Glamour
            </span>
          </motion.div>

          {/* =================================================
              MAIN TITLE
          ================================================= */}

          <motion.h1
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.45,
            }}
            className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-[7.5rem]
              font-serif
              font-semibold
              leading-[0.88]
              tracking-[-0.04em]
              text-white
            "
          >
            {titleWords.map((word, index) => (
              <span
                key={word}
                className="inline-block overflow-hidden mr-3 md:mr-5"
              >
                <motion.span
                  initial={{
                    y: "110%",
                    opacity: 0,
                    rotateX: 45,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + index * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    inline-block
                    ${
                      index === 1
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-[#e8b4b8] via-[#f5d4d7] to-[#d99da3]"
                        : ""
                    }
                  `}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* =================================================
              DECORATIVE LINE
          ================================================= */}

          <div className="flex items-center gap-3 mt-7 mb-6 justify-center md:justify-start">
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 110,
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.95,
                ease: "easeOut",
              }}
              className="
                h-[2px]
                bg-gradient-to-r
                from-[#e8b4b8]
                to-transparent
              "
            />

            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 1.25,
              }}
              className="
                w-1.5
                h-1.5
                rounded-full
                bg-[#e8b4b8]
                shadow-[0_0_12px_rgba(232,180,184,0.9)]
              "
            />
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.8,
              delay: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-xl
              mx-auto
              md:mx-0
              text-white/85
              text-sm
              sm:text-base
              md:text-lg
              leading-7
              md:leading-8
              drop-shadow-lg
            "
          >
            Enhance your natural beauty with elegant bridal makeup,
            HD makeup, hairstyles, mehandi and professional saree
            styling.
          </motion.p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              md:justify-start
              gap-4
              mt-9
            "
          >
            {/* ================= GALLERY ================= */}

            <motion.a
              href="#gallery"
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                relative
                inline-flex
                items-center
                justify-center
                gap-2
                min-w-[170px]
                px-7
                py-3.5
                rounded-full
                bg-[#e8b4b8]
                text-[#30282a]
                font-semibold
                text-sm
                shadow-[0_12px_35px_rgba(232,180,184,0.25)]
                hover:shadow-[0_18px_45px_rgba(232,180,184,0.4)]
                transition-shadow
                duration-300
                overflow-hidden
              "
            >
              {/* Button shine */}
              <motion.span
                animate={{
                  x: ["-150%", "150%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  inset-y-0
                  w-16
                  bg-white/30
                  skew-x-[-20deg]
                  blur-sm
                "
              />

              <span className="relative z-10">View Gallery</span>

              <ArrowRight
                size={17}
                className="
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </motion.a>

            {/* ================= SERVICES ================= */}

            <motion.a
              href="/services"
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                inline-flex
                items-center
                justify-center
                min-w-[170px]
                px-7
                py-3.5
                rounded-full
                bg-white/[0.08]
                backdrop-blur-xl
                border
                border-white/30
                text-white
                font-semibold
                text-sm
                hover:bg-white/[0.15]
                hover:border-white/50
                hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)]
                transition-all
                duration-300
              "
            >
              Explore Services
            </motion.a>
          </motion.div>

          {/* =================================================
              SMALL TRUST TEXT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 1.7,
            }}
            className="
              flex
              items-center
              justify-center
              md:justify-start
              gap-3
              mt-7
              text-white/50
              text-[10px]
              md:text-xs
              uppercase
              tracking-[0.2em]
            "
          >
            <span>Professional</span>

            <span className="w-1 h-1 rounded-full bg-[#e8b4b8]" />

            <span>Elegant</span>

            <span className="w-1 h-1 rounded-full bg-[#e8b4b8]" />

            <span>Timeless</span>
          </motion.div>
        </div>
      </motion.div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 2,
        }}
        className="
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2
          z-20
          flex
          flex-col
          items-center
          gap-2
          text-white/60
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.35em]
          "
        >
          Scroll
        </span>

        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            size={18}
            className="text-[#e8b4b8]"
          />
        </motion.div>
      </motion.div>

      {/* =====================================================
          BOTTOM FADE
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-28
          md:h-36
          bg-gradient-to-t
          from-[#fff9f8]
          via-[#fff9f8]/30
          to-transparent
          pointer-events-none
          z-10
        "
      />
    </section>
  );
}