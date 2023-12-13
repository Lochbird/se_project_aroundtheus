export default class UserInfo {
  constructor(userNameElement, jobElement, profileImageElement) {
    this._title = userNameElement;
    this._description = jobElement;
    this._profileImage = profileImageElement;
  }

  getUserInfo() {
    const info = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return info;
  }

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._description.textContent = data.about;
  }

  getProfileImage() {
    return this._profileImage.src
  }

  setProfileImage(link) {
    this._profileImage.src = link.URL;
  }
}
