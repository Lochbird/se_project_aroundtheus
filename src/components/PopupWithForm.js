import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popUpSelector, handleFormSubmit }) {
    this._popUpElement;
  }
}

const newCardPopup = new PopupWithForm();
