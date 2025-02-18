// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Haal alle eerstejaars squads uit de WHOIS API op van dit jaar
const squadResponse = await fetch('https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const squadResponseJSON = await squadResponse.json()

// Controleer de data in je console (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(squadResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// Om Views weer te geven, heb je Routes nodig
// Maak een GET route voor de index
app.get('/', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,github_handle,fav_color&filter={%22github_handle%22:{%22_neq%22:%22null%22}}')
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // id, name, fav color en birthdate die niet null zijn
  // https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,birthdate&filter={%22_and%22:[{%22fav_color%22:{%22_neq%22:%22null%22}},{%22birthdate%22:{%22_neq%22:%22null%22}},{%22squads%22:{%22squad_id%22:{%22name%22:{%22_eq%22:%221G%22}}}}]}

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data})
})


app.get('/', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=website,squads.squad_id.name&filter={"squads":{"squad_id":{"name":{"_eq":"1G"}}}}')
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  response.render('head.liquid', {website: personResponseJSON.data})
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, '/')
})



// Maak een GET route voor een detailpagina met een request parameter id
app.get('/visitekaartjes', async function (request, response) {
  // const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,birthdate&filter={%22_and%22:[{%22fav_color%22:{%22_neq%22:%22null%22}},{%22birthdate%22:{%22_neq%22:%22null%22}},{%22squads%22:{%22squad_id%22:{%22name%22:{%22_eq%22:%221G%22}}}}]}')
  
  let personURL = 'https://fdnd.directus.app/items/person/';

  // Als we op /?sorteer=andersom zitten, voeg daar dan ?sort=-name aan toe
  if (request.query.sorteer == 'andersom') {
    personURL = personURL + '?sort=-name'
  } else {
    personURL = personURL + '?sort=name'
  }
  personURL = personURL + '&fields=id,name,squads.squad_id.name,fav_color,birthdate&filter={"_and":[{"fav_color":{"_neq":"null"}},{"birthdate":{"_neq":"null"}},{"squads":{"squad_id":{"name":{"_eq":"1G"}}}}]}'
  const personResponse = await fetch(personURL)
  const personResponseJSON = await personResponse.json()

  
  const personLink = await fetch('https://fdnd.directus.app/items/person/?fields=id,website,squads.squad_id.name&filter={"squads":{"squad_id":{"name":{"_eq":"1G"}}}}')
  const LinkResponseJSON = await personLink.json()

  response.render('visitekaartjes.liquid', {persons: personResponseJSON.data, website: LinkResponseJSON.data})
})



app.get('/schooljaar-2024-2025', async function (request, response) {
  const schoolYear = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=id,name,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}')
  const schoolYearResponseJSON = await schoolYear.json()

  response.render('visitekaartjes.liquid', {persons: schoolYearResponseJSON.data})
})


// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
