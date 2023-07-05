import AuthForm from './AuthForm';

const Login = ({handleLogin}) => {
  return (
    <AuthForm
      handleSubmit={ handleLogin }
      title={ 'Вход' }
      name={ 'login' }
      buttonText={ 'Войти' }
    />
  );
};

export default Login;
