# Design System

Inspirace: opalcamera.com — Apple-style product page, čistá inženýrská estetika.
Světlý základ s tmavou variantou pro tech/specs sekce.

---

## Color Palette

### Light (default)

| Token             | Hex       | Použití                                      |
|-------------------|-----------|----------------------------------------------|
| `--color-bg`      | `#FAFAFA` | Pozadí stránky (off-white)                   |
| `--color-surface` | `#FFFFFF` | Karty, modaly, elevated surfaces             |
| `--color-text`    | `#0A0A0A` | Primární text (near-black, ne tvrdá černá)   |
| `--color-muted`   | `#6B6B6B` | Secondary text, popisky                      |
| `--color-subtle`  | `#9E9E9E` | Tertiary text, placeholdery                  |
| `--color-border`  | `#E8E8E8` | Dividers, tenké čáry v tabulkách             |
| `--color-accent`  | `#C8A96E` | Jeden jemný accent — teplý amber/gold        |

### Dark (pro specs / tech sekce)

| Token                    | Hex       | Použití                                      |
|--------------------------|-----------|----------------------------------------------|
| `--color-dark-bg`        | `#0A0A0A` | Tmavé pozadí sekce                           |
| `--color-dark-surface`   | `#141414` | Elevated surfaces na tmavém pozadí           |
| `--color-dark-text`      | `#F0F0F0` | Primární text na tmavém pozadí               |
| `--color-dark-muted`     | `#8A8A8A` | Secondary text na tmavém pozadí              |
| `--color-dark-border`    | `#2A2A2A` | Dividers na tmavém pozadí                    |
| `--color-dark-accent`    | `#C8A96E` | Accent zůstává stejný — provazuje světlou a tmavou sekci |

---

## Typography

### Fonty (Google Fonts)

| Role     | Font          | Weights      | Charakter                             |
|----------|---------------|--------------|---------------------------------------|
| Headings | Space Grotesk | 400, 500, 700 | Geometrický, technický, moderní       |
| Body     | Inter         | 400, 500     | Čistý, maximálně čitelný, universální |

### Velikostní škála

| Token       | px   | rem    | Použití                                      |
|-------------|------|--------|----------------------------------------------|
| `text-xs`   | 12px | 0.75   | Fine print, metadata                         |
| `text-sm`   | 14px | 0.875  | Labels, captions, spec tabulky               |
| `text-base` | 16px | 1      | Body text baseline                           |
| `text-md`   | 18px | 1.125  | Lead paragraph, intro text                   |
| `text-lg`   | 20px | 1.25   | Subheadings, card titles                     |
| `text-xl`   | 24px | 1.5    | Section subtitles                            |
| `text-2xl`  | 30px | 1.875  | Section headings small                       |
| `text-3xl`  | 36px | 2.25   | Section headings                             |
| `text-4xl`  | 48px | 3      | Page headings                                |
| `text-5xl`  | 60px | 3.75   | Hero headings (mobile)                       |
| `text-6xl`  | 72px | 4.5    | Hero headings (tablet)                       |
| `text-7xl`  | 96px | 6      | Hero headings (desktop)                      |
| `text-8xl`  | 120px| 7.5    | Velká čísla/statistiky (45g, 47 parts)       |

### Line heights

- Headings: `1.05` — těsné, velký impact
- Body: `1.6` — pohodlné čtení
- Captions/labels: `1.4`

### Letter spacing

- Headings large (60px+): `-0.03em` — optické stažení
- Headings medium (30–60px): `-0.02em`
- Body: `0em`
- Labels / all-caps: `0.08em`

---

## Spacing Scale

| Token  | px   | rem  |
|--------|------|------|
| `1`    | 4px  | 0.25 |
| `2`    | 8px  | 0.5  |
| `3`    | 12px | 0.75 |
| `4`    | 16px | 1    |
| `6`    | 24px | 1.5  |
| `8`    | 32px | 2    |
| `12`   | 48px | 3    |
| `16`   | 64px | 4    |
| `24`   | 96px | 6    |
| `32`   | 128px| 8    |

Používej standardní Tailwind spacing — tokeny výše jsou klíčové hodnoty.
Velkorysý whitespace je základní princip (sekce od sebe ≥ 96px).

---

## Border Radius

| Token        | px      | Použití                                         |
|--------------|---------|-------------------------------------------------|
| `rounded-none` | 0px   | Technické elementy, spec tabulky, ostré rohy    |
| `rounded-sm`  | 2px    | Subtle rounding na malých elementech            |
| `rounded`     | 4px    | Výchozí — karty, inputy                         |
| `rounded-md`  | 6px    | Větší karty, image containers                   |
| `rounded-lg`  | 8px    | Modaly, velké karty                             |
| `rounded-full`| 9999px | Badge, pill labels (např. "Add separately")     |

Preferuj ostřejší rádius — inženýrská estetika, ne zaoblené spotřební produkty.

---

## Animation Tokens (framer-motion)

```ts
// Spring presets
export const spring = {
  gentle: {
    type: "spring",
    stiffness: 80,
    damping: 20,
    mass: 1,
  },
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.5,
  },
} as const

// Fade-in varianta (pro scroll animations na podstránkách)
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
}

// Pravidla:
// - Hlavní stránka: pouze transition na hover/focus, žádné scroll-triggered animace
// - Podstránky projektů: fade-in při scrollu, parallax na velkých obrázcích
// - Nikdy ne agresivní animace (žádné bounce, žádné rotace)
```

---

## Breakpoints

| Name      | px    | Tailwind prefix | Poznámka                    |
|-----------|-------|-----------------|-----------------------------|
| mobile    | < 640 | (default)       | Stack layout, menší typo    |
| sm        | 640px | `sm:`           | Breakpoint pro mobile/tablet |
| tablet    | 1024px| `lg:`           | Přechod na desktop layout   |
| desktop   | 1024+ | `lg:` a výše    | 2-sloupcové layouty, velká typo |
| wide      | 1280px| `xl:`           | Omezení max-width, větší padding |

Max-width kontejneru: `1280px` (centrovaný, padding `24px` mobile / `64px` desktop).

---

## Komponenty — vizuální principy (reference pro implementaci)

### Navigace
- Sticky top, světlé pozadí s `backdrop-blur`
- Logo vlevo, linky vpravo
- Bez barvených akcentů v navbaru

### Hero sekce (projekt detail)
- Text vlevo (max 50% šířky), velký obrázek vpravo
- Nadpis 72–120px, body 16–18px

### Features grid
- 3 sloupce na desktopu, 1 na mobilu
- Tučný nadpis nahoře (bold, ~20px), popis pod ním (~14px), obrázek dole

### Specs tabulka (tmavá sekce)
- Label vlevo (`--color-dark-muted`), hodnota vpravo (`--color-dark-text`)
- Oddělené tenkými čárami (`--color-dark-border`)
- Skupiny nadpisů: "Materials", "Size & Weight" atd. (~36px, bold)

### Velká čísla / statistiky
- Font-size 96–120px, font Space Grotesk, weight 700
- Bez jednotek nebo s malou jednotkou pod ním (16px, muted)
- Vždy zarovnané vpravo jako accent

### Galerie
- Side-by-side velké fotky, žádné mezery nebo malá mezera (4–8px)
- Bez kulatých rohů, přes celou šířku
