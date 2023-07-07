const $ = document;
const addBox = $.querySelector(".add-box"),
  popupBox = $.querySelector(".popup-box"),
  popupTitle = $.querySelector(".title-modal"),
  popupClose = $.querySelector(".colse-modal"),
  inputElem = $.querySelector("input"),
  textareaElem = $.querySelector("textarea"),
  buttonElem = $.querySelector("button"),
  wrapperElem = $.querySelector(".wrapper");

  let notes = [];
  let isUpdate = false;


addBox.addEventListener('click' , () => {

    if(isUpdate){
        popupTitle.innerHTML = 'Update Note'
        buttonElem.innerHTML = 'update Note'
    }else{
        popupTitle.innerHTML = 'Add a new Note'
        buttonElem.innerHTML = 'Add Note'
    }

    inputElem.focus()
    popupBox.classList.add('show')
})

popupClose.addEventListener('click' , () => {
    console.log("close modal");
})

buttonElem.addEventListener('click' , () => {
    console.log('add note');
})

function getLocalStorageNotes (){
    let localStorageNotes = localStorage.getItem('notes');

    if(localStorageNotes){
        notes = JSON.parse(localStorageNotes)
    }else{
        notes = []
    }

    return notes;
}

function generateNotes (notes){
console.log(notes);
}

window.addEventListener('load' , () => {
    let notes = getLocalStorageNotes()
    generateNotes(notes)
})

