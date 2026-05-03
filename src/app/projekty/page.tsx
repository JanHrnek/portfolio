"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import ProjectCard from "@/components/ProjectCard"
import MiniProjectModal from "@/components/MiniProjectModal"
import { mainProjects, miniProjects } from "@/data/projects"
import type { MiniProject } from "@/data/projects"
import { spring } from "@/lib/animation"

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: spring.gentle },
}

const miniContainerVariants = {
  animate: { transition: { staggerChildren: 0.06 } },
}

const miniCardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: spring.gentle },
}

export default function ProjektyPage() {
  const [selectedMini, setSelectedMini] = useState<MiniProject | null>(null)
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <ScrollProgress />
      <Navbar />

      <main className="pt-32 pb-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="mb-16">
            <p
              className="text-xs uppercase tracking-[0.1em] mb-6"
              style={{ color: "var(--color-subtle)" }}
            >
              Práce
            </p>
            <h1
              className="font-heading font-bold leading-[1.05] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
                color: "var(--color-text)",
              }}
            >
              Projekty
            </h1>
          </div>

          {/* ── Main projekty ──────────────────────────────── */}
          <section className="mb-24">
            <p
              className="text-xs uppercase tracking-[0.1em] mb-8"
              style={{ color: "var(--color-subtle)" }}
            >
              Hlavní projekty
            </p>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {mainProjects.map((p) => (
                <motion.div key={p.slug} variants={cardVariants}>
                  <ProjectCard
                    title={p.title}
                    description={p.subtitle}
                    gradientStyle={p.heroGradient}
                    href={`/projekty/${p.slug}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── Mini projekty ──────────────────────────────── */}
          <section style={{ borderTop: "1px solid var(--color-border)", paddingTop: "4rem" }}>
            <p
              className="text-xs uppercase tracking-[0.1em] mb-8"
              style={{ color: "var(--color-subtle)" }}
            >
              Mini projekty
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              variants={miniContainerVariants}
              initial="initial"
              animate="animate"
            >
              {miniProjects.map((p) => (
                <motion.div
                  key={p.slug}
                  variants={miniCardVariants}
                  className="py-5 px-6 cursor-pointer"
                  style={{
                    border: `1px solid ${hoveredSlug === p.slug ? "var(--color-accent)" : "var(--color-border)"}`,
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={() => setHoveredSlug(p.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onClick={() => setSelectedMini(p)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18 }}
                >
                  <p
                    className="text-xs uppercase tracking-[0.08em] mb-2 font-heading"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    {p.category}
                  </p>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3
                      className="font-heading font-medium text-base"
                      style={{ color: "var(--color-text)" }}
                    >
                      {p.title}
                    </h3>
                    <motion.span
                      animate={{
                        opacity: hoveredSlug === p.slug ? 1 : 0,
                        x: hoveredSlug === p.slug ? 0 : -4,
                      }}
                      transition={{ duration: 0.15 }}
                      style={{
                        color: "var(--color-accent)",
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-heading)",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      →
                    </motion.span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {p.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

        </div>
      </main>

      <Footer />

      <MiniProjectModal project={selectedMini} onClose={() => setSelectedMini(null)} />
    </motion.div>
  )
}
