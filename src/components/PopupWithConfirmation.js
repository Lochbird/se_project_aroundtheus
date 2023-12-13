import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupElement, handleDeleteCardSubmit) {
        super({popupElement})

        this._submitButton = this._popupElement.querySelector(".modal__button");
        this._submitButtonText = this._submitButton.textContent;

        this._handleDeleteCardSubmit = handleDeleteCardSubmit;
    }

    setSubmitCallback(callback) {
        this._handleSubmitCallback = callback;
    }
    
    setEventListeners() {
        this._submitButton.addEventListener("click", (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
        })
        super.setEventListeners();
    }

    isLoading(isLoading, buttonText) {
        this._submitButton.textContent = isLoading ? buttonText : this._submitButtonText;
      }
}