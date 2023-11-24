export default class Api {
    constructor(options) {

    }

    getInitialCards() {
        return fetch("https://around-api.en.tripleten-services.com/v1", {
          headers: {
            authorization: "84c28811-c81d-41e5-be8e-538877aa4bdc"
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
          })
    }

    getUserInfo() {
      fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
        method: "GET",
        authorization: "84c28811-c81d-41e5-be8e-538877aa4bdc"
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
    }
};
  // {"user":{"name":"Jacques Cousteau","about":"Sailor, researcher","avatar":"https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg","_id":"e39ac9c946e25085a1241a94"},"token":"84c28811-c81d-41e5-be8e-538877aa4bdc"}
