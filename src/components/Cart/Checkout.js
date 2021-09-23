import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCode,
  } = useInput((value) => value.trim() !== "" && value.length >= 5);

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredName && enteredStreet && enteredPostalCode && enteredCity) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid && !streetIsValid && !postalCodeIsValid && !cityIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameControlClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;

  const streetControlClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    postalCodeHasError ? classes.invalid : ""
  }`;

  const cityControlClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameHasError && (
          <p className={classes["invalid-paragraph"]}>
            Please enter a valid name!
          </p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetInputBlurHandler}
          value={enteredStreet}
        />
        {streetHasError && (
          <p className={classes["invalid-paragraph"]}>
            Please enter a valid street!
          </p>
        )}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeInputBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeHasError && (
          <p className={classes["invalid-paragraph"]}>
            Please enter a valid postal code! (5 characters long)
          </p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityInputBlurHandler}
          value={enteredCity}
        />
        {cityHasError && (
          <p className={classes["invalid-paragraph"]}>
            Please enter a valid city!
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
