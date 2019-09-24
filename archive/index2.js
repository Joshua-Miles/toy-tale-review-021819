const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// 1) ~~fetch~~

// function fetchToys(){
const fetchToys = function(){
  fetch('http://localhost:3001/toys')
    .then(function(response){
      return response.json()
    })
    .then(function(toys){
      toys.forEach(renderToyCard)
    })
}
fetchToys() 
const container = document.querySelector('#toy-collection')

// 2) put them on the page
const renderToyCard = function(toy){
  container.innerHTML = container.innerHTML + `
    <div class="card">
        <h2>${toy.name}</h2>
        <img class="toy-avatar toy-avatar-${toy.id}" src="${toy.image}" />
        <p class="toy-likes-${toy.id}">${toy.likes} likes</p>
        <button class="like-btn-${toy.id}">Like <3</button>
    </div>
  `
    const likeBtn = document.querySelector(`.like-btn-${toy.id}`)
    const toyLikes = document.querySelector(`.toy-likes-${toy.id}`)
    likeBtn.addEventListener('click', function(){
        toy.likes++  
        toyLikes.innerText = `${toy.likes} likes`
    })
}

// listen for events

// update the database

// update the page

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
