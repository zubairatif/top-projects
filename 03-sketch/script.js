const container = document.getElementById("container");
const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const singleBtn = document.getElementById("singleBtn");

let rainbowMode = false;
let eraserMode = false;
let colorMode = false;

let gridNumber = 16;
let dimensions = 960 / gridNumber;

let color = colorPicker.value;

colorPicker.addEventListener("change", (e) => (color = e.target.value));
function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function createGrid(squareCount) {
  eraserMode = false;
  rainbowMode = false;
  rainbowBtn.classList.remove("active");
  eraserBtn.classList.remove("active");
  container.innerHTML = "";
  for (let i = 1; i <= squareCount * squareCount; i++) {
    let gridSquare = document.createElement("div");

    gridSquare.style.height = "dimensions";
    gridSquare.style.width = "dimensions";
    container.appendChild(gridSquare);
    gridSquare.classList.add("gridSquare");
    gridSquare.addEventListener("mouseover", (e) => {
      if (e.ctrlKey) {
        toggleEraser();
      }
      if (eraserMode) {
        e.target.style.backgroundColor = "#ffffff";
      } else if (rainbowMode) {
        e.target.style.backgroundColor = randomColor();
      } else {
        e.target.style.backgroundColor = color;
      }
    });
    container;
  }
  container.style.gridTemplateColumns = `repeat(${squareCount}, 1fr)`;
}
function askCreate() {
  gridNumber = prompt("Enter the grid square's size");
  if (gridNumber > 64 || gridNumber < 8) {
    gridNumber = 32;
  }
  createGrid(gridNumber);
}
function toggleRainbowMode() {
  if (!rainbowMode) {
    rainbowMode = true;
    rainbowBtn.classList.add("active");
  } else {
    rainbowBtn.classList.remove("active");
  }
  if (eraserMode) {
    eraserMode = false;
    eraserBtn.classList.remove("active");
  }
}

function toggleEraser() {
  if (!eraserMode) {
    eraserMode = true;
    eraserBtn.classList.add("active");
  } else {
    toggleColorMode();
    eraserBtn.classList.remove("active");
  }
  if (rainbowMode) {
    rainbowMode = false;
    rainbowBtn.classList.remove("active");
  }
}
function toggleColorMode() {
  if (!colorMode) {
    colorMode = true;
    singleBtn.classList.add("active");
    eraserMode = false;
    rainbowMode = false;
    rainbowBtn.classList.remove("active");
    eraserBtn.classList.remove("active");
  } else {
    singleBtn.classList.remove("active");
  }
}
function eraseAll() {
  document.querySelectorAll(".gridSquare").forEach((element) => {
    element.style.backgroundColor = "#ffffff";
  });
}
createGrid(gridNumber);
