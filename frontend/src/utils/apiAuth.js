class ApiAuth {
  constructor(opt) {
    this._baseUrl = opt.baseUrl;
  }

  register({password, email}) {
    return this._request('signup', {
      method: 'POST',
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email,
      })
    });
  }

  authorize({password, email}) {
    return this._request('signin', {
      method: 'POST',
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email,
      })
    });
  }

  exit() {
    return this._request('signout', {
      method: 'POST',
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      credentials: 'include',
    });
  }


  checkToken() {
    return this._request('users/me', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
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

const apiAuth = new ApiAuth({
  baseUrl: 'http://localhost:3005',
});

export default apiAuth;
