const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");
// ^ - Start of the string
// (?=.*\d) at least 1 digit (0-9)
// (?=.*[a-z]) at least 1 lowercase letter (a-z)
// (?=.*[A-Z]) at least 1 uppercase letter (A-Z)
// (?=.*[^a-zA-Z0-9]) at least 1  (special character) - ^ means not
// (?!.*\s) no space characters
// .{8,} - at least 8 characters
// $ - End of the string
const pattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

password.addEventListener("input", function () {
  if (password.value.match(pattern)) {
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
