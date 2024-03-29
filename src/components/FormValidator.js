export class FormValidator {
  constructor(formElement, config) {
    this._form = formElement;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inactiveBtn = config.inactiveButtonClass;
    this._button = config.submitButtonSelector;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._button);
  }

  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._errorElement = this._form.querySelector(
          `.${inputElement.id}-error`
        );
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  hideAllErrors() {
    this.toggleButtonState(this._buttonElement);

    this._inputList.forEach((input) => {
      this._errorElement = this._form.querySelector(`.${input.id}-error`);
      this._hideInputError(input);
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    if (!this._errorElement) return;
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveBtn);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveBtn);
      this._buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}
