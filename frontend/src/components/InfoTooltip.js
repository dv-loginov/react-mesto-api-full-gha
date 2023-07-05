const InfoTooltip = ({isOpen, onClose, ico, text}) => {
  return (
    <div className={ `popup popup_type_info ${ isOpen?' popup_opened':'' }` }>
      <div className='popup__container'>
        <div className="popup__info">
          <div className="popup__ico">{ ico }</div>
          <h3 className="popup__text">{ text }</h3>
        </div>
        <button
          type="button"
          className="popup__close"
          onClick={ () => {
            onClose();
          } }/>
      </div>
    </div>
  );
};

export default InfoTooltip;
