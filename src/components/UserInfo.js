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
      profileName: this._name.textContent,
      profileCaption: this._job.textContent,
      profileImage: this._avatar.src,
    };
    return userInfo;
  }

  setUserInfo(data) {
    if (data.profileName) this._name.textContent = data.profileName;
    if (data.profileCaption) this._job.textContent = data.profileCaption;
    this.setAvatar(data);
  }

  setAvatar(data) {
    if (data.avatar) this._avatar.src = data.avatar;
    if (data.name) this._avatar.alt = data.name;
  }
}
