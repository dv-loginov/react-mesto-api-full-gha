const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const errorsApi = require('./middlewares/errorsApi');

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

async function connectBD(url) {
  await mongoose.connect(url, { useNewUrlParser: true });
}

connectBD(DB_URL)
  .then(() => console.log('Connect BD: Ok'))
  .catch((err) => console.log(err));

app.use(helmet());

app.use(limiter);

app.use(cookieParser());

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(routes);

app.use(errors());

app.use(errorsApi);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
