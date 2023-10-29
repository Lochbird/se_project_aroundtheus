import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super({ popupElement });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");

    this._inputs = this._popupForm.querySelectorAll(".modal__input");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};

    console.log(this._inputs);

    this._inputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = [data.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
