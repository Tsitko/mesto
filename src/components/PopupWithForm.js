import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, submitHandler) {
    super(popup);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".form");
    this._inputs = this._popup.querySelectorAll(".form__input");
    this._submitButton = this._popup.querySelector(".form__save-button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValue() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      return (this._inputValues[input.id] = input.value);
    });
    return this._inputValues;
  }

  setInputValue(data) {
    this._inputs.forEach((item) => {
      item.value = data[item.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValue());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}