// scripts/Popup.js
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._openedClass = this._calcOpenedClass();
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _calcOpenedClass() {
    if (this._popupElement.classList.contains("addCard")) return "addCard_opened";
    if (this._popupElement.classList.contains("popupImage")) return "popupImage_opened";
    return "popup_opened";
  }

  open() {
    this._popupElement.classList.add(this._openedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove(this._openedClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  setEventListeners() {
    // cerrar por botón (cubre los 3 tipos de popup)
    const closeBtn = this._popupElement.querySelector(
      ".popup__close, .addCard__close, .popupImage__close"
    );
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // cerrar por overlay
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupElement) this.close();
    });
  }
}
