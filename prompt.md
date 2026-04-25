Precti DESIGN.md a src/data/projects.ts.

VELKA RESTRUKTURACE PROJEKTU:

1. V projects.ts pridej pole "type": "main" | "mini" ke kazdemu projektu.

2. Pridej dva nove MAIN projekty:

BAKALARKA:
slug: "bakalarka-volejbal"
title: "Volleyball Net System"
subtitle: "Samonavijeci a napinaci system volejbalove site"
year: "2026"
category: "Bakalarska prace / VUT"
theme: "light"
accentColor: "#16A34A" (zelena)
overview: Navrh haloveho volejbaloveho sloupu s integrovanym mechanismem napinani a vyskoveho nastaveni site. Uvnitr sloupu pohybovy sroub, prevodovy mechanismus a elektromotor. Ovladani pres displej s presety vysek (muzi 243cm, zeny 224cm, mladez) i manualnim nastavenim. System musi odolet narazum mice do site. Vystupem bude 3D tisteny funkcni demonstrator.
specs: pohybovy sroub, prevodovy mechanismus, elektromotor, ESP32 rizeni, displej s presety, halovy volejbal, FIVB normy
stats: "3" vyskove presety, "243" cm max vyska, "1" funkcni demonstrator, "2" sloupy v systemu
challenges: kompaktnost mechanismu uvnitr sloupu, odolnost vuci narazum, intuitivni ovladani

MEDIAMIX:
slug: "mediamix-forma"
title: "MediaMix Mold Design"
subtitle: "Koncept formy pro polyuretanove vyrobky"
year: "2025"
category: "Komercni projekt"
theme: "dark"
accentColor: "#8B5CF6" (fialova)
overview: Navrh konceptu formy pro vyrobu produktu z polyuretanu pro firmu MediaMix. Zahrnuje 3D modelovani formy, technickou dokumentaci, a navrh automatizovaneho systemu nanaseni separatoru na komponenty formy pro bezpecnejsi manipulaci pri otevirani.
specs: SolidWorks 3D model, polyuretan, automaticky separator, technicke vykresy 2D dokumentace
stats: "1" kompletni forma, "12" technickych vykresu, "3" iterace navrhu
challenges: tvarova slozitost formy, automatizace nanaseni separatoru, bezpecnost pri otevirani

3. Pridej 5 MINI projektu (type: "mini"):
slug: "zpc-web-dev", title: "Modern Web Development", description: "Tvorba responzivnich webu pomoci Hugo a Tailwind CSS"
slug: "zpc-2d-graphics", title: "2D Graphics and Design", description: "Vektorova grafika a branding v Adobe Illustrator"
slug: "zpc-3d-modeling", title: "3D Modeling and Printing", description: "Navrh mechanickych dilu ve Fusion 360, 3D tisk"
slug: "zpc-3d-scanning", title: "3D Scanning", description: "Digitalizace objektu pomoci LiDAR a fotogrammetrie"
slug: "zpc-electronics", title: "Electronic Systems", description: "Prototypovani s mikrokontrolery, IoT, PCB navrh"
Mini projekty nepotrebuji specs, stats, challenges ani gallery. Staci slug, title, description, type, category: "ZPC / VUT"

4. Uprav app/projekty/page.tsx:
Nahore sekce "Main projekty" velke karty (4 projekty)
Pod tim sekce "Mini projekty" mensi karty v gridu 3x2 nebo seznam. Jednodussi design, mensi, bez velkeho hover efektu.
Mini projekty zatim nikam neodkazuji (zadny detail).

5. Na hlavni strance (page.tsx) v sekci "Vybrane projekty" zobraz jen 3 main projekty: AxisCore, MediaMix, Bakalarka.
ZP8 bude jen na strance /projekty.
