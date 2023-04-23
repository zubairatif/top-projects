const errorDisplay = document.querySelector(".error");
const email = document.querySelector("#email");
const zipCode = document.querySelector("#zipCode");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");
let message;
// ^ - Start of the string
// (?=.*\d) at least 1 digit (0-9)
// (?=.*[a-z]) at least 1 lowercase letter (a-z)
// (?=.*[A-Z]) at least 1 uppercase letter (A-Z)
// (?=.*[^a-zA-Z0-9]) at least 1  (special character) - ^ means not
// (?!.*\s) no space characters
// .{8,} - at least 8 characters
// $ - End of the string
const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

password.addEventListener("input", function () {
  if (password.value.match(passwordPattern)) {
    password.setCustomValidity("");
  } else {
    password.setCustomValidity("Invalid");
  }
});

confirmPassword.addEventListener("input", function () {
  if (confirmPassword.value === password.value) {
    confirmPassword.setCustomValidity("");
  } else {
    confirmPassword.setCustomValidity("Invalid");
  }
});

email.addEventListener("input", () => {
  if (email.validity.typeMismatch) {
    message = "Please use the format user@domain.xyz";
    email.setCustomValidity(message);
    updateErrorDisplay("email", message);
  } else {
    email.setCustomValidity("");
  }
});

zipCode.addEventListener("input", () => {
  if (email.validity.typeMismatch) {
    message = "Enter 6 or 7 digit zip code";
    email.setCustomValidity(message);
    updateErrorDisplay("email", message);
  } else {
    email.setCustomValidity("");
  }
});

function updateErrorDisplay(element, message) {
  errorDisplay.textContent = `Error in ${element}: ${message}`;
}
