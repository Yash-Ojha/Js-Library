console.log("Welcome to Js Library");
showNotes();
class Book{
    constructor(getName, getAuthor, getType) {
        this.name = getName;
        this.author = getAuthor;
        this.type = getType;
    }
}

class Display{

    add(book) {
        console.log("Adding book...");
        let notes = localStorage.getItem("notes");
        if (notes == null) {
        notesObj = [];
        } else {
        notesObj = JSON.parse(notes);

        }
        let myObj = {
            book: book.name,
            author: book.author,
            type: book.type
        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
         
        showNotes();
    }
    clear() {
        let resetForm = document.getElementById("libraryForm");
        resetForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
    show(message, boldtext, classtype) {
        let msgDiv = document.getElementById('msg');
        let showALert = `<div class="alert alert-${classtype} alert-dismissible fade show box2" role="alert">
        <strong>${boldtext}</strong> ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
        msgDiv.innerHTML = showALert;
        setTimeout(() => {
            msgDiv.innerHTML = '';  
        }, 3500);
    }
}

let libraryForm = document.getElementById('libraryForm');
libraryForm = addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
    console.log("Submitting Library Form Now...");

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let comic = document.getElementById('Comic');
    let fiction = document.getElementById('Fiction');
    let programming = document.getElementById('Programs');
    let cooking = document.getElementById('Cooking');
    e.preventDefault();

    if (comic.checked) {
        type = comic.value;
    }
    else if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);
    let message;
    let boldtext;
    let classtype;
    let display = new Display();

    if (display.validate(book)) {
        boldtext = 'Success !!';
        message = 'Your Book has been added.';
        classtype = 'success';
        display.add(book);
        display.clear();
        display.show(message, boldtext, classtype);
    } else {
        boldtext = 'Oops !!';
        message = 'Book not added. Please enter a valid book.';
        classtype = 'danger';
        display.clear();
        display.show(message, boldtext, classtype);
    }
    
}

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
      html += `
      <tr class="bookRow">
      <td class="book">${element.book}</td>
      <td class="author">${element.author}</td>
      <td class="type">${element.type}</td>
      <td><center><button class="btn" id="${index}" onclick="deleteNote(this.id)"><img src="delete.png" height="30px"></center></td>
  </tr>`;
    });
    let notesElm = document.getElementById("tableBook");
    if (notesObj.length != 0) {
      notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<tr>
        <td colspan="4"><div class="jumbotron jumbotron-fluid bg-secondary p-3 box2">
          <div class="container">
            <h2>No Books added</h1>
            <hr>
            <p class="lead">Please add a new book from above.</p>
          </div>
        </div></td></tr>`;
      }

}
  
function deleteNote(index) {
    //   console.log("I am deleting", index);
  
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
  inputVal = search.value;

  let table = document.getElementsByClassName('bookRow');
  Array.from(table).forEach(function (element) {
    
    let book = element.getElementsByClassName('book')[0].innerText;
    let author = element.getElementsByClassName('author')[0].innerText;
    let type = element.getElementsByClassName('type')[0].innerText;
    
    if (book.includes(inputVal) || author.includes(inputVal) || type.includes(inputVal)) {
      element.style.display = "table-row";
    }
    else {
      element.style.display = "none";
    }

  })
})
  
