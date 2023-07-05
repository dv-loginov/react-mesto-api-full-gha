const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    required: [true, 'Поле "link" должно быть заполнено'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    }],
  createAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
