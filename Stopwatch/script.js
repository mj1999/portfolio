const secHand = document.querySelector(".secs div");
const minHand = document.querySelector(".mins div");
const hrHand = document.querySelector(".hrs div");
const digiSecs = document.querySelector("#secs");
const digiMins = document.querySelector("#mins");
const digiHrs = document.querySelector("#hrs");
const laps = document.querySelector("#laps");

const rotate = function (el, ishrHand) {
  let degree = parseInt(
    getComputedStyle(el).getPropertyValue("--deg").split(" ")[0]                       //fetching integer part of deg variable in css, changing which allows us to move the clock hands.
  );
  degree += 6;
  if (ishrHand) {                                                                      // for hr hand per 60 minutes hour hand needs to move 30deg.
    degree *= 5;
  }
  el.style.setProperty("--deg", degree + "deg");
};
const update = function (el) {                                                          // time update function, per function call time is being incremented by 1;
  let time = parseInt(el.getInnerHTML());
  time++;
  if (time % 60 == 0) {
    time = 0;
  }
  if (time / 10 >= 1) {
    el.innerText = time;
  } else {
    el.innerText = "0" + time;
  }
};
let execute = true;
function start() {                                                                      //function for starting the timer
  if (execute) {                                                                       
    interval1 = window.setInterval(() => {
      rotate(secHand, false);                                                           
      update(digiSecs);
    }, 1000);                                                                           
    interval2 = window.setInterval(() => {
      rotate(minHand, false);
      update(digiMins);
    }, 60 * 1000);
    interval3 = window.setInterval(() => {
      rotate(hrHand, false);
      update(digiHrs);
    }, 60 * 60 * 1000);
  }
  execute = false;                                                                       // to make sure function runs only once even upon clicking start multiple times        
}
function stop() {                                                                       // function for stopping the timer
  window.clearInterval(interval1);
  window.clearInterval(interval2);
  window.clearInterval(interval3);
  execute = true;
}
function reset() {                                                                      //function for reset 
  window.clearInterval(interval1);
  window.clearInterval(interval2);
  window.clearInterval(interval3);
  let element = document.querySelector(".circle div");
  let degree = parseInt(
    getComputedStyle(element).getPropertyValue("--deg").split(" ")[0]
  );
  degree = 0;                                                                           
  element.style.setProperty("--deg", degree + "deg");                                   //deg variable again initialised to 0
  digiHrs.innerText = "00";
  digiMins.innerText = "00";
  digiSecs.innerText = "00";
  laps.innerHTML = "";
  execute = true;
}
var lapNumber = 1;                                                                       
function lap() {                                                                        // function for lap
  const listItem = document.createElement("div");                                       // new lap element being added 
  listItem.innerHTML = `<span>Lap ${lapNumber}</span> <span>${
    digiHrs.getInnerHTML() +
    ":" +
    digiMins.getInnerHTML() +
    ":" +
    digiSecs.getInnerHTML()
  }</span>`;
  laps.append(listItem);
  lapNumber++;
}
