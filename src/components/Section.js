export default class Section {
  constructor({ items, renderer }, classElement) {
    this._items = items;
    this._renderer = renderer;

    this._classElement = classElement;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._classElement.prepend(element);
  }
}
