"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"

const INTERVAL = 4000

const slides = [
  { src: "/images/hero/slide-1.png", name: "MediaMix Forma" },
  { src: "/images/hero/slide-2.png", name: "AxisCore Gimbal" },
  { src: "/images/hero/slide-3.png", name: "Volleyball System" },
  { src: "/images/hero/slide-4.png", name: "ZP8 Brake" },
]

const N = slides.length
const STEP = 360 / N

function normalize(angle: number): number {
  const a = ((angle % 360) + 360) % 360
  return a > 180 ? a - 360 : a
}

function cardVisuals(eff: number): { scale: number; opacity: number; blur: number } {
  const abs = Math.abs(eff)
  if (abs <= 90) {
    const t = abs / 90
    return { scale: 1 - t * 0.3, opacity: 1 - t * 0.5, blur: t * 3 }
  }
  const t = (abs - 90) / 90
  return { scale: 0.7 - t * 0.2, opacity: 0.5 - t * 0.3, blur: 3 + t * 3 }
}

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [grabbing, setGrabbing] = useState(false)
  const [ringDeg, setRingDeg] = useState(0)

  const ringTarget = useMotionValue(0)
  const springRing = useSpring(ringTarget, { stiffness: 60, damping: 20 })

  const dragging = useRef(false)
  const hasDragged = useRef(false)
  const dragStartX = useRef(0)
  const dragStartTarget = useRef(0)
  const touchStartX = useRef(0)
  const touchStartTarget = useRef(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => springRing.on("change", setRingDeg), [springRing])

  useEffect(() => {
    ringTarget.set(-(currentIndex * STEP))
  }, [currentIndex, ringTarget])

  useEffect(() => {
    if (N <= 1) return
    const id = setInterval(() => setCurrentIndex(p => (p + 1) % N), INTERVAL)
    return () => clearInterval(id)
  }, [])

  const snapToNearest = useCallback(() => {
    const raw = -ringTarget.get() / STEP
    setCurrentIndex(((Math.round(raw) % N) + N) % N)
  }, [ringTarget])

  // Pointer drag (desktop)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return
    dragging.current = true
    hasDragged.current = false
    dragStartX.current = e.clientX
    dragStartTarget.current = ringTarget.get()
    setGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 4) hasDragged.current = true
    ringTarget.set(dragStartTarget.current + delta * 0.4)
  }

  const onPointerUp = () => {
    if (!dragging.current) return
    dragging.current = false
    setGrabbing(false)
    if (hasDragged.current) snapToNearest()
  }

  // Touch swipe (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartTarget.current = ringTarget.get()
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - touchStartX.current
    ringTarget.set(touchStartTarget.current + delta * 0.4)
  }

  const onTouchEnd = () => snapToNearest()

  if (N === 0) return null

  // Single slide — floating
  if (N === 1) {
    return (
      <div className="flex flex-col items-center gap-5">
        <motion.div
          style={{ width: 360, height: 360, position: "relative" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={slides[0].src} alt={slides[0].name} fill style={{ objectFit: "contain" }} priority />
        </motion.div>
        <p className="font-heading text-sm uppercase tracking-widest" style={{ color: "var(--color-subtle)" }}>
          {slides[0].name}
        </p>
      </div>
    )
  }

  const RADIUS = isMobile ? 160 : 300
  const cardSize = isMobile ? 200 : 380
  const height = isMobile ? 300 : 450

  return (
    <div className="flex flex-col items-center gap-5" style={{ width: "100%" }}>

      {/* 3D stage */}
      <div
        style={{
          width: "100%",
          height,
          position: "relative",
          perspective: "1200px",
          cursor: grabbing ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Rotating ring — transformStyle:preserve-3d lets cards live in 3D space */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateY(${ringDeg}deg)`,
          }}
        >
          {slides.map((slide, i) => {
            const cardBase = i * STEP
            const eff = normalize(cardBase + ringDeg)
            const { scale, opacity, blur } = cardVisuals(eff)
            const clickable = Math.abs(eff) > 15

            return (
              <div
                key={slide.src}
                onClick={() => { if (clickable && !hasDragged.current) setCurrentIndex(i) }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: cardSize,
                  height: cardSize,
                  marginTop: -cardSize / 2,
                  marginLeft: -cardSize / 2,
                  transform: `rotateY(${cardBase}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: "visible",
                  cursor: clickable ? "pointer" : "inherit",
                }}
              >
                {/* Visual properties applied flat (2D, screen-space) */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: `scale(${scale})`,
                    opacity,
                    filter: blur > 0.05 ? `blur(${blur}px)` : "none",
                    position: "relative",
                    pointerEvents: "none",
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.name}
                    fill
                    style={{ objectFit: "contain" }}
                    priority={i === 0}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Current model name — fades with slide change */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="font-heading font-medium text-sm uppercase tracking-widest"
          style={{ color: "var(--color-subtle)" }}
        >
          {slides[currentIndex].name}
        </motion.p>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Model ${i + 1}`}
            style={{
              width: i === currentIndex ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === currentIndex ? "var(--color-accent)" : "var(--color-border)",
              border: "none",
              padding: 0,
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  )
}
