const jwt = require('jsonwebtoken');
const BadAuth = require('../errors/BadAuth');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new BadAuth('Требуется авторизация'));
  }

  req.user = payload;

  return next();
};
