export class Card {
  constructor(data, selector, openCard, like, dislike, deleteCard) {
    this._title = data.name;
    this._image = data.link;
    this._selector = selector;
    this._handleImageClick = openCard;
    this._id = data.id;
    this._likes = data.likes;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._deleteCard = deleteCard;
    this._like = like;
    this._dislike = dislike;
  }

  _getElement() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardTemplate;
  }

  getId() {
    return this._id;
  }

  generateCard() {
    this._element = this._getElement();
    this._imageElement = this._element.querySelector(".element__image");
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    this._element.querySelector(".element__caption").textContent = this._title;
    this._buttonLike = this._element.querySelector(".element__like");
    this._counterLike = this._element.querySelector(".element__like-counter");
    this._buttonDelete = this._element.querySelector(".element__trash");
    this._counterLike.textContent = `${this._likes.length}`;
    this._setEventListeners();
    this._isLiked();
    this.isOwner();
    return this._element;
  }

  _handleLikeClick(evt) {
    if (this._buttonLike.classList.contains("element__like_active")) {
      this._dislike();
    } else {
      this._like();
    }
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._title, this._image);
    });

    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._buttonDelete.addEventListener("click", () => {
      this._deleteCard(this._id);
    });
  }

  isOwner() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
      this._buttonDelete = null;
    }
  }

  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.like();
      }
    });
  }

  like() {
    this._buttonLike.classList.add("element__like_active");
  }

  dislike() {
    this._buttonLike.classList.remove("element__like_active");
  }

  setLikesCount(res) {
    this._counterLike.textContent = `${res.likes.length}`;
  }

  delete() {
    this._element.remove();
    this._element = null;
  }
}
