const numberKeys = document.querySelectorAll("[data-number]");
const operatorKeys = document.querySelectorAll("[data-operation]");
const equalsKey = document.querySelector("[data-equals]");
const acKey = document.querySelector("[data-ac]");
const removeKey = document.querySelector("[data-remove]");
const currentExpression = document.querySelector("#currentExpression");
const previousExpression = document.querySelector("#previousExpression");
let operation;
let currentInput;
let previousInput;

window.onload = function () {
  currentExpression.focus();
};

function allClear() {
  previousExpression.innerText = "\xa0";
  currentExpression.value = "";
  operation = undefined;
}
acKey.addEventListener("click", allClear);

function appendNumber(number) {
  currentExpression.value += number;
}

numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    appendNumber(key.innerText);
  });
});

// function appendOperator(operator, currentInput, previousInput) {
function appendOperator(operator, previousInput) {
  previousExpression.innerText = `${previousInput} ${operator}`;
  currentExpression.value = "";
}

operatorKeys.forEach((key) => {
  key.addEventListener("click", () => {
    console.log("Hellos");
    // currentInput = previousExpression.innerText;
    previousInput = currentExpression.value;
    console.log(
      "currentInput: ",
      currentInput,
      "previousInput:",
      previousInput
    );
    // appendOperator(key.innerText, currentInput, previousInput);
    appendOperator(key.innerText, previousInput);
  });
});

equalsKey.addEventListener("click", () => {
  currentInput = currentExpression.value;
  let res = parseFloat(currentInput) + parseFloat(previousInput);
  currentExpression.value = res;
  previousExpression.innerText = "\xa0";
});
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
  return a / b;
}
function power(a, b) {
  return a ** b;
}
