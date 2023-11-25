import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, settings } from "../utils/constants.js";
import Api from "../components/Api.js";

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

const previewImageModal = document.querySelector("#preview-image-modal");

// FUNCTIONS
function createCard(cardData) {
  const card = renderCard(cardData);
  return cardSection.addItem(card);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", {
    handleImageClick: () => imagePopup.open(cardData),
  });
  return card.getView();
}

// HANDLERS
function handleFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
}

function handleAddCardSubmit(data) {
  const name = data.title;
  const link = data.url;
  createCard({name, link});
  cardPopup.close();
}

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  cardListEl
);
cardSection.renderItems();

// EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.title;
  profileDescInput.value = info.description;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  cardPopup.open();
});

// CLASSES
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ba6f95f2-7e3a-4192-b9e4-9397fc618de9",
    "Content-Type": "application/json"
  }
});

api.getInitialCards()
.then((result) => {})
.catch((err) => {console.error(err)})

api.getUserInfo()
.then((result) => {})
.catch((err) => {console.error(err)})

api.addCard({name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"});

api.editUserInfo({name: "Xander", about: "unprofessional in all regards"})

const profileEditPopup = new PopupWithForm(profileEditModal, handleFormSubmit);

const imagePopup = new PopupWithImage(previewImageModal);
const cardPopup = new PopupWithForm(addCardModal, handleAddCardSubmit);

const userInfo = new UserInfo(profileTitle, profileDescription);

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardModalForm);

// CLASS EVENT LISTENERS
profileEditPopup.setEventListeners();
imagePopup.setEventListeners();
cardPopup.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

