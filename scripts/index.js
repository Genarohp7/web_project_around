// scripts/index.js
import Card from "./card.js";
import { enableValidation } from "./validate.js";

/* =========================
   Clase Section
   ========================= */
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      if (element) this.addItem(element);
    });
  }

  addItem(element, prepend = false) {
    if (prepend) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}

/* =========================
   Clase Popup (base)
   ========================= */
class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);

    // Determinar la clase "opened" según el tipo de popup
    if (this._popupElement.classList.contains("addCard")) {
      this._openedClass = "addCard_opened";
    } else if (this._popupElement.classList.contains("popupImage")) {
      this._openedClass = "popupImage_opened";
    } else {
      this._openedClass = "popup_opened";
    }
  }

  open() {
    this._popupElement.classList.add(this._openedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove(this._openedClass);
    // por seguridad limpiamos cualquier otra "opened" que haya quedado
    this._popupElement.classList.remove("popup_opened", "addCard_opened", "popupImage_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (event) => {
      // Cerrar al hacer clic en el overlay
      const clickEnOverlay = event.target === this._popupElement;
      // Cerrar al hacer clic en el botón de cerrar (cualquiera)
      const clickEnCerrar =
        event.target.closest(".popup__close") ||
        event.target.closest(".addCard__close") ||
        event.target.closest(".popupImage__close");

      if (clickEnOverlay || clickEnCerrar) {
        this.close();
      }
    });
  }
}

/* =========================
   Clase PopupWithForm
   ========================= */
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      // IMPORTANTE: requiere atributos name en los inputs
      formValues[input.name] = input.value;
    });
    return formValues;
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

/* =========================
   Clase PopupWithImage
   ========================= */
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popupImage__photo");
    this._captionElement = this._popupElement.querySelector(".popupImage__caption");
  }

  open(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}

/* =========================
   Clase UserInfo
   ========================= */
class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
  }
}

/* =========================
   Datos iniciales
   ========================= */
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" },
];

/* =========================
   Instancias de popups (primero)
   ========================= */
const popupWithImage = new PopupWithImage(".popupImage");
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".intro__profile-title",
  jobSelector: ".intro__profile-activity",
});

const profileFormPopup = new PopupWithForm(".popup", (formData) => {
  userInfo.setUserInfo({
    name: formData["input-name"],
    job: formData["input-tag"],
  });
});
profileFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm(".addCard", (formData) => {
  const newCard = new Card(
    { name: formData["input-place"], link: formData["input-url"] },
    (n, l) => popupWithImage.open(n, l)
  );
  const cardElement = newCard.generateCard();
  cardsSection.addItem(cardElement, true);
});
addCardFormPopup.setEventListeners();

/* =========================
   Section (después de tener popupWithImage)
   ========================= */
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const card = new Card({ name, link }, (n, l) => popupWithImage.open(n, l));
      return card.generateCard();
    },
  },
  ".grid"
);
cardsSection.renderItems();

/* =========================
   Botones que abren formularios
   ========================= */
document
  .querySelector(".intro__profile-edit-button")
  .addEventListener("click", () => {
    const current = userInfo.getUserInfo();
    document.querySelector("#input-name").value = current.name;
    document.querySelector("#input-tag").value = current.job;
    profileFormPopup.open();
  });

document
  .querySelector(".intro__addCard-button")
  .addEventListener("click", () => addCardFormPopup.open());

/* =========================
   Validaciones
   ========================= */
const profileValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-name, .popup__input-action",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardValidationConfig = {
  formSelector: ".addCard__form",
  inputSelector: ".addCard__input-name, .addCard__input-action",
  submitButtonSelector: ".addCard__button",
  inactiveButtonClass: "addCard__button_disabled",
  inputErrorClass: "addCard__input_type_error",
  errorClass: "addCard__error_visible",
};

enableValidation(profileValidationConfig);
enableValidation(cardValidationConfig);
