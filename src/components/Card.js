export class Card {
  constructor(data, selector, openCard, like, dislike, deleteCard) {
      this._title = data.name;
      this._image = data.link;
      this._selector = selector;
      this._openCard = openCard;
      this._id = data.id;
      this._likes = data.likes;
      this._userId = data.userId;
      this._ownerId = data.ownerId;
      this._deleteCard = deleteCard;
      this._like = like;
      this._dislike = dislike;
  }

  _getElement() {
      const cardTemplate = document.querySelector(this._selector)
          .content
          .querySelector('.element')
          .cloneNode(true);


      return cardTemplate;
  }

  generateCard() {
      this._element = this._getElement();
      this._imageElement = this._element.querySelector('.element__image');
      this._imageElement.src = this._image;
      this._imageElement.alt = this._title;
      this._element.querySelector('.element__caption').textContent = this._title;
      this._likeButton = this._element.querySelector('.element__like');
      this._likeCounter = this._element.querySelector('.element__like-counter');
      this._deleteButton = this._element.querySelector('.element__trash');
      this._likeCounter.textContent = `${this._likes.length}`;
      this._setEventListeners();
      this._isLiked();
      this.isOwner();
      return this._element;
  }

  _setEventListeners() {
      this._imageElement.addEventListener('click', () => {
          this._openCard(this._title, this._image);
      });

      this._likeButton.addEventListener('click', () => {
          if (this._likeButton.classList.contains('element__like_active')) {
              this._dislike();
          } else {
              this._like();
          }
      });

      this._deleteButton.addEventListener('click', () => {
          this._deleteCard(this._id);
      });
  }

  isOwner() {
      if (this._userId !== this._ownerId) {
          this._deleteButton.remove();
          this._deleteButton = null;
      }
  }

  _isLiked() {
      this._likes.forEach((user) => {
          if (user._id === this._userId) {
              this.like();
          } else {
              this.dislike();
          }
      });
  }

  _handleLikeCLick() {
      this._likeButton.classList.toggle('element__like_active');
  }

  like() {
      this._likeButton.classList.add("element__like_active");
  }

  dislike() {
      this._likeButton.classList.remove("element__like_active");
  }

  setLikesCount(res) {
      this._likeCounter.textContent = `${res.likes.length}`;
  }

  delete() {
      this._element.remove();
      this._element = null;
  }
}