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

  const pinIcon2 = document.createElement("i");
  pinIcon2.classList.add(...["bi", "bi-x-lg"]);
    element.appendChild(pinIcon2);

  const pinIcon3 = document.createElement("i");
  pinIcon3.classList.add(...["bi", "bi-file-earmark-plus"]);
    element.appendChild(pinIcon3);
    
    if(fixed){
        element.classList.add("fixed")
    }

    element.querySelector("textarea").addEventListener("keyup",(e)=>{
        const noteElement  = e.target.value;
        updateNote(id, noteElement);

    })

    element.querySelector(".bi-pin").addEventListener("click", ()=>{
        togleFixedNotes(id);
    });
    
   element.querySelector(".bi-x-lg").addEventListener("click", ()=>{
        deleteNote(id,element);
    });
   
    element.querySelector(".bi-file-earmark-plus").addEventListener("click", ()=>{
        copyNote(id);
    });



    return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note)=> note.id !== id)
    saveNote(notes);

    notesContainer.removeChild(element)
    
}

function copyNote(id) {
    const notes = getNotes();
    const targetNote = notes.filter((note)=> note.id === id)[0];

    const noteOBject ={
        id: generateId(),
        content: targetNote.content,
        fixed: false,
    };
   
    
    const noteElement = createNote(noteOBject.id, noteOBject.content);
    notesContainer.appendChild(noteElement);

    notes.push(noteOBject);

    saveNote(notes);
}


function togleFixedNotes(id) {

    const notes = getNotes();
    const targetNotes = notes.filter((notes)=> notes.id === id)[0]

    // se tiver fixado o botao vai desfixar 
    targetNotes.fixed = !targetNotes.fixed;
    
    saveNote(notes);
    showNotes();
    
}



function updateNote(id, newElement) {
    const notes = getNotes();
    const targetNote = notes.filter((note)=> note.id === id)[0]
    targetNote.content = newElement;
    
    saveNote(notes)
      
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