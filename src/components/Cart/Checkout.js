import classes from "./Checkout.module.css";
import { useContext, useRef, useState } from "react";
import CartContext from "../../store/cart-context";
const isEmpty = (value) => value.trim() === "";
const isNotFourChars = (value) => value.trim.length !== 4;
const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    street: true,
    postcode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postcodeInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostcode = postcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostcodeIsValid = isNotFourChars(enteredPostcode);
    setFormInputIsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postcode: enteredPostcodeIsValid,
      city: enteredCityIsValid,
    });
    const formIsValid =
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostcodeIsValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postcode: enteredPostcode,
      city: enteredCity,
    });
  };
  const abc = () => {
    cartCtx.clearCart();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputIsValid.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputIsValid.name && <p>Please enter a valid name!!!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputIsValid.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputIsValid.street && <p>Please enter a valid streetname!!!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputIsValid.postcode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postcodeInputRef} />
        {!formInputIsValid.postcode && <p>Please enter a valid postcode!!!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputIsValid.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputIsValid.city && <p>Please enter a valid city!!!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
