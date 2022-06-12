import React from "react";
import Form from "./Form";
import Popup from "./Popup";

function ConfirmPopup(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onCardDelete(props.deleteCard);
  }
  return (
    <Popup
      popupType="popup-confirm"
      show={props.isOpen}
      onClickClose={props.onClose}
    >
      <Form
        title="Вы уверены?"
        onSubmit={handleSubmit}
        loggedIn={props.isLoggedIn}
      >
        <button
          className="form__button form__button_difference_confirm-form"
          type="submit"
        >
          {props.isLoading ? "Удаление..." : "Да"}
        </button>
      </Form>
    </Popup>
  );
}
export default ConfirmPopup;
