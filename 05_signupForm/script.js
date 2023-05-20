const errorDisplay = document.querySelector(".error");
const email = document.querySelector("#email");
const names = document.querySelectorAll(".name");
const zipCode = document.querySelector("#zipCode");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");
let message;

names.forEach((name) =>
  name.addEventListener("input", function () {
    if (name.validity.valid) {
      name.setCustomValidity("");
    } else {
      name.setCustomValidity("Only alphabets allowed");
      showError(name);
    }
  })
);
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
    password.setCustomValidity("Please enter a valid password");
    showError(password);
  }
  password.reportValidity();
});

confirmPassword.addEventListener("input", function () {
  if (confirmPassword.value === password.value) isValid();
  else {
    confirmPassword.setCustomValidity("PLease Enter the same password.");
    showError(confirmPassword);
  }
  confirmPassword.reportValidity();
});

email.addEventListener("input", () => {
  if (email.validity.valid) isValid();
  else {
    showError(email);
  }
  email.reportValidity();
});

zipCode.addEventListener("input", () => {
  if (zipCode.validity.valid) isValid();
  else if (zipCode.validity.patternMismatch) {
    message = "6 or 7 digit alphanumeric zip code";
    showError(zipCode);
  } else {
    message = "";
  }
  zipCode.setCustomValidity(message);
  zipCode.reportValidity();
});

function showError(field) {
  errorDisplay.classList.add("active");
  console.log(field);
  if (field.validity.typeMismatch) {
    errorDisplay.textContent = `Entered value needs to be: ${field}`;
  } else if (field.validity.tooShort) {
    errorDisplay.textContent = `Input should be at least ${field.minLength} characters; you entered ${field.value.length}.`;
  }
  switch (field) {
    case email: {
      console.log("is email");
      errorDisplay.textContent = "valid email like name@domain.tld";
      break;
    }
    case zipCode: {
      console.log("is zipCode");
      errorDisplay.textContent = "valid 6-7 digit UK  zipcode";
      break;
    }
    case password: {
      console.log("is Password");
      if (password.value.indexOf(" ") >= 0) {
        errorDisplay.textContent = "Password must NOT have white spaces ";
        break;
      }
      errorDisplay.textContent = "Password must match the requiremnets given ";
      break;
    }
    case confirmPassword: {
      console.log("is Confirm Password");
      errorDisplay.textContent = "Please Enter the same password.";
      break;
    }
    case country: {
      console.log("is Country");
      errorDisplay.textContent = "Only Alphabets in country.";
      break;
    }
    case names[0]: {
      console.log("is First Name");
      errorDisplay.textContent = "Only Alphabets in First Name.";
      break;
    }
    case names[1]: {
      console.log("is Last Name");
      errorDisplay.textContent = "Only Alphabets in Last Name.";
      break;
    }
    default: {
      console.log("Please Recheck");
      errorDisplay.textContent = "Please Recheck";
      break;
    }
  }
}
function isValid() {
  errorDisplay.classList.remove("active");
  errorDisplay.textContent = "All Good :)";
}
