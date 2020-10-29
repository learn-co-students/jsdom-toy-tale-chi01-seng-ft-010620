// DECLARED VARIABLES

let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const formContainer = document.querySelector(".container");
const toyForm = document.querySelector(".add-toy-form");
const toysEndpoint = `http://localhost:3000/toys`;
const toyContainer = document.getElementById("toy-collection");

// On the `index.html` page, there is a `div` with the `id` "toy-collection."

// When the page loads, make a 'GET' request to fetch all the toy objects. With the
// response data, make a `<div class="card">` for each toy and add it to the
// toy-collection `div`.

const renderToys = toysArray => {
  console.log(toysArray);
  toysArray.forEach(toy => {
    toyContainer.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  </div>`
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







// INVOKED FUNCTIONS

fetchToys()



// --------------------EVENT LISTENERS---------------------------------

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  addToy ? formContainer.style.display = "block" : formContainer.style.display = "none";
});


