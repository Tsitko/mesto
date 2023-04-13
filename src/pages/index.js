import { initialCards, validationSettings } from "../utils/contents.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import './index.css';

const editButton = document.querySelector(".profile__edit");
const popupProfile = document.querySelector(".popup-profile");
const nameInput = popupProfile.querySelector(".form__input-name");
const captionInput = popupProfile.querySelector(".form__input-caption");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");
const photoGrid = document.querySelector(".photo-grid");
const addButton = document.querySelector(".profile__add");
const popupPhotoElement = document.querySelector(".popup-photo");
const profileValidator = new FormValidator(popupProfile, validationSettings);
const photoElementValidator = new FormValidator(
  popupPhotoElement,
  validationSettings
);

const photoNameInput = popupPhotoElement.querySelector(
  ".form__input-photo-name"
);
const photoLinkInput = popupPhotoElement.querySelector(
  ".form__input-photo-link"
);
const elementPopup = document.querySelector(".element-popup");
const elementPopupImage = elementPopup.querySelector(".element-popup__image");
const elementPopupCaption = elementPopup.querySelector(
  ".element-popup__caption"
);
const elementPopupData = {
  elementPopup: elementPopup,
  elementPopupImage: elementPopupImage,
  elementPopupCaption: elementPopupCaption,
};
const closeButtons = document.querySelectorAll(".popup__escape-button");

function addPhoto(elementData, atStart = true) {
  const card = new Card(
    elementData,
    "#photo-template",
    openPopup,
    elementPopupData
  );
  const photoElement = card.generateCard();
  if (atStart) {
    photoGrid.prepend(photoElement);
  } else {
    photoGrid.append(photoElement);
  }
}

function initPhotoGrid() {
  initialCards.forEach((elementData) => {
    addPhoto(elementData, false);
  });
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  addCloseEvents();
}

function closePopup(popup) {
  removeCloseEvents();
  popup.classList.remove("popup_opened");
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
  openPopup(popupProfile);
}

function closeProfilePopup() {
  closePopup(popupProfile);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  closeProfilePopup();
}

function openPhotoElementPopup() {
  openPopup(popupPhotoElement);
}

function closePhotoElementPopup() {
  closePopup(popupPhotoElement);
}

function submitPhotoElementForm(evt) {
  evt.preventDefault();
  const elementData = {
    name: photoNameInput.value,
    link: photoLinkInput.value,
  };
  addPhoto(elementData);
  evt.target.reset();
  photoElementValidator.toggleButtonState();
  closePhotoElementPopup();
}

function closeElementPopup() {
  closePopup(elementPopup);
}

function closeOpenedPopup() {
  const popup = document.querySelector(".popup_opened");
  closePopup(popup);
}

function closeOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeOpenedPopup();
  }
}

function closeOnEsc(evt) {
  if (evt.code === "Escape") {
    closeOpenedPopup();
  }
}

function addCloseEvents() {
  document.addEventListener("click", closeOnOverlay);
  document.addEventListener("keydown", closeOnEsc);
}

function removeCloseEvents() {
  document.removeEventListener("click", closeOnOverlay);
  document.removeEventListener("keydown", closeOnEsc);
}

initPhotoGrid();
profileValidator.enableValidaton();
photoElementValidator.enableValidaton();
editButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", openPhotoElementPopup);
popupPhotoElement.addEventListener("submit", submitPhotoElementForm);
popupProfile.addEventListener("submit", submitProfileForm);
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
