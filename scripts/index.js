let editButton = document.querySelector(".intro__profile-edit-button");
let closeButton = document.querySelector(".popup__close");
let saveButton = document.querySelector(".popup__button");
let popup = document.querySelector(".popup");

let nameInput = document.querySelector("#input-name");
let jobInput = document.querySelector("#input-tag");
let name = document.querySelector(".intro__profile-title");
let job = document.querySelector(".intro__profile-activity");
let form = document.querySelector(".popup__form");

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
