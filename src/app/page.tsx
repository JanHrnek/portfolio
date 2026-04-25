"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, animate, useTransform } from "framer-motion"
import { Compass, Settings, Box, Cpu } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FeaturedCard from "@/components/FeaturedCard"
import MagneticButton from "@/components/MagneticButton"
import { spring } from "@/lib/animation"

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

function useIsDesktop() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const check = () => setOk(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])
  return ok
}

// Gradient mesh blobs (desktop only)
function GradientMesh() {
  const isDesktop = useIsDesktop()
  if (!isDesktop) return null
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        style={{
          position: "absolute", top: "5%", left: "15%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(200,169,110,0.13) 0%, transparent 70%)",
          filter: "blur(48px)",
          animation: "mesh-1 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute", top: "35%", right: "10%",
          width: 380, height: 380,
          background: "radial-gradient(circle, rgba(150,150,150,0.07) 0%, transparent 70%)",
          filter: "blur(56px)",
          animation: "mesh-2 13s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "15%", left: "38%",
          width: 420, height: 420,
          background: "radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)",
          filter: "blur(64px)",
          animation: "mesh-3 11s ease-in-out infinite",
        }}
      />
    </div>
  )
}

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

// ── Page ─────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center pt-16 px-6 lg:px-16 overflow-hidden"
        >
          <GradientMesh />

          <div className="max-w-7xl mx-auto w-full relative">
            {/* Name stagger */}
            <h1
              className="font-heading font-bold leading-[1.05] tracking-[-0.03em] mb-2"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                color: "var(--color-text)",
              }}
            >
              <AnimatedName name="Jan Hrnek" />
            </h1>

            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ delay: 0.65, type: "spring", stiffness: 100, damping: 20 }}
              style={{ height: 2, backgroundColor: "var(--color-accent)", marginBottom: "1.5rem" }}
            />

            {/* Typewriter subtitle */}
            <p
              className="text-xl font-heading mb-6"
              style={{ color: "var(--color-muted)", minHeight: "1.75rem" }}
            >
              <Typewriter text="Design Engineer" startDelay={0.55} />
            </p>

            {/* Description */}
            <motion.p
              className="text-base max-w-xs leading-[1.65] mb-10"
              style={{ color: "var(--color-muted)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Student konstrukčního inženýrství na VUT FSI Brno.
              <br />
              CAD, automatizace, DIY projekty.
            </motion.p>

            {/* CTA */}
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
        </section>

        {/* ── CO DĚLÁM ──────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.p
              className="text-xs uppercase tracking-[0.1em] mb-12"
              style={{ color: "var(--color-subtle)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ...spring.gentle }}
            >
              Co dělám
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatIDo.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, ...spring.gentle }}
                    className="py-6 px-6"
                    style={{ border: "1px solid var(--color-border)" }}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      style={{ color: "var(--color-accent)", marginBottom: "1rem" }}
                    />
                    <h3
                      className="font-heading font-medium text-base mb-2"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
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
          style={{ backgroundColor: "var(--color-dark-bg)" }}
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
      </main>

      <Footer />
    </>
  )
}
