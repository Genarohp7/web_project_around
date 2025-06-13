let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close");
let saveButton = document.querySelector(".popup__button");
let popup = document.querySelector(".popupsec");

let nameInput = document.querySelector("#input-name");
let jobInput = document.querySelector("#input-tag");
let name = document.querySelector(".profile__title");
let job = document.querySelector(".profile__activity");
let form = document.querySelector(".popup");

function openpopup() {
  popup.classList.add("popup_opened");
  nameInput.value = "";
  jobInput.value = "";
}

function closepopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openpopup);
closeButton.addEventListener("click", closepopup);

function submitForm(e) {
  e.preventDefault();
  job.textContent = jobInput.value;
  name.textContent = nameInput.value;
  closepopup();
}

form.addEventListener("submit", submitForm);
