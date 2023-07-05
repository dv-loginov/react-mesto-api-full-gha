const PopupWithForm = ({isOpen, onClose, onSubmit, name, title, buttonText, children}) => {
  return (
    <div className={ `popup popup_type_${ name } ${ isOpen?' popup_opened':'' }` }>
      <div className='popup__container'>
        <h3 className="popup__title">{ title }</h3>
        <form action="#" className="form" name={ `${ name }-form` } onSubmit={ onSubmit }>
          { children }
          <button type='submit' className='form__btn'>{ buttonText }</button>
        </form>
        <button
          type="button"
          className="popup__close"
          onClick={ onClose }/>
      </div>
    </div>
  );
};

export default PopupWithForm;
