import React, { useContext, useState } from "react";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import LoginForm from "../Login/LoginForm";
import Account from "../Account/Account";
import SignInForm from "../Login/SignInForm";
import { db } from "../../fireBaseConfig";
import { onValue, ref, update } from "firebase/database";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [oldUser, setOldUser] = useState(true);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  let ordersList = [];
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const createAccountHandler = () => {
    setOldUser(false);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  // if (data !== null) {
  //   const keys = Object.keys(data);
  //   console.log(data[keys].orderedItems);
  //   return data[keys].orderedItems;
  // }

  // console.log(previousOrdersList);
  const submitDataHandler = async (userData) => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const keys = Object.keys(data);
        console.log(data[cartCtx.key]);
        const previousOrdersList = data[cartCtx.key].orderedItems;
        ordersList = previousOrdersList.map((order) => {
          return [...ordersList, order];
        });
        console.log(ordersList);
      }
    });
    update(ref(db, cartCtx.key), {
      orderedItems: [...ordersList, cartCtx.items],
      address: userData,
    });
    setIsSubmitting(true);
    setDidSubmit(true);
    setIsSubmitting(false);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Thank you your order has been placed</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitDataHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const userLoginForm =
    !cartCtx.isLoggedIn && oldUser ? (
      <SignInForm
        onCancel={props.onHide}
        onCreateAccount={createAccountHandler}
        className={classes.signUp}
      />
    ) : (
      <LoginForm onCancel={props.onHide} className={classes.signUp} />
    );
  const showAccount = !cartCtx.isLoggedIn ? (
    { userLoginForm }
  ) : (
    <Account onHide={props.onHide} />
  );
  const cartHeading = (
    <div>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </div>
  );
  return (
    <Modal onClose={props.onClose} onHide={props.onHide}>
      {!cartCtx.isLoggedIn && userLoginForm}
      {cartCtx.isLoggedIn && !cartCtx.isAccountClicked && cartHeading}
      {cartCtx.isAccountClicked && cartCtx.isLoggedIn && (
        <Account onHide={props.onHide} />
      )}
    </Modal>
  );
};

export default Cart;
