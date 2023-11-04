export default class UserInfo {
  constructor(userNameElement, jobElement) {
    this._title = userNameElement;
    this._description = jobElement;
  }

  getUserInfo() {
    const info = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return info;
  }

  setUserInfo(data) {
    this._title.textContent = data.title;
    this._description.textContent = data.description;
  }
}
