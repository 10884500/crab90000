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
  pokeDiv.setAttribute('id', `${single_poke.types[0].type.name}`)

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

  let pokeType = document.createElement('p')
  pokeType.setAttribute('class', `${data.types[0].type.name}`)
    pokeType.textContent = `${data.types[0].type.name}`


  let pic = document.createElement('img')
    pic.setAttribute('class', 'sprites')
  pokeOrder.textContent = `#${data.id}`

  pokeHP.textContent = 'Base Hit Points: ' + `${data.stats[5].base_stat}`

  let pokeNum = getPokeNumber(data.id)

  pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${pokeNum}MS.png`

  pokeBack.appendChild(pic)
  pokeBack.appendChild(pokeOrder)
  pokeBack.appendChild(pokeType)
  pokeBack.appendChild(pokeHP)
}

function getPokeNumber(id) {
  if (id < 10) return `00${id}`
  if (id > 9 && id < 100) {
    return `0${id}`
  } else return id
}

// pokeOrder.sort((a, b) => a.pokeId - b.pokeId)

let types = [
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

filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("scene");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "showpoke");
    if (x[i].id.indexOf(c) > -1) w3AddClass(x[i], "showpoke");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
