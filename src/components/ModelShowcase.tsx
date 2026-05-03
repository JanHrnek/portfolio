"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, type Easing } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const INTERVAL = 4000

const slides = [
  {
    gradient: "linear-gradient(135deg, #27272a 0%, #18181b 100%)",
    name: "AxisCore Gimbal",
    num: "01",
    // imageSrc: "/renders/showcase-axiscore.png",
  },
  {
    gradient: "linear-gradient(135deg, #3b0764 0%, #4c1d95 100%)",
    name: "MediaMix Mold",
    num: "02",
    // imageSrc: "/renders/showcase-mediamix.png",
  },
  {
    gradient: "linear-gradient(135deg, #022c22 0%, #065f46 100%)",
    name: "Volleyball Net System",
    num: "03",
    // imageSrc: "/renders/showcase-volleyball.png",
  },
  {
    gradient: "linear-gradient(135deg, #082f49 0%, #0c4a6e 100%)",
    name: "ZP8 Brake System",
    num: "04",
    // imageSrc: "/renders/showcase-zp8.png",
  },
]

// Direction-aware variants — simultaneous exit+enter (mode sync)
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    scale: 1.1,
  }),
  center: {
    x: "0%",
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-30%" : "30%",
    opacity: 0,
  }),
}

const slideTransition = {
  x: { type: "spring" as const, stiffness: 260, damping: 28, mass: 1 },
  scale: { type: "spring" as const, stiffness: 200, damping: 28, mass: 1.2 },
  opacity: { duration: 0.3, ease: "easeOut" as Easing },
}

function ArrowButton({
  onClick,
  side,
  children,
}: {
  onClick: () => void
  side: "left" | "right"
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center z-10"
      style={{
        [side]: "1.25rem",
        width: 40,
        height: 40,
        background: "rgba(10,10,10,0.45)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "2px",
        color: "rgba(255,255,255,0.6)",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(10,10,10,0.72)"
        e.currentTarget.style.color = "#fff"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(10,10,10,0.45)"
        e.currentTarget.style.color = "rgba(255,255,255,0.6)"
      }}
      aria-label={side === "left" ? "Předchozí" : "Další"}
    >
      {children}
    </button>
  )
}

export default function ModelShowcase() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1)
  }, [current, goTo])

  useEffect(() => {
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [next])

  const slide = slides[current]

  return (
    <section
      style={{ borderTop: "1px solid var(--color-border)" }}
      aria-label="3D modely projektů"
    >
      {/* ── Image strip ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(260px, 42vw, 500px)" }}
      >
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="absolute inset-0"
            style={{ willChange: "transform" }}
          >
            {/* Gradient placeholder — replace with <Image> when renders are ready */}
            <div className="w-full h-full" style={{ background: slide.gradient }} />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        <ArrowButton onClick={prev} side="left">
          <ChevronLeft size={18} strokeWidth={1.5} />
        </ArrowButton>
        <ArrowButton onClick={next} side="right">
          <ChevronRight size={18} strokeWidth={1.5} />
        </ArrowButton>
      </div>

      {/* ── Controls bar ── */}
      <div
        className="flex items-center justify-between px-6 lg:px-16 py-5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        {/* Model name — fades in from below */}
        <div className="flex items-center gap-4">
          <span
            className="text-xs uppercase tracking-[0.1em] font-heading"
            style={{ color: "var(--color-subtle)" }}
          >
            {slide.num}
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={`name-${current}`}
              className="font-heading font-medium"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                letterSpacing: "-0.01em",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              {slide.name}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`${slides[i].name}`}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === current ? "var(--color-text)" : "var(--color-border)",
                border: "none",
                padding: 0,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (i !== current)
                  e.currentTarget.style.background = "var(--color-subtle)"
              }}
              onMouseLeave={(e) => {
                if (i !== current)
                  e.currentTarget.style.background = "var(--color-border)"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
