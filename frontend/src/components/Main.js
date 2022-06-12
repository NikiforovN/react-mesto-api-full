import profileEditButtonPic from "../images/profile__edit-button.svg";
import profileAddButtonPic from "../images/profile__add-button.svg";
import React from "react";
import Card from "./Card";
import { UserInfo } from "../contexts/CurrentUserContext";
import { Cards } from "../contexts/CardsContext";

function Main(props) {
  const userInfo = React.useContext(UserInfo);
  const cardsInfo = React.useContext(Cards);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img
            src={userInfo.avatar}
            alt="Жак-Ив Кусто"
            className="profile__pic"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-first-row">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button
              type="button"
              className="profile__edit-button buttons-hover"
              name="Редактировать профиль"
              onClick={props.onEditProfile}
            >
              <img
                src={profileEditButtonPic}
                alt="карандаш"
                className="profile__edit-button-pic"
              />
            </button>
          </div>
          <p className="profile__status">{userInfo.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button buttons-hover"
          onClick={props.onAddPlace}
        >
          <img
            src={profileAddButtonPic}
            alt="Плюс"
            className="profile__add-button-pic"
          />
        </button>
      </section>

      <section className="elements">
        {cardsInfo.map((item) => {
          return (
            <Card
              card={item}
              link={item.link}
              name={item.name}
              key={item._id}
              likes={item.likes}
              owner={item.owner._id}
              currentUser={userInfo._id}
              onCardClick={props.onImagePopup}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onConfirmPopup={props.onConfirmPopup}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
