function Form(props) {
  return (
    <div className="form__box">
      <h2
        className={`form__title ${
          !props.loggedIn ? "form__title_difference_authorization" : ""
        }`}
      >
        {props.title}
      </h2>
      <form className="form__container" method="get" onSubmit={props.onSubmit}>
        {props.children}
      </form>
    </div>
  );
}

export default Form;
