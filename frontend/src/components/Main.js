import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({
                onEditProfile,
                onAddPlace,
                onEditAvatar,
                onCardClick,
                onCardLike,
                onCardDelete,
                cards
              }) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section>
        <div className="profile">
          <button type='button'
                  className="profile__avatar-edit"
                  onClick={ onEditAvatar }
                  style={ {backgroundImage: `url(${ currentUser.avatar })`} }/>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__title">{ currentUser.name }</h1>
              <button className="profile__edit-btn"
                      type="button"
                      onClick={ onEditProfile }/>
            </div>
            <p className="profile__subtitle">{ currentUser.about }</p>
          </div>
          <button className="add-btn"
                  type="button"
                  onClick={ onAddPlace }/>
        </div>
      </section>
      <section>
        <ul className="elements">
          {
            cards.map((card) => {
              return (
                <Card key={ card._id }
                      card={ card }
                      onCardClick={ onCardClick }
                      onCardLike={ onCardLike }
                      onCardDelete={ onCardDelete }
                />
              )
            })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
