const container = document.getElementById("container");
const colorPicker = document.getElementById("colorPicker");
let gridNumber = prompt("What res:  ");
if (gridNumber > 32 || gridNumber < 4 || 512 % gridNumber !== 0) {
  gridNumber = 16;
}
let dimensions = 512 / gridNumber;
let color = colorPicker.value;

for (let i = 1; i <= gridNumber * gridNumber; i++) {
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
container.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
colorPicker.addEventListener("change", (e) => (color = e.target.value));
function erase() {
  if (color === colorPicker.value) {
    color = "white";
  } else {
    color = colorPicker.value;
  }
}
function eraseAll() {
  squares.forEach((element) => (element.style.backgroundColor = "#ffffff"));
}
function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
