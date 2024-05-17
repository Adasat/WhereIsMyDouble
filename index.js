import {data} from './characters.js'
let container = document.querySelector('#container')


  let counter = 0
  let double = []


function createTable() {
  let table = document.createElement('div')
  console.log(table)
  table.setAttribute('class', 'table')
  let tableHTML = ''


  console.log(data)

  for (let i = 0; i < 40; i++) {
    tableHTML += `<div class='cardContainer'>
        <div  id='${data[i].nombre.split(' ')[0]}' class='card '>
         <img src=${data[i].img} class='image' hidden />
        </div>
      </div>`
  }
  table.innerHTML = tableHTML
  container.appendChild(table)
}

function showCard(item) {
  let lastImage = item.querySelector('img')

  if (double.length < 2){
    lastImage.removeAttribute('hidden')
    item.getAttribute('id')
    double.push(item.getAttribute('id'))
  }
  console.log(double[0] === double[1])
  console.log(double)

  if (double.length === 2 && double[0] === double[1]){

    counter += 1
    double = []
  } 

  if (double.length === 2 && double[0] !== double[1]) {
    let oldImage = document.querySelector(`#${double[0]} img`)
    console.log(oldImage)
    setTimeout(() => {
      oldImage.setAttribute('hidden', true)
      lastImage.setAttribute('hidden', true)
      double = [] // Limpia el array después de ocultar las imágenes
    }, 1000)
  }

  
}

window.onload = function () {
  createTable()
  let allCards = document.querySelectorAll('.card')
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].onclick = function () {
      showCard(this)
    } // Usa 'this' para referirse al elemento actual 'td'
  }
}
