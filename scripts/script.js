const editButton = document.querySelector(".profile__edit");
const popupProfile = document.querySelector(".popup-profile");
const nameInput = popupProfile.querySelector(".form__input-name");
const captionInput = popupProfile.querySelector(".form__input-caption");
const closeProfileButton = popupProfile.querySelector(".popup__escape-button");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");
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

function createCard(elementData) {
  const photoTemplate = document.querySelector("#photo-template").content;
  const photoElement = photoTemplate.querySelector(".element").cloneNode(true);
  const elementImage = photoElement.querySelector(".element__image");
  elementImage.src = elementData.link;
  elementImage.alt = `фото под названием "${elementData.name}"`;
  photoElement.querySelector(".element__caption").textContent =
    elementData.name;
  photoElement
    .querySelector(".element__like")
    .addEventListener("click", (evt) =>
      evt.target.classList.toggle("element__like_active")
    );
  photoElement
    .querySelector(".element__trash")
    .addEventListener("click", () => photoElement.remove());
  photoElement
    .querySelector(".element__open")
    .addEventListener("click", (evt) => {
      openPopup(elementPopup);
      const elementPopupImage = elementPopup.querySelector(
        ".element-popup__image"
      );
      elementPopupImage.src = evt.target.src;
      elementPopupImage.alt = `фото под названием "${elementData.name}"`;
      elementPopup.querySelector(".element-popup__caption").textContent =
        elementData.name;
    });
  console.log(photoElement);
  return photoElement;
}

function addPhoto(elementData, atStart = true) {
  const photoElement = createCard(elementData);
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
}

function closePopup(popup) {
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

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  closeProfilePopup();
}

function openPhotoElementPopup() {
  popupPhotoElement.querySelector(".form").reset();
  openPopup(popupPhotoElement);
}

function closePhotoElementPopup() {
  closePopup(popupPhotoElement);
}

function photoElementFormSubmit(evt) {
  evt.preventDefault();
  const elementData = {
    name: photoNameInput.value,
    link: photoLinkInput.value,
  };
  addPhoto(elementData);
  closePhotoElementPopup();
}

function closeElementPopup() {
  closePopup(elementPopup);
}

initPhotoGrid();
editButton.addEventListener("click", openProfilePopup);
closeProfileButton.addEventListener("click", closeProfilePopup);
popupProfile.addEventListener("submit", profileFormSubmit);
addButton.addEventListener("click", openPhotoElementPopup);
closePhotoElementButton.addEventListener("click", closePhotoElementPopup);
popupPhotoElement.addEventListener("submit", photoElementFormSubmit);
closeElementPopupButton.addEventListener("click", closeElementPopup);
