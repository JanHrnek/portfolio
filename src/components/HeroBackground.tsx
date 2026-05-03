"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const INTERVAL = 5000

const slides = [
  "/images/hero/slide-1.png",
  "/images/hero/slide-2.png",
]

export default function HeroBackground() {
  const [current, setCurrent] = useState(0)

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(advance, INTERVAL)
    return () => clearInterval(id)
  }, [advance])

  if (slides.length === 0) return null

  // Single image — static, no animation
  if (slides.length === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={slides[0]}
          alt=""
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Ken Burns: scale 1.0 → 1.05 over 5s */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 5, ease: "linear" }}
          >
            <Image
              src={slides[current]}
              alt=""
              fill
              priority={current === 0}
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
