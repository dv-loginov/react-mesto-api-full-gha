const router = require('express')
  .Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const NotFound = require('../errors/NotFound');
const {
  loginValidator,
  createUserValidator,
} = require('../middlewares/validators');
const {
  login,
  createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', loginValidator, login);

router.post('/signup', createUserValidator, createUser);

router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход осуществлен' });
});

router.get('/', (req, res) => {
  res.send('Server is run');
});

router.use(auth);

router.use('/users', userRoutes);

router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
