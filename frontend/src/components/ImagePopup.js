const ImagePopup = ({card, onClose}) => {
  return (
    <div className={ `popup popup_type_image ${ card.link && ' popup_opened' }` }>
      <figure className="popup__container-img">
        <img className="popup__img" src={ card.link } alt={ card.name }/>
        <figcaption className="popup__caption">{ card.name }</figcaption>
        <button
          type="button"
          className="popup__close"
          onClick={ () => {
            onClose();
          } }/>
      </figure>
    </div>
  );
};

export default ImagePopup;
