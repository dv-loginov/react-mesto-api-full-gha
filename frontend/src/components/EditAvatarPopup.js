import PopupWithForm from './PopupWithForm';
import { useRef, useEffect } from 'react';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, textButton}) => {

  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={ handleSubmit }
      name='avatar'
      title='Обновить аватар'
      isOpen={ isOpen }
      onClose={ onClose }
      buttonText={ textButton }>

      <input id='url-avatar-input'
             type='url'
             className='form__input'
             name='url'
             placeholder='Ссылка на картинку'
             ref={ inputRef }
             required/>
      <span className='url-avatar-input-error form__input-error'>Error</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
