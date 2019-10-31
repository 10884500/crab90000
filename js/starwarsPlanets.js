import { planets } from '../assets/planets.js'

let mainArea = document.querySelector('main')

 planets.forEach(planet => {
    let planetDiv = document.createElement('div')
    let planetName = document.createElement('h2')
    let planetPic = document.createElement('img')

    let getPlanetNumber = getCharNumber(planet.url)

    planetName.textContent = planet.name
    planetPic.src = `https://starwars-visualguide.com/assets/img/planets/${planetNum}.jpg`
    
    planetPic.addEventListener('error', (event) => {
        let badImg = event.targetbadImg.src = '../images/cherrybolssom.jpeg'
    })

    planetDiv.appendChild(planetName)
    planetDiv.appendChild(planetPic)

    mainArea.appendChild(planetDiv)
    })

    function getCharNumber(charURL) {
        let end = charURL.lastIndexOf("/");
        let charID = charURL.substring(end - 2, end);
        if (charID.indexOf("/") !== -1) {
          return charID.slice(1, 2);
        } else {
          return charID;
        }
      }
