export default class jsonPlaceholderClient {
    constructor() {
        this._baseURL = "https://jsonplaceholder.typicode.com";
    }

    getPosts() {
        return fetch(`${this._baseURL}/posts`);
    }
}

console.log("this exists");
