// scripts/PopupWithForm.js
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  _getInputValues() {
    // Tomamos por ID para no tocar el HTML (no requiere atributo name)
    const values = {};
    this._inputList.forEach((input) => {
      values[input.id] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
