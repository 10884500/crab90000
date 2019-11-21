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


  // picDivs.onmouseover = function() {
  //   picDivs.classList.toggle('bounce');
  // };

  // picDivs.onmouseleave = function() {
  //   picDivs.classList.toggle('bounce');
  // };
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

  pic.onmouseleave = function() {
    pic.classList.toggle('bounce');
  };
}

function fillCardBack(pokeBack, data) {
  pokeBack.setAttribute('class', 'card__face card__face--back')
  let pokeOrder = document.createElement('p')
  let pokeHP = document.createElement('p')
  let pokeHieght = document.createElement('p')
  pokeOrder.textContent = `#${data.id}`
  pokeHP.textContent = 'Base health: ' + data.stats[0].base_stat
  pokeHieght.textContent = 'height: ' + `${data.height}`
  pokeBack.appendChild(pokeOrder)
  pokeBack.appendChild(pokeHP)
  pokeBack.appendChild(pokeHieght)
}

function getPokeNumber(id) {
  if (id < 10) return `00${id}`
  if (id > 9 && id < 100) {
    return `0${id}`
  } else return id
}



// pokeOrder.sort((a, b) => a.pokeId - b.pokeId)
