const newBookBtn = document.querySelector(".newBookBtn");
newBookBtn.addEventListener("click", (e) => {});

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}. ${pages} pages, ${read}`;
  };
}
const book1 = new Book("Science", "Messi", 800, "read");
const book2 = new Book("Chemistry", "Cristiano", 532, "not read");
const book3 = new Book("Physics", "Neymar", 200, "read");
const book4 = new Book("Maths", "Haaland", 450, "not read");
const book5 = new Book("Computer", "AI", 1500, "read");
function addBookToLibrary() {}
