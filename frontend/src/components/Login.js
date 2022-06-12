import React from "react";
import Form from "./Form";

function Login(props) {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  function handleInputsChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!inputs.email || !inputs.password) {
      return;
    }

    props.handleLogin(inputs).catch((err) => console.log(err));
  }

  return (
    <Form title="Вход" onSubmit={handleSubmit} loggedIn={props.isLoggedIn}>
      <div className="form__field-container">
        <input
          type="email"
          className="form__field form__field_difference_autorization"
          name="email"
          id="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          required
          onChange={handleInputsChange}
          value={inputs.email}
        />
        <span className="form__input-error form__title-error"></span>
      </div>
      <div className="form__field-container">
        <input
          type="password"
          className="form__field form__field_difference_autorization"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          onChange={handleInputsChange}
          value={inputs.password}
        />
        <span className="form__input-error form__link-error"></span>
      </div>
      <button
        className="form__button form__button_difference_authorization"
        type="submit"
      >
        {props.isLoading ? "Отправка данных..." : "Войти"}
      </button>
    </Form>
  );
}

export default Login;
