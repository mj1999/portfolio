const container = document.querySelector("#detailed-display");
const params = new URLSearchParams(window.location.search);
const charID = params.get("charID");                                                            // fetches parameters from the url
const authString =
  "?ts=1688376459179&apikey=4155da915e83a8dc83557befba007293&hash=412e007a781c80352c0b54570d8354c7";
const url = " https://gateway.marvel.com:443/v1/public/characters/";

const renderDetails = async function () {                                                       //function to render details of the character on the new tab
  container.innerHTML = "";
  const newUrl = url + charID + authString;
  const response = await fetch(newUrl);
  const jsonData = await response.json();
  const result = jsonData.data["results"][0];
  container.innerHTML = `
    <div class="details">
        <img class="details-img" src="${
          result.thumbnail["path"] + "." + result.thumbnail["extension"]
        }" alt="${result.name}+' picture">
        <div class="name-desc">
            <div class="details-name">
            ${result.name}
            </div>
            <div class="description">${
              result.description.trim().length == 0
                ? "<b>No description available</b>"
                : result.description
            }</div>
        </div>
    </div>
    <div id="information"> 
        <h2>Comics</h2>
        <div id="details-comics-display">
        </div>
        <h2>Series</h2>
        <div id="details-series-display">
        </div>
        
    </div>
        
   
    `;
  const comicContainer = document.getElementById("details-comics-display");
  for (let el of result.comics.items) {                                                           // renders comic items assosciated with the character
    const comicCard = document.createElement("div");
    comicCard.classList.add("details-info-card");
    fetchData(el.resourceURI).then((comicResult) => {
      comicCard.innerHTML = `
        <img src="${
          comicResult.thumbnail["path"] +
          "." +
          comicResult.thumbnail["extension"]
        }">
        <div class="details-comic-name">
            ${comicResult.title}
        </div>`;
      comicContainer.append(comicCard);
    });
    // console.log(comicResult);
  }
  const seriesContainer = document.getElementById("details-series-display");                    // renders series items assosciated with the character
  for (let el of result.series.items) {
    const seriesCard = document.createElement("div");
    seriesCard.classList.add("details-info-card");
    fetchData(el.resourceURI).then((seriesResult) => {
      seriesCard.innerHTML = `
        <img src="${
          seriesResult.thumbnail["path"] +
          "." +
          seriesResult.thumbnail["extension"]
        }">
        <div class="details-series-name">
            ${seriesResult.title}
        </div>`;
      seriesContainer.append(seriesCard);
    });
  }

  if (result.events.items.length > 0) {                                                         // renders events items assosciated with the character 'if present'
    const heading = document.createElement("h2");
    heading.innerText = "Events";
    const eventCard = document.createElement("div");
    eventCard.setAttribute("id", "details-events-display");
    document.getElementById("information").append(heading, eventCard);
  }
  const eventsContainer = document.getElementById("details-events-display");
  for (let el of result.events.items) {
    console.log(el);
    const eventsCard = document.createElement("div");
    eventsCard.classList.add("details-info-card");
    fetchData(el.resourceURI).then((eventsResult) => {
      eventsCard.innerHTML = `
      <img src="${
        eventsResult.thumbnail["path"] +
        "." +
        eventsResult.thumbnail["extension"]
      }">
      <div class="details-events-name">
          ${eventsResult.title}
      </div>`;
      eventsContainer.append(eventsCard);
    });
  }
};
const fetchData = async function (uri) {
  const dataUrl = uri + authString;
  const dataResponse = await fetch(dataUrl);
  const newjsonData = await dataResponse.json();
  const dataResult = newjsonData.data["results"][0];
  return dataResult;
};

renderDetails();                                                                                  
