const $ = document;
const addBox = $.querySelector(".add-box"),
  popupBox = $.querySelector(".popup-box"),
  popupTitle = $.querySelector(".title-modal"),
  popupClose = $.querySelector(".colse-modal"),
  inputElem = $.querySelector("input"),
  textareaElem = $.querySelector("textarea"),
  addNoteBtn = $.querySelector("button"),
  wrapperElem = $.querySelector(".wrapper");

let notes = [];
let isUpdate = false;

addBox.addEventListener("click", () => {
  if (isUpdate) {
    popupTitle.innerHTML = "Update Note";
    addNoteBtn.innerHTML = "update Note";
  } else {
    popupTitle.innerHTML = "Add a new Note";
    addNoteBtn.innerHTML = "Add Note";
  }

  inputElem.focus();
  popupBox.classList.add("show");
});

//closeing modal
popupClose.addEventListener("click", closeModal);

function closeModal() {
  popupBox.classList.remove("show");
}

addNoteBtn.addEventListener("click", () => {
  const newNote = {
    title: inputElem.value,
    description: textareaElem.value,
    date: getNowDate(),
  };

  notes.push(newNote);
  setNotesInLocalStorage(notes);
  closeModal();
  generateNotes(notes);
  clearInputs();
});

function getNowDate() {
  let now = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let newDay = now.getDay();
  let newMonth = now.getMonth();
  let newYear = now.getFullYear();
  let datOfMonth = now.getDate();

  return `${months[newMonth]} ${datOfMonth}, ${newYear} (${days[newDay]})`;
}

function clearInputs() {
  inputElem.value = "";
  textareaElem.value = "";
}

function getLocalStorageNotes() {
  let localStorageNotes = localStorage.getItem("notes");

  if (localStorageNotes) {
    notes = JSON.parse(localStorageNotes);
  } else {
    notes = [];
  }

  return notes;
}

function generateNotes(notes) {
  //delet all note in dom
  $.querySelectorAll(".note").forEach((note) => note.remove());

  notes.forEach((note, index) => {
    wrapperElem.insertAdjacentHTML(
      "beforeend",
      `
        <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showSetting(this)"></i>
            <ul class="menu">
              <li onclick="editNote({index}, '{note.title}', '{note.description}')">
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="removeNote(${index})">
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
        `
    );
  });
}

function removeNote(noteIndex) {
  let questionDeletNote = confirm("Are you sure to Delete Note !?");

  if (questionDeletNote) {
    let newNotes = getLocalStorageNotes();
    newNotes.splice(noteIndex, 1);
    setNotesInLocalStorage(newNotes);
    generateNotes(newNotes);
  }
}

function showSetting(el) {
  el.parentElement.classList.add("show");
}

function setNotesInLocalStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

window.addEventListener("load", () => {
  let notes = getLocalStorageNotes();
  generateNotes(notes);
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") closeModal();
});
