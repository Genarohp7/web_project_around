import Card from "./card.js";
import { enableValidation, resetValidation } from "./validate.js";
import { openPopup, closePopup } from "./utils.js";

let editButton = document.querySelector(".intro__profile-edit-button");
let closeButton = document.querySelector(".popup__close");
let saveButton = document.querySelector(".popup__button");
let popup = document.querySelector(".popup");

let nameInput = document.querySelector("#input-name");
let jobInput = document.querySelector("#input-tag");
let name = document.querySelector(".intro__profile-title");
let job = document.querySelector(".intro__profile-activity");
let form = document.querySelector(".popup__form");

let newCardButton = document.querySelector(".intro__addCard-button");
let closeAddCardButton = document.querySelector(".addCard__close");
let saveAddCardButton = document.querySelector(".addCard__button");
let addCard = document.querySelector(".addCard");

const popupImage = document.querySelector(".popupImage");
const popupImagePhoto = document.querySelector(".popupImage__photo");
const popupImageCaption = document.querySelector(".popupImage__caption");
const popupImageClose = document.querySelector(".popupImage__close");

let addCardForm = document.querySelector(".addCard__form");

// ---------- Abrir / Cerrar Add Card ----------
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

// ---------- Grid inicial ----------
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" },
];

const cardContainer = document.querySelector(".grid");

function handleImageClick(name, link) {
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

function createCard(name, link) {
  const card = new Card({ name, link }, handleImageClick);
  return card.generateCard();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData.name, cardData.link);
  cardContainer.appendChild(cardElement);
});

// ---------- Agregar nueva tarjeta ----------
function submitAddCard(e) {
  e.preventDefault();

  const title = document.querySelector("#input-place").value;
  const imageUrl = document.querySelector("#input-url").value;

  const newCard = new Card({ name: title, link: imageUrl }, handleImageClick);
  const cardElement = newCard.generateCard();

  cardContainer.prepend(cardElement);
  closeAddCard();
  addCardForm.reset();
}

addCardForm.addEventListener("submit", submitAddCard);

// ---------- Editar perfil ----------
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

// ---------- Popup imagen ----------
popupImageClose.addEventListener("click", () => {
  closePopup(popupImage);
});

// ---------- Validaciones ----------
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

// ---------- Cerrar popups clic fuera ----------
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
