const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const nameInput = document.querySelector('.name-input')
const imageInput = document.querySelector('.image-input')
const container = document.querySelector('#toy-collection')

let addToy = false

// 1) ~~fetch~~

// function fetchToys(){
const fetchToys = function(){
  fetch('http://localhost:3001/toys')
    .then(function(response){
      return response.json()
    })
    .then(function(toys){
      toys.forEach(function(toy){
        renderToyCard(toy)
      })
    })
}
fetchToys() 

// 2) put them on the page
const renderToyCard = function(toy){
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  
  const toyName = document.createElement('h2')
  toyName.append( toy.name )

  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} likes`

  const likeButton = document.createElement('button')
  likeButton.append('Like <3')
  likeButton.className = "like-btn"

  toyCard.append(
    toyName,
    toyImg,
    toyLikes,
    likeButton
  )

  container.append( toyCard )

  likeButton.addEventListener('click', function(){
    likeToy(toy)
  })
}

// Update

const likeToy = function(toy){
  toy.likes++
  toyLikes.innerText = `${toy.likes} likes`
  fetch(`http://localhost:3001/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'      
    },
    body: JSON.stringify(toy)
  })
}

const createToy = function(){
  fetch('http://localhost:3001/toys', {
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
    .then(function(response){
      return response.json()
    })
    .then(function(toy){
      renderToyCard(toy)
    })
}

toyForm.addEventListener('submit', function(e){
  e.preventDefault()
  createToy()
})

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




// OR HERE!
