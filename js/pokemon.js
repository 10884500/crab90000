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
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// use returned Async data
const theData = getAPIData("https://pokeapi.co/api/v2/pokemon/")
.then(data => {
  for (const pokemon of data.results) {
    getAPIData(pokemon.url)
    .then(pokeData => {
      popDOM(pokeData)
    });
  }
});


let mainArea = document.querySelector("main");

function popDOM(singlePokemon) {
  let pokeDiv = document.createElement("div");

  let name = document.createElement("h1");
  let pic = document.createElement("img");

  pokeDiv.setAttribute("class", "charDivs");
  pic.setAttribute("class", "picDivs");

  let pokeNum = getPokeNumber(singlePokemon.id);

  name.textContent = `${singlePokemon.name} height: ${singlePokemon.height}`

  pic.src = `../images/${pokeNum}.png`;

  pokeDiv.appendChild(name);
  pokeDiv.appendChild(pic);



  mainArea.appendChild(pokeDiv);
}

function getPokeNumber(id) {
  if (id < 10) return `00${id}`;
  if (id > 9 && id < 100) {
    return `0${id}`;
  } else return id;
}
