export default class UserInfo {
  constructor(userNameElement, jobElement) {
    this._name = userNameElement;
    this._title = jobElement;
  }

  getUserInfo() {
    const info = {
      name: this._name.textContent,
      title: this._title.textContent,
    };
    return info;
  }

  setUserInfo({ name, title }) {
    this._name.textContent = name;
    this._title.textContent = title;
  }
}
