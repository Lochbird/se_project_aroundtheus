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

    this._cardLikeBtn = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteBtn = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._handleLikes();

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._cardDeleteBtn.addEventListener("click", () => {
      this._handleDeleteCardSubmit(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  toggleLikeButton() {
    this._cardLikeBtn.classList.toggle("card__like-button_active")
  }

  _handleLikeClick() {
    this._toggleLikeCard(this);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikes() {
      if(this._isLiked) {
        this._cardLikeBtn.classList.add("card__like-button_active");
      } else {
        this._cardLikeBtn.classList.remove("card__like-button_active");
      }
    }
}