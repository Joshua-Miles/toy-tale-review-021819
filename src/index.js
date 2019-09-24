const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const nameInput = document.querySelector('.name-input')
const imageInput = document.querySelector('.image-input')
const toyCollection = document.querySelector('#toy-collection')

// ~~1) When the page loads, make a 'GET' request to fetch all the toy objects.~~ 
// ~~2) With the response data, make a `<div class="card">` for each toy and ~~
// ~~3) add it to the toy-collection div.~~
// * ~~h2 tag with the toy's name~~
// * ~~image tag with the src of the toy's image attribute - needs a class name of "toy-avatar"~~
// * ~~p tag with how many likes that toy has~~
// * ~~button tag with an class of "like-btn"~~

function fetchToys(){
    fetch('http://localhost:3000/toys')
        .then(function(response){
            return response.json()
        })
        .then(function(toys){
            toys.forEach(function(toy){
                const toyCard = document.createElement('div')
                toyCard.setAttribute('class', 'card')
                toyCollection.append(toyCard)

                const toyName = document.createElement('h2')
                toyName.innerText = toy.name
                toyCard.append(toyName)

                const toyImage = document.createElement('img')
                toyImage.setAttribute('src', toy.image)
                toyImage.setAttribute('class', 'toy-avatar')
                toyCard.append(toyImage)

                const toyLikes = document.createElement('p')
                toyLikes.innerText = `${toy.likes} Likes`
                toyCard.append(toyLikes)

                const likeButton = document.createElement('button')
                likeButton.innerText = `<3 Like`
                likeButton.setAttribute('class', 'like-btn')
                toyCard.append(likeButton)

                likeButton.addEventListener('click', function(){
                    toy.likes++
                    toyLikes.innerText = `${toy.likes} Likes`
                    fetch(`http://localhost:3000/toys/${toy.id}`, {
                        method: 'PATCH',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            likes: toy.likes
                        })
                    })
                })
            })
            // for(let i = 0; i < toys.length; i++){
            //     let toy = toys[i]
            // }
        })

}

fetchToys()


toyForm.addEventListener('submit', function(e){
    e.preventDefault()

    fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value,
            image: imageInput.value
        })
    })
    .then( function(response){
        return response.json()
    })
    .then( function(toy){
        const toyCard = document.createElement('div')
        toyCard.setAttribute('class', 'card')
        toyCollection.append(toyCard)

        const toyName = document.createElement('h2')
        toyName.innerText = toy.name
        toyCard.append(toyName)

        const toyImage = document.createElement('img')
        toyImage.setAttribute('src', toy.image)
        toyImage.setAttribute('class', 'toy-avatar')
        toyCard.append(toyImage)

        const toyLikes = document.createElement('p')
        toyLikes.innerText = `${toy.likes} Likes`
        toyCard.append(toyLikes)

        const likeButton = document.createElement('button')
        likeButton.innerText = `<3 Like`
        likeButton.setAttribute('class', 'like-btn')
        toyCard.append(likeButton)

        likeButton.addEventListener('click', function(){
            toy.likes++
            toyLikes.innerText = `${toy.likes} Likes`
            fetch(`http://localhost:3000/toys/${toy.id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    likes: toy.likes
                })
            })
        })
    })
})


let addToy = false
addBtn.addEventListener('click', function(){
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})