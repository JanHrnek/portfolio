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
  datasheet: { label: string; value: string }[]
  caseStudy: {
    challenge: string[]
    solution: string[]
    result: string[]
  }
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
  caseStudy?: {
    challenge: string
    solution: string
    result: string
  }
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

    datasheet: [
      { label: "Software",  value: "SolidWorks · Storm32 BGC Configurator · PrusaSlicer" },
      { label: "Materiál",  value: "PETG (tisknuté díly) · BLDC motory 3536/800KV · 3S LiPo 11.1V" },
      { label: "Trvání",    value: "~4 měsíce · 2024" },
      { label: "Role",      value: "Samostatný projekt — mechanický návrh, elektronika, firmware" },
    ],

    caseStudy: {
      challenge: [
        "Sestavit plnohodnotný 3-osý kamerový stabilizátor od nuly — bez hotového kitu, bez zkratky. Mechanika, elektronika a firmware v jednom projektu. Cílem nebylo koupit DJI, ale porozumět každé šroubce, každému kabelu, každému řádku kódu.",
        "Vyvažování tří os simultánně se ukázalo jako zásadně obtížnější než výpočty naznačovaly. Statické vyvážení každé osy zvlášť nestačí — posunutí těžiště v jedné ose ovlivňuje zbývající dvě. Výběr BLDC motorů s dostatečným točivým momentem pro dynamické zatížení byl druhým klíčovým problémem.",
      ],
      solution: [
        "Mechanická část vznikala iterativně — šest generací tisknutých dílů z PETG, každá s jiným řešením ložiskového uložení a vyvažování. BLDC motory (3536 / 800KV) ovládané Storm32 BGC kontrolerem prošly dvěma výměnami po analýze rezonancí ramen a dynamického zatížení.",
        "ESP32 zajišťoval telemetrii. Každá změna geometrie ramen vyžadovala znovu nastavit PID smyčky Storm32 od nuly — konfigurace přes NTLogger je výkonná, ale iterativní bez jasného konce. Kalibrační jig s přidanými závažími umožnil postupné vyvažování všech tří os.",
      ],
      result: [
        "Projekt skončil zkratováním řídící desky při ladění napájení — chybějící ochrana zpětnou polaritou a podcenění parazitní induktance kabeláže. Deska nepřežila. Žádný dramatický výbuch, jen tichý konec smoke-testu.",
        "Ale právě tahle škola stojí víc než jakýkoliv úspěšně sestavený kit: návrh napájecích větví, ochrana před zkratem, práce s BLDC motory, Storm32 PID tuning, a pochopení toho, proč mechanické toleranky mají přímý dopad na firmware.",
      ],
    },

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

    datasheet: [
      { label: "Software",  value: "SolidWorks · VS Code + ESP-IDF · KiCad" },
      { label: "Materiál",  value: "Ocel (mechanika) · ESP32, MPU-6050, elektromagnet 24V · pružiny Sodemann" },
      { label: "Trvání",    value: "12 týdnů · 2025" },
      { label: "Tým",       value: "4 členové" },
      { label: "Role",      value: "Mechanický návrh · firmware ESP32" },
    ],

    caseStudy: {
      challenge: [
        "Navrhnout bezpečnostní brzdný systém výtahu, který při detekci pádu kabiny spolehlivě zastaví pohyb do definované vzdálenosti. Systém musí fungovat i při výpadku napájení — selhání elektriky nesmí znamenat selhání bezpečnosti.",
        "Projekt prošel dvěma formálními design review fázemi (PDR a CDR) s dokumentací v anglickém jazyce — akademický standard vyžadující obhájitelné konstrukční rozhodnutí na každém kroku.",
      ],
      solution: [
        "Systém kombinuje aktivní elektromagnetickou brzdu (24V) s pasivní pružinovou zálohou Sodemann. ESP32 přijímá data z MPU-6050 akcelerometru přes I2C a vyhodnocuje stav pádu v reálném čase. Komunikace mezi redundantními řídicími uzly probíhá přes ESP-NOW protokol bez závislosti na Wi-Fi infrastruktuře.",
        "PID smyčka řídí brzdnou sílu aktivní brzdy; hydraulický tlumič nárazů dimenzovaný dle normy EN 81-20 absorbuje zbytkovou kinetickou energii kabiny. Timing přechodu mezi aktivní a pasivní brzdou byl laděn osciloskopem — žádný okamžik bez brzdné síly.",
      ],
      result: [
        "Funkční prototyp ověřený za dvanáct týdnů od konceptu. Tým čtyř členů předal kompletní technickou dokumentaci PDR a CDR v anglickém jazyce. Dimenzování pružin Sodemann a analýza hydraulického tlumiče prošly formálním review.",
        "Projekt ukázal, jak norma EN 81-20 překládá bezpečnostní požadavky do konkrétních konstrukčních parametrů — a proč synchronizace aktivní a pasivní brzdy vyžaduje precizní firmware, ne jen správné mechanické dimenzování.",
      ],
    },

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

    datasheet: [
      { label: "Software",  value: "SolidWorks · VS Code + ESP-IDF" },
      { label: "Materiál",  value: "PETG (demonstrátor) · ocel (sloup)" },
      { label: "Trvání",    value: "Bakalářská práce 2025/2026" },
      { label: "Role",      value: "Autor — veškerý návrh a implementace" },
    ],

    caseStudy: {
      challenge: [
        "Navrhnout halový volejbalový sloup s integrovaným mechanismem pro výškové nastavení a napínání sítě — celý pohonný systém ukrytý uvnitř sloupu, bez viditelné technologie nebo externích komponent. Klíčový požadavek: vizuální čistota nesmí být kompromisem.",
        "Systém musí být použitelný bez manuálu. Obsluha tělocvičny — ne technik — musí nastavit výšku sítě za méně než 30 vteřin na správnou FIVB výšku, bez nářadí a bez chybových stavů.",
      ],
      solution: [
        "Uvnitř sloupu je uložen pohybový šroub v kombinaci s převodovkou a DC motorem s enkodérem. ESP32 řídí polohu s milimetrovou přesností; dotykový displej nabízí předdefinované výškové presety dle FIVB norem (muži 243 cm, ženy 224 cm, mládež) a možnost manuálního nastavení.",
        "Analýza dynamického zatížení od nárazů míče do sítě podmínila volbu tlumicích prvků v pohybovém šroubu a převodovce. Každý milimetr průřezu sloupu byl předmětem rozhodnutí — kompromisy mezi výkonem, zástavbovými rozměry a servisní dostupností.",
      ],
      result: [
        "Výstupem bakalářské práce je plně funkční 3D tisknutý demonstrátor ověřující kinematiku mechanismu, odezvu ovládání a odolnost vůči dynamickým nárazům míče do sítě.",
        "Nastavení výšky sítě trvá méně než 30 sekund. Systém propojuje strojní návrh, elektronické řízení a UX displeje do jednoho produktu, kde žádná ze tří složek není jen doplněk.",
      ],
    },

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

    datasheet: [
      { label: "Software",  value: "SolidWorks (3D model + 2D dokumentace)" },
      { label: "Materiál",  value: "Ocel / hliník (forma) · polyuretan (výrobek)" },
      { label: "Trvání",    value: "~6 týdnů · 2025" },
      { label: "Role",      value: "CAD technik — návrh formy a automatizace separátoru" },
    ],

    caseStudy: {
      challenge: [
        "Geometrie polyuretanového výrobku neumožňuje standardní rovnou dělicí rovinu — návrh formy vyžadoval složenou víceúrovňovou dělicí plochu s přechody na různých výškových úrovních. Bez správné dělicí plochy výrobek z formy nevyjde.",
        "Zároveň manuální nanášení separátoru bylo časově náročné, nerovnoměrné a při otevírání formy generovalo bezpečnostní rizika pro obsluhu. Automatizace tohoto kroku nebyla luxus — byla podmínkou opakovatelné kvality.",
      ],
      solution: [
        "Kompletní 3D model formy v SolidWorks: analýza úkosů, definice složených dělicích ploch, kolíkový vyhazovací systém. Průchodnost pro vyjmutí výrobku ověřena v každé iteraci — celkem tři návrhy než geometrie sedla.",
        "Paralelně byl navržen automatizovaný aplikátor separátoru — pohyblivá tryska s kinematicky definovanou trajektorií pokrývající všechny konkávní partie formy. Obsluha nezasahuje do procesu nanášení, chemický kontakt je eliminován.",
      ],
      result: [
        "Kompletní technická dokumentace o 12 výkresech s kusovníkem předaná zákazníkovi. Tři iterace návrhu — každá s konkrétním zdůvodněním změny geometrie nebo vyhazovacího systému.",
        "Automatizace nanášení separátoru zkracuje výrobní cyklus a eliminuje proměnlivost způsobenou manuální aplikací. Projekt ukázal, že u složitých PU forem je návrh dělicí plochy časově náročnější než samotný design výrobku.",
      ],
    },

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
    caseStudy: {
      challenge:
        "Navrhnout a implementovat plně responzivní web v rámci předmětu ZPC — s důrazem na moderní tooling, čistou strukturu šablon a produkční připravenost, ne jen na funkční výsledek.",
      solution:
        "Statický generátor Hugo s Tailwind CSS stylováním. Typografický systém, responzivní layout s breakpointy, optimalizace výkonu pro produkční nasazení. Čistota kódu a udržitelnost šablonové struktury jako primární kritéria.",
      result:
        "Funkční responzivní web deployovatelný jako statický site. Projekt ukázal, kde Hugo exceluje (rychlost buildu, jednoduchost šablon) a kde naráží na limity složitějšího UX.",
    },
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
    caseStudy: {
      challenge:
        "Vytvořit ucelenou vizuální identitu fiktivní značky od nuly — logo, barevná paleta, typografický systém a sada piktogramů. Vše musí fungovat v tisku i digitálně, ve velkém i malém měřítku.",
      solution:
        "Adobe Illustrator: vektorové logo ve třech variantách (barevná, černobílá, inverzní), definice brand guidelines, sada piktogramů konzistentní s charakterem značky. Export do SVG, PDF a PNG pro různé výstupní formáty.",
      result:
        "Kompletní brand package připravený pro tisk i digitální použití. Všechny výstupy škálovatelné bez ztráty kvality. Projekt ukázal, kde typografická rozhodnutí zásadně mění celkový charakter identity.",
    },
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
    caseStudy: {
      challenge:
        "Navrhnout a vytisknout funkční mechanický díl s tolerancemi umožňujícími smontování bez postprocessingu — přesnost jako primární kritérium, ne jen vzhled výtisku.",
      solution:
        "Parametrický CAD návrh ve Fusion 360 od skici přes objemový model po G-kód v PrusaSlicer. Materiál PETG zvolen pro kombinaci tuhosti, tepelné odolnosti a dobré tisknutelnosti. Tolerance navrženy s ohledem na FDM rozměrové odchylky.",
      result:
        "Díl smontován bez úprav hned na první výtisk. Kontrola rozměrů posuvným měřítkem potvrdila dodržení tolerancí. Projekt ukázal, jak FDM shrinkage a orientace tisku ovlivňují přesnost fit-u.",
    },
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
    caseStudy: {
      challenge:
        "Digitalizovat fyzický objekt do 3D modelu s dostatečnou přesností pro použití v CAD — a porovnat dva přístupy: LiDAR skenování pro rychlý záběr prostoru a fotogrammetrii pro detailní rekonstrukci tvarů.",
      solution:
        "LiDAR pro prostorový záběr, Meshroom (AliceVision) pro fotogrammetrické zpracování — pipeline zahrnoval sadu překrývajících se fotografií, výpočet point cloudu, generování meshe a export jako OBJ pro CAD. Obě metody srovnány pro přesnost a čas zpracování.",
      result:
        "Použitelný 3D mesh exportovatelný do CAD systémů. Fotogrammetrie vykázala vyšší detail povrchu, LiDAR rychlejší workflow pro větší objekty. Projekt objasnil praktické limity obou metod bez marketingových přehánění.",
    },
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
    caseStudy: {
      challenge:
        "Projít celým vývojovým cyklem elektronického produktu — od breadboard prototypu přes programování v C++ až po finální PCB návrh v KiCad. Výstupem musí být funkční IoT uzel, ne jen experimentální zapojení.",
      solution:
        "ESP32 s DHT22 senzorem komunikující přes MQTT s lokálním brokerem; data zobrazována na OLED displeji. Tři fáze: breadboard prototyp, optimalizace spotřeby firmware, návrh PCB se SMD součástkami v KiCad. Každá fáze s jasným akceptačním kritériem.",
      result:
        "Funkční IoT monitoring uzel pro teplotu a vlhkost — od breadboardu po PCB layout připravený k výrobě. Projekt ukázal, kde firmware optimalizace spotřeby vyžaduje jiná rozhodnutí než maximální výkon.",
    },
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
