"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Only on pointer-precise devices — suppress on touch/mobile
    if (!window.matchMedia("(pointer: fine)").matches) return

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`

      // The CSS cascade gives every element its effective cursor value.
      // - "none"    → background / non-interactive area  → show crosshair
      // - "pointer" → link / button                      → hide, native hand shows
      // - "text"    → input / textarea                   → hide, native I-beam shows
      // CSS cursor inherits, so a <span> inside an <a> already computes to "pointer".
      const effective = window.getComputedStyle(e.target as Element).cursor
      el.style.opacity = effective === "none" ? "1" : "0"
    }

    const hide = () => { el.style.opacity = "0" }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", hide)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.documentElement.removeEventListener("mouseleave", hide)
    }
  }, [])

  return (
    <svg
      ref={ref}
      width="32"
      height="32"
      viewBox="-16 -16 32 32"
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    >
      <g stroke="white" fill="none">
        {/* Crosshair arms — gap leaves room for the center circle */}
        <line x1="-16" y1="0"   x2="-6"  y2="0"   strokeWidth="1"   />
        <line x1="6"   y1="0"   x2="16"  y2="0"   strokeWidth="1"   />
        <line x1="0"   y1="-16" x2="0"   y2="-6"  strokeWidth="1"   />
        <line x1="0"   y1="6"   x2="0"   y2="16"  strokeWidth="1"   />
        {/* Center circle */}
        <circle cx="0" cy="0" r="3.5" strokeWidth="0.9" />
      </g>
    </svg>
  )
}
