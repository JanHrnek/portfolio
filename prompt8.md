Precti aktualni stav hlavni stranky a ModelShowcase komponentu.

SMAZ soucasny kruhovy kontejner s obrazkem. Nahrad ho
3D KARUSELEM (jako otocny stojan s brylemi v obchode).

JAK TO MA VYPADAT:
Predstav si otocny stojan. Vprede je jeden model ostry a velky.
Za nim po stranach jsou dalsi modely mensi, v perspektive,
rozmazane (blur). Kdyz se karusel toci, dalsi model prijde
dopredu a zvetsise a zaostrí se. Predchozi odjede do strany
a zmensi se a rozmazese.

TECHNICKA IMPLEMENTACE:
Pouzij framer-motion a CSS 3D transforms.
Kontejner ma perspective: 1200px.
Obrazky jsou rozmistene v kruhu pomoci rotateY a translateZ.
Napr. pro 4 obrazky: kazdy je otocen o 90 stupnu (0, 90, 180, 270).
translateZ: 300px (polomer kruhu).

Predni obrazek (rotateY 0):
  scale: 1
  opacity: 1
  filter: blur(0)
  z-index: 10

Bocni obrazky (rotateY 90 nebo -90):
  scale: 0.7
  opacity: 0.5
  filter: blur(3px)
  z-index: 5

Zadni obrazek (rotateY 180):
  scale: 0.5
  opacity: 0.2
  filter: blur(6px)
  z-index: 1

Automaticka rotace kazdych 4 sekundy (cely karusel se otoci o 90
stupnu, spring animace, stiffness 60, damping 20).

ZADNY kruhovy orez, zadny ramecek. Obrazky jsou volne, ve sve
prirozene velikosti, jen skalovane podle pozice v karuselu.

Pod karuselem je nazev aktualniho modelu ktery je vpredu.
Nazev se meni s fade animaci kdyz se karusel otoci.
Napr. "MediaMix Forma", "AxisCore Gimbal" atd.

Male tecky nebo cara dole ukazujici pozici.

INTERAKCE:
Kliknuti na bocni obrazek otoci karusel k nemu.
Na desktopu taky drag (potahnuti mysi) pro manualni otaceni.
Na mobilu swipe gesto.

ROZMERY:
Kontejner vyska: 450px na desktopu, 300px na mobilu.
Sirka: cela prava polovina hero (50vw), na mobilu 100%.
Predni obrazek: max sirka 400px, max vyska 400px, object-fit contain.

POZADI: bile/svetle, zadny gradient za karuselem.

Obrazky bere z public/images/hero/. Kazdemu obrazku prirad nazev:
slide-1.png = "MediaMix Forma"
slide-2.png = "AxisCore Gimbal"
slide-3.png = "Volleyball System"
slide-4.png = "ZP8 Brake"
Pokud obrazek neexistuje, preskoc ho.
Pokud je jen jeden, zobraz ho staticky s jemnym floating efektem.

Layout hero zustava split: text vlevo, karusel vpravo.
