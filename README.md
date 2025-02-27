# Squad page

Ontwerp en maak een website voor je squad met Node en JSON.

De instructie vind je in: [INSTRUCTIONS](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/INSTRUCTIONS.md)

## Inhoudsopgave Squad page

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Gebruik](#gebruik)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- In de Beschrijving staat hoe je project er uit ziet, hoe het werkt en wat je er mee kan. -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->

### index pagina
Op de pagina ziet de gebruiker als eerste bewegende cirkels met de namen van studenten. Bij elke refresh van de pagina krijgen de cirkels een andere richting.
Wanneer de gebruiker met de muis over een cirkel hovert, stopt deze met bewegen. Bij een klik opent de cirkel groter, waarna de gebruiker ook de squad van die student ziet en een link naar diens GitHub-profiel.

### details pagina
Op de detail pagina staan nog steeds alle studenten van de indexpagina, maar hier kan de gebruiker meer informatie over een student lezen. Zoals een korte bio en een link naar de website.
Onderaan het kaartje staat een knop. Wanneer de gebruiker hierop klikt, verschijnt het favoriete gerecht en de favoriete koffie van de student.

### filter pagina
Op deze pagina wordt alleen de informatie weergegeven waarop is gefilterd. Dit kan het favoriete gerecht, de favoriete koffie, emoji of dier zijn.

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met Javascript gedaan en hoe? Misschien heb je een framwork of library gebruikt? -->

### HTML & liquid
#### index pagina
Deze pagina bestaat uit drie hoofdelementen: een checkbox, een label en een div.
In het label zit een article met een SVG, de naam van de student, zijn squad en een link naar zijn GitHub.
De naam, link en favoriete kleur worden ingeladen vanuit de Whois-database met Liquid. Liquid wordt ook gebruikt om een for-loop te maken die het label en article opnieuw genereert voor elke student in de database.

#### details pagina
Op deze pagina wordt ook informatie uit de database ingeladen, maar daarnaast worden if- en else-statements gebruikt.
Als een student geen website-link heeft ingevuld in Whois, toont Liquid via de else-statement de tekst "Ik heb geen website :(" op het kaartje. Favoriete kleur, gerecht, koffie, emoji en dier worden alleen weergegeven als deze in Whois zijn ingevuld, waardoor sommige kaartjes groter of kleiner zijn dan andere.

#### filter pagina
Ik heb een filter pagina gemaakt voor favoriete kleur, gerecht, koffie, emoji en dier. Met if-statements wordt gekeken of die informatie beschikbaar is.
Als de fetch-URL in server.js bijvoorbeeld alleen favoriete koffie ophaalt, dan worden alle kaartjes gevuld met de favoriete koffie soorten. Maar als de URL favoriete gerechten ophaalt, wordt nog steeds dezelfde Liquid-file gebruikt. Maar de informatie op de pagina verandert, omdat de if-statements dan alleen de gerechten laten zien.

### CSS
De checkbox en het label in de HTML worden met CSS gebruikt om te controleren of een checkbox "checked" is. Wanneer een cirkel wordt aangeklikt, wordt de checkbox geactiveerd.
In dat geval zorgt de div voor een tint over de achtergrond van de hele pagina. Dit voorkomt dat de gebruiker een andere cirkel kan aanklikken, zodat er niet meerdere open kaartjes over elkaar heen komen te staan.
Om het kaartje weer te sluiten, kan de gebruiker opnieuw op het profielkaartje klikken.

Voor het hamburger-menu in head.liquid heb ik ook een checkbox met een label gebruikt om het menu in beeld te brengen.
De hamburger SVG fungeert als label. Wanneer de gekoppelde checkbox "checked" is, draait het label 90 graden, komt de navigatie met een transition in beeld en verschijnt er een overlay over de pagina.
Als de gebruiker op deze overlay klikt, sluit het hamburger-menu weer. Dit werkt omdat de overlay ook een label is dat samen met het hamburgermenu aan dezelfde checkbox is gekoppeld.

Elke cirkel heeft twee keyframes: een voor de horizontale beweging en een voor de verticale beweging. JavaScript genereert random getallen die bepalen hoe snel en in welke richting de cirkels bewegen.
Bijvoorbeeld, als de cirkel 800ms heeft om naar de rechterkant van de pagina te bewegen, maar slechts 400ms om naar beneden te gaan, zal de cirkel diagonaal naar beneden bewegen.
Wanneer de cirkel de rand van het scherm bereikt, gaat hij weer terug naar de positie vanwaar hij kwam, omdat de alternate is aangegeven in de animatie op de cirkels.

### JavaScript
#### Index pagina
JavaScript wordt gebruikt om te luisteren naar een klik op een cirkel. Wanneer er op een cirkel wordt geklikt, krijgt alleen die cirkel een nieuwe class. Deze nieuwe class verandert de cirkel in een rechthoek en zet de elementen die eerst op display: none stonden, om naar display: block. Hierdoor worden de verborgen elementen zichtbaar en wordt de cirkel een rechthoek.

JavaScript wordt ook gebruikt om drie willekeurige getallen tussen 0 en 100 te genereren. Twee van deze getallen worden gebruikt in de keyframes om de snelheid van de animatie te bepalen. Het derde getal wordt gebruikt om elke cirkel een andere z-index te geven. Hierdoor krijgen de cirkels steeds een andere volgorde. deze 3 getallen worden als custom properties meegegeven aan de cirkels, waardoor elke cirkel in een andere richting zal bewegen, deze custom properties veranderen bij elke refresh van de pagina.


## Installatie
<!-- Bij Installatie staat stap-voor-stap beschreven hoe je de development omgeving moet inrichten om aan de repository te kunnen werken. -->

## Gebruik

## Bronnen
[stop animatie bij een hover](https://stackoverflow.com/questions/75906720/how-to-make-css-animation-slows-down-to-stop-on-hover-and-continue-moving-infin)

[random number generator](https://www.w3schools.com/js/js_random.asp)
## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
