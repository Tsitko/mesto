export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  addItems(items) {
    this._container.append(items);
} 

  renderItems(items) {
    items.forEach((element) => {
      this._renderer(element);
    });
  }
}