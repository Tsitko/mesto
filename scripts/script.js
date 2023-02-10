let formElement = document.querySelector('.profile_edit_form');
let editButton = document.querySelector('.profile_edit_open');
let nameInput = formElement.querySelector('.profile_edit_inputName');
let captionInput = formElement.querySelector('.profile_edit_inputCaption');
let popupForm = document.querySelector('.profile_edit_form');
let closeButton = formElement.querySelector('.profile_edit_close');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');

function handleOpenPopup(){
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
  popupForm.classList.add('popup_active');
}

function handleClosePopup(){
  popupForm.classList.remove('popup_active');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileCaption.textContent = captionInput.value;
    handleClosePopup();
    
}

editButton.addEventListener('click', handleOpenPopup); 
closeButton.addEventListener('click', handleClosePopup);
formElement.addEventListener('submit', handleFormSubmit); 