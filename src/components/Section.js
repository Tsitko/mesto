export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  prependItem(item) {
    this._container.prepend(item);
  }

  appendItem(items) {
    this._container.append(items);
  }

  renderItems(items) {
    items.forEach((element) => {
      this._renderer(element);
    });
  }
}
