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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditCloseButton = document.querySelector("#edit-profile-close");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescInput = document.querySelector("#profile-description-input");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const addCardModal = document.querySelector("#add-card-modal");
const addCardModalForm = document.querySelector("#add-card-modal-form");
const addCardButton = document.querySelector("#profile-add-button");
const addCardCloseButton = document.querySelector("#add-card-button-close");

const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardURLInput = document.querySelector("#add-card-url-input");

// FUNCTIONS
function openPopUp(modal) {
  modal.classList.add("modal__opened");
}

function closePopUp(modal) {
  modal.classList.remove("modal__opened");
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescInput.value = profileDescription.textContent;
}

function openProfilePopUp() {
  fillProfileForm();
  openPopUp(profileEditModal);
}

function renderCard(cardData, list) {
  const cardElement = getCardElement(cardData);
  list.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

// EVENT HANDLERS
function handlerProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescInput.value;
  closePopUp(profileEditModal);
}
function handlerAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardURLInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(addCardModal);
}

// EVENT LISTENERS
profileEditButton.addEventListener("click", openProfilePopUp);

profileEditCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);

profileEditForm.addEventListener("submit", handlerProfileEditSubmit);

addCardModalForm.addEventListener("submit", handlerAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addCardButton.addEventListener("click", () => openPopUp(addCardModal));

addCardCloseButton.addEventListener("click", () => closePopUp(addCardModal));
