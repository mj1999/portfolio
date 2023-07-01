const secHand = document.querySelector(".secs div");
const minHand = document.querySelector(".mins div");
const hrHand = document.querySelector(".hrs div");
const digiSecs = document.querySelector("#secs");
const digiMins = document.querySelector("#mins");
const digiHrs = document.querySelector("#hrs");
const laps = document.querySelector("#laps");

const rotate = function (el, ishrHand) {
  let degree = parseInt(
    getComputedStyle(el).getPropertyValue("--deg").split(" ")[0]
  );
  degree += 6;
  if (ishrHand) {
    degree *= 5;
  }
  el.style.setProperty("--deg", degree + "deg");
};
const update = function (el) {
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

function start() {
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
function stop() {
  window.clearInterval(interval1);
  window.clearInterval(interval2);
  window.clearInterval(interval3);
}
function reset() {
  window.clearInterval(interval1);
  window.clearInterval(interval2);
  window.clearInterval(interval3);
  let element = document.querySelector(".circle div");
  let degree = parseInt(
    getComputedStyle(element).getPropertyValue("--deg").split(" ")[0]
  );
  degree = 0;
  element.style.setProperty("--deg", degree + "deg");
  digiHrs.innerText = "00";
  digiMins.innerText = "00";
  digiSecs.innerText = "00";
  laps.innerHTML = "";
}
var lapNumber = 1;
function lap() {
  const listItem = document.createElement("div");
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
