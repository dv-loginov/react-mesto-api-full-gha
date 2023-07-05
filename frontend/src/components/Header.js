import { Link, useLocation } from 'react-router-dom';

const Header = ({isLoggedIn, email, handleExit}) => {
  const pathName = useLocation().pathname;

  const link = () => {
    if (!isLoggedIn) {
      if (pathName === '/login') {
        return <Link
          className='header__link'
          to='/sign-in'>
          Регистрация
        </Link>
      }

      if (pathName === '/sign-in') {
        return <Link
          className='header__link'
          to='/login'>
          Войти
        </Link>
      }
    } else {
      return (
        <button
          className='header__btn'
          onClick={ handleExit }
        >Выйти
        </button>
      )
    }
  }

  return (
    <header className="header">
      <a href="/" className="logo"> </a>
      {
        isLoggedIn
          ? <span className="header__mail">{ email }{ link() }</span>
          : link() }
    </header>
  );
}

export default Header;
