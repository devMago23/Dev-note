const notesContainer = document.querySelector("#note-container");
const noteInput = document.querySelector("#note-content");
const addBtn = document.querySelector(".add-note");

 
function addNote() {
    
    const noteOBject = {
       id:generateId(),
       content: noteInput.value,
       fixed: false
    };
   
    const noteElement = createNote(noteOBject.id, noteOBject.content);
    notesContainer.appendChild(noteElement)

}

function generateId() {
    return Math.floor(Math.random()*2000)
}

let ele = 0;
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


addBtn.addEventListener("click", () => addNote())