"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import type { MainProject } from "@/data/projects"

export default function ProjectWip({ project }: { project: MainProject }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Navbar />

      <main
        className="flex flex-col justify-center px-6 lg:px-16"
        style={{ minHeight: "80vh", paddingTop: "6rem" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <Link
            href="/projekty"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] mb-20 transition-colors duration-200"
            style={{ color: "var(--color-subtle)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-subtle)")}
          >
            ← Projekty
          </Link>

          <p
            className="text-xs uppercase tracking-[0.1em] mb-5 font-heading"
            style={{ color: "var(--color-subtle)" }}
          >
            {project.category} · {project.year}
          </p>

          <h1
            className="font-heading font-bold leading-[1.05] tracking-[-0.03em] mb-10"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              color: "var(--color-text)",
            }}
          >
            {project.title}
          </h1>

          <div
            className="max-w-md"
            style={{
              borderLeft: `3px solid ${project.accentColor}`,
              paddingLeft: "1.25rem",
            }}
          >
            <p
              className="text-base leading-[1.75]"
              style={{ color: "var(--color-muted)" }}
            >
              Tento projekt je aktuálně ve vývoji.
              Obsah bude doplněn po dokončení.
            </p>
          </div>
        </div>
      </main>

      <Footer hideCta />
    </motion.div>
  )
}
