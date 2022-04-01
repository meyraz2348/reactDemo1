import { useContext, useRef, useState } from "react";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const cartCtx = useContext(CartContext);
  const amountInputRef = useRef();
  const { isLoggedIn, err } = useContext(CartContext);
  const submitHandler = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      console.log("in if");
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;
      if (
        enteredAmount.trim().length === 0 ||
        enteredAmountNumber < 1 ||
        enteredAmountNumber > 5
      ) {
        setAmountIsValid(false);
        return;
      }
      props.onAddToCart(enteredAmountNumber);
    } else {
      cartCtx.loginInfo(true, "ERRORTEXT");
      console.log(err);
      console.log("in else");
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Quantity"
        input={{
          id: Math.ceil(1000 * Math.random()),
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
