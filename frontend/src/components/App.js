import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import ImagePopup from "../components/ImagePopup";
import { api } from "../utils/Api";
import { UserInfo } from "../contexts/CurrentUserContext";
import { Cards } from "../contexts/CardsContext";
import * as mestoAuth from "../utils/MestoAuth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [deletedCard, setDeletedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({
    name: "Жак Кустов",
    about: "Исследователь",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Jacque_Fresco_and_lemon_tree.jpg",
  });
  const [userData, setUserData] = React.useState({
    email: "",
    _id: "",
  });
  const [cardsInfo, setCardsInfo] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [regisryState, setRegisryState] = React.useState(false);

  console.log('currentUser App', currentUser)

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
      return;
    }
    history.push("/register");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards(), tokenCheck()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCardsInfo(cards);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  }, [isLoggedIn]);

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleImagePopupOpen(title, link) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      name: title,
      link: link,
    });
  }

  function handleConfirmPopupOpen(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setIsImagePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api
      .editProfile(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err.ok))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .editAvatar(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err.ok))
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete(deletedCard) {
    setIsLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then((res) => {
        const cardsAfterDelete = cardsInfo.filter(
          (c) => c._id !== deletedCard._id
        );
        setCardsInfo(cardsAfterDelete);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.ok);
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((res) => {
          const likedCard = cardsInfo.map((c) =>
            c._id === card._id ? res : c
          );
          setCardsInfo(likedCard);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .putLike(card._id)
        .then((res) => {
          const likedCard = cardsInfo.map((c) =>
            c._id === card._id ? res : c
          );
          setCardsInfo(likedCard);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleAddPlaceCard(cards) {
    setIsLoading(true);
    api
      .addCard(cards)
      .then((newCard) => {
        setCardsInfo([newCard, ...cardsInfo]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin({ email, password }) {
    return mestoAuth
      .authorize({ email, password })
      .then((res) => {
        if (!res.token) {
          return;
        }
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setRegisryState(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleRegister({ email, password }) {
    return mestoAuth
      .register({ email, password })
      .then(() => {
        setRegisryState(true);

        setIsInfoTooltipPopupOpen(true);
        history.push("/login");
      })
      .catch(() => {
        setRegisryState(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      mestoAuth
        .getContent(jwt)
        .then((res) => {
          setUserData({
            email: res.email,
            _id: res._id,
          });
          setCurrentUser({
            name: res.name,
            about: res.about,
            avatar: res.avatar,
          })
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({
      name: "",
      about: "",
      avatar: "",
    })
  }

  return (
    <Switch>
      <UserInfo.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          handleSignOut={handleSignOut}
          userEmail={userData.email}
        />

        <Route path="/login">
          <Login
            handleLogin={handleLogin}
            tokenCheck={tokenCheck}
            isLoggedIn={isLoggedIn}
          />
        </Route>

        <Route path="/register">
          <Register handleRegister={handleRegister} isLoggedIn={isLoggedIn} />
        </Route>

        <Route>
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Route>

        <Cards.Provider value={cardsInfo}>
          <ProtectedRoute path="/" isLoggedIn={isLoggedIn}>
            <Main
              onEditProfile={handleEditProfilePopupOpen}
              onAddPlace={handleAddPopupOpen}
              onEditAvatar={handleEditAvatarPopupOpen}
              onImagePopup={handleImagePopupOpen}
              onCardLike={handleCardLike}
              onConfirmPopup={handleConfirmPopupOpen}
            />
          </ProtectedRoute>
        </Cards.Provider>

        <Footer />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={() => {
            closeAllPopups();
          }}
          onAddPlace={handleAddPlaceCard}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          cards={cardsInfo}
        />

        <ImagePopup
          card={selectedCard}
          show={isImagePopupOpen}
          onClickClose={() => {
            closeAllPopups();
            setSelectedCard({
              name: "",
              link: "",
            });
          }}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
          deleteCard={deletedCard}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          regisryState={regisryState}
        />
      </UserInfo.Provider>
    </Switch>
  );
}

export default App;
