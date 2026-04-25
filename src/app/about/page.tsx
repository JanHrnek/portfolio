"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { spring } from "@/lib/animation"

// ── Data ──────────────────────────────────────────────────────

const timeline = [
  {
    year: "2020",
    title: "Nástup na VUT FSI Brno",
    description: "Obor Konstrukční inženýrství — základ v mechanice, materiálech a CAD modelování.",
    upcoming: false,
    photo: undefined as string | undefined,
  },
  {
    year: "2023",
    title: "CSWA & CSWP certifikace",
    description: "SolidWorks certifikace na asociátské i profesionální úrovni. Začátek freelancingu v CAD oblasti.",
    upcoming: false,
    photo: undefined as string | undefined,
  },
  {
    year: "2024",
    title: "Solidcon",
    description: "Technická dokumentace, KLT inserty a paletový design. První průmyslový projekt pod časovým tlakem.",
    upcoming: false,
    photo: undefined as string | undefined,
  },
  {
    year: "2024",
    title: "AxisCore projekt",
    description: "DIY 3-osý kamerový gimbal — první velký samostatný hardware projekt. Projekt selhal, ale naučil nejvíc.",
    upcoming: false,
    photo: undefined as string | undefined,
  },
  {
    year: "2025",
    title: "MediaMix",
    description: "Komerční projekt — návrh formy pro polyuretanové výrobky a automatizovaný aplikátor separátoru.",
    upcoming: false,
    photo: undefined as string | undefined,
  },
  {
    year: "2025",
    title: "ZP8 Elevator Brake",
    description: "Týmový projekt VUT — bezpečnostní brzdný systém výtahu s ESP32, PDR a CDR fázemi.",
    upcoming: false,
    photo: undefined as string | undefined,
  },
  {
    year: "2026",
    title: "Lemmacon s.r.o.",
    description: "Automatizace výkaznictví, SolidWorks integrace, Excel/VBA systémy pro průmyslové prostředí.",
    upcoming: false,
    photo: undefined as string | undefined,
  },
  {
    year: "2026",
    title: "Erasmus+ SDU Odense",
    description: "Plánovaný zimní semestr na University of Southern Denmark v Dánsku.",
    upcoming: true,
    photo: undefined as string | undefined,
  },
  {
    year: "2026",
    title: "Bakalářská práce",
    description: "Samonavíjecí a napínací systém volejbalové sítě — mechanika, ESP32, 3D tisknutý demonstrátor.",
    upcoming: true,
    photo: undefined as string | undefined,
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

const hobbies = [
  "Volejbal",
  "Sushi",
  "Italská kuchyně",
  "Cities: Skylines",
  "Minecraft",
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

type TimelineEntry = (typeof timeline)[number]

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: TimelineEntry
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
      transition={{ ...spring.gentle, delay: index * 0.07 }}
      className="flex gap-0"
    >
      {/* Year */}
      <div
        className="shrink-0 w-14 lg:w-20 pt-0.5 text-right pr-5"
        style={{ color: "var(--color-subtle)" }}
      >
        <span className="text-sm font-heading tabular-nums">{item.year}</span>
      </div>

      {/* Dot + vertical line */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div
          className="w-2.5 h-2.5 rounded-full mt-1 z-10 shrink-0 transition-colors"
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
      <div className="flex-1 pl-5 pb-10">
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <h3
            className="font-heading font-medium text-base"
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
        {/* Photo slot — renders image when path provided */}
        {item.photo && (
          <div className="mt-4 overflow-hidden rounded-md" style={{ maxWidth: 280 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.photo}
              alt={item.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Skill card ────────────────────────────────────────────────

function SkillCard({ skill, delay }: { skill: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
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
        <section className="min-h-[55vh] flex flex-col justify-end pt-32 pb-16 px-6 lg:px-16">
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

        {/* ── 2. CV KARTA ──────────────────────────────────── */}
        <section className="py-8 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-8 py-10 lg:px-12"
                style={{ backgroundColor: "var(--color-dark-bg)", borderRadius: "4px" }}
              >
                {/* Left */}
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.1em] mb-2 font-heading"
                    style={{ color: "var(--color-dark-muted)" }}
                  >
                    Životopis
                  </p>
                  <p
                    className="font-heading font-medium text-lg"
                    style={{ color: "var(--color-dark-text)" }}
                  >
                    Aktuální životopis ke stažení
                  </p>
                </div>

                {/* Button */}
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 font-heading font-medium text-sm tracking-wide shrink-0 transition-opacity duration-200 hover:opacity-85"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-dark-bg)",
                  }}
                >
                  Stáhnout CV
                  <span aria-hidden>↓</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 3. TIMELINE ──────────────────────────────────── */}
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

        {/* ── 4. SKILLS ────────────────────────────────────── */}
        <section
          className="py-24 px-6 lg:px-16"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
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

        {/* ── 5. OSOBNÍ SEKCE ──────────────────────────────── */}
        <section
          className="py-24 px-6 lg:px-16"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-24 lg:items-start">
              <FadeIn>
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-8 lg:mb-0"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Mimo školu
                </p>
              </FadeIn>

              <FadeIn delay={0.08}>
                <h2
                  className="font-heading font-medium text-2xl mb-8 tracking-[-0.01em]"
                  style={{ color: "var(--color-text)" }}
                >
                  Mimo školu
                </h2>
                <div className="flex flex-wrap gap-3">
                  {hobbies.map((h) => (
                    <span
                      key={h}
                      className="py-2.5 px-5 text-sm font-heading"
                      style={{
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </motion.div>
  )
}
