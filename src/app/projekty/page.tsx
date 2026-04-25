"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProjectCard from "@/components/ProjectCard"
import { mainProjects, miniProjects } from "@/data/projects"
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
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
                  className="py-5 px-6"
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-[0.08em] mb-2 font-heading"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    {p.category}
                  </p>
                  <h3
                    className="font-heading font-medium text-base mb-1.5"
                    style={{ color: "var(--color-text)" }}
                  >
                    {p.title}
                  </h3>
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
    </motion.div>
  )
}
