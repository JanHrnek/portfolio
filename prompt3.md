Muj stary portfolio web je na GitHubu: https://github.com/267814/267814_ZPC_2025

Udel nasledujici:

1. Naklonuj tento repozitar do docasne slozky (napr. /tmp/old-web nebo nekam do Portfolio)

2. Prozkoumej strukturu slozek a soubory, hlavne slozku images/ a HTML soubory. Podivej se na main-project.html, mini-projects.html, project-1.html az project-5.html, about.html. Zjisti jake obrazky patri k jakym projektum.

3. Zkopiruj relevantni obrazky do naseho noveho projektu:
   public/images/axiscore/ pro obrazky gimbalu
   public/images/ pro ostatni (about fotky atd)

4. V src/data/projects.ts uprav projekt AxisCore:
   Nahrad gradient placeholdery v gallery skutecnymi cestami k obrazkum.
   Vyber nejlepsi fotky ktere jsi nasel.

5. V renderovani galerie v app/projekty/[slug]/page.tsx nahrad gradient divy za next/image komponenty ktere zobrazuji skutecne obrazky.

6. Pokud najdes obrazky pouzitelne jako hero (napr. renderovany model), pouzij je jako hero pozadi pro AxisCore misto gradientu.

7. Podivej se taky na texty ve starych HTML souborech. Pokud tam najdes lepsi nebo podrobnejsi popisy projektu AxisCore nez co mame ted, aktualizuj overview a challenges v projects.ts.

Shrnni na konci co jsi nasel a co jsi pouzil.
