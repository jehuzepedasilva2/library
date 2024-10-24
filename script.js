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
  document.querySelectorAll(".delete-button svg path")[index].remove
  document.querySelectorAll(".delete-button svg")[index].remove();
  document.querySelectorAll(".card")[index].remove();
  if (index < library.length) { 
    library.splice(index, 1);
  }

  const cardsAgain = document.querySelectorAll(".card");
  const svgsAgain = document.querySelectorAll(".delete-button svg");
  const pathsAgain = document.querySelectorAll(".delete-button svg path")

  buttonNum = 0;
  for (let i = 0; i < cardsAgain.length; i++) {
    cardsAgain[i].id = `div-${buttonNum}`;
    svgsAgain[i].id = `${buttonNum}`;
    pathsAgain[i].id = `${buttonNum}`;
    buttonNum++;
  }
}

function Book(author, title, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

function addToLibrary(book) {
  const div = document.createElement("div");
  div.id = `div-${buttonNum}`;
  div.classList.add("card");

  const title = document.createElement("h4");
  title.textContent = book.title;
  const author = document.createElement("h5");
  author.textContent = `By: ${book.author}`;
  const pages = document.createElement("h6");
  pages.textContent = `${book.numPages} pages`;

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
  formDiv.classList.add("read-div");
  
  const headerDiv = document.createElement("div");
  headerDiv.textContent = "Read?";
  headerDiv.style.cssText = "font-weight: bold; margin-bottom: 8px;";

  formDiv.appendChild(headerDiv);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("toggle-div");
  
  const buttonYes = document.createElement("button");
  buttonYes.id = "b-000";
  buttonYes.textContent = "NO";

  const buttonNo = document.createElement("button");
  buttonNo.id = "b-001";
  buttonNo.classList.add("active-button")
  buttonNo.textContent = "YES";

  buttonYes.addEventListener("click", () => {
    div.style.cssText = "border-left: 20px solid red";
    book.isRead = false;
    buttonDiv.classList.remove('active-button');
    buttonYes.classList.add('active-button');
    buttonNo.classList.remove('active-button');
  });

  buttonNo.addEventListener("click", () => {
    div.style.cssText = "border-left: 20px solid #0ea5e9";
    book.isRead = true;
    buttonDiv.classList.add('active-button');
    buttonYes.classList.remove('active-button');
    buttonNo.classList.add('active-button');
  });

  buttonDiv.appendChild(buttonYes);
  buttonDiv.appendChild(buttonNo);

  formDiv.appendChild(buttonDiv);

  div.appendChild(formDiv);
  cards.appendChild(div);
}

// const addButton = document.createElement("button");
// addButton.classList.add("book-btn");
// addButton.textContent = "ADD NEW BOOK";
const addButton = document.querySelector(".book-btn")
addButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

// htmlBody.appendChild(addButton);
htmlBody.appendChild(cards)