import React from "react";
import { Link, useLocation, Switch, Route } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";
import menuButton from "../images/menu-button.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="header__logo" />

      <div className="header__container">
        <Switch>
          <Route exact path="/">
            <p className="header__name">{props.userEmail}</p>
            <button
              className="header__link buttons-hover"
              onClick={props.handleSignOut}
            >
              Выйти
            </button>
          </Route>
          <Route path="/login">
            <Link to="register" className="header__link buttons-hover">
              Регистрация
            </Link>
          </Route>
          <Route path="/register">
            <Link to="login" className="header__link buttons-hover">
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}
export default Header;
