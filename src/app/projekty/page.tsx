"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/data/projects"
import { spring } from "@/lib/animation"

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
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
          {/* Header */}
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

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {projects.map((p) => (
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
        </div>
      </main>

      <Footer />
    </motion.div>
  )
}
