let editButton = document.querySelector('.profile__edit');
let nameInput = document.querySelector('.edit-name');
let captionInput = document.querySelector('.edit-caption');
let popupForm = document.querySelector('.edit-form');
let closeButton = document.querySelector('.edit-close');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');

function handleOpenPopup(){
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
  popupForm.classList.add('popup_active');
  console.log('ok');
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
popupForm.addEventListener('submit', handleFormSubmit); 