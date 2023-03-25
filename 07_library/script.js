let myLibrary = [];
const main = document.getElementById("main");
const addNewBtn = document.getElementById("addNewBtn");
const formContainer = document.getElementById("formContainer");
const form = document.getElementById("form");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formCheckbox = document.getElementById("haveRead");
const submitBookBtn = document.getElementById("submitBookbtn");
const overlay = document.querySelector(".overlay");
let title;
let author;
let pages;
let haveRead;
addNewBtn.addEventListener("click", function () {
  formContainer.classList.toggle("show");
  overlay.classList.toggle("show");
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
});
document.addEventListener("click", (event) => {
  if (event.target === overlay) {
    formContainer.classList.toggle("show");
    overlay.classList.toggle("show");
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  title = formTitle.value;
  author = formAuthor.value;
  pages = formPages.value;
  if (formCheckbox.checked) {
    haveRead = "yes";
  } else {
    haveRead = "no";
  }
  let book1 = new Book(title, author, pages, haveRead);
  formContainer.classList.toggle("show");
  overlay.classList.toggle("show");
  if (bookExists(book1)) return;
  myLibrary.push(book1);
  main.innerHTML = " ";
  addBookToLibrary(myLibrary);
});
function bookExists(book) {
  return myLibrary.some(function (existing) {
    return existing.title === book.title && existing.author === book.author;
  });
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = read;
  this.info = function () {
    return `${title} by ${author}. ${pages} pages, ${read}`;
  };
}

function addBookToLibrary(books) {
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    createCard(book.title, book.author, book.pages, book.haveRead, i);
  }
}
function createCard(title, author, pages, haveRead, bookNumber) {
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("cardContainer");
  cardContainer.dataset.index = `${bookNumber}`;
  let cardTitle = document.createElement("h2");
  cardTitle.innerText = `${title}`;
  let cardAuthor = document.createElement("h3");
  cardAuthor.innerText = `${author}`;
  let cardPages = document.createElement("p");
  cardPages.innerText = `${pages}`;
  let cardRemove = document.createElement("button");
  cardRemove.innerText = "Remove";
  cardRemove.addEventListener("click", (e) => {
    e.target.parentElement.style.display = "none";
    myLibrary.splice(bookNumber, 1);
  });
  let cardMark = document.createElement("button");
  cardMark.innerText = "Mark as read";
  cardMark.style.backgroundColor = "#1b1";
  cardMark.style.marginBlockEnd = "1rem";
  cardMark.addEventListener("click", (e) => {
    myLibrary[bookNumber].haveRead = "yes";
    cardRead.style.display = "block";
    cardMark.style.display = "none";
  });
  cardContainer.appendChild(cardTitle);
  cardContainer.appendChild(cardAuthor);
  cardContainer.appendChild(cardPages);
  let cardRead = document.createElement("h4");
  cardRead.innerText = `Read`;
  cardContainer.appendChild(cardRead);
  cardRead.style.display = "none";
  if (haveRead === "yes") {
    cardRead.style.display = "block";
  }
  if (haveRead === "no") cardContainer.appendChild(cardMark);
  cardContainer.appendChild(cardRemove);
  main.appendChild(cardContainer);
}
