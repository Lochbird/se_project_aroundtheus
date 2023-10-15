import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ELEMENTS
const modals = document.querySelectorAll(".modal");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditForm = document.forms["edit-profile-form"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescInput = document.querySelector("#profile-description-input");

const cardListEl = document.querySelector(".cards__list");

const closeButtons = document.querySelectorAll(".modal__close");

const addCardModal = document.querySelector("#add-card-modal");
const addCardModalForm = document.forms["add-card-modal-form"];
const addCardButton = document.querySelector("#profile-add-button");

const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardURLInput = document.querySelector("#add-card-url-input");

const previewImageModal = document.querySelector("#preview-image-modal");

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// FUNCTIONS
function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("mousedown", closeByMouseDown);
  document.addEventListener("keydown", closeByEsc);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("mousedown", closeByMouseDown);
  document.removeEventListener("keydown", closeByEsc);
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescInput.value = profileDescription.textContent;
}

function openProfilePopUp() {
  fillProfileForm();
  openPopUp(profileEditModal);
}

function closeByMouseDown(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    modals.forEach(closePopUp);
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    modals.forEach(closePopUp);
  }
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.getView();
}

function renderCard(cardData, list) {
  const card = createCard(cardData);
  list.prepend(card);
}

// EVENT HANDLERS
function handlerProfileEditSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescInput.value;

  closePopUp(profileEditModal);
}

function handlerAddCardSubmit(evt) {
  evt.preventDefault();

  const name = addCardTitleInput.value;
  const link = addCardURLInput.value;

  renderCard({ name, link }, cardListEl);

  closePopUp(addCardModal);

  addCardTitleInput.value = "";
  addCardURLInput.value = "";
  addFormValidator.toggleButtonState();
}

// EVENT LISTENERS
profileEditButton.addEventListener("click", openProfilePopUp);

addCardButton.addEventListener("click", () => openPopUp(addCardModal));

addCardModalForm.addEventListener("submit", handlerAddCardSubmit);

profileEditForm.addEventListener("submit", handlerProfileEditSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popup));
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addCardModalForm);
addFormValidator.enableValidation();

export { openPopUp };
