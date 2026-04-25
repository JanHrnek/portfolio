export type Project = {
  slug: string
  title: string
  subtitle: string
  year: string
  category: string
  heroGradient: string
  overview: string[]
  gallery: { gradient: string; caption: string }[]
  specs: { label: string; value: string }[]
  stats: { number: string; label: string }[]
  challenges: { title: string; description: string }[]
  nextProjectSlug: string
}

export const projects: Project[] = [
  {
    slug: "axiscore",
    title: "AxisCore",
    subtitle: "DIY 3-osý gimbal — od ambice k poučení",
    year: "2024",
    category: "Mechanika / Elektronika",
    heroGradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #111 100%)",

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
    slug: "zp8-elevator-brake",
    title: "ZP8 Elevator Brake",
    subtitle: "Bezpečnostní brzdný systém výtahu",
    year: "2025",
    category: "Týmový projekt / VUT",
    heroGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",

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

    nextProjectSlug: "axiscore",
  },
]
