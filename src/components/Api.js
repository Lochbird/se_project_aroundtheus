export default class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
      this._authorization = headers.authorization;
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
          });
    };

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    };

    editUserInfo({name, about}) {
      fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }); 
    }

    addCard(card) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
      });
    };
};