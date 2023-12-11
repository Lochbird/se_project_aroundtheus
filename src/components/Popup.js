export default class Popup {
  constructor({ popupElement }) {
    this._popupElement = popupElement;
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  isLoading(isLoading, buttonText) {
    this._submitButton.textContent = isLoading ? buttonText : this._submitButtonText;
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
