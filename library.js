let myLibrary = [];
let inputTitle, inputAuthor, inputPages, inputRead = '';
const title1 = new Books("Born to run", "Christopher McDougall", "304", "false");
myLibrary.push(title1);
displayBooksFromMyLibrary(myLibrary);
//display form on click button
const openPopUp = document.getElementsByClassName('add-new-book')[0].addEventListener('click', function() {
    document.getElementById('popUpForm').style.display ='block';
});

//hide form on click button
const closePopUp = document.getElementsByClassName('cancel')[0].addEventListener('click', function() {
    document.getElementById('popUpForm').style.display ='none';
    document.getElementById('err-msg').style.display = 'none';
    clearPopUp();
});

const addBookButton = document.getElementsByClassName('confirm')[0].addEventListener('click', () => {
    inputTitle = document.getElementById('newTitle').value;
    inputAuthor = document.getElementById('newAuthor').value;
    inputPages = document.getElementById('newPages').value;
    inputRead = document.getElementById('newRead').value;
    //validation fields input
    if(inputTitle === "" || inputAuthor === "" || inputPages === "" || inputRead === "null") {
        document.getElementById('err-msg').style.display = 'block';
        return;
    } else {
        document.getElementById('err-msg').style.display = 'none';
        let newBook = new Books(inputTitle, inputAuthor, inputPages, inputRead);
        myLibrary.push(newBook);
        displayBooksFromMyLibrary(myLibrary);

        document.getElementById('popUpForm').style.display ='none';
        clearPopUp();
    }
});

const clearFieldButton = document.getElementsByClassName('clear')[0].addEventListener('click', () => {
    clearPopUp();
    document.getElementById('err-msg').style.display = 'none';
});

//manipulating existing books
document.addEventListener('click', function(e){
    //delete existing book
    if(e.target.className == "removeBook"){
        let getId = parseInt(e.target.getAttribute('data-columns'));
        myLibrary.splice(getId, 1);
        displayBooksFromMyLibrary(myLibrary);
    }
    //change readStatus for existing book
    if(e.target.className == "readStatus") {
        if (myLibrary[e.target.getAttribute('data-columns')].readStatus === "true") { //If the book is "read" pressing the button change it to "not read"
            myLibrary[e.target.getAttribute('data-columns')].readStatus = "false";
            displayBooksFromMyLibrary(myLibrary);
            
        } else if (myLibrary[e.target.getAttribute('data-columns')].readStatus === "false") { //If the book is "not read" pressing the button change it to "read"
            myLibrary[e.target.getAttribute('data-columns')].readStatus = "true";
            displayBooksFromMyLibrary(myLibrary);
        }
    }
})

//constructor for objects elements
function Books(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function displayBooksFromMyLibrary(library) {
    var booksCards, titleDisplay, authorDisplay, pagesDisplay, readDisplay, removeBook, emptyLibrary;
    clearDisplay();
    for(let i=0; i<library.length; i++) {
        booksCards = document.createElement('div');
        booksCards.className = 'books-cards';
        document.getElementsByClassName('cards')[0].appendChild(booksCards);

        removeBook = document.createElement('button');
        removeBook.className = 'removeBook';
        removeBook.dataset.columns = i;
        removeBook.innerHTML = 'Remove';

        titleDisplay = document.createElement('h3');
        titleDisplay.className = 'title';
        titleDisplay.innerText = library[i].title;

        authorDisplay = document.createElement('span');
        authorDisplay.className = 'authorName';
        authorDisplay.innerText = "By: " + library[i].author;

        pagesDisplay = document.createElement('span');
        pagesDisplay.className = 'pages';
        pagesDisplay.innerText = "Number of pages: " + library[i].pages;

        readDisplay = document.createElement('button');
        readDisplay.className = 'readStatus';
        readDisplay.dataset.columns = i;
            if (library[i].readStatus === "true") {
                readDisplay.innerText = "I already read it!";
            } else { 
                readDisplay.innerText = "I didn't read it...";
            }

        let bookClassNames = document.getElementsByClassName('books-cards');

        for (let j=0; j<bookClassNames.length; j++) {
            bookClassNames[j].appendChild(removeBook);
            bookClassNames[j].appendChild(titleDisplay);
            bookClassNames[j].appendChild(authorDisplay);
            bookClassNames[j].appendChild(pagesDisplay);
            bookClassNames[j].appendChild(readDisplay);
        }
    }
}

function clearDisplay() {
    var parent = document.getElementsByClassName('cards')[0];
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function clearPopUp() {
    document.getElementById('newTitle').value = '';
    document.getElementById('newAuthor').value = '';
    document.getElementById('newPages').value = '';
    document.getElementById('newRead').value = 'null';
}