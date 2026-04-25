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

    nextProjectSlug: "lemmacon",
  },

  {
    slug: "lemmacon",
    title: "Lemmacon",
    subtitle: "Automatizační systém pro průmyslové výkaznictví",
    year: "2024",
    category: "Software / Automatizace",
    heroGradient: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 50%, #ececec 100%)",

    overview: [
      "Lemmacon je sada Excel/VBA nástrojů navržená pro automatizaci opakujících se výkazů v průmyslovém prostředí. Původní proces zabíral denně hodiny ruční práce a byl náchylný k chybám při přepisování dat mezi systémy.",
      "Systém zahrnuje generátor reportů, validátor dat a export pipeline do PDF a firemního ERP. Klíčem byl návrh robustní chybové obsluhy — průmyslové prostředí nepromíjí pády makra uprostřed noční směny.",
    ],

    gallery: [
      {
        gradient: "linear-gradient(160deg, #e8e8e8 0%, #d0d0d0 100%)",
        caption: "Dashboard — přehled stavu automatizace přes směny",
      },
      {
        gradient: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
        caption: "Validační modul — kontrola integrity dat před exportem",
      },
    ],

    specs: [
      { label: "Platforma", value: "Excel / VBA" },
      { label: "Výstupní formáty", value: "PDF, CSV, ERP import" },
      { label: "Počet modulů", value: "7" },
      { label: "Ušetřený čas", value: "~3 hod / den" },
    ],

    stats: [
      { number: "7", label: "automatizovaných modulů" },
      { number: "3", label: "hodiny ušetřeny denně" },
      { number: "12", label: "výstupních formátů" },
    ],

    challenges: [
      {
        title: "Chybová obsluha v průmyslovém prostředí",
        description:
          "VBA bez správné error handling rutiny padá tiše a zanechá data v nekonzistentním stavu. Návrh rollback mechanismu pro každý kritický krok byl zásadní.",
      },
      {
        title: "Integrace s ERP systémem",
        description:
          "Každý ERP má jiný formát importu. Adaptér pro specifický zákaznický systém vyžadoval reverse engineering exportního formátu bez dokumentace.",
      },
    ],

    nextProjectSlug: "axiscore",
  },
]
