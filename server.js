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

  response.render('index.liquid', {persons: personResponseJSON.data})
})


app.get('/', async function (request, response) {
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=website,squads.squad_id.name&filter={"squads":{"squad_id":{"name":{"_eq":"1G"}}}}')
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
app.get('/details', async function (request, response) {
  // const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,birthdate&filter={%22_and%22:[{%22fav_color%22:{%22_neq%22:%22null%22}},{%22birthdate%22:{%22_neq%22:%22null%22}},{%22squads%22:{%22squad_id%22:{%22name%22:{%22_eq%22:%221G%22}}}}]}')
  
  let personURL = 'https://fdnd.directus.app/items/person/';

  // Als we op /?sorteer=andersom zitten, voeg daar dan ?sort=-name aan toe
  if (request.query.sorteer == 'andersom') {
    personURL = personURL + '?sort=-name'
  } else {
    personURL = personURL + '?sort=name'
  }
  personURL = personURL + '&fields=name,squads.squad_id.name,bio,website,fav_color,fav_kitchen,fav_coffee,fav_animal,fav_emoji&filter={"squads":{"squad_id":{"name":{"_eq":"1G"}}}}'
  const personResponse = await fetch(personURL)
  const personResponseJSON = await personResponse.json()

  response.render('details.liquid', {persons: personResponseJSON.data})
})


app.get('/gerecht', async function (request, response) {
  const coffee = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,fav_color,fav_kitchen&filter={"_and":[{"fav_kitchen":{"_neq":"null"}},{"squads":{"squad_id":{"name":{"_eq":"1G"}}}}]}')
  const coffeeResponseJSON = await coffee.json()

  response.render('filter.liquid', {persons: coffeeResponseJSON.data})
})


app.get('/coffee', async function (request, response) {
  const coffee = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,fav_color,fav_coffee&filter={"_and":[{"fav_coffee":{"_neq":"null"}},{"squads":{"squad_id":{"name":{"_eq":"1G"}}}}]}')
  const coffeeResponseJSON = await coffee.json()

  response.render('filter.liquid', {persons: coffeeResponseJSON.data})
})


app.get('/dier', async function (request, response) {
  const coffee = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,fav_color,fav_animal&filter={"_and":[{"fav_animal":{"_neq":"null"}},{"squads":{"squad_id":{"name":{"_eq":"1G"}}}}]}')
  const coffeeResponseJSON = await coffee.json()

  response.render('filter.liquid', {persons: coffeeResponseJSON.data})
})


app.get('/emoji', async function (request, response) {
  const coffee = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,fav_color,fav_emoji&filter={"_and":[{"fav_emoji":{"_neq":"null"}},{"squads":{"squad_id":{"name":{"_eq":"1G"}}}}]}')
  const coffeeResponseJSON = await coffee.json()

  response.render('filter.liquid', {persons: coffeeResponseJSON.data})
})


// route voor een post
let messages = []

app.get('/berichten', async function (request, response) {
  response.render('messages.liquid', {messages: messages})
})

app.post('/berichten', async function (request, response) {
  console.log(request.body.tekstje)
  messages.push(request.body.tekstje);

  response.redirect(303, '/berichten')
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
