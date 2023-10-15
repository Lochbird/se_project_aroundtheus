export default class Popup {
  constructor({ popupSelector }) {
    this._popUp = document.querySelector(popupSelector);
  }

  open() {}

  close() {}

  _handleEscClose() {}

  setEventListeners() {}
}
