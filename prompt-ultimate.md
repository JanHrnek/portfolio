Precti DESIGN.md, CONTEXT.md a VSECHNY soucasne stranky a komponenty.
Projdi kazdy soubor v src/app/ a src/components/.
Podivej se na obrazky v inspiration/ pro referenci.

ULTIMATNI DESIGN POLISH. Kostra a struktura zustavaji PRESNE jak jsou.
Nic nepridavej, nic neodstranuej. Jen vyladi KAZDY vizualni detail
na profesionalni uroven.

===========================================================
TYPOGRAFIE
===========================================================
Zkontroluj ze vsude se pouziva font-heading pro nadpisy a font-body
pro body text. Zadny default sans-serif.

Vsechny hlavni nadpisy (h1) maji letter-spacing: -0.03em (tightening).
Vsechny h2 maji letter-spacing: -0.02em.
Body text ma line-height: 1.7 pro dobrou citelnost.

Nadpisy na strankach projektu a about at maji jemny text-shadow
pro hloubku (0 1px 2px rgba(0,0,0,0.05) na svetlem pozadi,
0 1px 2px rgba(0,0,0,0.3) na tmavem).

Popisky a meta texty (rok, kategorie, labels) at jsou uppercase,
letter-spacing: 0.1em, font-size mensi, barva muted.

===========================================================
SPACING A LAYOUT
===========================================================
Sekce od sebe maji HODNE prostoru: min padding-y 120px na desktopu,
80px na mobilu. Sekce nesmi vypadat natlacene.

Max-width obsahu: 1200px, centrovany. Na projektech galerie muze
byt sirsi (az 1400px).

Mezi nadpisem sekce a obsahem: min 48px mezera.

===========================================================
NAVBAR
===========================================================
Logo "JH" at ma jemnou hover animaci (scale 1.05, spring).
Odkazy maji animated underline (cara se vysune zespodu pri hoveru,
vyska 2px, barva accent, transition 0.3s ease).
Na scrollu: backdrop-blur(12px), background rgba(250,250,250,0.8),
border-bottom 1px solid var(--color-border).
Na tmavych strankach (AxisCore, MediaMix hero) at navbar automaticky
prepne na bile texty.
Hamburger menu na mobilu: tri carky ktere se pri otevreni animuji
na krizek (X). Menu se vysune shora s fade efektem.

===========================================================
TLACITKA
===========================================================
Hlavni CTA tlacitko ("Prohlednout projekty"):
Pozadi: var(--color-text) (cerne na svetlem).
Text: bily.
Padding: 16px 32px.
Border-radius: 9999px (pill shape).
Hover: pozadi se zmeni na accent barvu, scale 1.03, spring.
Active (klik): scale 0.97.
Magnetic efekt zachovej.

Sekundarni tlacitka (napr. "Zobrazit CV"):
Border: 1px solid var(--color-border).
Pozadi: transparent.
Hover: pozadi se vyplni jemne (var(--color-surface)), border
zmeni barvu na accent.

===========================================================
KARTY PROJEKTU (hlavni stranka + /projekty)
===========================================================
Karty maji border: 1px solid var(--color-border).
Border-radius: 12px.
Overflow hidden na gradient/obrazek.
Hover:
  border-color se zmeni na accent barvu projektu (ne globalni, kazdy
  projekt ma svou barvu).
  Karta se posune nahoru o 8px (translateY: -8px).
  Obrazek uvnitr se priblizi (scale 1.05).
  Objevi se jemny box-shadow (0 20px 40px rgba(0,0,0,0.1)).
  Transition: spring, ne linearni.
Cislo projektu ("01") v rohu: font-size 80px, opacity 0.06,
font-heading, position absolute top-right.

===========================================================
SCROLL EFEKTY NA PROJEKTECH A ABOUT
===========================================================
Fade-in pri scrollu: elementy zacni s opacity 0, translateY 40px.
Pri vstupu do viewportu: opacity 1, translateY 0.
Pouzij useInView s margin "-80px" a once: true.
Stagger delay pro seznamy: 0.1s mezi polozkami.

Parallax na galerii obrazku: useScroll + useTransform, translateY
range ["-5%", "5%"]. Jemny, ne agresivni.

Cisla ve stats sekci (850, 3, 6, 47): animovany counter od 0 do
cile. Pouzij useInView + useMotionValue + useTransform + animate.
Trvani: 2 sekundy. Easing: easeOut.

Text reveal v overview: kazdy odstavec fade-in samostatne pri
scrollu, ne vsechny najednou. Stagger 0.2s.

===========================================================
SPECS SEKCE (tmava)
===========================================================
Pozadi: var(--color-dark-bg).
Prechod ze svetle do tmave: pouzij gradient (linear-gradient,
200px vyska, z transparent do dark-bg) NAD specs sekci aby
prechod nebyl ostry.

Tabulka specs: radky maji hover efekt (pozadi se jemne zesveti,
rgba(255,255,255,0.03)). Cara mezi radky: var(--color-dark-border).

Velka cisla stats: font-heading, font-weight 700, barva accent
projektu. Pod cislem label uppercase, letter-spacing 0.1em,
barva dark-muted.

===========================================================
CHALLENGES SEKCE
===========================================================
Kazda challenge jako karta s levym borderem v accent barve (3px).
Padding: 24px. Pozadi: jemne svetlejsi nez page bg.
Hover: levy border se prodlouzi (height 100% animace).

===========================================================
TIMELINE NA ABOUT
===========================================================
Vertikalni cara: 1px, barva border. Bodky na care: 12px,
vyplnene accent barvou pro dokoncene, prazdne (border only)
pro nadchazejici.
Hover na bodu: bodka se zvetsí (scale 1.3, spring).
Cara se postupne "kresli" pri scrollu (height animace shora
dolu jak uzivatel scrolluje).

===========================================================
SKILLS NA ABOUT
===========================================================
Kazda skill karta: border 1px solid border, border-radius 8px,
padding 12px 16px.
Hover: pozadi se zmeni na jemne sede, border-color na accent.
Fade-in pri scrollu se stagger efektem (kazda karta zvlast).

===========================================================
CV STRANKA
===========================================================
Cista typografie, dobra hierarchie. Nadpisy sekci (Vzdelani,
Praxe, Certifikace) uppercase, letter-spacing 0.1em,
barva accent, font-size male.
Polozky maji jemny left-border pri hoveru.
Stranka pripravena na tisk (@media print: skryj navbar a footer,
bile pozadi, cerne texty).

===========================================================
KONTAKT STRANKA
===========================================================
Email odkaz: velky (text-3xl), font-heading.
Hover: barva se zmeni na accent, underline se animuje zespodu.
Ikony socialnich siti: vetsi (24px), hover scale 1.1 + barva accent.
Cela stranka vertikalne vycentrovana (min-height 80vh, flex center).

===========================================================
FOOTER (vsechny stranky)
===========================================================
Pridej nad footer jemny gradient prechod (z transparent do
bg barvy sekce nad nim, 100px vyska) aby nebyl ostry rez.
Ikony: hover rotace 10 stupnu + scale 1.1.
Text "Mate projekt? Pojdme si promluvit" at je vetsi a bold
pokud existuje.

===========================================================
SCROLL PROGRESS BAR
===========================================================
Tanka linka (3px) uplne navrchu stranky (nad navbarem, position fixed,
top 0, z-index 9999).
Barva: accent barva.
Sirka: od 0% do 100% podle scroll pozice.
Pouzij framer-motion useScroll + useTransform.
Zobrazuj JEN na strankach s dlouhym obsahem (projekty, about).
NE na hlavni strance a kontaktu.

===========================================================
LOADING A PAGE TRANSITIONS
===========================================================
Pri prvnim nacteni stranky: cela stranka fade-in (opacity 0 na 1,
300ms, ease-out). Tohle uz mozna existuje, zkontroluj.

Pri prechodu mezi strankami: jemny fade (opacity, 200ms).
Pouzij framer-motion AnimatePresence v layoutu pokud je to mozne,
nebo alespon fade-in na kazde strance samostatne.

===========================================================
MICRO INTERAKCE
===========================================================
Vsechny klikatelne elementy maji cursor: pointer.
Vsechny hover efekty maji transition (bud CSS transition 0.2s
nebo framer-motion spring).
Focus stavy pro accessibility: outline 2px solid accent,
outline-offset 2px.
Scroll-to-top sipka: maly kruhovy button vpravo dole, objevi se
po scrollu 500px. Klik scrollne nahoru. Hover: scale 1.1.

===========================================================
GLOBALNI
===========================================================
Jemna grain/noise textura na pozadi (pokud jeste neni):
pseudo element ::before na body, background-image s SVG noise,
opacity 0.015, pointer-events none. Velmi jemne, skoro neviditelne.

Selection barva (::selection): pozadi accent barva, text bily.

Scrollbar styling (webkit): thin, track transparent, thumb barva
border, hover thumb barva muted.

Obrazky v galeriich maji border-radius: 8px a overflow hidden.

===========================================================
RESPONZIVITA
===========================================================
Zkontroluj KAZDOU stranku na sirce 375px (mobil) a 768px (tablet).
Nadpisy se musi zmensit: h1 max text-4xl na mobilu, h2 max text-2xl.
Padding sekci: 64px na mobilu misto 120px.
Grid projektu: 1 sloupec na mobilu.
Navbar: hamburger menu pod 768px.
Galerie: 1 sloupec na mobilu.
Specs: pod sebou misto vedle sebe na mobilu.
Zadny parallax na mobilu. Zadny tilt. Zadny magnetic button.

===========================================================
DULEZITE: Nic nepridavej a nic neodstranuj ze struktury.
Zadne nove sekce, zadne nove stranky. Jen VIZUALNI POLISH
toho co uz existuje. Kazdy detail musi vypadat profesionalne
a promyslene.
===========================================================
