// async function getPokemonData(url) {
//   const response = await fetch(url)
//   return await response.json()
// }

class Pokemon {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

const Trevomon = new Pokemon(400, 'Trevomon')

const newPoke = document.querySelector('#newPoke')
newPoke.addEventListener('click', function() {
  popDOM(Trevomon)
})

async function getAPIData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// use returned Async data
const theData = getAPIData("https://pokeapi.co/api/v2/pokemon/?limit=25").then(data => {
  for (const pokemon of data.results) {
    getAPIData(pokemon.url).then(pokeData => {
      popDOM(pokeData)
    })
  }
})


let mainArea = document.querySelector('main')

function popDOM(single_poke) {
  let pokeDiv = document.createElement('div')
  let pokeCard = document.createElement('div')
  let pokeFront = document.createElement('div')
  let pokeBack = document.createElement('div')

  fillCardFront(pokeFront, single_poke)
  fillCardBack(pokeBack, single_poke)

  pokeDiv.setAttribute('class', 'scene')
  pokeCard.setAttribute('class', 'card')
  pokeCard.appendChild(pokeFront)
  pokeCard.appendChild(pokeBack)
  pokeDiv.appendChild(pokeCard)

  mainArea.appendChild(pokeDiv)

  pokeCard.addEventListener('click', function() {
    pokeCard.classList.toggle('is-flipped')
  })
}

function fillCardFront(pokeFront, data) {
  pokeFront.setAttribute('class', 'card_face crad_face--front')
  let name = document.createElement('h1')
  let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')
  let pokeNum = getPokeNumber(data.id)
  pokeFront.appendChild(name)
  name.textContent = `${data.name} height: ${data.height}`

    pic.src = `../images/${pokeNum}.png`

  pokeFront.appendChild(pic)
  pokeFront.appendChild(name)
}

function fillCardBack(pokeBack, data) {
  pokeBack.setAttribute('class', 'card_face crad_face--back')
  let pokeOrder = document.createElement('p')
  let pokeHP = document.createElement('h5')
  pokeOrder.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
  // pokeHP.textContent = data.stats[0].base_stat
  pokeBack.appendChild(pokeOrder)
  pokeBack.appendChild(pokeHP)
}

function getPokeNumber(id) {
  if (id < 10) return `00${id}`
  if (id > 9 && id < 100) {
    return `0${id}`
  } else return id
}


