import { openPopUp } from "../pages/index.js";

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(
      ".card__preview-image"
    );
const previewImageText =
    previewImageModal.querySelector(".modal__paragraph");

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardLikeBtn = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteBtn = this._cardElement.querySelector(".card__delete-button");
    this._cardImage = this._cardElement
      .querySelector(".card__image");

    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLikeBtn
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardDeleteBtn
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImage
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewImageText.textContent = this._name;

    openPopUp(previewImageModal);
  }
}
