import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, settings } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// ELEMENTS
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditForm = document.forms["edit-profile-form"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image")
const profileImageEditButton = document.querySelector(".profile__image-edit")
const profileImageModal = document.querySelector("#edit-profile-image-modal");

const deleteModal = document.querySelector("#delete-modal");

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
function handleProfileEditSubmit(data) {
  profileEditPopup.isLoading(true, "Saving...");
  api.editUserInfo(data)
  .then((userData) => {
    newProfileInfo.setUserInfo(userData);
    profileEditPopup.close();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => profileEditPopup.isLoading(false));
}

function handleAddCardSubmit(data) {
  api.addCard(data);
  const name = data.title;
  const link = data.url;
  createCard({name, link});
  cardPopup.close();
}

function handleDeleteCardSubmit(card) {
  cardDeletePopup.open();
  cardDeletePopup.isLoading(true, "Saving...");
  api.deleteCard(card)
  .then(() => {
    card.deleteCard(), cardDeletePopup.close();
  })
  .catch((err) => console.error(err))
  .finally(() => cardDeletePopup.isLoading(false))
}

function handleProfileImageSubmit(data) {
  profileImageEditPopup.isLoading(true, "Saving...");
  api.editProfileImage(data)
  .then(() => {
    newProfileInfo.setProfileImage(data);
    profileImageEditPopup.close();
    profileImageEditPopup.isLoading(false);
  })
  .catch((err) => {
    console.error(err);
  })
}

// EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  editFormValidator.toggleButtonState();
  const info = newProfileInfo.getUserInfo();
  profileEditPopup.setInputValues(info)
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  cardPopup.open();
});

profileImageEditButton.addEventListener("click", () => {
  profileImageEditPopup.open();
})

// CLASSES
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ba6f95f2-7e3a-4192-b9e4-9397fc618de9",
    "Content-Type": "application/json"
  }
});

let cardSection;

api.getInitialCards()
.then((cards) => {cardSection = new Section({
  items: cards,
  renderer: createCard,
}, cardListEl);
cardSection.renderItems();
})
.catch((err) => {console.error(err)})

api.getUserInfo()
.then((result) => {console.log(result)})
.catch((err) => {console.error(err)})

const profileImageEditPopup = new PopupWithForm(profileImageModal, handleProfileImageSubmit)
const newProfileInfo = new UserInfo(profileTitle, profileDescription, profileImage)

const cardDeletePopup = new PopupWithConfirmation(deleteModal, handleDeleteCardSubmit)

const profileEditPopup = new PopupWithForm(profileEditModal, handleProfileEditSubmit);

const imagePopup = new PopupWithImage(previewImageModal);
const cardPopup = new PopupWithForm(addCardModal, handleAddCardSubmit);

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardModalForm);

// CLASS EVENT LISTENERS
profileEditPopup.setEventListeners();
profileImageEditPopup.setEventListeners();
imagePopup.setEventListeners();
cardPopup.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

