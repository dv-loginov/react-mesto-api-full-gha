import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__btn-like ${ isLiked && 'element__btn-like_active' }`
  );

  return (
    <li className="element">
      <img
        src={ card.link }
        alt={ card.name }
        className="element__img"
        onClick={ handleClick }/>
      { isOwn && <button className='element__btn-trash'
                         type="button"
                         onClick={ handleDeleteClick }/> }
      <div className="element__row">
        <h2 className="element__name">{ card.name }</h2>
        <div className="element__btn-warp">
          <button type="button"
                  className={ cardLikeButtonClassName }
                  onClick={ handleLikeClick }/>
          <span className="element__counter-like">{ card.likes.length }</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
