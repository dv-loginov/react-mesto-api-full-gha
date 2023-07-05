import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import AuthOkPopup from './AuthOkPopup';
import AuthErrorPopup from './AuthErrorPopup';
import apiAuth from '../utils/apiAuth';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAuthOkPopupOpen, setIsAuthOkPopupOpen] = useState(false);
  const [isAuthErrorPopupOpen, setIsAuthErrorPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setLoading] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      api.getInitData()
        .then((data) => {
          setCards(data[0]);
          setCurrentUser(data[1]);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (data) => {
    setSelectedCard(data);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setIsAuthOkPopupOpen(false);
    setIsAuthErrorPopupOpen(false);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => console.error(err));
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() =>
      setCards((state) => state.filter((c) => c._id !== card._id))
    ).catch((err) => console.error(err));
  }

  const handleUpdateUser = ({name, about}) => {
    setLoading(true);
    api.setUser({name, about})
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  const handleUpdateAvatar = ({avatar}) => {
    setLoading(true);
    api.setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    setLoading(true);
    api.addCard({name, link})
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  const handleLogin = ({email, password}) => {
    apiAuth.authorize({password, email})
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setEmail(email);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setIsAuthErrorPopupOpen(true);
      })
  }

  const handleRegister = ({email, password}) => {
    apiAuth.register({password, email})
      .then((data) => {
        setIsAuthOkPopupOpen(true);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setIsAuthErrorPopupOpen(true)
      })
  }

  const checkToken = () => {
    apiAuth.checkToken(localStorage.getItem('jwt'))
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.data.email);
        navigate(location.pathname);
      })
      .catch((err) => {
        console.error(err);
        setLoggedIn(false);
      });
  }

  const handleExit = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail(null);
    navigate('/');
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoggedIn === null) {
    return (<div className='page'>
      <div className='page__content'>Loading...</div>
    </div>);
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className='page'>
        <div className='page__content'>
          <Header
            isLoggedIn={ isLoggedIn }
            email={ email }
            handleExit={ handleExit }/>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                element={ <Main
                  onEditProfile={ handleEditProfileClick }
                  onAddPlace={ handleAddPlaceClick }
                  onEditAvatar={ handleEditAvatarClick }
                  onCardClick={ handleCardClick }
                  onCardLike={ handleCardLike }
                  onCardDelete={ handleCardDelete }
                  cards={ cards }/> }
                isLoggedIn={ isLoggedIn }
              />
            }/>
            <Route
              path="/login"
              element={
                <main className="auth">
                  <Login handleLogin={ handleLogin }/>
                </main> }/>
            <Route
              path="/sign-in"
              element={
                <main className="auth">
                  <Register handleRegister={ handleRegister }/>
                </main> }/>
            <Route path="*" element={ <h2>Page not found</h2> }></Route>
          </Routes>
          <Footer/>

          <AuthOkPopup
            isOpen={ isAuthOkPopupOpen }
            onClose={ closeAllPopups }/>

          <AuthErrorPopup
            isOpen={ isAuthErrorPopupOpen }
            onClose={ closeAllPopups }/>

          <EditProfilePopup
            isOpen={ isEditProfilePopupOpen }
            onClose={ closeAllPopups }
            onUpdateUser={ handleUpdateUser }
            textButton={ isLoading ? 'Сохранение...' : 'Сохранить' }/>

          <EditAvatarPopup
            isOpen={ isEditAvatarPopupOpen }
            onClose={ closeAllPopups }
            onUpdateAvatar={ handleUpdateAvatar }
            textButton={ isLoading ? 'Сохранение...' : 'Сохранить' }/>

          <AddPlacePopup
            isOpen={ isAddPlacePopupOpen }
            onClose={ closeAllPopups }
            onAddPlace={ handleAddPlaceSubmit }
            textButton={ isLoading ? 'Создание...' : 'Создать' }/>

          <ImagePopup
            card={ selectedCard }
            onClose={ closeAllPopups }
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
