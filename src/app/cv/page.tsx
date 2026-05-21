import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV — Jan Hrnek",
  description: "Životopis Jana Hrnka — Konstrukční inženýrství, VUT FSI Brno",
}

// ── Data ─────────────────────────────────────────────────────

const education = [
  {
    period: "2024 – nyní",
    institution: "VUT Brno, FSI",
    degree: "Konstrukční inženýrství (Bc.)",
    note: "",
  },
  {
    period: "2020 – 2024",
    institution: "SPŠ a VOŠ Sokolská Brno",
    degree: "Průmyslový Design",
    note: "",
  },
]

const experience = [
  {
    year: "2026 – nyní",
    company: "Lemmacon s.r.o.",
    role: "CAD technik",
    description: "3D modelování, technické výkresy, automatizace výkaznictví (SolidWorks, Fusion 360, Excel).",
  },
  {
    year: "2025 – nyní",
    company: "MEDIA MIX s.r.o.",
    role: "CAD technik",
    description: "Technické výkresy, automatizace návrhu (SolidWorks, Fusion 360).",
  },
  {
    year: "2025 – 2026",
    company: "SolidCon s.r.o.",
    role: "CAD technik",
    description: "3D modelování, technická dokumentace (SolidWorks, Excel).",
  },
  {
    year: "2024 – nyní",
    company: "OSVČ",
    role: "IČO: 22246894",
    description: "Technický design a konzultace pro průmyslové zákazníky.",
  },
  {
    year: "2024 – nyní",
    company: "JM Klima s.r.o.",
    role: "CAD technik",
    description: "Technické výkresy pro VZT systémy (AutoCAD).",
  },
  {
    year: "2023",
    company: "Voith Turbo",
    role: "Stážista",
    description: "Návrh výstavní expozice, redesign krytu převodovky (SolidWorks).",
  },
  {
    year: "2022",
    company: "Voith Turbo",
    role: "Stážista",
    description: "Dokumentace výrobního procesu, výkresy součástí (PTC Creo).",
  },
]

const certifications = [
  {
    code: "CSWP",
    name: "Certified SolidWorks Professional — Dassault Systèmes, 2024",
  },
  {
    code: "CSWA",
    name: "Certified SolidWorks Associate — Dassault Systèmes, 2024",
  },
]

const skillGroups = [
  { label: "CAD", items: ["SolidWorks", "SolidWorks Visualize", "PTC Creo", "AutoCAD", "Autodesk Inventor", "Fusion 360"] },
  { label: "Kancelář", items: ["Excel"] },
  { label: "Jazyky", items: ["Čeština (rodný jazyk)", "Angličtina (B2)"] },
]

// ── Components ───────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p
        className="text-xs font-heading font-medium uppercase tracking-[0.12em]"
        style={{ color: "#C8A96E" }}
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
              <span>Narozen 02/2005</span>
              <span>ŘP sk. B</span>
              <a
                href="tel:+420602689340"
                style={{ color: "#6B6B6B" }}
                className="hover:underline"
              >
                +420 602 689 340
              </a>
              <a
                href="mailto:jan.hrnek.05@gmail.com"
                style={{ color: "#6B6B6B" }}
                className="hover:underline"
              >
                jan.hrnek.05@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/jan-hrnek"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6B6B6B" }}
                className="hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </header>

          {/* ── Vzdělání ──────────────────────────────────── */}
          <section className="mb-10">
            <SectionHeading>Vzdělání</SectionHeading>
            <div className="space-y-4">
              {education.map((e) => (
                <div key={e.institution} className="cv-item flex gap-8">
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
                <div key={`${e.year}-${e.company}`} className="cv-item flex gap-8">
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
                <div key={c.code} className="cv-item flex gap-8">
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
                <div key={g.label} className="cv-item flex gap-8">
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
