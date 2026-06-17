"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { motion, useInView, useMotionValue, useMotionTemplate, useSpring, animate, useTransform } from "framer-motion"
import { Compass, Settings, Box, Cpu } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FeaturedCard from "@/components/FeaturedCard"
import MagneticButton from "@/components/MagneticButton"
import ParticleBackground from "@/components/ParticleBackground"
import { spring } from "@/lib/animation"

const HeroCarousel = dynamic(() => import("@/components/HeroCarousel"), { ssr: false })

// ── Data ─────────────────────────────────────────────────────

const featured = [
  {
    title: "AxisCore",
    description: "DIY 3-osý kamerový gimbal",
    gradientClass: "bg-gradient-to-br from-zinc-800 to-zinc-900",
    accentColor: "#D97706",
    href: "/projekty/axiscore",
  },
  {
    title: "MediaMix Mold Design",
    description: "Koncept formy pro polyuretanové výrobky",
    gradientClass: "bg-gradient-to-br from-violet-950 to-purple-900",
    accentColor: "#8B5CF6",
    href: "/projekty/mediamix-forma",
  },
  {
    title: "Volleyball Net System",
    description: "Samonavíjecí systém volejbalové sítě — BP",
    gradientClass: "bg-gradient-to-br from-emerald-100 to-green-200",
    accentColor: "#16A34A",
    href: "/projekty/bakalarka-volejbal",
    inProgress: true,
  },
]

const whatIDo = [
  {
    icon: Compass,
    title: "CAD & Design",
    desc: "SolidWorks, Fusion 360 — od konceptu po výkresovou dokumentaci.",
  },
  {
    icon: Settings,
    title: "Automatizace",
    desc: "Excel/VBA systémy a integrace pro průmyslové prostředí.",
  },
  {
    icon: Box,
    title: "Prototypování",
    desc: "FDM 3D tisk, PETG, iterativní vývoj funkčních prototypů.",
  },
  {
    icon: Cpu,
    title: "Elektronika",
    desc: "ESP32, Arduino, senzory — firmware pro embedded systémy.",
  },
]

const stats = [
  { value: "6", suffix: "+", label: "let s CAD" },
  { value: "2", suffix: "", label: "certifikace SolidWorks" },
  { value: "10", suffix: "+", label: "dokončených projektů" },
  { value: "3", suffix: "", label: "firmy jako konzultant" },
]

// ── Helpers ──────────────────────────────────────────────────

// Letter-by-letter stagger for the name
function AnimatedName({ name }: { name: string }) {
  const letters = name.split("")
  return (
    <span aria-label={name}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.045, ...spring.snappy }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  )
}

// Typewriter effect
function Typewriter({ text, startDelay = 0.7 }: { text: string; startDelay?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(iv)
          setDone(true)
        }
      }, 55)
      return () => clearInterval(iv)
    }, startDelay * 1000)
    return () => clearTimeout(t)
  }, [text, startDelay])

  return (
    <span>
      {displayed}
      {!done && <span className="cursor-blink" style={{ opacity: 1 }}>|</span>}
    </span>
  )
}

// Animated stat counter
function StatCounter({ value, suffix, label }: { value: string; suffix: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const num = parseInt(value, 10) || 0
  const count = useMotionValue(0)
  const displayVal = useTransform(count, (v) => Math.round(v).toString())

  useEffect(() => {
    if (!isInView) return
    const c = animate(count, num, { duration: 1.4, ease: "easeOut" })
    return () => c.stop()
  }, [isInView, num, count])

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-heading font-bold"
        style={{
          fontSize: "clamp(3rem, 8vw, 5rem)",
          color: "var(--color-dark-text)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        <motion.span>{displayVal}</motion.span>
        {suffix}
      </div>
      <p
        className="text-xs uppercase tracking-[0.1em] mt-3"
        style={{ color: "var(--color-dark-muted)" }}
      >
        {label}
      </p>
    </div>
  )
}

// "Co dělám" card with hover effect
function WhatIDoCard({ item, delay }: { item: (typeof whatIDo)[0]; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, ...spring.gentle }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="py-6 px-6 transition-colors duration-200"
      style={{
        border: `1px solid ${hovered ? "var(--color-accent)" : "var(--color-border)"}`,
        borderRadius: "0.5rem",
        backgroundColor: hovered ? "rgba(0,0,0,0.02)" : "transparent",
      }}
    >
      <Icon size={22} strokeWidth={1.5} style={{ color: "var(--color-accent)", marginBottom: "1rem" }} />
      <h3 className="font-heading font-medium text-base mb-2" style={{ color: "var(--color-text)" }}>
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
        {item.desc}
      </p>
    </motion.div>
  )
}

// Subtle cursor glow — soft radial spotlight following the mouse
function CursorGlow() {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 })
  const bg = useMotionTemplate`radial-gradient(650px circle at ${springX}px ${springY}px, rgba(200,169,110,0.07) 0%, transparent 60%)`

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", move, { passive: true })
    return () => window.removeEventListener("mousemove", move)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ background: bg }}
    />
  )
}

// ── Page ─────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <CursorGlow />
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative flex flex-col items-center justify-center overflow-hidden"
          style={{
            minHeight: "100vh",
            backgroundColor: "var(--color-bg)",
          }}
        >
          {/* Giant watermark text */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ zIndex: 0 }}
          >
            <span
              className="font-heading font-bold text-center leading-none"
              style={{
                fontSize: "clamp(6rem, 15vw, 14rem)",
                color: "var(--color-text)",
                opacity: 0.04,
                letterSpacing: "-0.04em",
                whiteSpace: "nowrap",
              }}
            >
              DESIGN ENGINEER
            </span>
          </div>

          {/* Mobile layout: stacked */}
          <div className="flex flex-col items-center gap-8 px-6 pt-28 pb-16 lg:hidden" style={{ zIndex: 1, width: "100%" }}>
            <div className="text-center">
              <h1
                className="font-heading font-bold leading-[1.05] tracking-[-0.03em] mb-3"
                style={{ fontSize: "clamp(2.8rem, 10vw, 4rem)", color: "var(--color-text)" }}
              >
                <AnimatedName name="Jan Hrnek" />
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ delay: 0.65, type: "spring", stiffness: 100, damping: 20 }}
                style={{
                  height: 2,
                  backgroundColor: "var(--color-accent)",
                  margin: "0 auto 1rem",
                }}
              />
              <p className="text-lg font-heading mb-4" style={{ color: "var(--color-muted)", minHeight: "1.6rem" }}>
                <Typewriter text="Design Engineer" startDelay={0.55} />
              </p>
              <motion.p
                className="text-sm leading-[1.65] mb-6"
                style={{ color: "var(--color-muted)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                Student konstrukčního inženýrství na VUT FSI Brno.
                CAD, automatizace, DIY projekty.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, ...spring.gentle }}
              >
                <MagneticButton onClick={() => scrollTo("projekty")}>
                  Prohlédnout projekty
                </MagneticButton>
              </motion.div>
            </div>
            <HeroCarousel />
          </div>

          {/* Desktop layout: centered carousel + floating cards */}
          <div
            className="hidden lg:flex items-center justify-center relative w-full"
            style={{ zIndex: 1, minHeight: "100vh" }}
          >
            {/* Centered 3D carousel */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, ...spring.gentle }}
              style={{ width: "50%" }}
            >
              <HeroCarousel />
            </motion.div>

            {/* LEFT floating glassmorphism card */}
            <motion.div
              className="absolute"
              style={{ left: "4%", top: "35%" }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, ...spring.gentle }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.60)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  maxWidth: 260,
                }}
              >
                <h1
                  className="font-heading font-bold leading-tight tracking-[-0.03em] mb-2"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)", color: "var(--color-text)" }}
                >
                  <AnimatedName name="Jan Hrnek" />
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ delay: 0.65, type: "spring", stiffness: 100, damping: 20 }}
                  style={{
                    height: 2,
                    backgroundColor: "var(--color-accent)",
                    marginBottom: "0.75rem",
                  }}
                />
                <p className="text-sm font-heading mb-3" style={{ color: "var(--color-muted)", minHeight: "1.3rem" }}>
                  <Typewriter text="Design Engineer" startDelay={0.8} />
                </p>
                <motion.p
                  className="text-xs leading-[1.65] mb-4"
                  style={{ color: "var(--color-muted)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  Student konstrukčního inženýrství na VUT FSI Brno.
                  CAD, automatizace, DIY projekty.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, ...spring.gentle }}
                >
                  <MagneticButton onClick={() => scrollTo("projekty")}>
                    Prohlédnout projekty
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT floating glassmorphism card */}
            <motion.div
              className="absolute"
              style={{ right: "4%", top: "50%" }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, ...spring.gentle }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.60)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  maxWidth: 220,
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-3 font-heading font-medium"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Co dělám
                </p>
                <div className="flex flex-col gap-2">
                  {whatIDo.map((item) => (
                    <span
                      key={item.title}
                      className="text-xs font-heading font-medium px-2.5 py-1.5 inline-block"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.04)",
                        border: "1px solid rgba(0,0,0,0.07)",
                        color: "var(--color-text)",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CO DĚLÁM ──────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.p
              className="text-xs uppercase tracking-[0.1em] mb-12"
              style={{ color: "var(--color-subtle)" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...spring.gentle }}
            >
              Co dělám
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatIDo.map((item, i) => (
                <WhatIDoCard key={item.title} item={item} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ── VYBRANÉ PROJEKTY ──────────────────────────────── */}
        <section
          id="projekty"
          className="py-24 px-6 lg:px-16"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <h2
                className="font-heading font-bold text-3xl tracking-[-0.02em]"
                style={{ color: "var(--color-text)" }}
              >
                Vybrané projekty
              </h2>
              <a
                href="/projekty"
                className="text-sm font-heading transition-colors duration-200"
                style={{ color: "var(--color-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                Všechny projekty →
              </a>
            </div>

            {/* Desktop: 1 large left + 2 small right */}
            <div className="hidden lg:grid grid-cols-2 gap-4" style={{ gridTemplateRows: "1fr 1fr" }}>
              <div className="row-span-2">
                <FeaturedCard index={0} {...featured[0]} size="large" />
              </div>
              <div>
                <FeaturedCard index={1} {...featured[1]} size="small" />
              </div>
              <div>
                <FeaturedCard index={2} {...featured[2]} size="small" />
              </div>
            </div>

            {/* Mobile: stacked */}
            <div className="flex flex-col gap-6 lg:hidden">
              {featured.map((p, i) => (
                <FeaturedCard key={p.title} index={i} {...p} size="small" />
              ))}
            </div>
          </div>
        </section>

        {/* ── ČÍSLA ─────────────────────────────────────────── */}
        <section
          className="py-24 px-6 lg:px-16"
          style={{
            backgroundColor: "var(--color-dark-bg)",
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.038) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.038) 1px, transparent 1px)",
              "linear-gradient(rgba(255,255,255,0.062) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.062) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "24px 24px, 24px 24px, 120px 120px, 120px 120px",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="text-xs uppercase tracking-[0.1em] mb-16 text-center"
              style={{ color: "var(--color-dark-muted)" }}
            >
              V číslech
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* Dark-to-light transition — standalone block so height is unconstrained */}
        <div
          aria-hidden
          style={{
            height: 220,
            background: "linear-gradient(to bottom, var(--color-dark-bg), var(--color-bg))",
            pointerEvents: "none",
          }}
        />
      </main>

      <Footer />
    </>
  )
}
