export default class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
        })
          .then(this._checkResponse);
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers})
        .then(this._checkResponse);
    }

    editUserInfo({title, description}) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: title,
          about: description
        })
      })
      .then(this._checkResponse);
    }

    addCard({title, url}) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: title,
          link: url
        })
      })
      .then(this._checkResponse);
    }

    deleteCard({_id}) {
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse);
      }

    addLikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
    })
    .then(this._checkResponse);
    } 

    removeLikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then(this._checkResponse);
    } 

    editProfileImage(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        })
      })
      .then(this._checkResponse);
    }
};