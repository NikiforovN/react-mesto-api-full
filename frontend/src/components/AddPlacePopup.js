import React from "react";
import Popup from "./Popup";

import Form from "./Form";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName(name);
    setLink(link);
  }, [props.cards]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <Popup
      popupType="add-place"
      show={props.isOpen}
      onClickClose={props.onClose}
    >
      <Form
        title="Новое место"
        onSubmit={handleSubmit}
        loggedIn={props.isLoggedIn}
      >
        <div className="form__field-container">
          <input
            type="text"
            className="form__field"
            name="name"
            id="title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            onChange={handleNameChange}
            value={name || ""}
          />
          <span className="form__input-error form__title-error"></span>
        </div>
        <div className="form__field-container">
          <input
            type="url"
            className="form__field"
            name="link"
            id="link"
            placeholder="Ссылка на картинку"
            required
            onChange={handleLinkChange}
            value={link || ""}
          />
          <span className="form__input-error form__link-error"></span>
        </div>
        <button className="form__button" type="submit">
          {props.isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </Form>
    </Popup>
  );
}

export default AddPlacePopup;
