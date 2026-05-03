"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { MiniProject } from "@/data/projects"

interface Props {
  project: MiniProject | null
  onClose: () => void
}

export default function MiniProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [project, onClose])

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              className="relative w-full pointer-events-auto overflow-y-auto"
              style={{
                maxWidth: 580,
                maxHeight: "90vh",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
              }}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.6 }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 flex items-center justify-center"
                style={{
                  color: "var(--color-subtle)",
                  width: 30,
                  height: 30,
                  transition: "color 0.15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-subtle)")}
                aria-label="Zavřít"
              >
                <X size={17} strokeWidth={1.5} />
              </button>

              {/* Header */}
              <div
                className="px-7 pt-8 pb-6"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-3 font-heading"
                  style={{ color: "var(--color-subtle)" }}
                >
                  {project.category}
                </p>
                <h2
                  className="font-heading font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                    paddingRight: "2rem",
                  }}
                >
                  {project.title}
                </h2>
              </div>

              {/* Body */}
              <div className="px-7 py-6">
                {/* Details text */}
                {project.details && project.details.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {project.details.map((para, i) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <div
                    className={`grid gap-2 mb-6 ${
                      project.gallery.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    }`}
                  >
                    {project.gallery.map((item, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden"
                        style={{ aspectRatio: "3/2", borderRadius: "2px" }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{ background: item.gradient }}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 px-3 py-2"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.52), transparent)",
                          }}
                        >
                          <p
                            style={{
                              color: "rgba(255,255,255,0.75)",
                              fontSize: "0.62rem",
                              letterSpacing: "0.05em",
                              fontFamily: "var(--font-heading)",
                              lineHeight: 1.3,
                            }}
                          >
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-heading px-2.5 py-1"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-muted)",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
