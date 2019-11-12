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
let simpleSenators = []
let republicans = []
let democrats = []

const allData = getAPIData('json/senators.json').then(data => {
    allSenators = data.results[0].members
    simpleSenators = makeSimpleMap(allSenators)
    republicans = filterSenators(simpleSenators, 'R')
    democrats = filterSenators(simpleSenators, 'D')
    console.log(simpleSenators)

    popDOM(simpleSenators)
})

function makeSimpleMap(allOfThem) {
  let results = allOfThem.map(senator => {
    return {
      id: senator.id,
      name: `${senator.first_name} ${senator.last_name}`,
      party: senator.party,
      age: `${calcAge(new Date(senator.date_of_birth))}`,
      gender: senator.gender,
      votes: senator.total_votes,

    }
  })
  return results
}

// Filter Examples
function filterSenators(simpleList, partyAffiliation) {
  return simpleList.filter(senator => senator.party === partyAffiliation)
}

// Reduce
const testArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 30]

const testReduce = testArray.reduce((acc, num) => {
  return acc + num
}, 0)

function totalVotes(senatorList) {
  const results = senatorList.reduce((acc, senator) => {
    return acc + senator.total_votes
  }, 0)
  return results
}

console.log(testReduce)




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
    if(senator.party === 'R') {
      img.src = 'images/004.png'
    }
    if(senator.party === 'D') {
      img.src = 'images/001.png'
    }
    if(senator.party === 'ID') {
      img.src = 'images/007.png'
    }
    // img.src = `/images/006.png`
    // img.alt = 'placeholder'
   
    let mediaContent = document.createElement('div')
    mediaContent.setAttribute('class', 'media-content')
   
    let titleP = document.createElement('p')
    titleP.setAttribute('class', 'title is-4')
    titleP.textContent = `${senator.name}`
   
    let subtitleP = document.createElement('p')
    subtitleP.setAttribute('class', 'subtitle is-6')
    // subtitleP.textContent = `${senator.state_rank}`

    let contentDiv = document.createElement('div')
    contentDiv.setAttribute('class', 'content')
    contentDiv.textContent = 'Carmalized acron squash is amazing'

    let contentBreak = document.createElement('br')
    
    let agePara = document.createElement('p')
    agePara.textContent = senator.age

    mediaContent.appendChild(titleP)
    mediaContent.appendChild(subtitleP)
    figure.appendChild(img)
    mediaLeft.appendChild(figure)
    media.appendChild(mediaLeft)
    media.appendChild(mediaContent)

    contentDiv.appendChild(contentBreak)
    contentDiv.appendChild(agePara)
    cardContent.appendChild(media)
    cardContent.appendChild
    return cardContent
}

function calcAge(dob) {
  let diff_ms = Date.now() - dob.getTime()
  let age_dt = new Date(diff_ms)

  return Math.abs(age_dt.getFullYear() - 1970)
}




// let mainArea = document.querySelector('main')
// let mainButton = document.createElement('button')
// mainButton.textContent = 'Button'
// mainArea.appendChild(mainButton)
// mainButton.addEventListener('click', function(){
//     console.log(allSenators)
// })




