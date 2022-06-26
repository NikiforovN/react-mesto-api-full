import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";

function Header(props) {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function toggleBurgerMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <Switch>

        <Route exact path="/">
          <div className="header__box">
            <div className={`header__menu ${isMenuOpen && "header__menu_active"}`}>
              <p className={`header__name ${isMenuOpen && 'header__menu_margins_none'}`}>{props.userEmail}</p>
              <button
                className={`header__link buttons-hover  ${isMenuOpen && 'header__menu_margins_none'}`}
                onClick={props.handleSignOut}
              >
                Выйти
              </button>
            </div>

            <div className="header__container">
              <img src={headerLogo} alt="Логотип Место" className="header__logo" />
              <div className={`header__burger buttons-hover ${isMenuOpen && "header__burger_active"}`} onClick={toggleBurgerMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </Route>

        <Route path="/login">
          <div className="header__container">
            <img src={headerLogo} alt="Логотип Место" className="header__logo" />
            <Link to="register" className="header__link buttons-hover">
              Регистрация
            </Link>
          </div>
        </Route>

        <Route path="/register">
          <div className="header__container">
            <img src={headerLogo} alt="Логотип Место" className="header__logo" />
            <Link to="login" className="header__link buttons-hover">
              Войти
            </Link>
          </div>
        </Route>

      </Switch>
    </header>
  );
}
export default Header;
