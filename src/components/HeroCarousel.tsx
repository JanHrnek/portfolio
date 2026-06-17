"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ModelViewer from "@/components/ModelViewer"
import { useGLTF } from "@react-three/drei"

// All .glb files from public/models/ — names derived from filenames
const models = [
  { path: "/models/mediamix-forma.glb",  name: "MediaMix Forma" },
  { path: "/models/axiscore-gimbal.glb", name: "AxisCore Gimbal" },
  { path: "/models/pc-case.glb",         name: "PC Case" },
  { path: "/models/zp8-brake.glb",       name: "ZP8 Brake" },
  { path: "/models/carport.glb",         name: "Carport" },
]

const N = models.length

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Preload all models once on mount — safe to call inside a client component
  useEffect(() => {
    models.forEach(({ path }) => useGLTF.preload(path))
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])

  // Only advance if fromIndex is still the active slide —
  // prevents the exiting (AnimatePresence clone) from jumping the index
  const advance = useCallback((fromIndex: number) => {
    setCurrentIndex(prev => prev === fromIndex ? (prev + 1) % N : prev)
  }, [])

  const size = isMobile ? 300 : 500

  return (
    <div className="flex flex-col items-center gap-5">

      {/* 3D viewport — fixed size, single model at a time */}
      <div style={{ width: size, height: size, position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.35, ease: "easeIn" } }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <ModelViewer
              path={models[currentIndex].path}
              isMobile={isMobile}
              onComplete={() => advance(currentIndex)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Current model name */}
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
          {models[currentIndex].name}
        </motion.p>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex gap-2 items-center">
        {models.map((_, i) => (
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
