class ApiAuth {
  constructor(opt) {
    this._baseUrl = opt.baseUrl;
  }

  register({password, email}) {
    return this._request('signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: password,
        email: email,
      })
    });
  }

  authorize({password, email}) {
    return this._request('signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: password,
        email: email,
      })
    });
  }

  checkToken(jwt) {
    return this._request('users/me', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ jwt }`
      }
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
  baseUrl: 'https://auth.nomoreparties.co',
});

export default apiAuth;
