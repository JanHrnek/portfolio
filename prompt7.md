Precti aktualni stav hlavni stranky (src/app/page.tsx) a komponent.

KOMPLETNE PREDEJ HERO SEKCI. Soucasny fullscreen slideshow SMAZ.

Novy layout hero sekce:

ROZDELENI NA DVE POLOVINY (50/50 na desktopu, na mobilu pod sebou):

LEVA STRANA:
Velky nadpis "Jan Hrnek" s animaci pri nacteni (fade-in zleva, spring).
Pod nim "Design Engineer" s delay animaci.
Pod tim kratky popis a tlacitko "Prohlednout projekty".
Vertikalne vycentrovano.

PRAVA STRANA:
Velky kruhovy nebo zaobleny kontejner (cca 500x500px) kde se
zobrazuji PNG obrazky mych 3D modelu.

EFEKT ROTACE:
Obrazky se stridaji s 3D rotacnim efektem. Jako by se model
otacel na otocnem podstavci (turntable):
Aktualni obrazek rotuje pryc (rotateY 0 na -90 stupnu, fade out).
Novy obrazek rotuje dovnitr (rotateY 90 na 0 stupnu, fade in).
Pouzij CSS perspective (1000px) a framer-motion.
Prechod trva cca 0.8s, spring physics.
Automaticke stridani kazdych 4 sekundy.

Pod kontejnerem male tecky (dots) ukazujici ktery model je aktivni.
Aktivni tecka je zvyraznena accent barvou.

POZADI kontejneru: jemny radialni gradient (svetle sedy na bilem)
aby model "vynikl". Zadne ostry okraje, jemny prechod.

JEMNA INTERAKCE: pri hoveru mysi nad kontejnerem se model
lehce nakloni smerem k mysi (tilt efekt, max 5 stupnu).

Obrazky bere ze slozky public/images/hero/ (slide-1.png atd).
Dynamicky nacti vsechny obrazky ktere tam jsou.
Pokud je jen jeden obrazek, zobraz ho staticky s jemnym
"floating" efektem (lehce se pohybuje nahoru dolu, 10px, pomalu).

Na mobilu: prava strana jde pod levou, kontejner je mensi (300x300).
Zadny tilt efekt na mobilu.

DULEZITE: pozadi hero sekce at zustane bile/svetle (var(--color-bg)).
Zadne tmave pozadi, zadny fullscreen obrazek.
Castice na pozadi at zustanou pokud existuji.
