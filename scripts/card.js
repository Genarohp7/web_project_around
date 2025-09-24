// scripts/card.js
class Card {
  constructor({ name, link }, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _createCardElement() {
    const cardElement = document.createElement("div");
    cardElement.classList.add("grid__item");

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("fa-solid", "fa-trash", "grid__item-delete");
    deleteButton.addEventListener("click", () => cardElement.remove());

    const image = document.createElement("img");
    image.classList.add("grid__item-img");
    image.src = this._link;
    image.alt = this._name;
    image.addEventListener("click", () => this._handleCardClick(this._name, this._link));

    const textContainer = document.createElement("div");
    textContainer.classList.add("grid__item-text");

    const title = document.createElement("h2");
    title.classList.add("grid__item-city");
    title.textContent = this._name;

    const likeIcon = document.createElement("span");
    likeIcon.classList.add("fa-regular", "fa-heart", "grid__item-icon");
    likeIcon.addEventListener("click", () => {
      likeIcon.classList.toggle("fa-solid");
      likeIcon.classList.toggle("fa-regular");
    });

    textContainer.appendChild(title);
    textContainer.appendChild(likeIcon);

    cardElement.appendChild(deleteButton);
    cardElement.appendChild(image);
    cardElement.appendChild(textContainer);

    return cardElement;
  }

  generateCard() {
    return this._createCardElement();
  }
}

export default Card;
