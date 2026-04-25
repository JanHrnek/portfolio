"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import MagneticButton from "@/components/MagneticButton"
import ProjectCard from "@/components/ProjectCard"
import Footer from "@/components/Footer"

const projects = [
  {
    title: "AxisCore",
    description: "DIY 3-osý kamerový gimbal",
    gradientClass: "bg-gradient-to-br from-zinc-800 to-zinc-900",
    href: "/projekty/axiscore",
  },
  {
    title: "MediaMix Mold Design",
    description: "Koncept formy pro polyuretanové výrobky",
    gradientClass: "bg-gradient-to-br from-violet-950 to-purple-900",
    href: "/projekty/mediamix-forma",
  },
  {
    title: "Volleyball Net System",
    description: "Samonavíjecí systém volejbalové sítě — BP",
    gradientClass: "bg-gradient-to-br from-emerald-100 to-green-200",
    href: "/projekty/bakalarka-volejbal",
  },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          id="hero"
          className="min-h-screen flex flex-col justify-center pt-16 px-6 lg:px-16"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h1
              className="font-heading font-bold text-5xl lg:text-7xl leading-[1.05] tracking-[-0.03em]"
              style={{ color: "var(--color-text)" }}
            >
              Jan Hrnek
            </h1>

            <p className="mt-5 text-xl font-heading" style={{ color: "var(--color-muted)" }}>
              Design Engineer
            </p>

            <p
              className="mt-6 text-base max-w-xs leading-[1.6]"
              style={{ color: "var(--color-muted)" }}
            >
              Student konstrukčního inženýrství na VUT FSI Brno.
              <br />
              CAD, automatizace, DIY projekty.
            </p>

            <div className="mt-10">
              <MagneticButton onClick={() => scrollTo("projekty")}>
                Prohlédnout projekty
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* ── Vybrané projekty ─────────────────────────────── */}
        <section id="projekty" className="py-24 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <h2
              className="font-heading font-bold text-3xl tracking-[-0.02em] mb-12"
              style={{ color: "var(--color-text)" }}
            >
              Vybrané projekty
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
