import React from "react";

function Card(props) {
  const isOwn = props.owner === props.currentUser;
  const isLiked = props.likes.some((i) => i._id === props.currentUser);
  return (
    <div className="element">
      <img
        src={props.link}
        alt={props.name}
        className="element__image"
        onClick={() => {
          props.onCardClick(props.name, props.link);
        }}
      />
      {isOwn && (
        <button
          type="button"
          className="element__trash-button"
          onClick={() => {
            props.onConfirmPopup(props.card);
          }}
        ></button>
      )}

      <div className="element__content">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={`element__like-button ${
              isLiked && "element__like-button_active"
            }`}
            onClick={() => {
              props.onCardLike(props.card);
            }}
          ></button>
          <span className="element__like-number">{props.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
