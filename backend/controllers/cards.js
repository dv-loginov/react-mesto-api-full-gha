const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const BadForbidden = require('../errors/BadForbidden');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const newCardData = req.body;
  newCardData.owner = req.user._id;
  return Card.create(newCardData)
    .then((newCard) => res.status(201)
      .send(newCard))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(new NotFound('Карточка не найдена'))
    .then((card) => {
      if (req.user._id === String(card.owner)) {
        return Card.deleteOne({ _id: id })
          .then(() => res.status(200)
            .send({ message: `Карточка ${id} удалена` }))
          .catch(next);
      }
      return next(new BadForbidden('Доступ запрещен'));
    })
    .catch(next);
};

const toggleLikeCard = (req, res, update, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    update,
    { new: true },
  )
  .orFail(new NotFound('Карточка не найдена'))
  .then((newCard) => res.status(200)
    .send(newCard))
  .catch(next);

const likeCard = (req, res, next) => toggleLikeCard(
  req,
  res,
  { $addToSet: { likes: req.user._id } },
  next,
);

const dislikeCard = (req, res, next) => toggleLikeCard(
  req,
  res,
  { $pull: { likes: req.user._id } },
  next,
);

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
