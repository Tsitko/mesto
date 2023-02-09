let formElement = document.querySelector('#popup_profile');
let editButton = document.querySelector('#edit_profile');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#caption');
let popupForm = document.querySelector('#popup_profile');
let closeButton = formElement.querySelector('#edit_close');

function openPopup(){
  popupForm.classList.add('popup_active');
}
editButton.addEventListener('click', openPopup); 
function closePopup(){
  popupForm.classList.remove('popup_active');
}
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let name = document.querySelector('.profile__name');
    let caption = document.querySelector('.profile__caption');
    name.innerHTML = nameInput.value;
    caption.innerHTML = jobInput.value;
    closePopup();
    
}
formElement.addEventListener('submit', handleFormSubmit); 