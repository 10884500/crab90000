async function getAPIData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // use the async data
let allSenators = []
const allData = getAPIData('json/senators.json').then(data => {
    allSenators = data.results[0].members
    popDOM(allSenators)
})

const container = document.querySelector('.container')

function popDOM(senator_array) {
    senator_array.forEach(senator => {
    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    let cardImg = document.createElement('div')
    cardImg.setAttribute('class', 'card-img')
    let figure = document.createElement('figure')
    figure.setAttribute('class', 'imgage')
    let figureImg = document.createElement('img')
    figureImg.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`
    figureImg.alt = 'placeholder'

    figure.appendChild(figureImg)
    cardImg.appendChild(figure)
    card.appendChild(cardImg)
    card.appendChild(cardContent(senator))
    container.appendChild(card)
})
}

function cardContent(senator) {
    let cardContent = document.createElement('div')
    cardContent.setAttribute('class', 'card-content')
    let media = document.createElement('div')
    media.setAttribute('class', 'media')
    let mediaLeft = document.createElement('div')
    mediaLeft.setAttribute('class', 'media-left')
    let figure = document.createElement('figure')
    figure.setAttribute('class', 'image is-48x48')
    let img = document.createElement('img')
    img.src = `/images/006.png`
    img.alt = 'placeholder'
    let mediaContent = document.createElement('div')
    mediaContent.setAttribute('class', 'media-content')
    let titleP = document.createAttribute('p')
    titleP.setAttribute('class', 'title is-4')
    titleP.textContent = `${senator.first_name} ${senator.middle_name} ${senator.last_name}`
    let subtitleP = document.createElement('p')
    subtitleP.setAttribute('class', 'subtitle is-6')
    subtitleP.textContent = `${senator.state_rank}`

    mediaContent.appendChild(titleP)
    mediaContent.appendChild(subtitleP)
    figure.appendChild(img)
    mediaLeft.appendChild(figure)
    media.appendChild(mediaLeft)
    media.appendChild(mediaContent)
    cardContent.appendChild(media)
    return cardContent
}





// let mainArea = document.querySelector('main')
// let mainButton = document.createElement('button')
// mainButton.textContent = 'Button'
// mainArea.appendChild(mainButton)
// mainButton.addEventListener('click', function(){
//     console.log(allSenators)
// })




