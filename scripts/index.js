import Card from "./card.js";
import { enableValidation, resetValidation } from "./validate.js";
import { openPopup, closePopup } from "./utils.js";

/* =========================
   1) Clase Section
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
      if (element) this.addItem(element); // append por defecto
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
   2) Clase Popup
   ========================= */
class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("popup_opened") ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}

/* =========================
   3) Clase PopupWithImage
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
   Selectores y popups
   ========================= */
let editButton = document.querySelector(".intro__profile-edit-button");
let closeButton = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");

let nameInput = document.querySelector("#input-name");
let jobInput = document.querySelector("#input-tag");
let name = document.querySelector(".intro__profile-title");
let job = document.querySelector(".intro__profile-activity");
let form = document.querySelector(".popup__form");

let newCardButton = document.querySelector(".intro__addCard-button");
let closeAddCardButton = document.querySelector(".addCard__close");
let addCard = document.querySelector(".addCard");

let addCardForm = document.querySelector(".addCard__form");

/* =========================
   Instancia de PopupWithImage
   ========================= */
const imagePopup = new PopupWithImage(".popupImage");
imagePopup.setEventListeners();

/* =========================
   Abrir / Cerrar Add Card
   ========================= */
function openAddCard() {
  openPopup(addCard);
  nameInput.value = "";
  jobInput.value = "";
}

function closeAddCard() {
  closePopup(addCard);
  addCardForm.reset();
}

newCardButton.addEventListener("click", openAddCard);
closeAddCardButton.addEventListener("click", () => {
  resetValidation(addCardForm, cardValidationConfig);
  closeAddCard();
});

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
   Section: instanciación
   ========================= */
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const card = new Card({ name, link }, (name, link) => {
        imagePopup.open(name, link); // usar PopupWithImage
      });
      return card.generateCard();
    },
  },
  ".grid"
);

cardsSection.renderItems();

/* =========================
   Agregar nueva tarjeta
   ========================= */
function submitAddCard(e) {
  e.preventDefault();

  const title = document.querySelector("#input-place").value;
  const imageUrl = document.querySelector("#input-url").value;

  const newCard = new Card({ name: title, link: imageUrl }, (name, link) => {
    imagePopup.open(name, link);
  });
  const cardElement = newCard.generateCard();

  cardsSection.addItem(cardElement, true);

  closeAddCard();
  addCardForm.reset();
}

addCardForm.addEventListener("submit", submitAddCard);

/* =========================
   Editar perfil
   ========================= */
function openpopup() {
  openPopup(popup);
  nameInput.value = "";
  jobInput.value = "";
}

editButton.addEventListener("click", openpopup);
closeButton.addEventListener("click", () => {
  resetValidation(form, profileValidationConfig);
  closePopup(popup);
});

function submitForm(e) {
  e.preventDefault();
  job.textContent = jobInput.value;
  name.textContent = nameInput.value;
  closePopup(popup);
}

form.addEventListener("submit", submitForm);

/* =========================
   Validaciones
   ========================= */
const profileValidationConfig = {
  inputSelector: ".popup__input-name, .popup__input-action",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardValidationConfig = {
  inputSelector: ".addCard__input-name, .addCard__input-action",
  submitButtonSelector: ".addCard__button",
  inactiveButtonClass: "addCard__button_disabled",
  inputErrorClass: "addCard__input_type_error",
  errorClass: "addCard__error_visible",
};

enableValidation({ formSelector: ".popup__form", ...profileValidationConfig });
enableValidation({ formSelector: ".addCard__form", ...cardValidationConfig });

/* =========================
   Cerrar popups por click fuera
   ========================= */
const popups = document.querySelectorAll(".popup, .addCard");

popups.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", (event) => {
    if (event.target === popupElement) {
      if (popupElement.classList.contains("popup")) {
        resetValidation(form, profileValidationConfig);
      } else if (popupElement.classList.contains("addCard")) {
        resetValidation(addCardForm, cardValidationConfig);
      }
      closePopup(popupElement);
    }
  });
});
