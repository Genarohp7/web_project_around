export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened", "addCard_opened", "popupImage_opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened", "addCard_opened", "popupImage_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(
      ".popup_opened, .addCard_opened, .popupImage_opened"
    );
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
