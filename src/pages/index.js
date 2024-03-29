import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { settings } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// ~~~~~~~~~~~~~~~ ELEMENTS ~~~~~~~~~~~~~~ //
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

// ~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~ //
function createCard(cardData) {
  const card = renderCard(cardData);
  return cardSection.addItem(card);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", {
    handleImageClick: () => imagePopup.open(cardData),
  }, handleDeleteCardSubmit, toggleLikeCard);
  return card.getView();
}

function toggleLikeCard(card) {
    if(!card._isLiked) {
      api.addLikeCard(card._id)
      .then(() => {
        card.setIsliked(true);
      })
      .catch((err) => {
        console.error(err);
      })
    } else {
      api.removeLikeCard(card._id)
      .then(() => {
        card.setIsliked(false);
      })
      .catch((err) => {
        console.error(err);
      })
      }
}

// ~~~~~~~~~~~~~~~ HANDLERS ~~~~~~~~~~~~~~ //
// -------- PROFILE ------- //
function handleProfileEditSubmit(data) {
  profileEditPopup.renderLoading(true, "Saving...");
  api.editUserInfo(data)
  .then((userData) => {
    newProfileInfo.setUserInfo(userData);
    profileEditPopup.close();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => profileEditPopup.renderLoading(false));
}

function handleProfileImageSubmit(data) {
  profileImageEditPopup.renderLoading(true, "Saving...");
  api.editProfileImage(data.url)
  .then((res) => {
    newProfileInfo.setProfileImage(res.avatar);
    profileImageEditPopup.close();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    profileImageEditPopup.renderLoading(false);
  })
}

// --------- CARD --------- //
function handleAddCardSubmit(data) {
  cardPopup.renderLoading(true, "Saving...");
  api.addCard(data)
  .then((newCard) => {
    createCard(newCard);
    cardPopup.close()
  })
  .catch((err) => {
    console.error(err)
  })
  .finally(() => {
  cardPopup.renderLoading(false);
  })
}

function handleDeleteCardSubmit(card) {
  cardDeletePopup.open();
  cardDeletePopup.setSubmitCallback(() => {
    cardDeletePopup.renderLoading(true, "Saving...");
    api.deleteCard(card)
    .then(() => {
      card.deleteCard();
      cardDeletePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => cardDeletePopup.renderLoading(false))
  })
}

// ~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~ //
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



// ~~~~~~~~~~~~~~~~~ API ~~~~~~~~~~~~~~~~~ //
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ba6f95f2-7e3a-4192-b9e4-9397fc618de9",
    "Content-Type": "application/json"
  }
});

let cardSection;

api.getInitialCards()
  .then((cards) => {
    cardSection = new Section({
    items: cards,
    renderer: createCard,
  }, cardListEl);
  cardSection.renderItems();
  })
  .catch((err) => {console.error(err)})

api.getUserInfo()
.then((userInfo) => {
  newProfileInfo.setUserInfo(userInfo);
  newProfileInfo.setProfileImage(userInfo.avatar);
})
.catch((err) => {console.error(err);
})

// ~~~~~~~~~~~~~~~ CLASSES ~~~~~~~~~~~~~~~ //

const profileImageEditPopup = new PopupWithForm(profileImageModal, handleProfileImageSubmit);
const newProfileInfo = new UserInfo(profileTitle, profileDescription, profileImage);

const cardDeletePopup = new PopupWithConfirmation(deleteModal);

const profileEditPopup = new PopupWithForm(profileEditModal, handleProfileEditSubmit);

const imagePopup = new PopupWithImage(previewImageModal);
const cardPopup = new PopupWithForm(addCardModal, handleAddCardSubmit);

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardModalForm);

// - CLASS EVENT LISTENERS  //
profileEditPopup.setEventListeners();
profileImageEditPopup.setEventListeners();
imagePopup.setEventListeners();
cardPopup.setEventListeners();
cardDeletePopup.setEventListeners();

// ~~~~~~~~~~~~~~ VALIDATION ~~~~~~~~~~~~~ //
editFormValidator.enableValidation();
addFormValidator.enableValidation();

