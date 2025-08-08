import { enableValidation, resetValidation } from "./validate.js";
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
  addCardForm.reset(); 
}

newCardButton.addEventListener("click", openAddCard);
closeAddCardButton.addEventListener("click", () => {
  resetValidation(addCardForm, cardValidationConfig);
  closeAddCard();
});


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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
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

function closepopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  popupElement.classList.remove("addCard_opened");
  popupElement.classList.remove("popupImage_opened");

  if (popupElement.classList.contains("addCard")) {
    addCardForm.reset(); // Limpia el formulario si es el popup de agregar tarjeta
  } 
}

editButton.addEventListener("click", openpopup);
closeButton.addEventListener("click", () => {
  resetValidation(form, profileValidationConfig);
  closepopup(popup);
});


// funcion para actualizas datos del perfil

function submitForm(e) {
  e.preventDefault();
  job.textContent = jobInput.value;
  name.textContent = nameInput.value;
  closepopup();
}

form.addEventListener("submit", submitForm);


popupImageClose.addEventListener("click", () => {
  popupImage.classList.remove("popupImage_opened");
});

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


// Para el formulario de edición de perfil
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input-name, .popup__input-action",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// Para el formulario de agregar nueva tarjeta
enableValidation({
  formSelector: ".addCard__form",
  inputSelector: ".addCard__input-name, .addCard__input-action",
  submitButtonSelector: ".addCard__button",
  inactiveButtonClass: "addCard__button_disabled",
  inputErrorClass: "addCard__input_type_error",
  errorClass: "addCard__error_visible",
});

// Selecciona todos los popups para cerrar al hacer clic fuera de ellos
const popups = document.querySelectorAll(".popup, .addCard");

popups.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", (event) => {
    if (event.target === popupElement) {
      if (popupElement.classList.contains("popup")) {
        resetValidation(form, profileValidationConfig);
      } else if (popupElement.classList.contains("addCard")) {
        resetValidation(addCardForm, cardValidationConfig);
      }
      closepopup(popupElement);
    }
  });
});


// Cerrar popup con tecla Esc

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(
      ".popup_opened, .addCard_opened, .popupImage_opened"
    );
    if (openedPopup) {
      if (openedPopup.classList.contains("popup")) {
        resetValidation(form, profileValidationConfig);
      } else if (openedPopup.classList.contains("addCard")) {
        resetValidation(addCardForm, cardValidationConfig);
      }
      closepopup(openedPopup);
    }
  }
});

