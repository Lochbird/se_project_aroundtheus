export default class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
          })
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
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
      .then(res => res.json())
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
      .then(res => res.json())
    }

    deleteCard({_id}) {
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => {
        if (res.ok) {
          console.log(res);
        }
      })
      }

    addLikeCard(cardId) {
      console.log(this._baseUrl)
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        _headers: this._headers,
    })
    .then((res) => {
      console.log(res);
    })
    } 

    removelikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        _headers: this._headers,
    })
    .then((res) => {
      console.log(res);
    })
    } 

    editProfileImage(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        })
      })
    }
};