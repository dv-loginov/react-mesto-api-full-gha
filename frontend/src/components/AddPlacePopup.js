import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

const AddPlacePopup = ({isOpen, onClose, onAddPlace, textButton}) => {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeLink = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace({name: name, link: link});
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={ handleSubmit }
      name='place'
      title='Новое место'
      isOpen={ isOpen }
      onClose={ onClose }
      buttonText={ textButton }>

      <input id='title-input'
             type='text'
             className='form__input'
             name='name'
             placeholder='Название'
             value={ name }
             minLength='2'
             maxLength='30'
             onChange={ handleChangeName }
             required/>
      <span className='title-input-error form__input-error'>Error</span>
      <input id='url-input'
             type='url'
             className='form__input'
             name='url'
             placeholder='Ссылка на картинку'
             value={ link }
             onChange={ handleChangeLink }
             required/>
      <span className='url-input-error form__input-error'>Error</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
