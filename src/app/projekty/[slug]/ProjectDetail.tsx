"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion"
import Navbar from "@/components/Navbar"
import { spring } from "@/lib/animation"
import type { Project } from "@/data/projects"

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

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
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

function AnimatedStat({ stat }: { stat: { number: string; label: string } }) {
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
    <div
      ref={ref}
      className="py-8"
      style={{ borderBottom: "1px solid var(--color-dark-border)" }}
    >
      <div className="text-right">
        <motion.span
          className="font-heading font-bold block"
          style={{
            fontSize: "clamp(4rem, 10vw, 7.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "var(--color-dark-text)",
          }}
        >
          {displayVal}
        </motion.span>
        <p
          className="text-sm mt-2 uppercase tracking-[0.08em]"
          style={{ color: "var(--color-dark-muted)" }}
        >
          {stat.label}
        </p>
      </div>
    </div>
  )
}

function ParallaxImage({
  gradient,
  caption,
  isDesktop,
}: {
  gradient: string
  caption: string
  isDesktop: boolean
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"])

  const captionRef = useRef(null)
  const captionInView = useInView(captionRef, { once: true, margin: "-50px" })

  return (
    <div className="space-y-5">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-md"
        style={{ aspectRatio: "16 / 10" }}
      >
        <motion.div
          style={{
            background: gradient,
            position: "absolute",
            left: 0,
            right: 0,
            top: isDesktop ? -80 : 0,
            bottom: isDesktop ? -80 : 0,
            y: isDesktop ? rawY : "0px",
          }}
        />
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

// ── Main Component ────────────────────────────────────────────

export default function ProjectDetail({
  project,
  nextProject,
}: {
  project: Project
  nextProject: Project
}) {
  const isDesktop = useIsDesktop()

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
      <Navbar />

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[150vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden flex flex-col justify-end px-6 lg:px-16"
          style={{ paddingBottom: "clamp(4rem, 8vh, 8rem)" }}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 -z-10"
            style={{ background: project.heroGradient, opacity: 0.08 }}
          />

          {/* Meta row */}
          <motion.div
            className="max-w-7xl mx-auto w-full mb-6"
            style={{ opacity: metaOpacity }}
          >
            <div
              className="flex items-center gap-4 text-xs uppercase tracking-[0.1em]"
              style={{ color: "var(--color-muted)" }}
            >
              <span>{project.category}</span>
              <span style={{ color: "var(--color-border)" }}>—</span>
              <span>{project.year}</span>
            </div>
          </motion.div>

          {/* Title */}
          <div className="max-w-7xl mx-auto w-full">
            <motion.h1
              className="font-heading font-bold leading-[1.02] tracking-[-0.03em] mb-6"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                color: "var(--color-text)",
                scale: isDesktop ? titleScale : 1,
                opacity: titleOpacity,
                transformOrigin: "left bottom",
              }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="text-xl max-w-xl leading-[1.5]"
              style={{ color: "var(--color-muted)", opacity: metaOpacity }}
            >
              {project.subtitle}
            </motion.p>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="max-w-7xl mx-auto w-full mt-10 flex items-center gap-3"
            style={{ color: "var(--color-subtle)", opacity: metaOpacity }}
          >
            <div
              className="w-px h-8"
              style={{ backgroundColor: "var(--color-border)" }}
            />
            <span className="text-xs uppercase tracking-[0.1em]">Scrollovat dolů</span>
          </motion.div>
        </div>
      </div>

      {/* ── 2. OVERVIEW ──────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-24">
            <FadeIn>
              <p
                className="text-xs uppercase tracking-[0.1em] mb-8 lg:mb-0"
                style={{ color: "var(--color-subtle)" }}
              >
                Přehled
              </p>
            </FadeIn>
            <div className="space-y-8">
              {project.overview.map((para, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <p
                    className="text-lg leading-[1.75]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {para}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. GALLERY ───────────────────────────────────── */}
      <section className="py-8 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-8">
          {project.gallery.map((item, i) => (
            <ParallaxImage
              key={i}
              gradient={item.gradient}
              caption={item.caption}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </section>

      {/* ── 4. SPECS (dark) ───────────────────────────────── */}
      <section
        className="py-24 px-6 lg:px-16 mt-16"
        style={{ backgroundColor: "var(--color-dark-bg)" }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-24">
              {/* Specs table */}
              <div>
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-8"
                  style={{ color: "var(--color-dark-muted)" }}
                >
                  Specifikace
                </p>
                <div>
                  {project.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-4 text-sm"
                      style={{ borderBottom: "1px solid var(--color-dark-border)" }}
                    >
                      <span style={{ color: "var(--color-dark-muted)" }}>
                        {spec.label}
                      </span>
                      <span style={{ color: "var(--color-dark-text)" }}>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-16 lg:mt-0">
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-2"
                  style={{ color: "var(--color-dark-muted)" }}
                >
                  Čísla
                </p>
                {project.stats.map((stat, i) => (
                  <AnimatedStat key={i} stat={stat} />
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
                  className="text-xs uppercase tracking-[0.1em] mb-4"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Výzvy & poučení
                </p>
                <div
                  className="w-8 h-px"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </div>
            </div>

            {/* Challenges */}
            <div className="space-y-16 lg:space-y-24">
              {project.challenges.map((c, i) => (
                <FadeInLeft key={i}>
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
                </FadeInLeft>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. NEXT PROJECT ──────────────────────────────── */}
      <section
        className="py-16 px-6 lg:px-16"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.1em] mb-8"
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
                  className="font-heading font-bold tracking-[-0.02em]"
                  style={{
                    fontSize: "clamp(2.5rem, 7vw, 5rem)",
                    color: "var(--color-text)",
                    lineHeight: 1.05,
                  }}
                >
                  {nextProject.title}
                </h2>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--color-subtle)" }}
                >
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
