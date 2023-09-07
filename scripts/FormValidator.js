class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputElements)) {
      disableButton(submitButton, inactiveButtonClass);
      return;
    }
    enableButton(submitButton, inactiveButtonClass);
  }

  _hasInvalidInput() {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _checkInputValidity() {
    if (!inputElement.validity.valid) {
      return showInputError(this._form, this._inputElements);
    }
    hideInputError(this._form, this._inputElements);
  }

  _setEventListeners() {
    this._inputElements = [...this.form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputElements, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  }
}

export default FormValidator;
