!function(){"use strict";class e{constructor(e,t,s){let{name:n,link:i}=e,{handleImageClick:r}=s;this._name=n,this._link=i,this._cardSelector=t,this._handleImageClick=r}getView(){return this._cardElement=document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0),this._cardLikeBtn=this._cardElement.querySelector(".card__like-button"),this._cardDeleteBtn=this._cardElement.querySelector(".card__delete-button"),this._cardImage=this._cardElement.querySelector(".card__image"),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardElement.querySelector(".card__title").textContent=this._name,this._setEventListeners(),this._cardElement}_setEventListeners(){this._cardLikeBtn.addEventListener("click",(()=>{this._handleLikeButton()})),this._cardDeleteBtn.addEventListener("click",(()=>{this._handleDeleteCard()})),this._cardImage.addEventListener("click",(()=>{this._handleImageClick(this)}))}_handleLikeButton(){this._cardLikeBtn.classList.toggle("card__like-button_active")}_handleDeleteCard(){this._cardElement.remove(),this._cardElement=null}}class t{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._form=t,this._inputElements=[...this._form.querySelectorAll(this._inputSelector)],this._submitButton=this._form.querySelector(this._submitButtonSelector)}enableValidation(){this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}_setEventListeners(){this._inputElements.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this.toggleButtonState()}))}))}_checkInputValidity(e){if(!e.validity.valid)return this._showInputError(e);this._hideInputError(e)}toggleButtonState(){this._hasInvalidInput()?this._disableButton():this._enableButton()}_enableButton(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1}_disableButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}_showInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_hasInvalidInput(){return!this._inputElements.every((e=>e.validity.valid))}}class s{constructor(e){let{popupElement:t}=e;this._popupElement=t}open(){this._popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose=e=>{"Escape"===e.key&&this.close()};setEventListeners(){this._popupElement.addEventListener("click",(e=>{(e.target.classList.contains("modal")||e.target.classList.contains("modal__close"))&&this.close()}))}}class n extends s{constructor(e,t){super({popupElement:e}),this._handleFormSubmit=t,this._popupForm=this._popupElement.querySelector(".modal__form"),this._inputs=this._popupForm.querySelectorAll(".modal__input")}close(){this._popupForm.reset(),super.close()}_getInputValues(){const e={};return this._inputs.forEach((t=>e[t.name]=t.value)),e}setInputValues(e){this._inputs.forEach((t=>{t.value=[e.name]}))}setEventListeners(){super.setEventListeners(),this._popupForm.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())}))}}const i={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__button",inactiveButtonClass:"modal__button_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"},r=document.querySelector("#profile-edit-button"),o=document.querySelector("#edit-profile-modal"),a=document.forms["edit-profile-form"],l=document.querySelector(".profile__title"),c=document.querySelector(".profile__description"),u=document.querySelector("#profile-title-input"),d=document.querySelector("#profile-description-input"),m=document.querySelector(".cards__list"),_=document.querySelector("#add-card-modal"),p=document.forms["add-card-modal-form"],h=document.querySelector("#profile-add-button"),E=document.querySelector("#preview-image-modal");function v(t){const s=function(t){return new e(t,"#card-template",{handleImageClick:()=>L.open(t)}).getView()}(t);return g.addItem(s)}const g=new class{constructor(e,t){let{items:s,renderer:n}=e;this._items=s,this._renderer=n,this._classElement=t}renderItems(){this._items.forEach((e=>{this._renderer(e)}))}addItem(e){this._classElement.prepend(e)}}({items:[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louise",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],renderer:v},m);g.renderItems(),r.addEventListener("click",(()=>{const e=k.getUserInfo();u.value=e.title,d.value=e.description,f.open()})),h.addEventListener("click",(()=>{w.toggleButtonState(),S.open()}));const f=new n(o,(function(e){k.setUserInfo(e),f.close()})),L=new class extends s{constructor(e){super({popupElement:e}),this._imageElement=this._popupElement.querySelector(".card__image"),this._titleElement=this._popupElement.querySelector(".modal__paragraph")}open(e){super.open(),this._imageElement.src=e.link,this._imageElement.alt=e.name,this._titleElement.textContent=e.name}}(E),S=new n(_,(function(e){v({name:e.title,link:e.url}),S.close()})),k=new class{constructor(e,t){this._title=e,this._description=t}getUserInfo(){return{title:this._title.textContent,description:this._description.textContent}}setUserInfo(e){this._title.textContent=e.title,this._description.textContent=e.description}}(l,c),y=new t(i,a),w=new t(i,p);f.setEventListeners(),L.setEventListeners(),S.setEventListeners(),y.enableValidation(),w.enableValidation()}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmNlcyI6WyJ3ZWJwYWNrOi8vYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9hcm91bmR0aGV1cy8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3Rvcih7IG5hbWUsIGxpbmsgfSwgY2FyZFNlbGVjdG9yLCB7IGhhbmRsZUltYWdlQ2xpY2sgfSkge1xyXG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLl9saW5rID0gbGluaztcclxuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcclxuICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldygpIHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKVxyXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcclxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICB0aGlzLl9jYXJkTGlrZUJ0biA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XHJcbiAgICB0aGlzLl9jYXJkRGVsZXRlQnRuID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiXHJcbiAgICApO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuXHJcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcclxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XHJcblxyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9jYXJkTGlrZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVMaWtlQnV0dG9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9jYXJkRGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNhcmQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHRoaXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlTGlrZUJ1dHRvbigpIHtcclxuICAgIHRoaXMuX2NhcmRMaWtlQnRuLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRGVsZXRlQ2FyZCgpIHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbGVtZW50KSB7XHJcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gc2V0dGluZ3MuaW5wdXRTZWxlY3RvcjtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcztcclxuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IHNldHRpbmdzLmlucHV0RXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBzZXR0aW5ncy5lcnJvckNsYXNzO1xyXG5cclxuICAgIHRoaXMuX2Zvcm0gPSBmb3JtRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLl9pbnB1dEVsZW1lbnRzID0gWy4uLnRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKV07XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5faW5wdXRFbGVtZW50cy5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy50b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcclxuICAgIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGVCdXR0b24oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZW5hYmxlQnV0dG9uKCk7XHJcbiAgfVxyXG5cclxuICBfZW5hYmxlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIF9kaXNhYmxlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlRWxlbWVudCA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXHJcbiAgICApO1xyXG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2U7XHJcbiAgICBlcnJvck1lc3NhZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbGVtZW50ID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcclxuICAgICk7XHJcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBlcnJvck1lc3NhZ2VFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfaGFzSW52YWxpZElucHV0KCkge1xyXG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dEVsZW1lbnRzLmV2ZXJ5KChpbnB1dEVsZW1lbnQpID0+IGlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBFbGVtZW50IH0pIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudCA9IHBvcHVwRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG9wZW4oKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZXZ0KSA9PiB7XHJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldnQpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxcIikgfHxcclxuICAgICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsX19jbG9zZVwiKVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBFbGVtZW50LCBoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBzdXBlcih7IHBvcHVwRWxlbWVudCB9KTtcclxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xyXG4gICAgdGhpcy5fcG9wdXBGb3JtID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XHJcblxyXG4gICAgdGhpcy5faW5wdXRzID0gdGhpcy5fcG9wdXBGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWxfX2lucHV0XCIpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEZvcm0ucmVzZXQoKTtcclxuICAgIHN1cGVyLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XHJcbiAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHt9O1xyXG4gICAgXHJcbiAgICB0aGlzLl9pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IChpbnB1dFZhbHVlc1tpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlKSk7XHJcbiAgICByZXR1cm4gaW5wdXRWYWx1ZXM7XHJcbiAgfVxyXG5cclxuICBzZXRJbnB1dFZhbHVlcyhkYXRhKSB7XHJcbiAgICB0aGlzLl9pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgaW5wdXQudmFsdWUgPSBbZGF0YS5uYW1lXTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIHRoaXMuX3BvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcclxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcclxuICB7XHJcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L3lvc2VtaXRlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWtlIExvdWlzZVwiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xha2UtbG91aXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJCYWxkIE1vdW50YWluc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2JhbGQtbW91bnRhaW5zLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGF0ZW1hci5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiVmFub2lzZSBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvdmFub2lzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFnbyBkaSBCcmFpZXNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYWdvLmpwZ1wiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XHJcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxyXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxyXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fYnV0dG9uXCIsXHJcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fYnV0dG9uX2Rpc2FibGVkXCIsXHJcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXHJcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxyXG59O1xyXG4iLCJpbXBvcnQgXCIuLi9wYWdlcy9pbmRleC5jc3NcIjtcclxuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XHJcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XHJcbmltcG9ydCB7IGluaXRpYWxDYXJkcywgc2V0dGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzLmpzXCI7XHJcblxyXG4vLyBFTEVNRU5UU1xyXG5jb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1lZGl0LWJ1dHRvblwiKTtcclxuY29uc3QgcHJvZmlsZUVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLW1vZGFsXCIpO1xyXG5jb25zdCBwcm9maWxlRWRpdEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtcHJvZmlsZS1mb3JtXCJdO1xyXG5cclxuY29uc3QgcHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190aXRsZVwiKTtcclxuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcclxuXHJcbmNvbnN0IHByb2ZpbGVUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLWlucHV0XCIpO1xyXG5jb25zdCBwcm9maWxlRGVzY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCIpO1xyXG5cclxuY29uc3QgY2FyZExpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2xpc3RcIik7XHJcblxyXG5jb25zdCBhZGRDYXJkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1jYXJkLW1vZGFsXCIpO1xyXG5jb25zdCBhZGRDYXJkTW9kYWxGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJhZGQtY2FyZC1tb2RhbC1mb3JtXCJdO1xyXG5jb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWFkZC1idXR0b25cIik7XHJcblxyXG5jb25zdCBwcmV2aWV3SW1hZ2VNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJldmlldy1pbWFnZS1tb2RhbFwiKTtcclxuXHJcbi8vIEZVTkNUSU9OU1xyXG5mdW5jdGlvbiBjcmVhdGVDYXJkKGNhcmREYXRhKSB7XHJcbiAgY29uc3QgY2FyZCA9IHJlbmRlckNhcmQoY2FyZERhdGEpO1xyXG4gIHJldHVybiBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmREYXRhKSB7XHJcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKGNhcmREYXRhLCBcIiNjYXJkLXRlbXBsYXRlXCIsIHtcclxuICAgIGhhbmRsZUltYWdlQ2xpY2s6ICgpID0+IGltYWdlUG9wdXAub3BlbihjYXJkRGF0YSksXHJcbiAgfSk7XHJcbiAgcmV0dXJuIGNhcmQuZ2V0VmlldygpO1xyXG59XHJcblxyXG4vLyBIQU5ETEVSU1xyXG5mdW5jdGlvbiBoYW5kbGVGb3JtU3VibWl0KGRhdGEpIHtcclxuICB1c2VySW5mby5zZXRVc2VySW5mbyhkYXRhKTtcclxuICBwcm9maWxlRWRpdFBvcHVwLmNsb3NlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUFkZENhcmRTdWJtaXQoZGF0YSkge1xyXG4gIGNvbnN0IG5hbWUgPSBkYXRhLnRpdGxlO1xyXG4gIGNvbnN0IGxpbmsgPSBkYXRhLnVybDtcclxuICBjcmVhdGVDYXJkKHtuYW1lLCBsaW5rfSk7XHJcbiAgY2FyZFBvcHVwLmNsb3NlKCk7XHJcbn1cclxuXHJcbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXHJcbiAgeyBpdGVtczogaW5pdGlhbENhcmRzLCByZW5kZXJlcjogY3JlYXRlQ2FyZCB9LFxyXG4gIGNhcmRMaXN0RWxcclxuKTtcclxuY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcclxuXHJcbi8vIEVWRU5UIExJU1RFTkVSU1xyXG5wcm9maWxlRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNvbnN0IGluZm8gPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xyXG4gIHByb2ZpbGVUaXRsZUlucHV0LnZhbHVlID0gaW5mby50aXRsZTtcclxuICBwcm9maWxlRGVzY0lucHV0LnZhbHVlID0gaW5mby5kZXNjcmlwdGlvbjtcclxuICBwcm9maWxlRWRpdFBvcHVwLm9wZW4oKTtcclxufSk7XHJcblxyXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgYWRkRm9ybVZhbGlkYXRvci50b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG4gIGNhcmRQb3B1cC5vcGVuKCk7XHJcbn0pO1xyXG5cclxuLy8gQ0xBU1NFU1xyXG5jb25zdCBwcm9maWxlRWRpdFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0ocHJvZmlsZUVkaXRNb2RhbCwgaGFuZGxlRm9ybVN1Ym1pdCk7XHJcblxyXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKHByZXZpZXdJbWFnZU1vZGFsKTtcclxuY29uc3QgY2FyZFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oYWRkQ2FyZE1vZGFsLCBoYW5kbGVBZGRDYXJkU3VibWl0KTtcclxuXHJcbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHByb2ZpbGVUaXRsZSwgcHJvZmlsZURlc2NyaXB0aW9uKTtcclxuXHJcbmNvbnN0IGVkaXRGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioc2V0dGluZ3MsIHByb2ZpbGVFZGl0Rm9ybSk7XHJcbmNvbnN0IGFkZEZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgYWRkQ2FyZE1vZGFsRm9ybSk7XHJcblxyXG4vLyBDTEFTUyBFVkVOVCBMSVNURU5FUlNcclxucHJvZmlsZUVkaXRQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5pbWFnZVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbmNhcmRQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuZWRpdEZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG5hZGRGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjbGFzc0VsZW1lbnQpIHtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG5cclxuICAgIHRoaXMuX2NsYXNzRWxlbWVudCA9IGNsYXNzRWxlbWVudDtcclxuICB9XHJcblxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShlbGVtZW50KSB7XHJcbiAgICB0aGlzLl9jbGFzc0VsZW1lbnQucHJlcGVuZChlbGVtZW50KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cEVsZW1lbnQpIHtcclxuICAgIHN1cGVyKHsgcG9wdXBFbGVtZW50IH0pO1xyXG4gICAgdGhpcy5faW1hZ2VFbGVtZW50ID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl90aXRsZUVsZW1lbnQgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fcGFyYWdyYXBoXCIpO1xyXG4gIH1cclxuXHJcbiAgb3BlbihjYXJkRGF0YSkge1xyXG4gICAgc3VwZXIub3BlbigpO1xyXG4gICAgdGhpcy5faW1hZ2VFbGVtZW50LnNyYyA9IGNhcmREYXRhLmxpbms7XHJcbiAgICB0aGlzLl9pbWFnZUVsZW1lbnQuYWx0ID0gY2FyZERhdGEubmFtZTtcclxuICAgIHRoaXMuX3RpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IGNhcmREYXRhLm5hbWU7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcclxuICBjb25zdHJ1Y3Rvcih1c2VyTmFtZUVsZW1lbnQsIGpvYkVsZW1lbnQpIHtcclxuICAgIHRoaXMuX3RpdGxlID0gdXNlck5hbWVFbGVtZW50O1xyXG4gICAgdGhpcy5fZGVzY3JpcHRpb24gPSBqb2JFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICBjb25zdCBpbmZvID0ge1xyXG4gICAgICB0aXRsZTogdGhpcy5fdGl0bGUudGV4dENvbnRlbnQsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLl9kZXNjcmlwdGlvbi50ZXh0Q29udGVudCxcclxuICAgIH07XHJcbiAgICByZXR1cm4gaW5mbztcclxuICB9XHJcblxyXG4gIHNldFVzZXJJbmZvKGRhdGEpIHtcclxuICAgIHRoaXMuX3RpdGxlLnRleHRDb250ZW50ID0gZGF0YS50aXRsZTtcclxuICAgIHRoaXMuX2Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsIl9yZWYiLCJjYXJkU2VsZWN0b3IiLCJfcmVmMiIsIm5hbWUiLCJsaW5rIiwiaGFuZGxlSW1hZ2VDbGljayIsInRoaXMiLCJfbmFtZSIsIl9saW5rIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVJbWFnZUNsaWNrIiwiZ2V0VmlldyIsIl9jYXJkRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJfY2FyZExpa2VCdG4iLCJfY2FyZERlbGV0ZUJ0biIsIl9jYXJkSW1hZ2UiLCJzcmMiLCJhbHQiLCJ0ZXh0Q29udGVudCIsIl9zZXRFdmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlTGlrZUJ1dHRvbiIsIl9oYW5kbGVEZWxldGVDYXJkIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicmVtb3ZlIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsZW1lbnQiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybSIsIl9pbnB1dEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsIl9zdWJtaXRCdXR0b24iLCJlbmFibGVWYWxpZGF0aW9uIiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJmb3JFYWNoIiwiaW5wdXRFbGVtZW50IiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInRvZ2dsZUJ1dHRvblN0YXRlIiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfZGlzYWJsZUJ1dHRvbiIsIl9lbmFibGVCdXR0b24iLCJkaXNhYmxlZCIsImFkZCIsImVycm9yTWVzc2FnZUVsZW1lbnQiLCJpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiZXZlcnkiLCJQb3B1cCIsInBvcHVwRWxlbWVudCIsIl9wb3B1cEVsZW1lbnQiLCJvcGVuIiwiX2hhbmRsZUVzY0Nsb3NlIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwia2V5Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0Iiwic3VwZXIiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsIl9wb3B1cEZvcm0iLCJfaW5wdXRzIiwicmVzZXQiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dFZhbHVlcyIsImlucHV0IiwidmFsdWUiLCJzZXRJbnB1dFZhbHVlcyIsImRhdGEiLCJmb3JtU2VsZWN0b3IiLCJwcm9maWxlRWRpdEJ1dHRvbiIsInByb2ZpbGVFZGl0TW9kYWwiLCJwcm9maWxlRWRpdEZvcm0iLCJmb3JtcyIsInByb2ZpbGVUaXRsZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsInByb2ZpbGVUaXRsZUlucHV0IiwicHJvZmlsZURlc2NJbnB1dCIsImNhcmRMaXN0RWwiLCJhZGRDYXJkTW9kYWwiLCJhZGRDYXJkTW9kYWxGb3JtIiwiYWRkQ2FyZEJ1dHRvbiIsInByZXZpZXdJbWFnZU1vZGFsIiwiY3JlYXRlQ2FyZCIsImNhcmREYXRhIiwiY2FyZCIsImltYWdlUG9wdXAiLCJyZW5kZXJDYXJkIiwiY2FyZFNlY3Rpb24iLCJhZGRJdGVtIiwiY2xhc3NFbGVtZW50IiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pdGVtcyIsIl9yZW5kZXJlciIsIl9jbGFzc0VsZW1lbnQiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsImluZm8iLCJ1c2VySW5mbyIsImdldFVzZXJJbmZvIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInByb2ZpbGVFZGl0UG9wdXAiLCJhZGRGb3JtVmFsaWRhdG9yIiwiY2FyZFBvcHVwIiwic2V0VXNlckluZm8iLCJfaW1hZ2VFbGVtZW50IiwiX3RpdGxlRWxlbWVudCIsInVybCIsInVzZXJOYW1lRWxlbWVudCIsImpvYkVsZW1lbnQiLCJfdGl0bGUiLCJfZGVzY3JpcHRpb24iLCJlZGl0Rm9ybVZhbGlkYXRvciJdLCJzb3VyY2VSb290IjoiIn0=