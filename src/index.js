// DECLARED VARIABLES

let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const formContainer = document.querySelector(".container");
const toyForm = document.querySelector(".add-toy-form");
const toysEndpoint = `http://localhost:3000/toys`;
const toyContainer = document.getElementById("toy-collection");



// DEFINED FUNCTIONS

const renderIndividualToy = toy => {
  let likeValue = `${toy.likes}`;
  let ternary = likeValue === "1" ? "Like" : "Likes"
  toyContainer.innerHTML += `<div class="card" data-id="${toy.id}">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${likeValue} ${ternary}</p>
    <button class="like-btn">Like <3</button>
  </div>`
}

const renderToys = toysArray => {
  toyContainer.innerHTML = ``
  toysArray.forEach(toy => {
    renderIndividualToy(toy)
  })
}

const fetchToys = () => {
  fetch(toysEndpoint)
    .then(resp => resp.json())
    .then(toysArray => {
      renderToys(toysArray);
    })
    .catch(err => console.log(err))
}

const handlePostToy = e => {
  e.preventDefault()
  const formData = {
    name: e.target["name"].value,
    image: e.target["image"].value,
    likes: 0
  }
  e.target.reset();

  const reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch(toysEndpoint, reqObj)
    .then(resp => resp.json())
    .then(data => {
      renderIndividualToy(data)
    })
    .catch(err => console.log(err))
}

const handleLikeButton = e => {
  const toyId = e.target.parentElement.dataset.id;
  const likeCount = parseInt(e.target.parentElement.children[2].innerText.split(" ")[0])
  const likeData = {
    id: toyId,
    likes: likeCount + 1
  }
  const reqObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(likeData)
  }
  fetch(toysEndpoint + `/${toyId}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      fetchToys()
    })
    .catch(err => console.log(err))

}





// INVOKED FUNCTIONS

fetchToys()



// --------------------EVENT LISTENERS---------------------------------

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  addToy ? formContainer.style.display = "block" : formContainer.style.display = "none";
});

toyForm.addEventListener("submit", handlePostToy)

document.addEventListener("click", (e) => {
  if (e.target.className === "like-btn") {
    handleLikeButton(e);
  }
});
