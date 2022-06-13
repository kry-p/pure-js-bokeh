/**
 * Pure JavaScript bokeh demo
 * JS part
 */
"use strict";

// bokeh types
const TYPE_DARK_COLORFUL = 0;
const TYPE_DARK_GREEN = 1;
const TYPE_DARK_YELLOW = 2;
const TYPE_DARK_ORANGE = 3;
const TYPE_DARK_RED = 4;
const TYPE_DARK_PURPLE = 5;
const TYPE_DARK_SKYBLUE = 6;
const TYPE_BRIGHT_COLORFUL = 7;
const TYPE_BRIGHT_YELLOW = 8;
const TYPE_BRIGHT_GREEN = 9;
const TYPE_BRIGHT_RED = 10;
const TYPE_BRIGHT_SKYBLUE = 11;
const TYPE_GRAYSCALE = 12;
const TYPES = [
  "Dark multicolored",
  "Dark green",
  "Dark yellow",
  "Dark orange",
  "Dark red",
  "Dark purple",
  "Dark skyblue",
  "Bright multicolored",
  "Bright yellow",
  "Bright green",
  "Bright red",
  "Bright skyblue",
  "Grayscale",
];

// parallax reaction speed
// 0(stop) ~ 1(immediate)
const SPEED = 0.1;
// Bokeh count
const DEFAULT_BOKEH_COUNT = 50;

let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let currentIndex = 0;
let currentType = 0;
const bokehs = [];
const colors = {
  colorful: ["springgreen", "yellow", "orange", "red", "purple", "deepskyblue"],
  brightColorful: ["rgb(255, 214, 214)", "rgb(230, 230, 214)", "rgb(214, 255, 214)", "rgb(214, 230, 230)", "rgb(214, 214, 255)"],
  bright: ["white"],
};

const reactMouseMovement = (e) => {
  x = e.clientX - window.innerWidth / 2;
  y = e.clientY - window.innerHeight / 2;
  bokehs.map((bokeh) => {
    const translation = (1 / bokeh.size) * 50;
    bokeh.bokeh.style.transform = `translate(${-(mx / translation)}px, ${-(my / translation)}px)`;
  });
};

const createBokeh = (type) => {
  const generateColor = (type) => {
    switch (type) {
      case TYPE_DARK_COLORFUL:
        return colors.colorful[Math.round(Math.random() * 6 - 0.5)];
      case TYPE_BRIGHT_COLORFUL:
        return colors.brightColorful[Math.round(Math.random() * 5 - 0.5)];
      case TYPE_DARK_GREEN:
        return colors.colorful[0];
      case TYPE_DARK_YELLOW:
        return colors.colorful[1];
      case TYPE_DARK_ORANGE:
        return colors.colorful[2];
      case TYPE_DARK_RED:
        return colors.colorful[3];
      case TYPE_DARK_PURPLE:
        return colors.colorful[4];
      case TYPE_DARK_SKYBLUE:
        return colors.colorful[5];
      default:
        return colors.bright[0];
    }
  };

  const bokeh = document.createElement("div");
  const size = Math.floor(Math.random() * 10 + 2);
  const zIndex = Math.floor(size * 10 - 15);
  const color = generateColor(type);
  const opacity = type == 7 ? Math.random() * 0.7 + 0.15 : Math.random() * 0.4 + 0.3;

  bokeh.id = `bokeh-${currentIndex}`;
  bokeh.style.background = color;
  bokeh.style.filter = type == 7 ? `saturate(1.25) blur(${Math.floor((1 / zIndex) * 160)}px)` : `blur(${Math.floor((1 / zIndex) * 160)}px)`;
  bokeh.style.opacity = opacity;
  bokeh.style.position = "absolute";
  bokeh.style.width = `${size}rem`;
  bokeh.style.height = `${size}rem`;
  bokeh.style.borderRadius = `${size / 2}rem`;
  bokeh.style.overflow = "hidden";
  bokeh.style.zIndex = zIndex;
  bokeh.style.top = `${Math.floor(Math.random() * 120 - 20)}vh`;
  bokeh.style.left = `${Math.floor(Math.random() * 120 - 20)}vw`;
  bokeh.style.willChange = "filter"; // trick for Safari

  document.body.appendChild(bokeh);
  bokehs.push({ bokeh, size });
  currentIndex += 1;
};
const removeRandomBokeh = () => {
  if (bokehs.length > 0) {
    const index = Math.floor(bokehs.length * Math.random());
    const bokeh = document.getElementById(bokehs[index].bokeh.id);
    bokeh.remove();
    bokehs.splice(index, 1);
  }
};

const pushRandomBokeh = (type) => {
  createBokeh(type);
};

const setBodyColor = (type) => {
  switch (type) {
    case TYPE_BRIGHT_COLORFUL:
      document.body.style.background =
        "linear-gradient(180deg, rgba(66,113,145,1) 0%, rgba(116,177,194,1) 35%, rgba(142,155,210,1) 73%, rgba(43,66,118,1) 100%)";
      break;
    case TYPE_BRIGHT_YELLOW:
      document.body.style.background =
        "linear-gradient(180deg, rgba(240,195,52,1) 0%, rgba(221,168,5,1) 30%, rgba(251,200,54,1) 50%, rgba(251,189,34,1) 100%)";
      break;
    case TYPE_BRIGHT_GREEN:
      document.body.style.background =
        "linear-gradient(180deg, rgba(142,198,57,1) 0%, rgba(109,174,24,1) 30%, rgba(128,189,59,1) 50%, rgba(100,165,40,1) 100%)";
      break;
    case TYPE_BRIGHT_RED:
      document.body.style.background =
        "linear-gradient(180deg, rgba(253,85,90,1) 0%, rgba(245,66,73,1) 30%, rgba(239,73,82,1) 50%, rgba(223,57,66,1) 100%)";
      break;
    case TYPE_BRIGHT_SKYBLUE:
      document.body.style.background =
        "linear-gradient(180deg, rgba(88,187,232,1) 0%, rgba(54,157,207,1) 30%, rgba(73,164,214,1) 50%, rgba(46,130,186,1) 100%)";
      break;
    case TYPE_GRAYSCALE:
      document.body.style.background =
        "linear-gradient(180deg, rgba(156,155,151,1) 0%, rgba(129,128,122,1) 30%, rgba(132,131,125,1) 50%, rgba(96,95,89,1) 100%)";
      break;
    default:
      document.body.style.background = "rgb(0, 0, 0)";
  }
};

const loop = () => {
  mx += (x - mx) * SPEED;
  my += (y - my) * SPEED;
  window.requestAnimationFrame(loop);
};

const onChangeType = (text, direction) => {
  if (direction === -1) {
    currentType === 0 ? (currentType = 12) : (currentType -= 1);
  } else {
    currentType = (currentType + 1) % 13;
  }
  // remove all bokeh
  while (bokehs.length > 0) {
    const bokeh = bokehs.pop();
    bokeh.bokeh.remove();
  }
  text.innerText = TYPES[currentType];
  for (let i = 0; i < DEFAULT_BOKEH_COUNT; i++) {
    pushRandomBokeh(currentType);
  }
  setBodyColor(currentType);
};

window.onload = () => {
  for (let i = 0; i < DEFAULT_BOKEH_COUNT; i++) {
    pushRandomBokeh(currentType);
  }

  loop();
  const increment = document.getElementById("button-increase-bokeh");
  const decrement = document.getElementById("button-decrease-bokeh");
  const left = document.getElementById("button-select-left");
  const right = document.getElementById("button-select-right");
  const currentTypeName = document.getElementById("select-item");

  currentTypeName.innerText = TYPES[currentType];
  increment.onclick = () => pushRandomBokeh(currentType);
  left.onclick = () => onChangeType(currentTypeName, -1);
  right.onclick = () => onChangeType(currentTypeName, 1);

  decrement.onclick = removeRandomBokeh;
  document.addEventListener("mousemove", reactMouseMovement);
};
