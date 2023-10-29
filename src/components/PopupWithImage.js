import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super({ popupElement });
    this._imageElement = this._popupElement.querySelector(".card__image");
    this._titleElement = this._popupElement.querySelector(".modal__paragraph");
  }

  open(cardData) {
    super.open();
    this._imageElement.src = cardData.link;
    this._imageElement.alt = cardData.name;
    this._titleElement.textContent = cardData.name;
  }
}
