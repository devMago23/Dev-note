const notesContainer = document.querySelector("#note-container");
const noteInput = document.querySelector("#note-content");
const addBtn = document.querySelector(".add-note");

function showNotes() {
    cleanNotes();
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed)
        notesContainer.appendChild(noteElement);
        
    });
}
 
function cleanNotes() {
    notesContainer.replaceChildren([])
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
  const textArea = document.createElement("textarea");

  textArea.value = content;
  textArea.placeholder = "Insira algum texto";

  element.appendChild(textArea);

  const pinIcon = document.createElement("i");
  pinIcon.classList.add(...["bi", "bi-pin"]);
    element.appendChild(pinIcon);
    
    if(fixed){
        element.classList.add("fixed")
    }

    element.querySelector(".bi-pin").addEventListener("click", ()=>{
        togleFixedNotes(id);
    })
    
    return element;
}

function togleFixedNotes(id) {

    const notes = getNotes();
    const targetNotes = notes.filter((notes)=> notes.id === id)[0]

    // se tiver fixado o botao vai desfixar 
    targetNotes.fixed = !targetNotes.fixed;
    
    saveNote(notes);
    showNotes();
    
}


function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")|| "[]");
    
    // aplica um algoritmo de ordenação 
    const orderedNotes = notes.sort((a,b) => a.fixed > b.fixed ? -1: 1);

    return orderedNotes;
}

function saveNote(notes) {
    localStorage.setItem("notes",JSON.stringify(notes));
}

addBtn.addEventListener("click", () => addNote())

showNotes();