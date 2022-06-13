/**
 * Pure JavaScript bokeh demo
 * JS part
 */
"use strict";

// bokeh types
const TYPE_DARK_COLORFUL = 1;
const TYPE_DARK_GREEN = 2;
const TYPE_DARK_YELLOW = 3;
const TYPE_DARK_ORANGE = 4;
const TYPE_DARK_RED = 5;
const TYPE_DARK_PURPLE = 6;
const TYPE_DARK_SKYBLUE = 7;
const TYPE_BRIGHT_COLORFUL = 8;
const TYPE_BRIGHT_YELLOW = 9;
const TYPE_BRIGHT_GREEN = 10;
const TYPE_BRIGHT_RED = 11;
const TYPE_BRIGHT_SKYBLUE = 12;
const TYPE_GRAYSCALE = 13;

// parallax reaction speed
// 0(stop) ~ 1(immediate)
const SPEED = 0.1;

let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let currentIndex = 0;
const bokehs = [];
const colors = {
  colorful: ["springgreen", "yellow", "orange", "red", "purple", "deepskyblue"],
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
      case TYPE_BRIGHT_COLORFUL:
        return colors.colorful[Math.round(Math.random() * 6 - 0.5)];
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

  bokeh.id = `bokeh-${currentIndex}`;
  bokeh.style.background = color;
  bokeh.style.filter = `blur(${Math.floor((1 / zIndex) * 160)}px)`;
  bokeh.style.opacity = Math.random() * 0.4 + 0.5;
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

const loop = () => {
  mx += (x - mx) * SPEED;
  my += (y - my) * SPEED;
  window.requestAnimationFrame(loop);
};

window.onload = () => {
  for (let i = 0; i < 50; i++) {
    pushRandomBokeh(TYPE_DARK_COLORFUL);
  }

  loop();
  const increment = document.getElementById("button-increase-bokeh");
  const decrement = document.getElementById("button-decrease-bokeh");
  increment.onclick = () => {
    pushRandomBokeh(TYPE_DARK_COLORFUL);
  };
  decrement.onclick = removeRandomBokeh;
  document.addEventListener("mousemove", reactMouseMovement);
};
