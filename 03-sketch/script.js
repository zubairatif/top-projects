const container = document.getElementById("container");
const colorPicker = document.getElementById("colorPicker");
// let gridNumber = prompt("What res:  ");
// if (gridNumber > 64 || gridNumber < 8 || 960 % gridNumber !== 0) {
//   gridNumber = 32;
// }
let gridNumber = 16;
let dimensions = 960 / gridNumber;
let color = colorPicker.value;
colorPicker.addEventListener("change", (e) => (color = e.target.value));

// for (let i = 1; i <= gridNumber * gridNumber; i++) {
//   let gridSquare = document.createElement("div");

//   gridSquare.style.height = "dimensions";
//   gridSquare.style.width = "dimensions";
//   container.appendChild(gridSquare);
//   gridSquare.classList.add("gridSquare");
//   gridSquare.addEventListener("mouseover", (e) => {
//     if (e.ctrlKey) {
//       erase();
//     }
//     e.target.style.backgroundColor = color;
//   });
//   container;
// }
// container.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
function erase() {
  console.log(color);
  if (color !== "#ffffff") {
    color = "#ffffff";
  } else {
    color = colorPicker.value;
  }
}

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
        erase();
      }
      e.target.style.backgroundColor = color;
    });
    container;
  }
  container.style.gridTemplateColumns = `repeat(${squareCount}, 1fr)`;
}
function askCreate() {
  gridNumber = prompt("Enter the grid square's size");
  if (gridNumber > 64 || gridNumber < 8 || 960 % gridNumber !== 0) {
    gridNumber = 32;
  }
  createGrid(gridNumber);
}
createGrid(gridNumber);
