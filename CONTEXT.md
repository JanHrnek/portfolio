# Project Context

Portfolio web pro studenta konstrukčního inženýrství (VUT FSI Brno).
Estetika: Apple-style product page, čistá inženýrská atmosféra.

---

## Jak spustit

```bash
# Dev server (Turbopack)
npm run dev       # → http://localhost:3000

# Build + produkce
npm run build
npm run start
```

---

## Technologie

| Balíček          | Verze  | Účel                                     |
|------------------|--------|------------------------------------------|
| Next.js          | 15.x   | Framework — App Router, TypeScript       |
| React            | 19.x   | UI                                       |
| Tailwind CSS     | v4     | Styling — CSS-based config (žádný tailwind.config.ts) |
| framer-motion    | 12.x   | Animace — spring presety v DESIGN.md     |
| lenis            | 1.x    | Smooth scroll (jen na podstránkách!)     |
| lucide-react     | latest | Ikony                                    |
| clsx             | 2.x    | Podmíněné className                      |
| tailwind-merge   | 3.x    | Merge Tailwind tříd bez konfliktů        |

---

## Struktura projektu

```
Portfolio/
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout — metadata, html/body shell
│       ├── page.tsx         # Hlavní stránka (/)
│       └── globals.css      # Design tokeny + Google Fonts (@theme)
├── public/                  # Statické soubory (obrázky, SVG)
├── inspiration/             # Referenční screenshoty a POZNAMKY.md
├── DESIGN.md                # Design systém — barvy, typo, spacing, animace
├── CONTEXT.md               # Tento soubor
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Tailwind v4 — jak funguje konfigurace

Tailwind v4 nemá `tailwind.config.ts`. Tokeny jsou v CSS:

```css
/* src/app/globals.css */
@theme {
  --color-accent: #c8a96e;   /* → třída: text-accent, bg-accent, border-accent */
  --font-heading: "Space Grotesk", sans-serif; /* → třída: font-heading */
  --text-8xl: 7.5rem;        /* → třída: text-8xl */
}
```

Utility třídy se generují automaticky z `@theme` proměnných.

---

## Import alias

```ts
import { cn } from "@/lib/utils"   // → src/lib/utils.ts
import Button from "@/components/Button"
```

---

## Design principy (shrnutí z DESIGN.md)

- **Světlý základ** `#FAFAFA` + černý text `#0A0A0A`
- **Tmavá sekce** `#0A0A0A` jen pro specs/tech — jako kontrast
- **Accent** `#C8A96E` — teplý amber/gold, střídmě
- **Fonty**: Space Grotesk (nadpisy) + Inter (body text)
- **Scroll efekty** pouze na podstránkách projektů, ne na hlavní stránce
- **Whitespace** — sekce od sebe ≥ 96px, nic natlačeného
- **Lenis** — inicializovat pouze na podstránkách, ne globálně v layout.tsx

---

## Utility helper (vytvořit před prvními komponentami)

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Animation presets (framer-motion)

```ts
// src/lib/animation.ts
export const spring = {
  gentle: { type: "spring", stiffness: 80, damping: 20, mass: 1 },
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 0.5 },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring.gentle },
}
```
