// scripts/index.js
import Card from "./card.js";
import Section from "./section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import { enableValidation } from "./validate.js";

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
   Instancias de popups
   ========================= */
const popupWithImage = new PopupWithImage(".popupImage");
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".intro__profile-title",
  jobSelector: ".intro__profile-activity",
});

const profileFormPopup = new PopupWithForm(".popup", (formData) => {
  // formData viene por IDs (ver PopupWithForm)
  userInfo.setUserInfo({
    name: formData["input-name"],
    job: formData["input-tag"],
  });
});
profileFormPopup.setEventListeners();

document
  .querySelector(".intro__profile-edit-button")
  .addEventListener("click", () => {
    const current = userInfo.getUserInfo();
    document.querySelector("#input-name").value = current.name;
    document.querySelector("#input-tag").value = current.job;
    profileFormPopup.open();
  });

const addCardFormPopup = new PopupWithForm(".addCard", (formData) => {
  const newCard = new Card(
    { name: formData["input-place"], link: formData["input-url"] },
    (n, l) => popupWithImage.open(n, l)
  );
  const cardElement = newCard.generateCard();
  cardsSection.addItem(cardElement, true);
});
addCardFormPopup.setEventListeners();

document
  .querySelector(".intro__addCard-button")
  .addEventListener("click", () => addCardFormPopup.open());

/* =========================
   Section
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
