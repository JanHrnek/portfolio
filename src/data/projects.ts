// ── Types ─────────────────────────────────────────────────────

export type MainProject = {
  type: "main"
  slug: string
  title: string
  subtitle: string
  year: string
  category: string
  heroGradient: string
  heroTheme: "dark" | "light"
  accentColor: string
  galleryLayout: "2col" | "hero-2col"
  overview: string[]
  gallery: { gradient: string; caption: string }[]
  specs: { label: string; value: string }[]
  stats: { number: string; label: string }[]
  challenges: { title: string; description: string }[]
  nextProjectSlug: string
}

export type MiniProject = {
  type: "mini"
  slug: string
  title: string
  description: string
  category: string
  details?: string[]
  gallery?: { gradient: string; caption: string }[]
  tags?: string[]
}

// Backwards compat alias used in ProjectDetail
export type Project = MainProject

// ── Main projects ─────────────────────────────────────────────

export const mainProjects: MainProject[] = [
  {
    type: "main",
    slug: "axiscore",
    title: "AxisCore",
    subtitle: "DIY 3-osý gimbal — od ambice k poučení",
    year: "2024",
    category: "Mechanika / Elektronika",
    heroGradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #111 100%)",
    heroTheme: "dark",
    accentColor: "#D97706",
    galleryLayout: "2col",

    overview: [
      "AxisCore vznikl z jednoduché ambice: postavit plnohodnotný 3-osý kamerový stabilizátor vlastními silami. Ne kupovat hotový DJI, ale porozumět každé šroubce, každému kabelu, každému řádku firmware. Projekt kombinoval mechaniku, elektroniku a software v jednom celku.",
      "Mechanická část vznikala iterativně — šest generací tisknutých dílů z PETG, každá s jiným řešením ložiskového uložení a vyvažování. BLDC motory ovládané Storm32 BGC kontrolerem poskytovaly teoreticky dostatečný točivý moment, ale vyvažování tří os simultánně se ukázalo jako zásadně obtížnější než výpočty naznačovaly.",
      "Projekt nakonec skončil zkratováním řídící desky při ladění napájení — chyba s nevratným důsledkem. Žádný dramatický selhání systému, jen tichý konec smoke-testu. Ale právě tahle škola — návrh plošného spoje, ochrana napájení, práce s firmware Storm32 — stojí víc než jakýkoliv hotový produkt.",
    ],

    gallery: [
      {
        gradient: "linear-gradient(160deg, #2a2a2a 0%, #1a1a2e 100%)",
        caption: "Třetí generace ramen — přechod z PLA na PETG pro lepší teplotní odolnost",
      },
      {
        gradient: "linear-gradient(135deg, #1c1c1c 0%, #333 60%, #222 100%)",
        caption: "Storm32 BGC kontroler s vlastním napájecím rozvodem — před incident",
      },
      {
        gradient: "linear-gradient(160deg, #111 0%, #2a2020 100%)",
        caption: "Finální sestavení s BLDC motory — vyvážení pitch osy",
      },
    ],

    specs: [
      { label: "Počet os stabilizace", value: "3 (Pan / Tilt / Roll)" },
      { label: "Materiál mechaniky", value: "PETG (tisknuté, 6 iterací)" },
      { label: "Motory", value: "BLDC, 3536 / 800KV" },
      { label: "Kontroler", value: "Storm32 BGC v1.31" },
      { label: "Mikrokontrolér", value: "ESP32 (telemetrie)" },
      { label: "Hmotnost sestavení", value: "850 g" },
      { label: "Napájení", value: "3S LiPo, 11.1V" },
      { label: "Iterace prototypu", value: "6 generací" },
    ],

    stats: [
      { number: "850", label: "gramů celková hmotnost" },
      { number: "3", label: "osy stabilizace" },
      { number: "6", label: "iterací prototypu" },
      { number: "47", label: "tisknutých dílů" },
    ],

    challenges: [
      {
        title: "Vyvažování tří os simultánně",
        description:
          "Statické vyvážení každé osy zvlášť nestačí — posunutí těžiště v jedné ose ovlivňuje zbývající dvě. Iterativní proces s váhami a kalibračním jigem nakonec přinesl výsledek, ale zabral týdny ladění, které nikdo v tutoriálech nezmiňuje.",
      },
      {
        title: "Výběr motorů a momentu",
        description:
          "Výpočet potřebného točivého momentu BLDC motorů na papíře vypadal jednoduše. Realita zahrnovala dynamické zatížení při rychlých pohybech kamery a rezonance ramen, které žádný statický výpočet nepodchytí. Motory prošly dvěma výměnami.",
      },
      {
        title: "Firmware Storm32 BGC",
        description:
          "Storm32 je výkonný, ale jeho konfigurace skrze NTLogger a specifický PID tuning pro danou mechaniku je iterativní proces bez jasného konce. Každá změna geometrie ramen vyžadovala znovu nastavit PID smyčky od nuly.",
      },
      {
        title: "Zničení řídící desky",
        description:
          "Zkrat při testování napájecí větve byl výsledkem chybějící ochrany zpětnou polaritou a podcenění parazitní induktance kabeláže. Deska nepřežila. Projekt skončil, ale naučila mě víc o návrhu napájení než jakýkoliv kurz.",
      },
    ],

    nextProjectSlug: "zp8-elevator-brake",
  },

  {
    type: "main",
    slug: "zp8-elevator-brake",
    title: "ZP8 Elevator Brake",
    subtitle: "Bezpečnostní brzdný systém výtahu",
    year: "2025",
    category: "Týmový projekt / VUT",
    heroGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    heroTheme: "light",
    accentColor: "#0D9488",
    galleryLayout: "hero-2col",

    overview: [
      "ZP8 Elevator Brake je výsledkem týmového projektu (Team 02) v rámci předmětu ZP8 na VUT FSI. Cílem bylo navrhnout a realizovat funkční bezpečnostní brzdný systém výtahu — systém, který musí při detekci pádu spolehlivě zastavit kabinu do definované vzdálenosti.",
      "Systém kombinuje aktivní elektromagnetickou brzdu s pasivní pružinovou zálohou. ESP32 mikrokontrolér přijímá data z MPU-6050 akcelerometru přes I2C a vyhodnocuje stav pádu. Komunikace mezi redundantními řídicími uzly probíhá přes ESP-NOW protokol bez závislosti na Wi-Fi infrastruktuře.",
      "Projekt prošel dvěma formálními design review fázemi — PDR (Preliminary Design Review) a CDR (Critical Design Review) — s dokumentací v anglickém jazyce. Tým čítá čtyři členy a vývoj probíhal po dobu dvanácti týdnů od konceptu po funkční prototyp.",
    ],

    gallery: [
      {
        gradient: "linear-gradient(160deg, #1a1a2e 0%, #16213e 80%, #0d1b2a 100%)",
        caption: "Mechanická sestava — aktivní brzda s elektromagnetem a pasivní pružinová záloha",
      },
      {
        gradient: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 60%, #16213e 100%)",
        caption: "ESP32 řídicí deska s MPU-6050 — detekce pádu a ESP-NOW komunikace",
      },
      {
        gradient: "linear-gradient(160deg, #16213e 0%, #1a1a2e 50%, #0f3460 100%)",
        caption: "CDR dokumentace — schéma brzdné sekvence a PID regulační smyčka",
      },
    ],

    specs: [
      { label: "Mikrokontrolér", value: "ESP32 (dual-core)" },
      { label: "Senzor", value: "MPU-6050 (akcelerometr + gyroskop)" },
      { label: "Komunikace", value: "ESP-NOW (peer-to-peer, bez Wi-Fi)" },
      { label: "Brzda aktivní", value: "Elektromagnetická, 24V" },
      { label: "Brzda pasivní", value: "Pružiny Sodemann — záloha při výpadku napájení" },
      { label: "Tlumič nárazů", value: "Hydraulický, parametry dle EN 81-20" },
      { label: "Regulace", value: "PID smyčka — řízení brzdné síly" },
      { label: "Design review", value: "PDR + CDR (dokumentace EN)" },
    ],

    stats: [
      { number: "2", label: "typy brzd (aktivní + pasivní)" },
      { number: "4", label: "členové týmu" },
      { number: "12", label: "týdnů vývoje" },
      { number: "2", label: "design review fáze" },
    ],

    challenges: [
      {
        title: "Výběr a dimenzování pružin",
        description:
          "Pružiny Sodemann musí zajistit dostatečnou brzdnou sílu při výpadku napájení, ale nesmí způsobit přetížení mechaniky při normálním uvolnění brzdy. Iterativní výpočet tuhosti k a předpětí s ohledem na certifikační normu EN 81-20 zabral podstatnou část konstrukční fáze.",
      },
      {
        title: "Synchronizace aktivní a pasivní brzdy",
        description:
          "Přechod mezi aktivním elektromagnetickým brzděním a pasivní zálohou musí být plynulý — žádný okamžik bez brzdné síly. Časování demagnetizace cívky a uvolnění pružiny je kritické a vyžadovalo ladění firmware s osciloskopem na každé iteraci.",
      },
      {
        title: "Návrh tlumičů nárazů",
        description:
          "Tlumiče musí absorbovat zbytkovou kinetickou energii kabiny po zabrzdění. Výběr hydraulického tlumiče a jeho parametrů byl podmíněn normou EN 81-20 a výpočtem maximální rychlosti pádu — kombinace strojní analýzy a normativních požadavků v jednom.",
      },
    ],

    nextProjectSlug: "bakalarka-volejbal",
  },

  {
    type: "main",
    slug: "bakalarka-volejbal",
    title: "Volleyball Net System",
    subtitle: "Samonavíjecí a napínací systém volejbalové sítě",
    year: "2026",
    category: "Bakalářská práce / VUT",
    heroGradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
    heroTheme: "light",
    accentColor: "#16A34A",
    galleryLayout: "hero-2col",

    overview: [
      "Bakalářská práce se zaměřuje na návrh halového volejbalového sloupu s integrovaným mechanismem pro napínání a výškové nastavení sítě. Klíčovým požadavkem je kompaktnost — celý pohonný a převodový systém musí být ukryt uvnitř sloupu, aniž by narušil jeho vizuální čistotu nebo funkčnost.",
      "Uvnitř sloupu je uložen pohybový šroub v kombinaci s převodovým mechanismem a elektrickým pohonem. Ovládání probíhá přes dotykový displej s přednastavenými výškovými presety dle FIVB norem — muži 243 cm, ženy 224 cm, mládež — a možností manuálního nastavení s milimetrovou přesností.",
      "Výstupem práce bude plně funkční 3D tisknutý demonstrátor, který ověří kinematiku mechanismu, odezvu ovládání a odolnost vůči dynamickým nárazům míče do sítě. Projekt propojuje strojní návrh, elektronické řízení a uživatelské rozhraní do jednoho produktu.",
    ],

    gallery: [
      {
        gradient: "linear-gradient(160deg, #f0fdf4 0%, #dcfce7 60%, #a7f3d0 100%)",
        caption: "SolidWorks model sloupu — vnitřní mechanismus s pohybovým šroubem a převodem",
      },
      {
        gradient: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
        caption: "Ovládací panel — displej s výškovými presety a manuálním nastavením",
      },
      {
        gradient: "linear-gradient(160deg, #d1fae5 0%, #a7f3d0 70%, #6ee7b7 100%)",
        caption: "3D tisknutý funkční demonstrátor — validace kinematiky mechanismu",
      },
    ],

    specs: [
      { label: "Mechanismus pohonu", value: "Pohybový šroub + převodovka" },
      { label: "Pohon", value: "Elektromotor (DC, enkodér)" },
      { label: "Řídicí systém", value: "ESP32" },
      { label: "Rozhraní", value: "Dotykový displej, presety FIVB" },
      { label: "Max výška sítě", value: "243 cm (muži FIVB)" },
      { label: "Min výška sítě", value: "224 cm (ženy FIVB)" },
      { label: "Odolnost", value: "Dynamické nárazy míče do sítě" },
      { label: "Výstup", value: "3D tisknutý funkční demonstrátor" },
    ],

    stats: [
      { number: "3", label: "výškové presety (FIVB)" },
      { number: "243", label: "cm maximální výška" },
      { number: "1", label: "funkční demonstrátor" },
      { number: "2", label: "sloupy v systému" },
    ],

    challenges: [
      {
        title: "Kompaktnost mechanismu uvnitř sloupu",
        description:
          "Pohybový šroub, převodovka, motor a řídicí elektronika musí být integrovány do průřezu standardního volejbalového sloupu. Každý milimetr prostoru je předmětem rozhodnutí — kompromisy mezi výkonem, zástavbovými rozměry a servisní dostupností.",
      },
      {
        title: "Odolnost vůči nárazům",
        description:
          "Volejbalový míč dopadající na síť generuje impulzní zatížení přenášené přes napínací systém do mechanismu. Analýza dynamického chování a volba vhodných tlumicích prvků jsou kritické pro životnost pohybového šroubu a převodovky.",
      },
      {
        title: "Intuitivní ovládání",
        description:
          "Systém musí být použitelný bez manuálu — obsluha tělocvičny nastaví výšku sítě za méně než 30 vteřin. Návrh UX displeje, předdefinované presety a zpětná vazba enkodéru tvoří klíčovou část projektu vedle mechaniky.",
      },
    ],

    nextProjectSlug: "mediamix-forma",
  },

  {
    type: "main",
    slug: "mediamix-forma",
    title: "MediaMix Mold Design",
    subtitle: "Koncept formy pro polyuretanové výrobky",
    year: "2025",
    category: "Komerční projekt",
    heroGradient: "linear-gradient(135deg, #1e1b4b 0%, #2d1b69 50%, #1a1a2e 100%)",
    heroTheme: "dark",
    accentColor: "#8B5CF6",
    galleryLayout: "2col",

    overview: [
      "Projekt pro firmu MediaMix zahrnoval kompletní návrh konceptu formy pro výrobu produktů z polyuretanu. Tvarová složitost výrobku neumožňovala použití standardních dělicích rovin — návrh formy vyžadoval analýzu úkosů, definici složených dělicích ploch a návrh vyhazovacího systému.",
      "Součástí projektu byl návrh automatizovaného systému nanášení separátoru na tvarové plochy formy. Manuální aplikace separátoru je časově náročná, nerovnoměrná a při otevírání formy vytváří bezpečnostní rizika. Automatizace tohoto kroku zkracuje cyklus a eliminuje kontakt obsluhy s aktivními chemickými látkami.",
    ],

    gallery: [
      {
        gradient: "linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #1a1a2e 100%)",
        caption: "SolidWorks 3D model formy — komplexní tvarová geometrie s dělicími plochami",
      },
      {
        gradient: "linear-gradient(135deg, #2d1b69 0%, #4c1d95 60%, #1e1b4b 100%)",
        caption: "Automatický aplikátor separátoru — kinematická analýza pohybu trysky",
      },
    ],

    specs: [
      { label: "Software", value: "SolidWorks (3D model + 2D výkresy)" },
      { label: "Materiál výrobku", value: "Polyuretan (PU lití)" },
      { label: "Dělicí plocha", value: "Složená, víceúrovňová" },
      { label: "Separátor", value: "Automatický aplikátor (pohybová osa)" },
      { label: "Vyhazovací systém", value: "Kolíkový, symetrický" },
      { label: "Dokumentace", value: "Technické výkresy 2D, kusovník" },
    ],

    stats: [
      { number: "1", label: "kompletní forma" },
      { number: "12", label: "technických výkresů" },
      { number: "3", label: "iterace návrhu" },
    ],

    challenges: [
      {
        title: "Tvarová složitost formy",
        description:
          "Geometrie výrobku vyžadovala složenou dělicí rovinu s přechody na různých výškových úrovních. Definice dělicích ploch v SolidWorks a ověření průchodnosti pro vyjmutí výrobku zabralo více iterací než samotný design produktu.",
      },
      {
        title: "Automatizace nanášení separátoru",
        description:
          "Návrh kinematiky pohyblivé trysky pro rovnoměrné pokrytí tvarových ploch formy separátorem. Výzva spočívala v definici trajektorie pohybu, která pokryje všechny konkávní partie formy bez nutnosti manuálních zásahů.",
      },
      {
        title: "Bezpečnost při otevírání",
        description:
          "Polyuretanová forma při otevírání může generovat výrazné síly při přilnutí výrobku. Návrh vyhazovacího systému a volba povrchové úpravy tvarových ploch byly podmíněny analýzou sil při demoulding procesu.",
      },
    ],

    nextProjectSlug: "axiscore",
  },
]

// ── Mini projects ─────────────────────────────────────────────

export const miniProjects: MiniProject[] = [
  {
    type: "mini",
    slug: "zpc-web-dev",
    title: "Modern Web Development",
    description: "Tvorba responzivních webů pomocí Hugo a Tailwind CSS",
    category: "ZPC / VUT",
    tags: ["Hugo", "Tailwind CSS", "HTML", "Responsive design"],
    details: [
      "V rámci předmětu ZPC na VUT FSI jsem absolvoval semestrální projekt zaměřený na moderní webový vývoj. Výstupem byl responzivní web postavený na statickém generátoru Hugo s Tailwind CSS stylováním.",
      "Projekt zahrnoval návrh typografického systému, implementaci responzivního layoutu a optimalizaci výkonu pro produkční nasazení. Zaměřil jsem se na čistotu kódu a udržitelnost struktury šablon.",
    ],
    gallery: [
      {
        gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)",
        caption: "Hlavní strana — hero sekce a navigace",
      },
      {
        gradient: "linear-gradient(135deg, #1e293b 0%, #334155 60%, #475569 100%)",
        caption: "Mobilní responzivní layout",
      },
    ],
  },
  {
    type: "mini",
    slug: "zpc-2d-graphics",
    title: "2D Graphics and Design",
    description: "Vektorová grafika a branding v Adobe Illustrator",
    category: "ZPC / VUT",
    tags: ["Adobe Illustrator", "Vektorová grafika", "Branding", "Typography"],
    details: [
      "Projekt se zaměřoval na tvorbu vektorové grafiky a základy brandingu v Adobe Illustrator. Výstupem bylo logo a vizuální identita fiktivní značky, včetně definice barevné palety a typografického systému.",
      "Práce zahrnovala návrh piktogramů, grafiku pro tisk ve vysokém rozlišení a export do standardizovaných formátů (SVG, PDF, PNG). Důraz byl kladen na přenositelnost a škálovatelnost výsledné grafiky.",
    ],
    gallery: [
      {
        gradient: "linear-gradient(135deg, #2d1b69 0%, #4c1d95 50%, #6d28d9 100%)",
        caption: "Logo a vizuální identita — základní variace",
      },
      {
        gradient: "linear-gradient(135deg, #4c1d95 0%, #5b21b6 60%, #7c3aed 100%)",
        caption: "Sada piktogramů a ikonografika",
      },
    ],
  },
  {
    type: "mini",
    slug: "zpc-3d-modeling",
    title: "3D Modeling and Printing",
    description: "Návrh mechanických dílů ve Fusion 360, 3D tisk",
    category: "ZPC / VUT",
    tags: ["Fusion 360", "FDM tisk", "PETG", "Parametrický návrh"],
    details: [
      "Projekt kombinoval parametrický CAD návrh ve Fusion 360 s výrobou metodou FDM 3D tisku. Cílem bylo navrhnout a vytisknout funkční mechanický díl s tolerancemi umožňujícími smontování bez postprocessingu.",
      "Postupoval jsem od skici a definice parametrů přes generování objemového modelu po přípravu G-kódu v PrusaSlicer. Materiál PETG byl zvolen pro kombinaci tuhosti, tepelné odolnosti a dobré tisknutelnosti.",
    ],
    gallery: [
      {
        gradient: "linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 50%, #3a3a3a 100%)",
        caption: "Fusion 360 — parametrický model s ložiskovou dírou",
      },
      {
        gradient: "linear-gradient(135deg, #292524 0%, #44403c 60%, #57534e 100%)",
        caption: "Vytisknutý díl — kontrola rozměrů posuvným měřítkem",
      },
    ],
  },
  {
    type: "mini",
    slug: "zpc-3d-scanning",
    title: "3D Scanning",
    description: "Digitalizace objektů pomocí LiDAR a fotogrammetrie",
    category: "ZPC / VUT",
    tags: ["LiDAR", "Fotogrammetrie", "Meshroom", "Point cloud"],
    details: [
      "Projekt se zaměřoval na metody digitalizace fyzických objektů do 3D modelů. Vyzkoušel jsem dva přístupy: LiDAR skenování pro rychlý záběr prostoru a fotogrammetrii pro detailní rekonstrukci tvarů.",
      "Pro fotogrammetrické zpracování byl použit software Meshroom (AliceVision) — pipeline zahrnoval pořízení sady překrývajících se fotografií, výpočet point cloudu a generování meshe. Výsledek byl exportován jako OBJ pro použití v CAD systémech.",
    ],
    gallery: [
      {
        gradient: "linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)",
        caption: "Point cloud — vizualizace naskenovaného objektu",
      },
      {
        gradient: "linear-gradient(135deg, #0369a1 0%, #0284c7 60%, #0ea5e9 100%)",
        caption: "Photogrammetry mesh po rekonstrukci v Meshroom",
      },
    ],
  },
  {
    type: "mini",
    slug: "zpc-electronics",
    title: "Electronic Systems",
    description: "Prototypování s mikrokontroléry, IoT, PCB návrh",
    category: "ZPC / VUT",
    tags: ["ESP32", "Arduino", "KiCad", "IoT", "C++"],
    details: [
      "Semestrální projekt zaměřený na elektronické prototypování — od breadboard zapojení přes programování v C++ až po návrh schématu a PCB v KiCad. Výstupem byl funkční IoT uzel pro monitoring teploty a vlhkosti.",
      "Zařízení na bázi ESP32 komunikuje přes MQTT protokol s lokálním brokerem a zobrazuje data na OLED displeji. Projekt prošel fází breadboard prototypu, optimalizace spotřeby a závěrečného návrhu PCB s SMD součástkami.",
    ],
    gallery: [
      {
        gradient: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
        caption: "Breadboard prototyp — ESP32 s senzorem DHT22 a OLED",
      },
      {
        gradient: "linear-gradient(135deg, #14532d 0%, #15803d 60%, #16a34a 100%)",
        caption: "KiCad schéma PCB — finální revize s SMD součástkami",
      },
    ],
  },
]
