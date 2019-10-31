import { films } from "../assets/films.js";
import { people } from "../assets/people.js";
// import { starships } from "../assets/starships.js"

let mainArea = document.querySelector("main");

films.forEach(function(film) {
  let filmDiv = document.createElement("div");
  let filmTitle = document.createElement("h1");
  let filmCrawl = document.createElement("p");

  filmTitle.textContent = film.title;
  filmCrawl.textContent = film.opening_crawl;

  filmDiv.appendChild(filmTitle);
  filmDiv.appendChild(filmCrawl);

  mainArea.appendChild(filmDiv);

  filmDiv.setAttribute('class', 'filmDiv')
});

people.forEach(person => {
  let personDiv = document.createElement("div");
  let name = document.createElement("h1");
  let gender = document.createElement("p");
  let pic = document.createElement("img");

  let charNum = getCharNumber(person.url);

  name.textContent = person.name;
  gender.textContent = "Gender: " + person.gender;
  pic.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;

  personDiv.appendChild(name);
  personDiv.appendChild(gender);
  personDiv.appendChild(pic);

  mainArea.appendChild(personDiv);

  personDiv.setAttribute('class', 'charDiv')
});

function getCharNumber(charURL) {
  let end = charURL.lastIndexOf("/");
  let charID = charURL.substring(end - 2, end);
  if (charID.indexOf("/") !== -1) {
    return charID.slice(1, 2);
  } else {
    return charID;
  }
}

const maleChar = people.filter(person => person.gender === "male");
const femaleChar = people.filter(person => person.gender === "female");
const robot = people.filter(person => person.gender === "n/a");
const herm = people.filter(person => person.gender === "hermaphrodite");

console.log(maleChar);
console.log(femaleChar);
console.log(robot);
console.log(herm);

const allDivs = Array.from(document.querySelectorAll("div"))

const mainHeader = document.querySelector('header');
let maleButton = document.createElement('button');
maleButton.textContent = 'Male Characters';

let femaleButton = document.createElement("button");
femaleButton.textContent = "Female Characters";

maleButton.addEventListener('click', () => {
  femaleChar.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
  matchedDiv.setAttribute("style", "display: none;")
  });
});

femaleButton.addEventListener('click', () => {
  femaleChar.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
    matchedDiv.setAttribute("style", "display: revert;")
  });
});

mainHeader.appendChild(maleButton)
mainHeader.appendChild(femaleButton)










/*
starships.forEach((starship) => {
    let shipDiv = document.createElement('div')
    let shipName = document.createElement('h1')
    let shipClass = document.createElement('p')
    let shipImg = document.createElement('img')

    let shipNum = getCharNumber(starship.url)

    shipName.textContent = ship.name
    shipClass.textContent = "class: " + ship.class
    pic.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`

    shipDiv.appendChild(shipName)
    shipDiv.appendChild(shipClass)
    shipDiv.appendChild(shipImg)

    mainArea.appendChild(shipDiv);
});

function getShipNumber(shipURL) {
    let end = shipURL.lastIndexOf('/')
    let shipID = shipURL.substring(end -2, end)
    if(shipID.indexOf('/') !== -1 ) {
        return shipID.slice(1, 2)
    }   else {
        return shipID
    }
}

const starDred = starships.filter(starship => ship.class === '')
const starDred = starships.filter(starship => ship.class === 'Star dreadnought')

console.log(starDred)
console.log()
*/