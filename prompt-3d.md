Nainstaluj tyto balicky:
npm install three @react-three/fiber @react-three/drei

Potom uprav hero sekci na hlavni strance (src/app/page.tsx).

V karuselu na prave strane hero nahrad JEDNU polozku
(tu pro MediaMix) skutecnym interaktivnim 3D modelem.

Soubor modelu: /models/mediamix-forma.glb

Vytvor komponentu ModelViewer (src/components/ModelViewer.tsx):

1. Pouzij React Three Fiber (Canvas) a drei (useGLTF, OrbitControls,
   Stage nebo Environment pro osvetleni).

2. Model se AUTOMATICKY POMALU OTACI kolem vertikalni osy
   (Y axis, rychlost 0.005 rad za frame). Plynule, porad dokola.

3. Uzivatel MUZE model CHYTIT MYSI a otocit si ho jak chce
   (OrbitControls). Kdyz pusti, model se po 2 sekundach zacne
   zase otacet sam.

4. ZOOM povoleny koleckem mysi (omezeny rozsah, min 2, max 8).

5. Osvetleni: ambientLight intensity 0.5 + directionalLight
   z pravy shora. Pozadi pruhledne (transparent, alpha: true
   na Canvas). Nebo pouzij drei Stage komponentu pro automaticke
   hezke osvetleni.

6. Nacitani: dokud se model loaduje, zobraz spinner nebo
   "Loading..." text.

7. Na mobilu: otaceni funguje dotykem (touch events).
   Zoom vypni na mobilu (aby nescrolloval stranku divne).

V karuselu to bude takto:
Kdyz karusel ukaze MediaMix, misto PNG obrazku se zobrazi
Canvas s 3D modelem. Ostatni polozky karuselu zustanou jako
PNG obrazky.

Pokud je karusel na jine polozce nez MediaMix, NEZOBRAZUJ
Canvas (unmountni ho) aby nezatezoval vykon.

Velikost Canvas: stejne rozmery jako obrazky v karuselu.
Pozadi: transparent, splyne s pozadim stranky.
