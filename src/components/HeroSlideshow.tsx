"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const INTERVAL = 4500

// Sem vložte cesty ke svým renderům — soubory patří do /public/renders/
// Dokud soubor neexistuje, zobrazí se fallback gradient
const slides = [
  {
    imageSrc: "/renders/axiscore.png",
    fallbackGradient: "radial-gradient(ellipse at 50% 38%, #3a2a14 0%, #1e1a12 40%, #0d0b08 100%)",
    label: "AxisCore",
    sublabel: "DIY 3-osý kamerový gimbal",
    num: "01",
  },
  {
    imageSrc: "/renders/zp8.png",
    fallbackGradient: "radial-gradient(ellipse at 42% 35%, #1a2a38 0%, #0e1a26 45%, #06101a 100%)",
    label: "ZP8 Elevator Brake",
    sublabel: "Bezpečnostní brzdný systém výtahu",
    num: "02",
  },
  {
    imageSrc: "/renders/volleyball.png",
    fallbackGradient: "radial-gradient(ellipse at 50% 30%, #f2f0ec 0%, #d8d5d0 45%, #b8b5b0 100%)",
    label: "Volleyball Net System",
    sublabel: "Samonavíjecí systém volejbalové sítě",
    num: "03",
  },
  {
    imageSrc: "/renders/mediamix.png",
    fallbackGradient: "radial-gradient(ellipse at 46% 36%, #2c1a40 0%, #18102a 45%, #0c0810 100%)",
    label: "MediaMix Mold Design",
    sublabel: "Koncept formy pro polyuretanové výrobky",
    num: "04",
  },
]

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  useEffect(() => {
    const id = setInterval(advance, INTERVAL)
    return () => clearInterval(id)
  }, [advance])

  const slide = slides[current]
  const showImage = !failedImages.has(current)

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        borderRadius: "2px",
        borderLeft: "1px solid var(--color-border)",
      }}
    >
      {/* Crossfade wrapper — animuje celý slide jako celek */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        >
          {/* Fallback gradient (vždy pod obrázkem) */}
          <div
            className="absolute inset-0"
            style={{ background: slide.fallbackGradient }}
          />

          {/* Render PNG — pokryje gradient jakmile se načte */}
          {showImage && (
            <Image
              src={slide.imageSrc}
              alt={slide.label}
              fill
              sizes="(min-width: 1024px) 44vw, 0px"
              className="object-cover"
              priority={current === 0}
              onError={() =>
                setFailedImages((prev) => new Set([...prev, current]))
              }
            />
          )}

          {/* Vignette — rohy tmavší jako u 3D renderu */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.4) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Číslo projektu — vodotisk */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`num-${current}`}
          className="absolute top-4 right-5 font-heading font-bold select-none pointer-events-none"
          style={{
            fontSize: "clamp(5rem, 9vw, 7.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.07)",
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {slide.num}
        </motion.span>
      </AnimatePresence>

      {/* Spodní info bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 pt-12 pb-4 flex items-end justify-between"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 100%)",
          zIndex: 2,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${current}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "0.13em",
                fontFamily: "var(--font-heading)",
                marginBottom: "3px",
              }}
            >
              {slide.sublabel}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.84rem",
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              {slide.label}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dot indikátory */}
        <div className="flex gap-2 items-center pb-0.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Projekt ${i + 1}`}
              style={{
                width: i === current ? 20 : 5,
                height: 2,
                background:
                  i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                transition: "all 0.35s ease",
                border: "none",
                padding: 0,
                borderRadius: 1,
                cursor: "pointer",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
