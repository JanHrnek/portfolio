Precti aktualni stav hero sekce a karuselu na hlavni strance.

Je tam HODNE chyb ktere oprav:

1. VELIKOST MODELU A OBRAZKU
Modely i obrazky jsou prilis male. Karusel kontejner musi mit
PEVNOU velikost: 500px sirka, 500px vyska na desktopu.
300px x 300px na mobilu.
Obrazky i Canvas musi vyplnit CELY tento kontejner.
Obrazky: object-fit contain, 100% sirka a vyska.
Canvas (3D model): zabira 100% kontejneru.
3D model: kamera se automaticky prisunuje tak aby model
vyplnil cely viewport Canvas (pouzij drei boundingBox nebo
nastav kameru podle velikosti modelu, fituj model do view).

2. KARUSEL JE JEN PRO 3D MODELY
Odeber PNG obrazky z karuselu uplne. Karusel bude POUZE
pro .glb 3D modely.
Nacti vsechny .glb soubory ze slozky public/models/.
Kazdy model ma svuj slide v karuselu.
Nazvy odvodis z nazvu souboru (mediamix-forma.glb = "MediaMix Forma").

3. ROTACE 360 PRED PREPNUTIM
Kazdy model se po zobrazeni POMALU OTOCI o plnych 360 stupnu
(jednu otocku). Rychlost: jedna otocka trva 6 sekund.
AZ PO DOKONCENI cele otocky se karusel PREPNE na dalsi model.
Prechod na dalsi: model fade-out (opacity 1 na 0, 0.5s),
novy model fade-in (opacity 0 na 1, 0.5s).

4. NEKONECNA SMYCKA JEDNIM SMEREM
Kdyz karusel dojede na posledni model, pokracuje PLYNULE
na prvni (loop). Zadne vraceni zpet, zadne otaceni dozadu.
Proste 1, 2, 3, 4, 1, 2, 3, 4... dokola.

5. INTERAKCE
Uzivatel muze model chytit mysi a otocit si ho.
Kdyz uzivatel drzi model, automaticka rotace se POZASTAVI.
2 sekundy po pusteni se rotace obnovi tam kde skoncil.
Na mobilu: otaceni prstem funguje, zoom VYPNUTY.

6. OSVETLENI A VZHLED
Pouzij drei Stage komponentu pro profesionalni osvetleni.
Pozadi Canvas: uplne pruhledne (alpha: true).
Pod modelem jemny stin (contactShadow z drei pokud je dostupny).
Model by mel vypadat jako renderovany produkt, ne jako
surovy CAD.

7. TECKY DOLE
Male tecky pod karuselem ukazuji ktery model je aktivni.
Aktivni tecka: accent barva, vetsi.
Klik na tecku: preskoci na ten model.

8. VYKON
Nacitej model az kdyz je jeho slide aktivni (lazy loading).
Kdyz slide neni aktivni, unmountni Canvas.
Pouzij React.Suspense s fallbackem (spinner nebo skeleton).
