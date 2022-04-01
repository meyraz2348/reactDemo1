import CartContext from "../../store/cart-context";
import useInput from "../Hooks/use-input";
import useFetch from "../Hooks/use-fetch";
import classes from "./SignInForm.module.css";
import { useContext, useState } from "react";

const SignInForm = (props) => {
  const [oldUser, setOldUser] = useState(true);
  const cartCtx = useContext(CartContext);
  const [pHasError, setPasswordHasError] = useState(false);
  const [eHasError, setEmailHasError] = useState(false);
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
  } = useInput((value) => value.length === 10);
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      setEmailHasError(false);
      setPasswordHasError(false);
      // resetEmail();
      resetPassword();
    } else {
      return; // just a double check as the user can enable submit button from dev tools
    }
  };

  const loginHandler = () => {
    // const userDataExists = fetchData(enteredEmail, enteredPassword);
    const userDataExists = true;
    if (!userDataExists) {
      cartCtx.loginInfo(true, "LOGIN");
      cartCtx.loginInfo(false, "ERRORTEXT");
      setOldUser(true);
      props.onCancel();
      return true;
    } else {
      setOldUser(false);
    }
  };
  const m = oldUser;
  console.log(m);
  const labelBorder = !oldUser
    ? { border: "1px solid red" }
    : { border: "1px solid #ccc" };
  console.log(labelBorder);
  return (
    <div className={classes.signUp}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes["control-group"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              placeholder="email address"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              style={labelBorder}
            />
          </div>
          {!emailHasError && !eHasError && !oldUser && (
            <p className={classes.errorText}>
              please enter a valid email-address
            </p>
          )}
          <div className={classes["form-control"]}>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              style={labelBorder}
            />
          </div>
          {!passwordHasError && !pHasError && !oldUser && (
            <p className={classes.errorText}>
              password must be atleast 10 characters
            </p>
          )}
        </div>
        <div className={classes.formActions}>
          <button onClick={loginHandler}>Login</button>
        </div>
        {!oldUser && (
          <p className={classes.userErrorText}>
            The email address or password you entered isn't connected to any
            account.Please check the details and try again
          </p>
        )}
      </form>
      <div className={classes.formSignUp}>
        <button onClick={props.onCreateAccount}>Create New Account</button>
      </div>
    </div>
  );
};

export default SignInForm;
