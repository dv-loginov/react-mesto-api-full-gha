class Api {
  constructor(opt) {
    this._baseUrl = opt.baseUrl;
    this._headers = opt.headers;
  }

  getInitialCards() {
    return this._request('cards', {headers: this._headers});
  }

  getUser() {
    return this._request('users/me', {headers: this._headers});
  }

  getInitData() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }

  setUser({name, about}) {
    return this._request('users/me', {
      method: 'PATCH',
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
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  };

  addCard({name, link}) {
    return this._request('cards', {
      method: 'POST',
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
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLike) {
    return isLike ? this.setLike(id): this.deleteLike(id);
  }

  setLike(id) {
    return this._request(`cards/${ id }/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteLike(id) {
    return this._request(`cards/${ id }/likes`, {
      method: 'DELETE',
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'd07ea27d-96e0-4847-8c63-3989714313d5',
    'Content-Type': 'application/json'
  }
});

export default api;
