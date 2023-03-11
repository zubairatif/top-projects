// Selecting HTML elements
const numberKeys = document.querySelectorAll("[data-number]");
const operatorKeys = document.querySelectorAll("[data-operation]");
const equalsKey = document.querySelector("[data-equals]");
const acKey = document.querySelector("[data-ac]");
const removeKey = document.querySelector("[data-remove]");
const display = document.getElementById("expression");
let operation;
let currentInput;
let previousInput;
let prevprevInput;
let result;
let answered = false; // temporary solution

//Display (Sppends) number clicked to Calculator
function appendNumber(number) {
  if (answered === true) {
    display.innerText = number;
    answered = false;
  } else {
    display.innerText += number;
  }
}
// function which calculates the expression
function equals() {
  if (previousInput == "\u00A0") {
    previousInput = 0;
  }
  let prevNum = parseFloat(previousInput);
  let curNum = parseFloat(display.innerText);
  switch (operation) {
    case "plus":
      result = add(prevNum, curNum);
      break;
    case "minus":
      result = subtract(prevNum, curNum);
      break;
    case "times":
      result = multiply(prevNum, curNum);
      break;
    case "divide":
      undefined;
      result = divide(prevNum, curNum);
      break;
    case "power":
      result = power(prevNum, curNum);
      break;
    default:
      break;
  }
  display.innerText = Number(result.toFixed(6));
  operation = undefined;
  currentInput = undefined;
  if (display.innerText === "lol!") {
    previousInput = undefined;
  } else {
    previousInput = display.innerText;
  }
  prevNum = undefined;
  curNum = undefined;
  answered = true;
}

// All clear Function resets all values to undefined
acKey.addEventListener("click", () => {
  display.innerText = "\xa0";
  operation = undefined;
  currentInput = undefined;
  previousInput = undefined;
  prevNum = undefined;
  curNum = undefined;
});

// ________ All event Listeners _______
numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    appendNumber(key.innerText);
  });
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    console.log("prevPrev INPUT:", previousInput);
    prevprevInput = previousInput;
    previousInput = display.innerText;
    operation = e.target.dataset.operation;
    display.innerText = "\xa0";
    console.log("previousInput:", previousInput);
  });
});

// Del click
removeKey.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
});
// Del when ress backspace
document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") delButton.click();
});
// number key presses on keyboard
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    appendNumber(parseInt(e.key));
  }
});

equalsKey.addEventListener("click", equals);
// Enter Key working as equals/submit
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); //prevents focused button registering
    equalsKey.click();
  }
});
// _______ Math Functions _______
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) display.innerText = "lol!";
  return a / b;
}
function power(a, b) {
  return a ** b;
}
