"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

function makeParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    radius: 1 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.2,
  }))
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Capture as non-null for use in nested functions
    const c: HTMLCanvasElement = canvas
    const g: CanvasRenderingContext2D = ctx

    function resize() {
      c.width = window.innerWidth
      c.height = window.innerHeight
      const count = window.innerWidth < 640 ? 15 : 40
      particlesRef.current = makeParticles(count, c.width, c.height)
    }

    function tick() {
      g.clearRect(0, 0, c.width, c.height)

      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > c.width) p.vx *= -1
        if (p.y < 0 || p.y > c.height) p.vy *= -1

        g.beginPath()
        g.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        g.fillStyle = `rgba(212,212,212,${p.opacity})`
        g.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    resize()
    tick()

    window.addEventListener("resize", resize, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  )
}
