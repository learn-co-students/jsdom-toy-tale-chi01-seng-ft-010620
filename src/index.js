//global variables
let addToy = false;
const toyCollection = document.getElementById("toy-collection");
const addBtn = document.getElementById("new-toy-btn");
const toyForm = document.querySelector(".container");

//helper functions
function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyData => renderToys(toyData))
}

function renderToys(toyData) {
  for (const element of toyData) {
    renderToy(element);
  } 
}

function renderToy(element) {
  const toyCard = `
    <div data-likes="${element.likes}" class="card" id=${element.id}>
      <h2>
        ${element.name}
      </h2>
      <img src=${element.image} class="toy-avatar" />
      <p>${element.likes} Likes </p>
      <button id=${element.id} class="like-btn">Like  <3</button>
    </div>
  `;
  toyCollection.innerHTML += toyCard;
}

function createToy(e) {
  let reqObj = {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    })
  }
  postToy(reqObj);
}

function postToy(reqObj) {
  fetch('http://localhost:3000/toys', reqObj)
    .then(response => response.json())
    .then(respObj => renderToy(respObj))
}

function likeToy(e) {
  let toyToLike = e.target.parentNode
  let likeNum = (parseInt(toyToLike.dataset.likes) + 1)
  let likeObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likeNum
    })
  }
  patchLike(likeObj, toyToLike, e);
}

function patchLike(likeObj, toyToLike, e) {
  fetch(`http://localhost:3000/toys/${toyToLike.id}`, likeObj)
  .then(response => response.json())
  .then(respObj => renderNewLike(respObj, e))
  
}

function renderNewLike(respObj, e) {
  const likesView = e.target.previousElementSibling
  likesView.innerHTML = `${respObj.likes} Likes`
  likesView.parentElement.dataset.likes = respObj.likes
}



//eventListeners
document.addEventListener("submit", (e) => {
  e.preventDefault();
  createToy(e);
});

addBtn.addEventListener("click", () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if(e.target.className === "like-btn") {
    likeToy(e)
  }
});



//executed
fetchToys()
