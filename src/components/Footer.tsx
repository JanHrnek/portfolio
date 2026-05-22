"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { spring } from "@/lib/animation"

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.1, rotate: 10, color: "var(--color-accent)" }}
      transition={spring.snappy}
      style={{ color: "var(--color-muted)", display: "inline-flex" }}
    >
      {children}
    </motion.a>
  )
}

export default function Footer({ hideCta = false }: { hideCta?: boolean }) {
  return (
    <footer
      id="kontakt"
      className="relative px-6 lg:px-16 pt-16 pb-10"
    >

      <div className="max-w-7xl mx-auto">
        {/* CTA */}
        {!hideCta && (
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.1em] mb-4 font-heading"
              style={{ color: "var(--color-subtle)" }}
            >
              Spolupráce
            </p>
            <p
              className="font-heading font-bold mb-4"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--color-text)", lineHeight: 1.15 }}
            >
              Máte projekt?
              <br />
              Pojďme si promluvit.
            </p>
            <a
              href="mailto:jan.hrnek.05@gmail.com"
              className="inline-block font-heading font-medium transition-colors duration-200"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                color: "var(--color-accent)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            >
              jan.hrnek.05@gmail.com →
            </a>
          </div>
        )}

        {/* Bottom row */}
        <div
          className="flex items-center justify-between pt-8"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            © 2026 Jan Hrnek
          </p>
          <div className="flex items-center gap-5">
            <SocialLink href="https://github.com/JanHrnek" label="GitHub">
              <IconGitHub />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/jan-hrnek" label="LinkedIn">
              <IconLinkedIn />
            </SocialLink>
            <SocialLink href="mailto:jan.hrnek.05@gmail.com" label="Email">
              <Mail size={18} strokeWidth={1.5} />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
