const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const nameInput = document.querySelector('.name-input')
const imageInput = document.querySelector('.image-input')
const container = document.querySelector('#toy-collection')

async function fetchToys(){
  let response = await fetch('http://localhost:3000/toys')
  let toys = await response.json()
  toys.forEach(function(toy){
    renderToyCard(toy)
  })
}

fetchToys()

const renderToyCard = function(toy){
  let toyLikes;
  container.append(
              div({ class: 'card' },
                h2(toy.name),
                img({ src: toy.image, class: 'toy-avatar' }), 
  toyLikes =    p(`${toy.likes} likes`),
                button('Like <3', {
                    class: 'like-btn',
                    click: function(){
                      toy.likes = toy.likes + 1
                      toyLikes.innerText = `${toy.likes} likes`
                      saveLikes(toy)
                    }
                })
              )
  )
}

const saveLikes = function(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'      
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  })
}

const createToy = async function(){
  let response = await fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      image: imageInput.value,
      likes: 0
    })
  })
  let toy = await response.json()
  renderToyCard(toy)
}

let addToy = false
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

toyForm.addEventListener('submit', function(e){
  e.preventDefault()
  createToy()
})