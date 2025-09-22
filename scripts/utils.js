// scripts/utils.js
// Nota: Ya no es necesario con las clases Popup*, pero lo dejamos compatible.

function getOpenedClass(el) {
  if (el.classList.contains("addCard")) return "addCard_opened";
  if (el.classList.contains("popupImage")) return "popupImage_opened";
  return "popup_opened";
}

export function openPopup(popupElement) {
  popupElement.classList.add(getOpenedClass(popupElement));
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened", "addCard_opened", "popupImage_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup =
      document.querySelector(".popup_opened") ||
      document.querySelector(".addCard_opened") ||
      document.querySelector(".popupImage_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
