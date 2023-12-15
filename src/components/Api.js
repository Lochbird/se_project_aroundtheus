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
          .then(res => this._checkResponse(res));
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers})
        .then(res => this._checkResponse(res));
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
      .then(res => this._checkResponse(res));
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
      .then(res => this._checkResponse(res));
    }

    deleteCard({_id}) {
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => this._checkResponse(res));
      }

    addLikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
    })
    .then(res => this._checkResponse(res));
    } 

    removeLikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then(res => this._checkResponse(res));
    } 

    editProfileImage(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        })
      })
      .then(res => this._checkResponse(res));
    }
};