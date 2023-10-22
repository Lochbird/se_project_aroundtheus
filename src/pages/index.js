import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, settings } from "../utils/constants.js";

// ELEMENTS
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditForm = document.forms["edit-profile-form"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescInput = document.querySelector("#profile-description-input");

const cardListEl = document.querySelector(".cards__list");

const addCardModal = document.querySelector("#add-card-modal");
const addCardModalForm = document.forms["add-card-modal-form"];
const addCardButton = document.querySelector("#profile-add-button");

const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardURLInput = document.querySelector("#add-card-url-input");

const previewImageModal = document.querySelector("#preview-image-modal");

// FUNCTIONS
function createCard(cardData) {
  const card = renderCard(cardData);
  return cardSection.addItem(card.getView());
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", {
    handleImageClick: () => imagePopup.open(cardData),
  });
  return card;
}

// HANDLERS
function handlerFormSubmit() {
  const userInfo = new UserInfo(profileTitle, profileDescription);
  userInfo.getUserInfo();
  userInfo.setUserInfo(profileTitleInput, profileDescInput);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescInput.value;
  profileEditPopup.close();
}

function handlerAddCardSubmit() {
  const name = addCardTitleInput.value;
  const link = addCardURLInput.value;
  createCard({ name, link });
  cardPopup.close();
}

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  cardListEl
);
cardSection.renderItems();

// EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  cardPopup.open(initialCards);
});

// CLASSES
const profileEditPopup = new PopupWithForm(profileEditModal, handlerFormSubmit);

const imagePopup = new PopupWithImage(previewImageModal);
const cardPopup = new PopupWithForm(addCardModal, handlerAddCardSubmit);

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardModalForm);

// CLASS EVENT LISTENERS
profileEditPopup.setEventListeners();

imagePopup.setEventListeners();
cardPopup.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
