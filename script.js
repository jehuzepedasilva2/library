const htmlBody = document.querySelector("body");
const addBookDialog = document.querySelector("dialog");
const confirmButton = addBookDialog.querySelector("#confirm-btn");
const cards = document.createElement("div");
cards.classList.add("cards");
let buttonNum = 0;
const library = [];

confirmButton.addEventListener("click", (e) => {
  e.preventDefault();
  const author = addBookDialog.querySelector("#author");
  const title = addBookDialog.querySelector("#title");
  const numPages = addBookDialog.querySelector("#num-pages");
  const addedBook = new Book(author.value, title.value, parseInt(numPages.value), false);
  addBookDialog.close();

  author.value = "";
  title.value = "";
  numPages.value = "";

  addToLibrary(addedBook);
})

function deleteBook(e) {
  const index = e.target.id;
}

function Book(author, title, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

function addToLibrary(book) {
  const div = document.createElement("div");
  div.classList.add("card");

  const title = document.createElement("h4");
  title.textContent = book.title;
  const author = document.createElement("h5");
  author.textContent = `By: ${book.author}`;
  const pages = document.createElement("h6");
  pages.textContent = `Number of Pages: ${book.numPages}`;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.id = `${buttonNum}`;
  deleteButton.addEventListener("click", e => {
    deleteBook(e);
  });

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.id = `${buttonNum}`;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z");
  path.id = `${buttonNum}`;

  library[buttonNum] = book;
  buttonNum++;

  svg.appendChild(path);
  deleteButton.appendChild(svg);
 
  div.appendChild(title)
  div.appendChild(deleteButton);
  const cardInfo = [author, pages];
  cardInfo.forEach((header) => {
    div.appendChild(header);
  })

  const formDiv = document.createElement("div");
  
  const headerDiv = document.createElement("div");
  headerDiv.textContent = "Read?";

  formDiv.appendChild(headerDiv);

  const buttonDiv = document.createElement("div");
  
  const buttonYes = document.createElement("button");
  buttonYes.id = "b-000";
  buttonYes.textContent = "YES";
  buttonYes.addEventListener("click", (e) => {
    const isRead = handleCardButton(e);
    if (isRead) {
      div.style.cssText = "border-left: 10px solid #0ea5e9";
      book.isRead = true;
    } else {
      div.style.cssText = "border-left: 10px solid #be123c";
      book.isRead = false
    }
  });
  const buttonNo = document.createElement("button");
  buttonNo.id = "b-001";
  buttonNo.textContent = "NO";
  buttonNo.addEventListener("click", (e) => {
    const isRead = handleCardButton(e);
    if (isRead) {
      div.style.cssText = "border-left: 10px solid blue";
      book.isRead = true;
    } else {
      div.style.cssText = "border-left: 10px solid red";
      book.isRead = false
    }
  })

  buttonDiv.appendChild(buttonYes);
  buttonDiv.appendChild(buttonNo);

  formDiv.appendChild(buttonDiv);

  div.appendChild(formDiv);
  cards.appendChild(div);
}

function handleCardButton(e) {
  const id = e.target.id;
  if (id === "b-000") {
    return true
  }
  return false;
}

const addButton = document.createElement("button");
addButton.classList.add("book-btn");
addButton.textContent = "ADD NEW BOOK";
addButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

htmlBody.appendChild(addButton);
htmlBody.appendChild(cards)

library.forEach(book => {
  console.log(book);
})