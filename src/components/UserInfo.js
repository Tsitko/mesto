export default class UserInfo {
  constructor({
    profileNameSelector,
    profileJobSelector,
    profileAvatarSelector,
  }) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._job.textContent,
      profileImage: this._avatar.src,
    };
    return userInfo;
  }

  setUserInfo(data) {
    if (data.name) this._name.textContent = data.name;
    if (data.about) this._job.textContent = data.about;
    this.setAvatar(data);
  }

  setAvatar(data) {
    if (data.avatar) this._avatar.src = data.avatar;
    if (data.name) this._avatar.alt = data.name;
  }
}
