Precti DESIGN.md, CONTEXT.md a vsechny soucasne komponenty a stranky.
Podivej se na obrazky v inspiration/ pro referenci stylu.

Web je prilis holy a prazdny. Chci ho udelat vizualne bohatsi
a interaktivnejsi. ZACHOVEJ vsechny soucasne stranky a obsah,
jen pridej vizualni vrstvy.

HLAVNI STRANKA (page.tsx) - kompletni redesign:

1. HERO SEKCE ma byt vizualne zajimava, ne jen text na bilem pozadi:
   Pridej jemny animovany gradient mesh na pozadi hero
   (pomaly pohyblive barevne skvrny, subtle, ne rusive).
   Nadpis "Jan Hrnek" at se animuje pri nacteni pismeno po pismenu
   (stagger reveal, kazde pismeno fade-in zleva, 50ms delay).
   Pod nadpisem pridej animovanou caru nebo linku ktera se roztahne
   do sirky (width 0 na 200px, spring animace).
   Podnadpis "Design Engineer" at ma typewriter efekt (pise se
   pismenko po pismenku).

2. INTERAKTIVNI PROJEKT KARTY - ne jen obycejne karty:
   Pri hoveru se karta nakoni smerem k mysi (3D tilt efekt,
   perspective transform, max 5 stupnu).
   Na karte at je cislo projektu velke v rohu ("01", "02", "03")
   v pruhledne barve.
   Pri hoveru se objevi sipka nebo "Zobrazit projekt" text.
   Karty at maji jemny border ktery se pri hoveru rozsviti
   accent barvou projektu.
   Grid: na desktopu 1 velka karta vlevo (zabira 2 radky)
   a 2 mensi vpravo pod sebou. Ne obycejny 3 sloupcovy grid.

3. PRIDEJ NOVOU SEKCI "Co delam" mezi hero a projekty:
   3 nebo 4 ikony/boxy v radku:
   "CAD & Design" s ikonou (lucide: Pen Tool nebo Compass)
   "Automatizace" s ikonou (lucide: Cog nebo Settings)
   "Prototypovani" s ikonou (lucide: Box nebo Printer)
   "Elektronika" s ikonou (lucide: Cpu nebo Circuit)
   Kazdy box ma kratky popis (1 veta).
   Fade-in pri nacteni se stagger efektem.

4. PRIDEJ SEKCI "Cisla" pred footer:
   Animovany counter (cisla se roztoci od 0 do cile pri scrollu):
   "6+" lety zkusenosti s CAD
   "2" profesionalni certifikace
   "10+" dokoncenych projektu
   "3" firmy kde jsem pracoval
   Na tmavem pozadi, velka cisla, bile.

5. FOOTER rozsir:
   Vice obsahu, ne jen copyright a ikony.
   Pridej kratky text "Mate projekt? Pojdme si promluvit."
   s velkym mailto odkazem.
   Pod tim copyright a socialni ikony.

NAVBAR vylepseni:
   Logo "JH" at ma pri hoveru jemnou rotaci nebo scale animaci.
   Odkazy v navbaru at maji underline animaci pri hoveru
   (cara se vysune zespodu, ne okamzity underline).
   Pridej hamburger menu pro mobil (animovany prechod X).

GLOBALNI VYLEPSENI:
   Pridej custom scroll indicator (tanka linka navrchu stranky
   ktera ukazuje progress scrollu, v accent barve).
   Vsechny stranky at maji plynuly page transition (fade pri
   prechodu mezi strankami).
   Pridej subtle grain/noise texture na pozadi (CSS filter,
   velmi jemny, skoro neviditelny, ale dodava hloubku).

Pouzij framer-motion pro vsechny animace. Spring physics z DESIGN.md.
Na mobilu zjednodus efekty (zadny tilt, zadny gradient mesh).
