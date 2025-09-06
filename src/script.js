const notesContainer = document.querySelector("#note-container");
const noteInput = document.querySelector("#note-content");
const addBtn = document.querySelector(".add-note");

function showNotes() {
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed)
        notesContainer.appendChild(noteElement);
        
    });
}
 
function addNote() {
    const notes = getNotes();
    const noteOBject = {
       id:generateId(),
       content: noteInput.value,
       fixed: false,
    };
   
    const noteElement = createNote(noteOBject.id, noteOBject.content);
    notesContainer.appendChild(noteElement);

    notes.push(noteOBject);

    saveNote(notes);
    
    noteInput.value ="";
}

function generateId() {
    return Math.floor(Math.random()*2000)
}

function createNote(id, content, fixed) {
   const element = document.createElement("div");
   element.classList.add("note");
  console.log(`qntd de container com classe note ${document.querySelectorAll(".note").length}`);
  const textArea = document.createElement("textarea");

  textArea.value = content;
  textArea.placeholder = "Insira algum texto";

  element.appendChild(textArea);
  return element;
  
}

function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")|| "[]");
    return notes;
}

function saveNote(notes) {
    localStorage.setItem("notes",JSON.stringify(notes));
}

addBtn.addEventListener("click", () => addNote())

showNotes();