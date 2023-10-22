export default class UserInfo {
  constructor(userNameSelector, jobSelector) {
    this._name = userNameSelector;
    this._title = jobSelector;
  }

  getUserInfo() {
    const info = {
      name: this._name.textContent,
      title: this._title.textContent,
    };
    return info;
  }

  setUserInfo({ name, title }) {
    this._name = name;
    this._title = title;
  }
}
