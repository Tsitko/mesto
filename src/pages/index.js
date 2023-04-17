import { initialCards, validationSettings } from "../utils/contents.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import "./index.css";
import {
  editButton,
  popupProfile,
  photoGrid,
  addButton,
  popupPhotoElement,
  popupImage,
  element,
} from "../utils/contents.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const cardsList = new Section(
  {
    renderer: (data) => {
      const card = addPhoto(data);
      cardsList.addItem(card);
    },
  },
  element
);

cardsList.renderItems(initialCards.reverse());

const profileValidator = new FormValidator(popupProfile, validationSettings);
const photoElementValidator = new FormValidator(
  popupPhotoElement,
  validationSettings
);
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

function openCard(title, src) {
  imagePopup.open(title, src);
}

function addPhoto(elementData, atStart = true) {
  const card = new Card(elementData, "#photo-template", openCard, popupImage);
  const photoElement = card.generateCard();
  if (atStart) {
    photoGrid.prepend(photoElement);
  } else {
    photoGrid.append(photoElement);
  }
}

const popupAdd = new PopupWithForm(popupPhotoElement, submitPhotoElementForm);
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(popupProfile, submitProfileForm);
popupEdit.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__caption",
  profileAvatarSelector: ".profile__image",
});

function submitProfileForm(val) {
  userInfo.setUserInfo(val);
  popupEdit.close();
}

function submitPhotoElementForm(val) {
  const elementData = {
    name: val.photoName,
    link: val.photoLink,
  };
  addPhoto(elementData);
  photoElementValidator.toggleButtonState();
  popupAdd.close();
}

profileValidator.enableValidaton();
photoElementValidator.enableValidaton();
editButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  popupEdit.setInputValue(info);
  popupEdit.open();
  profileValidator.hideAllErrors();
});
addButton.addEventListener("click", () => {
  popupAdd.open();
  photoElementValidator.hideAllErrors();
});
