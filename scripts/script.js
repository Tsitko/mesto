const editButton = document.querySelector(".profile__edit");
const popupForm = document.querySelector(".popup-profile");
const nameInput = popupForm.querySelector(".form__input-name");
const captionInput = popupForm.querySelector(".form__input-caption");
const closeFormButton = popupForm.querySelector(".popup__escape-button");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");
const initialCards = [
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
const photoGrid = document.querySelector(".photo-grid");
const addButton = document.querySelector(".profile__add");
const popupPhotoElement = document.querySelector(".popup-photo");
const photoNameInput = popupPhotoElement.querySelector(
  ".form__input-photo-name"
);
const photoLinkInput = popupPhotoElement.querySelector(
  ".form__input-photo-link"
);
const closePhotoElementButton = popupPhotoElement.querySelector(
  ".popup__escape-button"
);
const elementPopup = document.querySelector(".element-popup");
const closeElementPopupButton = elementPopup.querySelector(
  ".popup__escape-button"
);

function addPhoto(element, atStart = true) {
  const photoTemplate = document.querySelector("#photo-template").content;
  const photoElement = photoTemplate.querySelector(".element").cloneNode(true);
  photoElement.querySelector(".element__image").src = element.link;
  photoElement.querySelector(".element__image").alt =
    'фото под названием "' + element.name + '"';
  photoElement.querySelector(".element__caption").textContent = element.name;
  photoElement
    .querySelector(".element__like")
    .addEventListener("click", (evt) =>
      evt.target.classList.toggle("element__like_active")
    );
  photoElement
    .querySelector(".element__trash")
    .addEventListener("click", (evt) =>
      evt.target.closest(".element").remove()
    );
  photoElement
    .querySelector(".element__open")
    .addEventListener("click", (evt) => {
      elementPopup.classList.add("popup_opened");
      elementPopup.querySelector(".element-popup__image").src = evt.target.src;
      elementPopup.querySelector(".element-popup__caption").textContent =
        evt.target
          .closest(".element")
          .querySelector(".element__caption").textContent;
    });
  if (atStart) {
    photoGrid.prepend(photoElement);
  } else {
    photoGrid.append(photoElement);
  }
}

function initPhotoGrid() {
  initialCards.forEach((element) => {
    addPhoto(element, false);
  });
}

function openFormPopup() {
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
  popupForm.classList.add("popup_opened");
}

function closeFormPopup() {
  popupForm.classList.remove("popup_opened");
}

function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  closeFormPopup();
}

function openPhotoElementPopup() {
  photoNameInput.value = "";
  photoLinkInput.value = "";
  popupPhotoElement.classList.add("popup_opened");
}

function closePhotoElementPopup() {
  popupPhotoElement.classList.remove("popup_opened");
}

function photoElementSubmit(evt) {
  evt.preventDefault();
  const element = {
    name: photoNameInput.value,
    link: photoLinkInput.value,
  };
  addPhoto(element);
  closePhotoElementPopup();
}

function closeElementPopup() {
  elementPopup.classList.remove("popup_opened");
}

initPhotoGrid();
editButton.addEventListener("click", openFormPopup);
closeFormButton.addEventListener("click", closeFormPopup);
popupForm.addEventListener("submit", formSubmit);
addButton.addEventListener("click", openPhotoElementPopup);
closePhotoElementButton.addEventListener("click", closePhotoElementPopup);
popupPhotoElement.addEventListener("submit", photoElementSubmit);
closeElementPopupButton.addEventListener("click", closeElementPopup);
