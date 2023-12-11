import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupElement, handleDeleteCardSubmit) {
        super({popupElement})
        this._deleteButtonSubmit = this._popupElement.querySelector(".modal__button_delete");
        this._handleDeleteCardSubmit = handleDeleteCardSubmit;
    }

    setSubmitCallback(callback) {
        console.log(this._deleteButtonSubmit);
        this._handleSubmitCallback = callback;
    }
    
    setEventListeners() {
        this._deleteButtonSubmit.addEventListener("click", (evt) => {
            console.log("click")
            evt.preventDefault();
            this._handleSubmitCallback();
        })
        super.setEventListeners();
    }
}