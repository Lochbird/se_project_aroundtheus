export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewImage();
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

  _openPreviewImage() {
    this._handleImageClick.classList.add("modal_opened");

    document.addEventListener("mousedown", this._closeByMouseDown);
    document.addEventListener("keydown", this._closeByEsc);
  }

  _closePreviewImage() {
    this._handleImageClick.classList.remove("modal_opened");

    document.removeEventListener("mousedown", this._closeByMouseDown);
    document.removeEventListener("keydown", this._closeByEsc);
  }

  _closeByEsc(evt) {
    if (evt.key === "Escape") {
    document.querySelector("#preview-image-modal").classList.remove("modal_opened");

    document.removeEventListener("mousedown", this._closeByMouseDown);
    document.removeEventListener("keydown", this._closeByEsc);
    }
  }

  _closeByMouseDown(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      evt.target.classList.remove("modal_opened");

    document.removeEventListener("mousedown", this._closeByMouseDown);
    document.removeEventListener("keydown", this._closeByEsc);
      };
  } 

  _handlePreviewImage() {
    const previewImage = this._handleImageClick.querySelector(
      ".card__preview-image"
    );
    const previewImageText =
      this._handleImageClick.querySelector(".modal__paragraph");

    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewImageText.textContent = this._name;

    this._openPreviewImage();
  }
}
