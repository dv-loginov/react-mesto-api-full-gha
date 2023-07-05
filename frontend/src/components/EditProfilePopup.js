import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, textButton}) => {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      onSubmit={ handleSubmit }
      name='profile'
      title='Редактировать профиль'
      isOpen={ isOpen }
      onClose={ onClose }
      buttonText={ textButton }>

      <input id='name-input'
             type='text'
             className='form__input'
             name='name'
             value={ name || '' }
             onChange={ handleChangeName }
             minLength='2'
             maxLength='40'
             placeholder='Имя'
             required/>
      <span className='name-input-error form__input-error'>Error</span>
      <input id='job-input'
             type='text'
             className='form__input'
             name='job'
             value={ description || '' }
             onChange={ handleChangeDescription }
             minLength='2'
             maxLength='200'
             placeholder='Занятие'
             required/>
      <span className='job-input-error form__input-error'>Error</span>
    </PopupWithForm>
  )
};

export default EditProfilePopup;
