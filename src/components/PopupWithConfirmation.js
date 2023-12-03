import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupElement, handleSubmit) {
        super({popupElement})
        this._submitButton = popupElement.querySelector(".modal__button_delete");
        this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
        this._submitButton.addEventListeners("Submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
        super.setEventListeners();
    }
}