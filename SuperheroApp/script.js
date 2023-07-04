const container = document.querySelector("#hero-container");
const searchInput = document.querySelector("#search-box");
const url = "https://gateway.marvel.com:443/v1/public/";
const authString =
  "?ts=1688376459179&apikey=4155da915e83a8dc83557befba007293&hash=412e007a781c80352c0b54570d8354c7";
const heroUrl = url + "characters" + authString;
const comicUrl = url + "comics" + authString;

const renderHome = async function () {                                                        //function to render the home page .i.e a list of first 20 characters
  container.innerHTML = "";
  const response = await fetch(heroUrl);
  const jsonData = await response.json();
  for (let element of jsonData.data["results"]) {
    container.innerHTML += `<div class="hero-card">
    <img class="hero-image" src="${
      element.thumbnail["path"] + "." + element.thumbnail["extension"]
    }" />
    <div class="hero-name">${element.name}
    </div>
    <div class="view-more">
      <button id="${element.id}">View More</button>
      <button data-id="${element.id}">Add to favourites</button>
    </div>
    `;
  }
  detailsFunction(true);
};

const renderComic = async function () {                                                       //function to render comics page, renders list of comics from the server
  container.innerHTML = "";
  const response = await fetch(comicUrl);
  const jsonData = await response.json();
  for (let element of jsonData.data["results"]) {
    container.innerHTML += `<div class="hero-card comic-card">
    <img class="hero-image comic-image" src="${
      element.thumbnail["path"] + "." + element.thumbnail["extension"]
    }" />
    <div class="hero-name  comic-name">${element.title}
    </div>
    <div class="hero-desc">
        ${element.description}
    </div>
    `;
  }
};
let favs = JSON.parse(localStorage.getItem("favs"));
let favourites = (favs)?favs:[];                                                                // if favourites present in local storage get it from there otherwise initialise new array

const renderFavs = async function () {                                                          //function to render favourites 
  container.innerHTML = "";
  for (let item of favourites) {
    const newUrl = url + "characters/" + item + authString;
    fetch(newUrl).then((response) => {
      response.json().then((jsonData) => {
        result = jsonData.data["results"][0];
        container.innerHTML += `
        <div class="hero-card">
          <img class="hero-image" src="${
            result.thumbnail["path"] + "." + result.thumbnail["extension"]
          }" />
          <div class="hero-name">${result.name}</div>
          <div class="view-more">
            <button id="${result.id}">View More</button>
            <button data-id="${result.id}">Remove from favourites</button>
          </div>
        </div>
        `;
      });
    });
  }
  window.setTimeout(detailsFunction,3000,true);
};

const getResult = async function () {                                                                   //function to render search results
  if (searchInput.value.trim().length < 1) {
    alert("input cannot be blank");
    return;
  }
  container.innerHTML = "";
  const newUrl = heroUrl + "&nameStartsWith=" + searchInput.value;
  const response = await fetch(newUrl);
  const jsonData = await response.json();
  for (let element of jsonData.data["results"]) {
    container.innerHTML += `<div  class="hero-card">
    <img class="hero-image" src="${
      element.thumbnail["path"] + "." + element.thumbnail["extension"]
    }" />
    <div class="hero-name">${element.name}
    </div>
    <div class="view-more">
      <button id="${element.id}">View More</button>
      <button data-id="${element.id}">Add to favourites</button>
    </div>
    `;
  }
  detailsFunction(true);
};
let offset = 20;
const next = async function () {                                                                            //function to render next 20 elements from the list of elements in the server
  container.innerHTML = "";
  const newHeroUrl = heroUrl + "&offset=" + offset;
  offset *= 2;
  const response = await fetch(newHeroUrl);
  const jsonData = await response.json();
  for (let element of jsonData.data["results"]) {
    container.innerHTML += `<div class="hero-card">
    <img class="hero-image" src="${
      element.thumbnail["path"] + "." + element.thumbnail["extension"]
    }" />
    <div class="hero-name">${element.name}
    </div>
    <div class="view-more">
      <button id="${element.id}">View More</button>
      <button data-id="${element.id}">Add to favourites</button>
    </div>
    `;
  }
  detailsFunction(true);
};

renderHome();

const detailsFunction = function (isChar) {                                                         // function for listening click events on view more button and add to favourite button
  console.log('out')
  if (isChar) {
    console.log('in')
    const viewDetail = document.querySelectorAll(".hero-card");
    for (el of viewDetail) {
      console.log('in-loop')
      el.addEventListener("click", function (e) {
        
        if (e.target.innerText == "View More") {
          let detailId = e.target.getAttribute("id");                                                 //if view more is clicked, the characters id is being sent as parameters to the new opened tab
          let params = new URLSearchParams();
          params.append("charID", detailId);
          window.open("hero_detail.html?" + params.toString());                                       // new tab is opened which renders character details based on the characted id sent as parameter to it
        } else if (e.target.innerText == "Add to favourites") {
          e.target.innerText='Remove from favourites';
          favourites.push(e.target.getAttribute("data-id"));
        }
        else if(e.target.innerText == "Remove from favourites"){
          e.target.innerText='Add to favourites';
          for(let i =0 ;i<favourites.length;i++)
          {
              if(favourites[i]==e.target.getAttribute("data-id")){
                console.log('yes')
                favourites.splice(i,1);
                break;
              }
          }
          renderFavs();
        }
      });
    }
    localStorage.setItem('favs',JSON.stringify(favourites));                                          //adding and updating the favourites array to the local storage
  }
};