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
  inProgress?: boolean
  datasheet: { label: string; value: string }[]
  caseStudy: {
    challenge: string[]
    solution: string[]
    result: string[]
    v2?: string[]
  }
  gallery: { gradient: string; caption: string; image?: string }[]
  specs: { label: string; value: string }[]
  stats: { number: string; label: string }[]
  challenges: { title: string; description: string }[]
  designJourney?: {
    title: string
    subtitle: string
    image?: string
    shortDesc: string
    fullDesc: string
  }[]
  componentBreakdown?: {
    title: string
    category: string
    weight: string
    material: string
    description: string
    image?: string
  }[]
  scrollVideo?: {
    src: string
    poster?: string
    title?: string
    caption?: string
    scrollHeight?: number
  }
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
  gallery?: { gradient: string; caption: string; image?: string }[]
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
      { label: "Software",  value: "SolidWorks · PrusaSlicer · Arduino IDE" },
      { label: "Materiál",  value: "PETG (tisknuté díly) · MagSafe mount" },
      { label: "Trvání",    value: "~3 měsíce · 2024" },
      { label: "Role",      value: "Školní projekt — mechanický návrh, elektronika, firmware" },
    ],

    caseStudy: {
      challenge: [
        "Navrhnout a sestavit 3osý kamerový stabilizátor pro telefon od nuly jako školní projekt. Bez hotového kitu — mechanika, elektronika i firmware v jednom. Cílem bylo real-time vyvažování přes PID s MagSafe mountem pro univerzální uchycení telefonu.",
      ],
      solution: [
        "Konstrukce vznikala iterativně — všechny díly tisknuté z PETG. Původní koncept s BLDC motory a Storm32 BGC kontrolerem skončil spálením dvou desek. Komplexita Storm32 byla v daném čase nezvladatelná — pivot na Arduino Nano se servomotory znamenal zjednodušení a ztrátu jedné osy.",
      ],
      result: [
        "Projekt byl dokončen a odevzdán, ale ne jako skutečný gimbal. Platforma se ovládá joystickem a tlačítky — bez gyroskopu, bez PID. Real-time vyvažování zůstalo cílem, ne realitou. Největší výstup: pochopení proč Storm32 a BLDC nejsou správný první krok.",
      ],
      v2: [
        "Projekt bude přepracován — silnější servomotory, skutečný real-time PID vyvažování přes gyroskop a plynulejší ovládání nahradí joystick.",
      ],
    },

    gallery: [
      {
        gradient: "linear-gradient(160deg, #2a2a2a 0%, #1a1a2e 100%)",
        image: "/images/axiscore/prot-3.png",
        caption: "Třetí generace ramen — přechod z PLA na PETG pro lepší teplotní odolnost",
      },
      {
        gradient: "linear-gradient(135deg, #1c1c1c 0%, #333 60%, #222 100%)",
        image: "/images/axiscore/body-top-1.jpg",
        caption: "Storm32 BGC kontroler s vlastním napájecím rozvodem — před incident",
      },
      {
        gradient: "linear-gradient(160deg, #111 0%, #2a2020 100%)",
        image: "/images/axiscore/prot-1.png",
        caption: "Finální sestavení s BLDC motory — vyvážení pitch osy",
      },
    ],

    specs: [
      { label: "Počet os stabilizace", value: "2 (Pan / Tilt)" },
      { label: "Materiál mechaniky",   value: "PETG (tisknuté, více iterací)" },
      { label: "Motory",               value: "Servomotory" },
      { label: "Kontroler",            value: "Arduino Nano" },
      { label: "MagSafe mount",        value: "Ano" },
      { label: "Iterace prototypu",    value: "6 generací" },
    ],

    stats: [
      { number: "2", label: "osy stabilizace" },
      { number: "6", label: "iterací prototypu" },
      { number: "více", label: "tisknutých dílů" },
      { number: "1", label: "týden — finální pivot" },
    ],

    challenges: [
      {
        title: "Storm32 a BLDC — příliš komplexní",
        description:
          "Původní koncept s BLDC motory a Storm32 BGC kontrolerem skončil spálením dvou desek. Konfigurace a PID tuning byl v rámci školního projektu nezvladatelný.",
      },
      {
        title: "Pivot na Arduino a servomotory",
        description:
          "Přechod na Arduino Nano se servomotory znamenal ztrátu jedné osy. Týden do odevzdání nedovolil nic jiného.",
      },
      {
        title: "Gyroskop nestihnut",
        description:
          "Real-time vyvažování přes gyroskop a PID zůstalo cílem. Výsledný gimbal se ovládá joystickem a tlačítky — funkční, ale ne autonomní.",
      },
    ],

    designJourney: [
      {
        title: "Počáteční návrh",
        subtitle: "Hledání optimálního tvaru",
        shortDesc: "Hledání optimálního tvaru pro rozložení hmotnosti a ergonomii.",
        fullDesc: "První skici byly hrubé, ale stanovily základní L-tvarovanou nosnou strukturu typickou pro jednoruční gimbaly. Cílem bylo minimalizovat šroubové spoje a vytvořit co nejjednodušší mechanické sestavení. Rané návrhy byly příliš složité — nakonec zvítězila jednoduchost nad originalitou."
      },
      {
        title: "Vývoj konceptu",
        subtitle: "Vývoj převodového ústrojí",
        shortDesc: "Detailní řešení upevnění motorů bez vůle.",
        fullDesc: "Tohle byl největší technický oříšek — přenos točivého momentu motoru na ramena bez jakékoli vůle. Nakonec jsem zvolil přímý pohon pro Pitch a Roll osy a řemenový pohon pro Yaw osu. Každé ložisko je přesně umístěno pro minimální tření. Šest CAD iterací jen pro tuto část."
      },
      {
        title: "Finální design",
        subtitle: "Estetické dotažení",
        shortDesc: "Finální iterace s integrovaným displejem a joystickem.",
        fullDesc: "Poslední verze AxisCore. Obsahuje integrovaný displej v rukojeti a joystick pro ovládání kamery. Červené akcenty označují klíčové pohyblivé díly a zajišťovací mechanismy pro vyvažování kamery. Design prošel dalšími iteracemi pro zlepšení ergonomie — tvar rukojeti, poloha palce na joysticku, celková bilance hmotnosti."
      }
    ],
    componentBreakdown: [
      {
        title: "Hlavní tělo (Body Top)",
        category: "STRUKTURA",
        weight: "145g",
        material: "PETG",
        description: "Horní část hlavního rámu gimbalu slouží jako centrální montážní hub pro kritickou elektroniku. Tento díl nese nejvyšší mechanické zatížení a obsahuje montážní body pro všechny tři osy. Struktura využívá topologickou optimalizaci — materiál je umístěn jen tam, kde je skutečně potřeba."
      },
      {
        title: "Spodní kryt (Body Bottom)",
        category: "STRUKTURA",
        weight: "98g",
        material: "PETG",
        description: "Spodní část slouží primárně jako rychle přístupný prostor pro baterii. Design prioritizuje snadnou výměnu baterie bez nástrojů — klíčové pro terénní práci při potřebě rychlé výměny zdroje energie."
      },
      {
        title: "Rameno Y+X osy",
        category: "MECHANIKA",
        weight: "82g",
        material: "PETG",
        description: "Kritický dvouosý komponent zodpovědný za rotaci gimbalu a naklánění kamery. Musí být extrémně tuhý, přesto lehký — každý extra gram znamená vyšší zatížení motoru. Asymetrický design umožňuje vyvážení kamery během sekund bez nástrojů."
      },
      {
        title: "Rameno Z osy",
        category: "MECHANIKA",
        weight: "75g",
        material: "PETG",
        description: "Vertikální rameno zajišťuje roll osu — udržuje telefon v rovině a umožňuje rotaci na výšku/šířku. Design minimalizuje moment setrvačnosti pro rychlejší stabilizační odezvu."
      },
      {
        title: "Řídicí deska (Storm32 BGC)",
        category: "ELEKTRONIKA",
        weight: "35g",
        material: "FR4 + SMD",
        description: "Mozek celého systému — 32bit STM32 procesor, smyčka PID na 1000Hz, MPU6050 IMU senzor s přesností 0.01°. Spálil jsem první kus špatným napětím. Druhý funguje perfektně."
      },
      {
        title: "Joystick",
        category: "OVLÁDÁNÍ",
        weight: "12g",
        material: "ABS",
        description: "Analogový joystick pro manuální polohování kamery. Používá Hall-effect senzor bez mechanického opotřebení. Ergonomicky umístěn přesně tam, kde palec přirozeně spočívá."
      }
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
    inProgress: true,

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

    nextProjectSlug: "solar-carport",
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

    nextProjectSlug: "solar-carport",
  },

  {
    type: "main",
    slug: "solar-carport",
    title: "Solar Carport System",
    subtitle: "Návrh fotovoltaického přístřešku pro automobil",
    year: "2026",
    category: "Konstrukční projekt",
    heroGradient: "linear-gradient(135deg, #1a1400 0%, #2d2200 50%, #111000 100%)",
    heroTheme: "dark",
    accentColor: "#F59E0B",
    galleryLayout: "2col",
    inProgress: true,

    datasheet: [],
    caseStudy: { challenge: [], solution: [], result: [] },
    gallery: [],
    specs: [],
    stats: [],
    challenges: [],

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
        image: "/images/mini-projects/Coding.png",
        caption: "Hlavní strana — hero sekce a navigace",
      },
      {
        gradient: "linear-gradient(135deg, #1e293b 0%, #334155 60%, #475569 100%)",
        image: "/images/mini-projects/Bento-grid.png",
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
        image: "/images/mini-projects/proces-loga.jpg",
        caption: "Logo a vizuální identita — základní variace",
      },
      {
        gradient: "linear-gradient(135deg, #4c1d95 0%, #5b21b6 60%, #7c3aed 100%)",
        image: "/images/mini-projects/vuzite-logo.jpg",
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
        image: "/images/mini-projects/3D.png",
        caption: "Fusion 360 — parametrický model s ložiskovou dírou",
      },
      {
        gradient: "linear-gradient(135deg, #292524 0%, #44403c 60%, #57534e 100%)",
        image: "/images/mini-projects/Dissasambled.jpg",
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
        image: "/images/mini-projects/Sken1.jpg",
        caption: "Point cloud — vizualizace naskenovaného objektu",
      },
      {
        gradient: "linear-gradient(135deg, #0369a1 0%, #0284c7 60%, #0ea5e9 100%)",
        image: "/images/mini-projects/Sken_join.jpg",
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
        image: "/images/mini-projects/Obvod.png",
        caption: "Breadboard prototyp — ESP32 s senzorem DHT22 a OLED",
      },
      {
        gradient: "linear-gradient(135deg, #14532d 0%, #15803d 60%, #16a34a 100%)",
        image: "/images/mini-projects/PCB.png",
        caption: "KiCad schéma PCB — finální revize s SMD součástkami",
      },
    ],
  },
]
