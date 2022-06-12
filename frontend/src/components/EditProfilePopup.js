import React from "react";
import Popup from "./Popup";
import { UserInfo } from "../contexts/CurrentUserContext";
import Form from "./Form";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(UserInfo);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <Popup
      popupType="edit-form"
      show={props.isOpen}
      onClickClose={props.onClose}
    >
      <Form
        title="Редактировать профиль"
        onSubmit={handleSubmit}
        loggedIn={props.isLoggedIn}
      >
        <div className="form__field-container">
          <input
            type="text"
            className="form__field"
            name="name"
            id="name"
            placeholder="Введите ваше имя"
            minLength="2"
            maxLength="40"
            required
            value={name || ""}
            onChange={handleNameChange}
          />
          <span className="form__input-error form__name-error"></span>
        </div>
        <div className="form__field-container">
          <input
            type="text"
            className="form__field"
            name="about"
            id="status"
            placeholder="Введите вашу профессию"
            minLength="2"
            maxLength="200"
            required
            value={description || ""}
            onChange={handleDescriptionChange}
          />
          <span className="form__input-error form__status-error"></span>
        </div>
        <button className="form__button" type="submit">
          {props.isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </Form>
    </Popup>
  );
}
export default EditProfilePopup;
