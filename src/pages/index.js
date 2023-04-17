import { initialCards, validationSettings } from "../utils/contents.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import "./index.css";
import {
  editButton,
  popupProfile,
  addButton,
  popupPhotoElement,
  popupImage,
  popupProfileSelector,
  popupPhotoElementSelector,
  popupImageSelector,
  cardContainerSelector,
} from "../utils/contents.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const cardsList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardsList.addItems(card);
    },
  },
  cardContainerSelector
);

cardsList.renderItems(initialCards);

const profileValidator = new FormValidator(popupProfile, validationSettings);
const photoElementValidator = new FormValidator(
  popupPhotoElement,
  validationSettings
);
const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

function openCard(title, src) {
  imagePopup.open(title, src);
}

function createCard (elementData){
  const card = new Card(elementData, "#photo-template", openCard, popupImage);
  return card.generateCard();
}

const popupAdd = new PopupWithForm(popupPhotoElementSelector, submitPhotoElementForm);
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(popupProfileSelector, submitProfileForm);
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
  cardsList.addItem(createCard(elementData));
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
