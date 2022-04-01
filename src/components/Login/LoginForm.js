import CartContext from "../../store/cart-context";
import useInput from "../Hooks/use-input";
import classes from "./LoginForm.module.css";
import { useContext } from "react";

const LoginForm = (props) => {
  // const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
  const cartCtx = useContext(CartContext);
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.length >= 10);
  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return; // just a double check as the user can enable submit button from dev tools
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPassword();
  };
  const loginHandler = () => {
    cartCtx.loginInfo(true, "LOGIN");
    cartCtx.loginInfo(false, "ERRORTEXT");
    console.log("im inside abc");
    props.onCancel();
  };
  return (
    <div className={classes.signUp}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes["control-group"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="name">first name</label>
            <input
              type="text"
              id="name"
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              value={firstName}
            />
          </div>
          {firstNameHasError && (
            <p className={classes.errorText}>first name cannot be empty</p>
          )}
          <div className={classes["form-control"]}>
            <label htmlFor="name">last name</label>
            <input
              type="text"
              id="name"
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              value={lastName}
            />
          </div>
          {lastNameHasError && (
            <p className={classes.errorText}>last name cannot be empty</p>
          )}
          <div className={classes["form-control"]}>
            <label htmlFor="name">e-mail address</label>
            <input
              type="text"
              id="name"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            />
          </div>
          {emailHasError && (
            <p className={classes.errorText}>
              please enter a valid email-address
            </p>
          )}
          <div className={classes["form-control"]}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
            />
          </div>
          {passwordHasError && (
            <p className={classes.errorText}>
              password must be atleast 10 characters
            </p>
          )}
        </div>
        <div className={classes.formActions}>
          <button disabled={!formIsValid} onClick={loginHandler}>
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
