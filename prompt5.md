Precti DESIGN.md a aktualni stav hlavni stranky (src/app/page.tsx).

Chci dve vylepseni:

1. SLIDESHOW 3D MODELU NA HLAVNI STRANCE

Vytvor komponentu ModelShowcase (src/components/ModelShowcase.tsx).
Umisti ji na hlavni stranku mezi hero a sekci projektu.

Slideshow funguje takto:
Velky kontejner pres celou sirku, vyska cca 500px na desktopu.
Uprostred se zobrazuje obrazek (zatim placeholder gradient boxy,
pozdeji tam dam PNG renderovane 3D modely).
Obrazky se stridaji automaticky kazdych 4 sekundy.

PRECHODY MUSI BYT EFEKTNI, ne jen fade:
Novy obrazek vjede z prave strany s parallax efektem (translateX
100% na 0%, s jemnym scale 1.1 na 1.0).
Soucasne stary obrazek odjede doleva a mizi (translateX 0% na -30%,
opacity 1 na 0).
Pouzij framer-motion AnimatePresence s mode "wait".
Spring physics, ne linearni.

Pod obrazkem je nazev modelu (napr. "AxisCore Gimbal", "MediaMix Mold",
"Volleyball Net System") ktery se taky animuje, fade-in zdola.

Po stranach sipky pro manualni prepinani (vlevo/vpravo).
Dole male tecky (dots) ukazujici aktualni pozici.
Sipky i tecky maji hover efekt.

Zatim dej 4 placeholder polozky:
slide 1: gradient from-zinc-800 to-zinc-900, nazev "AxisCore Gimbal"
slide 2: gradient from-violet-900 to-violet-800, nazev "MediaMix Mold"
slide 3: gradient from-emerald-900 to-emerald-800, nazev "Volleyball Net System"
slide 4: gradient from-sky-900 to-sky-800, nazev "ZP8 Brake System"

2. JEMNE CASTICOVE POZADI

Vytvor komponentu ParticleBackground (src/components/ParticleBackground.tsx).
Pouzij ji v root layoutu nebo na hlavni strance za veskery obsah (position fixed, z-index -1).

Efekt: Male svetle tecky (particles) ktere se pomalu pohybuji nahodnym smerem.
Barva: svetle seda (#d4d4d4), opacity 0.3 az 0.5.
Pocet: cca 30 az 50 castic.
Velikost: 1 az 3px.
Pohyb: velmi pomaly, nahodny smer, plynuly.
ZADNE spojovaci cary mezi casticemi, jen tecky.
Implementuj pomoci HTML5 Canvas (ne DOM elementy).
Na mobilu sniz pocet na 15 castic.

Efekt musi byt VELMI JEMNY, skoro neviditelny, jen pro hloubku.
Nesmi rozptylovat od obsahu.

Pozadi particly at jsou JEN na hlavni strance, ne na podstrankach projektu.
