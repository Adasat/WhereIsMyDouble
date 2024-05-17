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
        <div  id='${data[i].nombre.split(' ')[0]}_${i}' class='card pulse'>
         <img src=${data[i].img} class='image' hidden/>
        </div>
      </div>`
  }
  table.innerHTML = tableHTML
  container.appendChild(table)
}

function showCard(item) {
  let lastImage = item.querySelector('img')

  if (double.length < 2){
    console.log('entro aquí')
    lastImage.removeAttribute('hidden')
    item.getAttribute('id')
    double.push(item.getAttribute('id'))
  }
  console.log(double[0].split('_')[0])
  console.log(double)

  if (double.length === 2 && double[0].split('_')[0] === double[1].split('_')[0]){

    counter += 1
    double = []
  } 

  if (
    double.length === 2 &&
    double[0].split('_')[0] !== double[1].split('_')[0]
  ) {
    let oldImage = document.querySelector(`#${double[0]} img`)
    let oldItem = document.querySelector(`#${double[0]}`)
    console.log('Vieja carta ', oldImage)
    console.log('Última carta ', lastImage)

    setTimeout(() => {
      oldImage.setAttribute('hidden', true)
      lastImage.setAttribute('hidden', true)
      item.classList.remove('pulse')
      // Limpia el array después de ocultar las imágenes
    }, 1000)

    double = []
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
