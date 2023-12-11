export default class Card {
  constructor({ name, link, _id, isLiked }, cardSelector,
    { handleImageClick }, handleDeleteCardSubmit, addLikeCard, removeLikeCard) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardSubmit = handleDeleteCardSubmit;
    this._addLikeCard = addLikeCard;
    this._removeLikeCard = removeLikeCard;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardLikeBtn = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteBtn = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._cardDeleteBtn.addEventListener("click", () => {
      this._handleDeleteCardSubmit(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeButton() {
    this._cardLikeBtn.classList.toggle("card__like-button_active");
    if(!this._isLiked) {
      this._addLikeCard(this._id);
    } else {
      this._removeLikeCard(this._id);
    }
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
