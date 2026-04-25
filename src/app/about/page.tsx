"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { spring } from "@/lib/animation"

// ── Data ──────────────────────────────────────────────────────

const timeline = [
  {
    year: "2022",
    title: "Nástup na VUT FSI Brno",
    description:
      "Obor Konstrukční inženýrství — základ v mechanice, materiálech a CAD modelování.",
    upcoming: false,
  },
  {
    year: "2023",
    title: "CSWA & CSWP certifikace",
    description:
      "SolidWorks certifikace na asociátské i profesionální úrovni. Začátek freelancingu v CAD oblasti.",
    upcoming: false,
  },
  {
    year: "2024",
    title: "Solidcon",
    description:
      "Technická dokumentace, KLT inserty a paletový design. První zkušenost s průmyslovým projektem pod časovým tlakem.",
    upcoming: false,
  },
  {
    year: "2025",
    title: "AxisCore projekt",
    description:
      "DIY 3-osý kamerový gimbal — první velký samostatný hardware projekt. Mechanika, elektronika, firmware. Projekt selhal, ale naučil nejvíc.",
    upcoming: false,
  },
  {
    year: "2026",
    title: "Lemmacon s.r.o.",
    description:
      "Automatizace výkaznictví, SolidWorks integrace, Excel/VBA systémy pro průmyslové prostředí.",
    upcoming: false,
  },
  {
    year: "2026",
    title: "Erasmus+ SDU Odense",
    description:
      "Plánovaný zimní semestr na University of Southern Denmark. Strojní inženýrství v mezinárodním prostředí.",
    upcoming: true,
  },
]

const skillCategories = [
  {
    name: "CAD",
    items: ["SolidWorks (CSWA + CSWP)", "Fusion 360", "Blender"],
  },
  {
    name: "Programování",
    items: ["VBA / Excel", "Python", "Arduino / ESP32", "C++"],
  },
  {
    name: "Výroba",
    items: ["3D tisk (FDM)", "Základy CNC"],
  },
  {
    name: "Ostatní",
    items: ["Git", "LaTeX", "Technická dokumentace"],
  },
]

// ── Helpers ──────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring.gentle, delay }}
    >
      {children}
    </motion.div>
  )
}

// ── Timeline item ─────────────────────────────────────────────

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof timeline)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring.gentle, delay: index * 0.08 }}
      className="flex gap-0"
    >
      {/* Year column */}
      <div
        className="shrink-0 w-16 lg:w-24 pt-0.5 text-right pr-6"
        style={{ color: "var(--color-subtle)" }}
      >
        <span className="text-sm font-heading tabular-nums">{item.year}</span>
      </div>

      {/* Dot + vertical line */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div
          className="w-2.5 h-2.5 rounded-full mt-1 z-10 shrink-0"
          style={{
            backgroundColor: item.upcoming
              ? "var(--color-accent)"
              : "var(--color-text)",
            boxShadow: item.upcoming
              ? "0 0 0 3px var(--color-bg), 0 0 0 4px var(--color-accent)"
              : "none",
          }}
        />
        {!isLast && (
          <div
            className="flex-1 w-px mt-2"
            style={{ backgroundColor: "var(--color-border)" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pl-6 pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <h3
            className="font-heading font-medium text-lg"
            style={{ color: "var(--color-text)" }}
          >
            {item.title}
          </h3>
          {item.upcoming && (
            <span
              className="text-xs px-2.5 py-0.5 rounded-full border font-heading"
              style={{
                borderColor: "var(--color-accent)",
                color: "var(--color-accent)",
              }}
            >
              Nadcházející
            </span>
          )}
        </div>
        <p
          className="text-sm leading-[1.7]"
          style={{ color: "var(--color-muted)" }}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

// ── Skill card ────────────────────────────────────────────────

function SkillCard({
  skill,
  delay,
}: {
  skill: string
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring.gentle, delay }}
      className="py-3 px-4 text-sm font-heading"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
      }}
    >
      {skill}
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Navbar />

      <main>
        {/* ── 1. HERO ─────────────────────────────────────── */}
        <section className="min-h-[60vh] flex flex-col justify-end pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <p
              className="text-xs uppercase tracking-[0.1em] mb-6"
              style={{ color: "var(--color-subtle)" }}
            >
              O mně
            </p>
            <h1
              className="font-heading font-bold leading-[1.05] tracking-[-0.03em] mb-8"
              style={{
                fontSize: "clamp(3rem, 8vw, 4.5rem)",
                color: "var(--color-text)",
              }}
            >
              O mně
            </h1>
            <p
              className="text-xl max-w-2xl leading-[1.6]"
              style={{ color: "var(--color-muted)" }}
            >
              Student konstrukčního inženýrství na VUT FSI Brno. Baví mě
              navrhovat věci které fungují — od CAD modelů po automatizační
              systémy.
            </p>
          </div>
        </section>

        {/* ── 2. TIMELINE ──────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <p
                className="text-xs uppercase tracking-[0.1em] mb-12"
                style={{ color: "var(--color-subtle)" }}
              >
                Cesta
              </p>
            </FadeIn>

            <div className="max-w-2xl">
              {timeline.map((item, i) => (
                <TimelineItem
                  key={`${item.year}-${item.title}`}
                  item={item}
                  index={i}
                  isLast={i === timeline.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. SKILLS ────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <p
                className="text-xs uppercase tracking-[0.1em] mb-12"
                style={{ color: "var(--color-subtle)" }}
              >
                Dovednosti
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
              {skillCategories.map((cat, ci) => (
                <div key={cat.name}>
                  <FadeIn delay={ci * 0.08}>
                    <p
                      className="text-xs uppercase tracking-[0.1em] mb-4 font-heading font-medium"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      {cat.name}
                    </p>
                  </FadeIn>
                  <div className="space-y-2">
                    {cat.items.map((skill, si) => (
                      <SkillCard
                        key={skill}
                        skill={skill}
                        delay={ci * 0.08 + si * 0.06}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. OSOBNÍ SEKCE ──────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-24">
              <FadeIn>
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-8 lg:mb-0"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Mimo školu
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2
                  className="font-heading font-medium text-2xl mb-6 tracking-[-0.01em]"
                  style={{ color: "var(--color-text)" }}
                >
                  Mimo školu
                </h2>
                <p
                  className="text-lg leading-[1.75] max-w-xl"
                  style={{ color: "var(--color-muted)" }}
                >
                  Když zrovna nekreslím v SolidWorks, hraju volejbal,
                  experimentuju v kuchyni se sushi a italskou kuchyní, nebo
                  se ztrácím ve hrách jako Cities: Skylines a Minecraft.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
