export class Card {
  constructor(data, selector, openCard, popup) {
    this._title = data.name;
    this._image = data.link;
    this._selector = selector;
    this._openCard = openCard;
    this._elementPopup = popup;
  }
  _getElement() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }
  generateCard() {
    this._element = this._getElement();
    this._imageElement = this._element.querySelector(".element__image");
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    this._element.querySelector(".element__caption").textContent = this._title;
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__trash");
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) =>
        evt.target.classList.toggle("element__like_active")
      );
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._element.remove());
    this._element
      .querySelector(".element__open")
      .addEventListener("click", (evt) => {
        console.log(this._elementPopup.elementPopup);
        this._openCard(this._elementPopup.elementPopup);
        this._elementPopup.elementPopupImage.src = evt.target.src;
        this._elementPopup.elementPopupImage.alt = `фото под названием "${this._title}"`;
        this._elementPopup.elementPopupCaption.textContent = this._title;
      });
  }
}
