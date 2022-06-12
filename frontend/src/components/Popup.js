import React from "react";

function Popup(props) {
  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) props.onClickClose();
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") props.onClickClose();
  }

  React.useEffect(() => {
    if (props.show) {
      document.addEventListener("keydown", handleEscClose);
      return;
    }
    document.removeEventListener("keydown", handleEscClose);
  }, [props.show]);

  return (
    <section
      className={`popup ${props.show && "popup_opened"}`}
      id={props.popupType}
      onClick={handleOverlayClose}
    >
      <div
        className={`popup__rectangle ${
          props.popupType === "popup-confirm" &&
          "popup__rectangle_difference_height"
        }`}
      >
        <button
          type="button"
          className="close-icon buttons-hover"
          onClick={props.onClickClose}
        ></button>

        {props.children}
      </div>
    </section>
  );
}
export default Popup;
