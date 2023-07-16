class Api {
  constructor(opt) {
    this._baseUrl = opt.baseUrl;
    this._headers = opt.headers;
  }

  getInitialCards() {
    return this._request('cards', {headers: this._headers, credentials: 'include',});
  }

  getUser() {
    return this._request('users/me', {headers: this._headers, credentials: 'include',});
  }

  getInitData() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }

  setUser({name, about}) {
    return this._request('users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    });
  }

  setAvatar(link) {
    return this._request('users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  };

  addCard({name, link}) {
    return this._request('cards', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard(id) {
    return this._request(`cards/${ id }`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLike) {
    return isLike ? this.setLike(id) : this.deleteLike(id);
  }

  setLike(id) {
    return this._request(`cards/${ id }/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    });
  }

  deleteLike(id) {
    return this._request(`cards/${ id }/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${ res.status }`);
    }
    return res.json();
  }

  _request(endpoint, options) {
    return fetch(`${ this._baseUrl }/${ endpoint }`, options).then(this._getResponseData)
  }

}

const api = new Api({
  baseUrl: 'http://api.dilog.nomoredomains.xyz',
  headers: {
    "Accept" : "application/json",
    "Content-Type": "application/json"
  },
});

export default api;
