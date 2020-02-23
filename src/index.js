let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyContainer = document.getElementById("toy-collection")
const addNewToy = document.getElementsByClassName("add-toy-form")[0]

const fetchToyData = () => {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toysData => renderToyCard(toysData))
    .catch(err => console.log(err))
}

const renderToyCard = (toysData) => {
  toysData.forEach(toyData => {
    const toyCard = `<div class="card">
      <h2>${toyData.name}</h2>
      <img src=${toyData.image}="toy-avatar" />
      <p>${toyData.likes} Likes </p>
      <button data-id=${toyData.id} class="like-btn">Like <3</button>
    </div>
  `
  toyContainer.innerHTML += toyCard
  }) 
}
const toyFormShow = () => {
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  };

const postNewToy = () => {
  event.preventDefault()
  const name = addNewToy.children[1].value 
  const image = addNewToy.children[3].value 
  fetch("http://localhost:3000/toys", createPostObj(name, image))
    .then(resp => resp.json())
    .then(newToyData => newToyCard(newToyData))
    .catch(err => console.log(err))
}

const createPostObj = (name, image) => {
  return {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      name: name, 
      image: image, 
      likes: 0
    })
  }
}

const newToyCard = (newToyData) => {
  const toyCard = `<div class="card">
    <h2>${newToyData.name}</h2>
    <img src=${newToyData.image}="toy-avatar" />
    <p>${newToyData.likes} Likes </p>
    <button data-id=${toyData.id} class="like-btn">Like <3</button>
    </div>`
toyContainer.innerHTML += toyCard
}

const updateLikeObj = (likes) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json" 
    }, 
    body: JSON.stringify({likes: likes + 1})
  }
}

const likeToy = () => {
  const clicked = event.target
  if (clicked.tagName === "BUTTON") {
    const likes = parseInt(event.target.previousElementSibling.innerText.split(" ")[0])
    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, updateLikeObj(likes))
      .then(resp => resp.json())
      .then(updatedToy => renderUpdatedLikes(clicked, updatedToy))
      .catch(err => console.log(err))
  }
  
}

const renderUpdatedLikes = (clicked, updatedToy) => {
  const likesEl = clicked.previousElementSibling
  const likePluralize = updatedToy.likes === 1 ? "Like" : "Likes"
  likesEl.innerHTML = `${updatedToy.likes} ${likePluralize}`
}

addBtn.addEventListener("click", toyFormShow)
addNewToy.addEventListener("submit", postNewToy)
toyContainer.addEventListener("click", likeToy)

fetchToyData()
