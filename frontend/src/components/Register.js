import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

const Register = ({handleRegister}) => {
  return (
    <AuthForm
      handleSubmit={ handleRegister }
      title={ 'Регистрация' }
      name={ 'sign-in' }
      buttonText={ 'Зарегистрироваться' }
    >
    <span className='auth__question'>
      Уже зарегистрированы?
      <Link className='auth__link' to='/login'>Войти</Link>
    </span>
    </AuthForm>
  );
};

export default Register;
