import { useState } from 'react';

const AuthForm = ({handleSubmit, title, name, buttonText, children = ''}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit({email, password});
  };

  return (
    <div className='auth__container'>
      <h3 className="auth__title">{ title }</h3>
      <form autoComplete="off"
        action="#"
        className={ `form form_auth` }
        name={ `${ name }-form` }
        onSubmit={ onSubmit }>
        <input id='email-input'
               type='email'
               className='form__input form__input_auth'
               name='email'
               value={ email }
               onChange={ handleChangeEmail }
               minLength='6'
               maxLength='40'
               placeholder='Email'
               required/>
        <span className='name-input-error form__input-error'>Error</span>
        <input id='password-input'
               type='password'
               className='form__input form__input_auth'
               name='password'
               value={ password }
               onChange={ handleChangePassword }
               minLength='6'
               maxLength='200'
               placeholder='Пароль'
               required/>
        <span className='job-input-error form__input-error'>Error</span>
        <button type='submit' className='form__btn form__btn_auth'>{ buttonText }</button>
      </form>
      { children }
    </div>
  );
};

export default AuthForm;
