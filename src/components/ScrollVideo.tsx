"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { spring } from "@/lib/animation"

type ScrollVideoProps = {
  src: string
  poster?: string
  title?: string
  caption?: string
  accent: string
  /** Výška scroll dráhy v násobcích viewportu (kolik scrollu = celé video). Default 3. */
  scrollHeight?: number
}

/**
 * Scroll-scrubbed video. Video se nepřehrává — jeho currentTime se nastavuje
 * podle scroll pozice. Plynulost zajišťuje lerp v requestAnimationFrame smyčce.
 *
 * Video by mělo být enkódované s častými keyframy (ideálně každý frame),
 * jinak bude seekování trhané. Doporučený formát: MP4 (H.264) + WebM fallback.
 */
export default function ScrollVideo({
  src,
  poster,
  title,
  caption,
  accent,
  scrollHeight = 3,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  // Scroll progress 0 → 1 přes celý sticky kontejner
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Cílový čas videa (sekundy), aktuální (lerpovaný) čas
  const targetTime = useRef(0)
  const currentTime = useRef(0)
  const rafId = useRef<number | null>(null)

  // Načti metadata → známe duration
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onLoaded = () => setReady(true)
    if (video.readyState >= 1) setReady(true)
    else video.addEventListener("loadedmetadata", onLoaded)
    return () => video.removeEventListener("loadedmetadata", onLoaded)
  }, [])

  // Scroll → cílový čas
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    targetTime.current = Math.min(Math.max(p, 0), 1) * video.duration
  })

  // rAF smyčka — plynule dotahuje currentTime k cíli
  useEffect(() => {
    if (!ready) return
    const video = videoRef.current
    if (!video) return

    const tick = () => {
      const diff = targetTime.current - currentTime.current
      // lerp factor — vyšší = rychlejší dohánění
      currentTime.current += diff * 0.12
      if (Math.abs(diff) > 0.005 && video.duration) {
        try {
          video.currentTime = currentTime.current
        } catch {
          /* seek může selhat během bufferování — ignoruj */
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [ready])

  // Overlay text fade — title viditelný na začátku
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [1, 0, 0, 1])

  return (
    <div
      ref={containerRef}
      style={{ height: `${scrollHeight * 100}vh`, position: "relative" }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain"
        />

        {/* Overlay title */}
        {title && (
          <motion.div
            className="absolute left-6 lg:left-16 bottom-16 pointer-events-none"
            style={{ opacity: titleOpacity }}
          >
            <div
              className="text-xs uppercase tracking-[0.1em] mb-3 font-heading font-medium"
              style={{ color: accent }}
            >
              Rozklad sestavy
            </div>
            <h3
              className="font-heading font-bold leading-[1.05] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-text)",
              }}
            >
              {title}
            </h3>
            {caption && (
              <p
                className="text-sm mt-3 max-w-md"
                style={{ color: "var(--color-muted)" }}
              >
                {caption}
              </p>
            )}
          </motion.div>
        )}

        {/* Scroll hint */}
        <motion.div
          className="absolute right-6 lg:right-16 bottom-16 flex items-center gap-3 pointer-events-none"
          style={{ color: "var(--color-subtle)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring.gentle}
        >
          <span className="text-xs uppercase tracking-[0.1em]">Scrolluj</span>
          <div className="w-px h-8" style={{ backgroundColor: "var(--color-border)" }} />
        </motion.div>
      </div>
    </div>
  )
}
