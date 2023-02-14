let editButton = document.querySelector(".profile__edit");
let nameInput = document.querySelector(".form__input-name");
let captionInput = document.querySelector(".form__input-caption");
let popupForm = document.querySelector(".popup-profile");
let closeButton = document.querySelector(".popup__escape-button");
let profileName = document.querySelector(".profile__name");
let profileCaption = document.querySelector(".profile__caption");

function openPopup() {
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
  popupForm.classList.add("popup_opened");
}

function closePopup() {
  popupForm.classList.remove("popup_opened");
}

function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", formSubmit);
