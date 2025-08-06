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

function openAddCard() {
  addCard.classList.add("addCard_opened");
  nameInput.value = "";
  jobInput.value = "";
}

function closeAddCard() {
  addCard.classList.remove("addCard_opened");
}

newCardButton.addEventListener("click", openAddCard);
closeAddCardButton.addEventListener("click", closeAddCard);

// funcion y arreglo de grid para cargar nuevas tarjetas

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: " ",
  },
];

const cardContainer = document.querySelector(".grid");

function createCard(name, link) {
  const card = document.createElement("div");
  card.classList.add("grid__item");

  const image = document.createElement("img");
  image.classList.add("grid__item-img");
  image.src = link;
  image.alt = name;

  image.addEventListener("click", () => {
    popupImagePhoto.src = link;
    popupImagePhoto.alt = name;
    popupImageCaption.textContent = name;
    popupImage.classList.add("popupImage_opened");
  });

  const textContainer = document.createElement("div");
  textContainer.classList.add("grid__item-text");

  const title = document.createElement("h2");
  title.classList.add("grid__item-city");
  title.textContent = name;

  const icon = document.createElement("span");
  icon.classList.add("fa-regular", "fa-heart", "grid__item-icon");

  icon.addEventListener("click", () => {
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");
  });

  const deleteButton = document.createElement("span");
  deleteButton.classList.add("fa-solid", "fa-trash", "grid__item-delete");

  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  card.appendChild(deleteButton);
  textContainer.appendChild(title);
  textContainer.appendChild(icon);
  card.appendChild(image);
  card.appendChild(textContainer);

  return card;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData.name, cardData.link);
  cardContainer.appendChild(cardElement);
});

// funcion para agregar nuevas tarjetas al grid

let addCardForm = document.querySelector(".addCard__form");

function submitAddCard(e) {
  e.preventDefault();

  const title = document.querySelector("#input-place").value;
  const imageUrl = document.querySelector("#input-url").value;

  const newCard = createCard(title, imageUrl);

  cardContainer.prepend(newCard); // Agrega al inicio

  closeAddCard(); // Cierra el popup

  addCardForm.reset(); // Limpia el formulario
}

addCardForm.addEventListener("submit", submitAddCard);

// funcion para abrir popup de edicion de perfil

function openpopup() {
  popup.classList.add("popup_opened");
  nameInput.value = "";
  jobInput.value = "";
}

// funcion para cerrar popup de edicion de perfil

function closepopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openpopup);
closeButton.addEventListener("click", closepopup);

// funcion para actualizas datos del perfil

function submitForm(e) {
  e.preventDefault();
  job.textContent = jobInput.value;
  name.textContent = nameInput.value;
  closepopup();
}

form.addEventListener("submit", submitForm);

// Validación de formularios

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

popupImageClose.addEventListener("click", () => {
  popupImage.classList.remove("popupImage_opened");
});

// Para el formulario de edición de perfil
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input-name, .popup__input-action",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});

// Para el formulario de agregar nueva tarjeta
enableValidation({
  formSelector: ".addCard__form",
  inputSelector: ".addCard__input-name, .addCard__input-action",
  submitButtonSelector: ".addCard__button",
  inactiveButtonClass: "addCard__button_disabled",
  inputErrorClass: "addCard__input_type_error",
  errorClass: "addCard__error_visible"
});