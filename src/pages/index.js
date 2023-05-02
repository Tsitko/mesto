import { initialCards, validationSettings } from "../utils/contents.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import "./index.css";
import {
  editButton,
  popupProfile,
  addButton,
  popupPhotoElement,
  popupAvatar,
  popupConfirm,
  popupProfileSelector,
  popupPhotoElementSelector,
  popupImageSelector,
  cardContainerSelector,
  avatarButton,
  avatarForm,
} from "../utils/contents.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import PopupConfirm from "../components/PopupConfirm";

let userId;

const cardsList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardsList.addItems(card);
    },
  },
  cardContainerSelector
);
const avatarFormValidator = new FormValidator(avatarForm, validationSettings);
const profileValidator = new FormValidator(popupProfile, validationSettings);
const photoElementValidator = new FormValidator(
  popupPhotoElement,
  validationSettings
);
const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();
const confirmPopup = new PopupConfirm(popupConfirm, async (card) => {
  try {
      await api.deleteCard(card._id);
      card.delete();
      confirmPopup.close();
  } catch (e) {
      console.warn(e)
  }
})
confirmPopup.setEventListeners();

function openCard(title, src) {
  imagePopup.open(title, src);
}

function createCard(data) {
  const card = new Card(
      {
          name: data.name,
          link: data.link,
          likes: data.likes,
          userId,
          ownerId: data.owner._id,
          id: data._id
      },
      '#photo-template',
      openCard,
      async () => {
          try {
              const res = await api.like(data._id);
              card.like();
              card.setLikesCount(res);
          } catch (e) {
              console.warn(e)
          }
      },
      async () => {
          try {
              const res = await api.dislike(data._id);
              card.dislike();
              card.setLikesCount(res);
          } catch (e) {
              console.warn(e)
          }
      },
      () => {
          confirmPopup.open(card)
      }
  );

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

avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  avatarFormValidator.hideAllErrors();
})

async function submitProfileForm(val) {
  popupEdit.renderLoading(true, 'Сохранение...')
  try {
      const res = await api.setUserInfo(val);
      userInfo.setUserInfo(res);
      popupEdit.close();
  } catch (e) {
      console.warn(e)
  } finally {
      popupEdit.renderLoading(false);
  }
}

async function submitPhotoElementForm(val) {
  popupAdd.renderLoading(true, 'Сохранение...');
  try {
    console.log(val);
      const res = await api.addNewCard(val);
      const card = createCard(res);
      cardsList.addItem(card);
      popupAdd.close();
  } catch (e) {
      console.warn(e)
  } finally {
      popupAdd.renderLoading(false);
  }
}

const avatarPopup = new PopupWithForm(popupAvatar, submitAvatarChangeForm)
avatarPopup.setEventListeners();

async function submitAvatarChangeForm(val) {
    avatarPopup.renderLoading(true, 'Сохранение...')
    try {
        const res = await api.changeAvatar(val);
        userInfo.setAvatar(res);
        avatarPopup.close();
    } catch (e) {
        console.warn(e)
    } finally {
        avatarPopup.renderLoading(false);
    }
}

avatarFormValidator.enableValidaton();
profileValidator.enableValidaton();
photoElementValidator.enableValidaton();
editButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  console.log(info);
  popupEdit.setInputValue(info);
  popupEdit.open();
  profileValidator.hideAllErrors();
});
addButton.addEventListener("click", () => {
  popupAdd.open();
  photoElementValidator.hideAllErrors();
});
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
      authorization: "2f741d91-5f99-4a03-b207-7e63a8ddfd00",
      "Content-Type": "application/json",
  },
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
      userId = userData._id;
      userInfo.setUserInfo(userData);
      cardsList.renderItems(cards.reverse());
  })
  .catch((e) => console.log(e));