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

const newPoke = document.querySelector('#newPoke')
newPoke.addEventListener('click', function() {
  let pokeId = prompt('Please enter Pokemon ID')
  if (pokeId > 0 && pokeId <= 807) {
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
  .then(result => {
    popDOM(result)
  })
    } else {
      alert('There are no pokemon with that ID. Please choose another.')
  }
})

// async function getHP(pokeId) {
//   getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(pokemon => {
//     const HP = pokemon.stats.find(element => {
//       return element.stat.name === "hp"
//     })
//     return HP.base_stat
//   })
// }

async function getAPIData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    // const HP = await getHP(data.id)
    // data.hp = HP
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
  pokeFront.setAttribute('class', 'card__face card__face--front')
  let name = document.createElement('h3')
  let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs', 'animated bounce')
  let pokeNum = getPokeNumber(data.id)
  name.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
  pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`
  pokeFront.appendChild(pic)
  pokeFront.appendChild(name)

  pic.onmouseover = function() {
    pic.classList.toggle('bounce');
  };

  // pic.onmouseleave = function() {
  //   pic.classList.toggle('bounce');
  // };

  // pokeFront.onmouseover = function() {
  //   pokeFront.classList.toggle('wobble');
  // };

  pic.onmouseleave = function() {
    pic.classList.toggle('wobble');
  };


}

function fillCardBack(pokeBack, data) {
  pokeBack.setAttribute('class', 'card__face card__face--back')
  let pokeOrder = document.createElement('p')
  let pokeHP = document.createElement('p')
  
  let pic = document.createElement('img')
    pic.setAttribute('class', 'sprites')
  pokeOrder.textContent = `#${data.id}`

  pokeHP.textContent = 'Base Hit Points: ' + `${data.stats[5].base_stat}`

  let pokeNum = getPokeNumber(data.id)

  pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${pokeNum}MS.png`

  pokeBack.appendChild(pic)
  pokeBack.appendChild(pokeOrder)
  pokeBack.appendChild(pokeHP)
}

function getPokeNumber(id) {
  if (id < 10) return `00${id}`
  if (id > 9 && id < 100) {
    return `0${id}`
  } else return id
}




// pokeOrder.sort((a, b) => a.pokeId - b.pokeId)


let typeDrop = [
  "fire",
  "flying",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water"
];

function color(type) {
  if (type === "fire") {
    return "#EE8130";
  } else if (type === "flying") {
    return "#A98FF3";
  } else if (type === "bug") {
    return "#A6B91A";
  } else if (type === "dark") {
    return "#705746";
  } else if (type === "dragon") {
    return "#6F35FC";
  } else if (type === "electric") {
    return "#F7D02C";
  } else if (type === "fairy") {
    return "#D685AD";
  } else if (type === "fighting") {
    return "#C22E28";
  } else if (type === "ghost") {
    return "#735797";
  } else if (type === "grass") {
    return "#7AC74C";
  } else if (type === "ground") {
    return "#E2BF65";
  } else if (type === "ice") {
    return "#96D9D6";
  } else if (type === "normal") {
    return "#A8A77A";
  } else if (type === "poison") {
    return "#A33EA1";
  } else if (type === "psychic") {
    return "#F95587";
  } else if (type === "rock") {
    return "#B6A136";
  } else if (type === "steel") {
    return "#B7B7CE";
  } else if (type === "water") {
    return "#6390F0";
  }
}