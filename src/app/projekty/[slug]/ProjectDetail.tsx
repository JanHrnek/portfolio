"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion"
import Navbar from "@/components/Navbar"
import ScrollProgress from "@/components/ScrollProgress"
import AxisCoreScrollViewer from "@/components/AxisCoreScrollViewer"
import DesignJourneyCards from "@/components/DesignJourneyCards"
import ComponentBreakdown from "@/components/ComponentBreakdown"
import { spring } from "@/lib/animation"
import type { Project } from "@/data/projects"
import IsoCube from "@/components/IsoCube"

// ── Helpers ──────────────────────────────────────────────────

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])
  return isDesktop
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring.gentle, delay }}
    >
      {children}
    </motion.div>
  )
}

function FadeInLeft({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={spring.gentle}
    >
      {children}
    </motion.div>
  )
}

// ── Animated stat — accent number ─────────────────────────────

function AnimatedStat({
  stat,
  accentColor,
  borderColor,
  labelColor,
}: {
  stat: { number: string; label: string }
  accentColor: string
  borderColor: string
  labelColor: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const numVal = parseInt(stat.number, 10) || 0
  const count = useMotionValue(0)
  const displayVal = useTransform(count, (v) => Math.round(v).toString())

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, numVal, { duration: 1.5, ease: "easeOut" })
    return () => controls.stop()
  }, [isInView, numVal, count])

  return (
    <div ref={ref} className="py-8" style={{ borderBottom: `1px solid ${borderColor}` }}>
      <div className="text-right">
        <motion.span
          className="font-heading font-bold block"
          style={{
            fontSize: "clamp(4rem, 10vw, 7.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: accentColor,
          }}
        >
          {displayVal}
        </motion.span>
        <p className="text-sm mt-2 uppercase tracking-[0.08em]" style={{ color: labelColor }}>
          {stat.label}
        </p>
      </div>
    </div>
  )
}

// ── Spec row with hover ───────────────────────────────────────

function SpecRow({
  label,
  value,
  borderColor,
  labelColor,
  valueColor,
  isDark,
}: {
  label: string
  value: string
  borderColor: string
  labelColor: string
  valueColor: string
  isDark: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="flex justify-between py-4 text-sm transition-colors duration-150"
      style={{
        borderBottom: `1px solid ${borderColor}`,
        backgroundColor: hovered
          ? isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"
          : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ color: labelColor }}>{label}</span>
      <span style={{ color: valueColor }}>{value}</span>
    </div>
  )
}

// ── Parallax image ────────────────────────────────────────────

function ParallaxImage({
  caption,
  image,
  isDesktop,
  aspectRatio = "16 / 10",
}: {
  caption: string
  image?: string
  isDesktop: boolean
  aspectRatio?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rawY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"])

  const captionRef = useRef(null)
  const captionInView = useInView(captionRef, { once: true, margin: "-50px" })

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-md"
        style={{ aspectRatio }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: isDesktop ? -80 : 0,
            bottom: isDesktop ? -80 : 0,
            y: isDesktop ? rawY : "0px",
            ...(image
              ? {}
              : {
                  backgroundColor: "var(--color-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }),
          }}
        >
          {image ? (
            <Image
              src={image}
              alt={caption}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <IsoCube />
          )}
        </motion.div>
      </div>
      <motion.p
        ref={captionRef}
        className="text-sm"
        style={{ color: "var(--color-muted)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={captionInView ? { opacity: 1, y: 0 } : {}}
        transition={spring.gentle}
      >
        {caption}
      </motion.p>
    </div>
  )
}

// ── Gallery layouts ───────────────────────────────────────────

function Gallery2Col({
  gallery,
  isDesktop,
}: {
  gallery: Project["gallery"]
  isDesktop: boolean
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {gallery.map((item, i) => (
        <div
          key={i}
          className={
            gallery.length % 2 !== 0 && i === gallery.length - 1
              ? "lg:col-span-2"
              : ""
          }
        >
          <ParallaxImage
            caption={item.caption}
            image={item.image}
            isDesktop={isDesktop}
          />
        </div>
      ))}
    </div>
  )
}

function GalleryHero2Col({
  gallery,
  isDesktop,
}: {
  gallery: Project["gallery"]
  isDesktop: boolean
}) {
  const [first, ...rest] = gallery
  return (
    <div className="space-y-4">
      {first && (
        <ParallaxImage
          caption={first.caption}
          image={first.image}
          isDesktop={isDesktop}
          aspectRatio="21 / 9"
        />
      )}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {rest.map((item, i) => (
            <ParallaxImage
              key={i}
              caption={item.caption}
              image={item.image}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────

export default function ProjectDetail({
  project,
  nextProject,
}: {
  project: Project
  nextProject: Project
}) {
  const isDesktop = useIsDesktop()
  const isDarkHero = project.heroTheme === "dark"
  const accent = project.accentColor

  // Specs section is opposite of hero
  const specsIsDark = !isDarkHero
  const specs = {
    bg: specsIsDark ? "var(--color-dark-bg)" : "var(--color-bg)",
    label: specsIsDark ? "var(--color-dark-muted)" : "var(--color-muted)",
    value: specsIsDark ? "var(--color-dark-text)" : "var(--color-text)",
    border: specsIsDark ? "var(--color-dark-border)" : "var(--color-border)",
    statLabel: specsIsDark ? "var(--color-dark-muted)" : "var(--color-muted)",
  }

  // Hero text colors
  const hero = {
    bg: isDarkHero ? project.heroGradient : "var(--color-bg)",
    text: isDarkHero ? "#F0F0F0" : "var(--color-text)",
    muted: isDarkHero ? "rgba(255,255,255,0.5)" : "var(--color-muted)",
    border: isDarkHero ? "rgba(255,255,255,0.15)" : "var(--color-border)",
    subtle: isDarkHero ? "rgba(255,255,255,0.3)" : "var(--color-subtle)",
  }

  // Hero scroll tracking
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const titleScale = useTransform(heroProgress, [0, 0.8], [1, 0.78])
  const titleOpacity = useTransform(heroProgress, [0, 0.65], [1, 0])
  const metaOpacity = useTransform(heroProgress, [0, 0.4], [1, 0])

  return (
    <>
      <ScrollProgress />
      <Navbar lightLinks={isDarkHero} />

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[150vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden flex flex-col justify-end px-6 lg:px-16"
          style={{
            paddingBottom: "clamp(4rem, 8vh, 8rem)",
            background: hero.bg,
          }}
        >
          {/* Meta row */}
          <motion.div className="max-w-7xl mx-auto w-full mb-6" style={{ opacity: metaOpacity }}>
            <div
              className="flex items-center gap-4 text-xs uppercase tracking-[0.1em]"
              style={{ color: hero.muted }}
            >
              <span>{project.category}</span>
              <span style={{ color: hero.border }}>—</span>
              <span>{project.year}</span>
            </div>
          </motion.div>

          {/* Title */}
          <div className="max-w-7xl mx-auto w-full">
            <motion.h1
              className="font-heading font-bold leading-[1.02] tracking-[-0.03em] mb-6"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                color: hero.text,
                scale: isDesktop ? titleScale : 1,
                opacity: titleOpacity,
                transformOrigin: "left bottom",
                textShadow: isDarkHero
                  ? "0 1px 2px rgba(0,0,0,0.3)"
                  : "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="text-xl max-w-xl leading-[1.5]"
              style={{ color: hero.muted, opacity: metaOpacity }}
            >
              {project.subtitle}
            </motion.p>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="max-w-7xl mx-auto w-full mt-10 flex items-center gap-3"
            style={{ color: hero.subtle, opacity: metaOpacity }}
          >
            <div className="w-px h-8" style={{ backgroundColor: hero.border }} />
            <span className="text-xs uppercase tracking-[0.1em]">Scrollovat dolů</span>
          </motion.div>
        </div>
      </div>

      {/* ── 2. DATASHEET ─────────────────────────────────── */}
      <section className="px-6 lg:px-16 pt-16 pb-0">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div style={{ border: "1px solid var(--color-border)" }}>
              {project.datasheet.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr]"
                  style={{
                    borderBottom:
                      i < project.datasheet.length - 1
                        ? "1px solid var(--color-border)"
                        : undefined,
                  }}
                >
                  <div
                    className="px-4 py-3.5 text-xs uppercase tracking-[0.1em] font-heading"
                    style={{
                      color: "var(--color-subtle)",
                      borderRight: "1px solid var(--color-border)",
                    }}
                  >
                    {row.label}
                  </div>
                  <div
                    className="px-4 py-3.5 text-sm"
                    style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
                  >
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. CASE STUDY ────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-20">
          {(
            [
              { label: "Výzva",    paras: project.caseStudy.challenge },
              { label: "Řešení",   paras: project.caseStudy.solution },
              { label: "Výsledek", paras: project.caseStudy.result },
              ...(project.caseStudy.v2
                ? [{ label: "V2 — Plánováno", paras: project.caseStudy.v2 }]
                : []),
            ]
          ).map((phase, pi) => (
            <div key={pi} className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-24">
              <FadeIn>
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-8 lg:mb-0 font-heading font-medium"
                  style={{ color: accent }}
                >
                  {phase.label}
                </p>
              </FadeIn>
              <div className="space-y-6">
                {phase.paras.map((para, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <p className="text-lg leading-[1.75]" style={{ color: "var(--color-muted)" }}>
                      {para}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. GALLERY ───────────────────────────────────── */}
      <section className="py-8 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p
              className="text-xs uppercase tracking-[0.1em] mb-8 font-heading font-medium"
              style={{ color: accent }}
            >
              Galerie
            </p>
          </FadeIn>
          {project.galleryLayout === "2col" ? (
            <Gallery2Col gallery={project.gallery} isDesktop={isDesktop} />
          ) : (
            <GalleryHero2Col gallery={project.gallery} isDesktop={isDesktop} />
          )}
        </div>
      </section>

      {/* ── 3.5 INTERACTIVE MODEL (AxisCore only) ────────── */}
      {project.slug === "axiscore" && (
        <AxisCoreScrollViewer accent={accent} />
      )}

      {/* ── 4. SPECS ─────────────────────────────────────── */}
      {/* Gradient přechod ze světlé sekce do tmavé */}
      {specsIsDark && (
        <div
          aria-hidden
          style={{
            height: 200,
            background: `linear-gradient(to bottom, var(--color-bg), var(--color-dark-bg))`,
            marginTop: 64,
            pointerEvents: "none",
          }}
        />
      )}
      <section
        className="py-24 px-6 lg:px-16"
        style={{ backgroundColor: specs.bg, marginTop: specsIsDark ? 0 : 64 }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-24">
              {/* Specs table */}
              <div>
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-8 font-heading font-medium"
                  style={{ color: accent }}
                >
                  Specifikace
                </p>
                <div>
                  {project.specs.map((spec, i) => (
                    <SpecRow
                      key={i}
                      label={spec.label}
                      value={spec.value}
                      borderColor={specs.border}
                      labelColor={specs.label}
                      valueColor={specs.value}
                      isDark={specsIsDark}
                    />
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-16 lg:mt-0">
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-2 font-heading font-medium"
                  style={{ color: accent }}
                >
                  Čísla
                </p>
                {project.stats.map((stat, i) => (
                  <AnimatedStat
                    key={i}
                    stat={stat}
                    accentColor={accent}
                    borderColor={specs.border}
                    labelColor={specs.statLabel}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 5. CHALLENGES ────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-24">
            {/* Sticky left label */}
            <div className="mb-12 lg:mb-0">
              <div className="lg:sticky lg:top-28">
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-4 font-heading font-medium"
                  style={{ color: accent }}
                >
                  Výzvy & poučení
                </p>
                <div className="w-8 h-px" style={{ backgroundColor: accent }} />
              </div>
            </div>

            {/* Challenges */}
            <div className="space-y-6">
              {project.challenges.map((c, i) => (
                <FadeInLeft key={i}>
                  <div
                    className="transition-colors duration-200"
                    style={{
                      borderLeft: `3px solid ${accent}`,
                      padding: "24px",
                      backgroundColor: "rgba(0,0,0,0.015)",
                    }}
                  >
                    <h3
                      className="font-heading font-medium text-xl mb-3"
                      style={{ color: "var(--color-text)" }}
                    >
                      {c.title}
                    </h3>
                    <p
                      className="text-base leading-[1.75]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {c.description}
                    </p>
                  </div>
                </FadeInLeft>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. DESIGN JOURNEY ────────────────────────────── */}
      {project.designJourney && project.designJourney.length > 0 && (
        <DesignJourneyCards cards={project.designJourney} accent={accent} />
      )}

      {/* ── 7. COMPONENT BREAKDOWN ───────────────────────── */}
      {project.componentBreakdown && project.componentBreakdown.length > 0 && (
        <ComponentBreakdown components={project.componentBreakdown} accent={accent} />
      )}

      {/* ── 8. NEXT PROJECT ──────────────────────────────── */}
      <section
        className="py-16 px-6 lg:px-16"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.1em] mb-8 font-heading font-medium"
            style={{ color: "var(--color-subtle)" }}
          >
            Další projekt
          </p>
          <Link href={`/projekty/${nextProject.slug}`} className="block group">
            <motion.div
              className="flex items-end justify-between gap-8"
              whileHover={{ x: 12 }}
              transition={spring.snappy}
            >
              <div>
                <h2
                  className="font-heading font-bold tracking-[-0.02em] transition-colors duration-200"
                  style={{
                    fontSize: "clamp(2.5rem, 7vw, 5rem)",
                    color: "var(--color-text)",
                    lineHeight: 1.05,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                >
                  {nextProject.title}
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--color-subtle)" }}>
                  {nextProject.subtitle}
                </p>
              </div>
              <span
                className="text-4xl shrink-0 transition-colors duration-200"
                style={{ color: "var(--color-muted)" }}
              >
                →
              </span>
            </motion.div>
          </Link>
        </div>
      </section>
    </>
  )
}
