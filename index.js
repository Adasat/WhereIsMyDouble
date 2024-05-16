import {data} from './characters.js'
let container = document.querySelector('#container')

function createTable() {
  let table = document.createElement('div')
  console.log(table)
  table.setAttribute('class', 'table')
  let tableHTML = ''

  

  // Función para mezclar los personajes
 /*   function mezclar(array) {
    let newArray = []
    for (let i = array.length - 1; i > 0; i--) {
      let index = Math.floor(Math.random() * array.length)
      console.log(index)
      if(newArray[index]){
        console.log('Yeah')

      }else {
        array[i].id = index
        newArray.push(array[i])
      }
    


      newArray.push(array[i])
 
    }

    return newArray
  } 
  
  const characters = mezclar(duplicados)
  console.log(characters) */
  

  for (let i = 0; i < 40; i++) {
      tableHTML += `<div class='cardContainer'><div id=${i}  class='card ${
        data[i].nombre.split(' ')[0]
      }'></div></div>`
       console.log( data[i].nombre.split(' ')[0])
    }
  table.innerHTML = tableHTML
  container.appendChild(table)
}

function showCard(item) {
  console.log(item)
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
