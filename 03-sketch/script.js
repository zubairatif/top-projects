const container = document.getElementById("container");
const colorPicker = document.getElementById("colorPicker");
let rainbowMode = false;
let eraserMode = false;
letcolorMode = false;
let gridNumber = 16;
let dimensions = 960 / gridNumber;
let color = colorPicker.value;
colorPicker.addEventListener("change", (e) => (color = e.target.value));

const squares = document.querySelectorAll(".gridSquare");
function eraseAll() {
  squares.forEach((element) => (element.style.backgroundColor = "#ffffff"));
}
function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function createGrid(squareCount) {
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
  }
}

function toggleEraser() {
  if (!eraserMode) {
    eraserMode = true;
  }
}
function toggleColorMode() {
  eraserMode = false;
  rainbowMode = false;
}
createGrid(gridNumber);
