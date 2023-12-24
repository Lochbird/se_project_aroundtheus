export default class Card {
  constructor({ name, link, _id, isLiked }, cardSelector,
    { handleImageClick }, handleDeleteCardSubmit, toggleLikeCard) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardSubmit = handleDeleteCardSubmit;
    this._toggleLikeCard = toggleLikeCard;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._renderLikes();

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCardSubmit(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  setIsliked(isLiked) {
    this._isLiked = isLiked
    this._renderLikes();
  }

  _handleLikeClick() {
    this._toggleLikeCard(this);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _renderLikes() {
      if(this._isLiked) {
        this._cardLikeButton.classList.add("card__like-button_active");
      } else {
        this._cardLikeButton.classList.remove("card__like-button_active");
      }
    }
}