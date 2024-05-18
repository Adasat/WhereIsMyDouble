import {data} from './characters.js'
let body = document.querySelector('body')
console.log(body)
let container = document.querySelector('#container')
let screenGame 
let table
let title
let doubleCheck
let counterHTML 


let counter = 2
let timer = 0
let double = []
let timerInterval

function findTheCharacter(item) {
  return data.filter((el) => el.nombre.split(' ')[0] === item.split('_')[0])
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
  }
}

function createTable() {
  table = document.createElement('div')
  title = document.createElement('h1')
  doubleCheck = document.createElement('div')
  table.setAttribute('class', 'table')
  doubleCheck.setAttribute('id', 'player')

  title.innerHTML=`<p id=title>NAKAMA</p> `
  
  container.appendChild(title)
  
  let tableHTML = ''
  shuffle(data)

  for (let i = 0; i < 40; i++) {
    tableHTML += `
          <div id='${data[i].nombre.split(' ')[0]}_${i}' class='card pulse'></div>
        `
  }
  table.innerHTML = tableHTML
  container.appendChild(table)

  doubleCheck.innerHTML = `
  <div class='playerStat'>
    <p class='text'>Parejas restantes</p>
    <span id='find'>${counter}</span>
  </div>
  <div class='playerStat'>
    <p class='text'>Tu tiempo</p>

    <span id='timer'>${timer}</span>
  </div>
  `

  container.appendChild(doubleCheck)
}

function showCard(item) {

  if (double.length < 2){
    let character = item.getAttribute('id')
    item.classList.remove('pulse')
    item.classList.remove('flip-to-back')
    item.classList.add('characterImg')
    item.classList.add('flip-to-front')

    console.log( findTheCharacter(character)[0].img)
    item.style.setProperty('--character-image', `url(${findTheCharacter(character)[0].img})`)
    double.push( character)
  }

  console.log(double)

  if (double.length === 2 && double[0].split('_')[0] === double[1].split('_')[0]){
    counterHTML = document.querySelector('#find')
    console.log(counterHTML)
    counter -= 1
    counterHTML.innerText = counter
    double = []

    checkGameOver()
  } 

  if (
    double.length === 2 &&
    double[0].split('_')[0] !== double[1].split('_')[0]
  ) {
    let oldItem = document.querySelector(`#${double[0]}`)

    setTimeout(() => {

      oldItem.classList.remove('characterImg')
      oldItem.classList.remove('flip-to-front')
      console.log('characterImg')
      item.classList.remove('characterImg')
      item.classList.remove('flip-to-front')

      oldItem.classList.add('flip-to-back')
      oldItem.classList.add('pulse')
      item.classList.add('flip-to-back')
      item.classList.add('pulse')
      // Limpia el array después de ocultar las imágenes
      double = []
    }, 1000)

  }

  
}

function counterControl() {
  let timerclock = document.querySelector('#timer')

  const timerInterval = setInterval(() => {
    timer += 1
    timerclock.innerText = timer 
  }, 1000)
}

function startGame () {
  createTable()

  counterControl()
  let allCards = document.querySelectorAll('.card')
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].onclick = function () {
      showCard(this)
    } // Usa 'this' para referirse al elemento actual 'td'
  }
}

function restart () {
  container.removeChild(table)
  container.removeChild(title)
  container.removeChild(doubleCheck)
  clearInterval(timerInterval)

  counter = 20
  timer = 0

  onload()

}

function checkGameOver() {
  if (counter === 0) {
    setTimeout(() => {
      restart();
    }, 1000)
  }
}

function landingGame() {
  screenGame = document.createElement('div')
  screenGame.setAttribute('class', 'caratula')
  screenGame.innerHTML = `<button id='start'>START</button>`

  body.appendChild(screenGame)

  let landingButton = screenGame.querySelector('button')
  landingButton.addEventListener('click', function(){
    body.removeChild(screenGame)
    startGame()
  })
  
}

window.onload = function () {
  landingGame()


  

}
