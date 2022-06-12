import React, { useRef } from "react";
import Popup from "./Popup";
import Form from "./Form";

function EditAvatarPopup(props) {
  let avatarInput = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  React.useEffect(() => {
    avatarInput.current.value = "";
  }, [props.isOpen]);

  return (
    <Popup
      popupType="change-avatar"
      show={props.isOpen}
      onClickClose={props.onClose}
    >
      <Form
        title="Обновить аватар"
        onSubmit={handleSubmit}
        loggedIn={props.isLoggedIn}
      >
        <div className="form__field-container">
          <input
            type="url"
            className="form__field"
            name="avatar"
            defaultValue=""
            id="avatar-link"
            placeholder="Ссылка"
            minLength="2"
            maxLength="250"
            required
            ref={avatarInput || ""}
          />
          <span className="form__input-error form__avatar-link-error"></span>
        </div>
        <button className="form__button" type="submit">
          {props.isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </Form>
    </Popup>
  );
}
export default EditAvatarPopup;
