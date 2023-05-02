export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__validation-text_visible",
};

export const editButton = document.querySelector(".profile__edit");
export const popupProfile = document.querySelector(".popup-profile");
export const nameInput = popupProfile.querySelector(".form__input-name");
export const captionInput = popupProfile.querySelector(".form__input-caption");
export const profileName = document.querySelector(".profile__name");
export const profileCaption = document.querySelector(".profile__caption");
export const photoGrid = document.querySelector(".photo-grid");
export const cardContainerSelector = ".photo-grid";
export const addButton = document.querySelector(".profile__add");
export const popupPhotoElement = document.querySelector(".popup-photo");
export const popupImage = document.querySelector(".element-popup");
export const popupPhotoElementSelector = ".popup-photo";
export const popupImageSelector = ".element-popup";
export const popupProfileSelector = ".popup-profile";
export const popupConfirm = '.popup_confirm';
export const popupAvatar = '.popup_avatar';
export const avatarButton = document.querySelector('.profile__image');
export const avatarForm = document.querySelector('.popup_avatar');
