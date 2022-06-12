import Popup from "./Popup";
import success from "../images/success-registry.svg";
import fail from "../images/fail-registry.svg";

function InfoTooltip(props) {
  return (
    <Popup show={props.isOpen} onClickClose={props.onClose}>
      <img
        className="popup__regisry-image"
        src={props.regisryState ? success : fail}
        alt="Иконка"
      />
      <p className="popup__regisry-info">
        {props.regisryState
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </p>
    </Popup>
  );
}

export default InfoTooltip;
