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

  setUserInfo(data) {
    console.log(this._name);
    this._name = data.name;
    this._title = data.title;
  }
}
