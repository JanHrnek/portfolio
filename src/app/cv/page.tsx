import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV — Jan Hrnek",
  description: "Životopis Jana Hrnka — Konstrukční inženýrství, VUT FSI Brno",
}

// ── Data ─────────────────────────────────────────────────────

const education = [
  {
    period: "2020 – nyní",
    institution: "VUT FSI Brno",
    degree: "Konstrukční inženýrství (Bc.)",
    note: "",
  },
  {
    period: "2026",
    institution: "SDU Odense, Dánsko",
    degree: "Erasmus+",
    note: "Plánovaný zimní semestr",
  },
]

const experience = [
  {
    year: "2026",
    company: "Lemmacon s.r.o.",
    role: "Externí konzultant",
    description: "Automatizace výkaznictví, SolidWorks integrace, Excel/VBA systémy.",
  },
  {
    year: "2025",
    company: "MediaMix",
    role: "CAD technik",
    description: "Návrh formy pro polyuretanové výrobky, automatizovaný aplikátor separátoru.",
  },
  {
    year: "2024",
    company: "Solidcon",
    role: "Technický pracovník",
    description: "Technická dokumentace, KLT inserty, paletový design.",
  },
  {
    year: "2023",
    company: "Voith Turbo",
    role: "Manufacturing Process Engineer",
    description: "Stáž — optimalizace výrobních procesů, technická dokumentace.",
  },
]

const certifications = [
  {
    code: "CSWP",
    name: "Certified SolidWorks Professional",
  },
  {
    code: "CSWA",
    name: "Certified SolidWorks Associate",
  },
]

const skillGroups = [
  { label: "CAD", items: ["SolidWorks", "Fusion 360", "Blender"] },
  { label: "Programování", items: ["VBA / Excel", "Python", "Arduino / ESP32", "C++"] },
  { label: "Výroba", items: ["3D tisk (FDM)", "Základy CNC"] },
  { label: "Nástroje", items: ["Git", "LaTeX"] },
]

// ── Components ───────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p
        className="text-xs font-heading font-medium uppercase tracking-[0.12em]"
        style={{ color: "#9E9E9E" }}
      >
        {children}
      </p>
      <div className="mt-2 h-px" style={{ backgroundColor: "#E8E8E8" }} />
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────

export default function CVPage() {
  return (
    <>
      {/*
        Print styles injected inline — hides back-link and sets clean
        margins for browser print dialog.
      */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          @page { margin: 20mm 18mm; }
          body { background: white; }
        }
      `}</style>

      {/* Back link — hidden on print */}
      <div
        className="no-print px-8 py-4 border-b"
        style={{ borderColor: "#E8E8E8" }}
      >
        <Link
          href="/about"
          className="text-sm font-heading transition-colors duration-200"
          style={{ color: "#6B6B6B" }}
          onMouseEnter={undefined}
        >
          ← Zpět na O mně
        </Link>
      </div>

      {/* CV document */}
      <div
        className="min-h-screen px-8 py-12 lg:px-0"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-[740px] mx-auto">

          {/* ── Hlavička ──────────────────────────────────── */}
          <header className="mb-12">
            <h1
              className="font-heading font-bold tracking-[-0.02em] mb-1"
              style={{ fontSize: "2.25rem", color: "#0A0A0A", lineHeight: 1.1 }}
            >
              Jan Hrnek
            </h1>
            <p
              className="font-heading font-medium mb-6"
              style={{ fontSize: "1.125rem", color: "#6B6B6B" }}
            >
              Design Engineer
            </p>

            <div
              className="flex flex-wrap gap-x-6 gap-y-1 text-sm"
              style={{ color: "#6B6B6B" }}
            >
              <span>Brno, CZ</span>
              <a
                href="mailto:jan@hrnek.dev"
                style={{ color: "#6B6B6B" }}
                className="hover:underline"
              >
                jan@hrnek.dev
              </a>
              <a
                href="https://linkedin.com/in/janhrnek"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6B6B6B" }}
                className="hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/janhrnek"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6B6B6B" }}
                className="hover:underline"
              >
                GitHub
              </a>
            </div>
          </header>

          {/* ── Vzdělání ──────────────────────────────────── */}
          <section className="mb-10">
            <SectionHeading>Vzdělání</SectionHeading>
            <div className="space-y-4">
              {education.map((e) => (
                <div key={e.institution} className="flex gap-8">
                  <span
                    className="shrink-0 text-sm tabular-nums font-heading w-24"
                    style={{ color: "#9E9E9E" }}
                  >
                    {e.period}
                  </span>
                  <div>
                    <p
                      className="font-heading font-medium text-sm"
                      style={{ color: "#0A0A0A" }}
                    >
                      {e.institution}
                    </p>
                    <p className="text-sm" style={{ color: "#6B6B6B" }}>
                      {e.degree}
                      {e.note && (
                        <span style={{ color: "#9E9E9E" }}> — {e.note}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Praxe ─────────────────────────────────────── */}
          <section className="mb-10">
            <SectionHeading>Praxe</SectionHeading>
            <div className="space-y-6">
              {experience.map((e) => (
                <div key={`${e.year}-${e.company}`} className="flex gap-8">
                  <span
                    className="shrink-0 text-sm tabular-nums font-heading w-24"
                    style={{ color: "#9E9E9E" }}
                  >
                    {e.year}
                  </span>
                  <div>
                    <p
                      className="font-heading font-medium text-sm"
                      style={{ color: "#0A0A0A" }}
                    >
                      {e.company}
                      <span
                        className="font-normal ml-2"
                        style={{ color: "#6B6B6B" }}
                      >
                        {e.role}
                      </span>
                    </p>
                    <p
                      className="text-sm mt-0.5 leading-relaxed"
                      style={{ color: "#6B6B6B" }}
                    >
                      {e.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Certifikace ───────────────────────────────── */}
          <section className="mb-10">
            <SectionHeading>Certifikace</SectionHeading>
            <div className="space-y-2">
              {certifications.map((c) => (
                <div key={c.code} className="flex gap-8">
                  <span
                    className="shrink-0 text-sm font-heading font-medium w-24"
                    style={{ color: "#0A0A0A" }}
                  >
                    {c.code}
                  </span>
                  <p className="text-sm" style={{ color: "#6B6B6B" }}>
                    {c.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Dovednosti ────────────────────────────────── */}
          <section className="mb-12">
            <SectionHeading>Dovednosti</SectionHeading>
            <div className="space-y-3">
              {skillGroups.map((g) => (
                <div key={g.label} className="flex gap-8">
                  <span
                    className="shrink-0 text-sm font-heading font-medium w-24"
                    style={{ color: "#0A0A0A" }}
                  >
                    {g.label}
                  </span>
                  <p className="text-sm" style={{ color: "#6B6B6B" }}>
                    {g.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Footer ────────────────────────────────────── */}
          <div
            className="no-print pt-8 border-t"
            style={{ borderColor: "#E8E8E8" }}
          >
            <Link
              href="/about"
              className="text-sm font-heading transition-colors duration-200"
              style={{ color: "#6B6B6B" }}
            >
              ← Zpět na O mně
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
