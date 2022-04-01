import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import LoginIcon from "../Login/LoginIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
import Account from "../Account/Account";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const cartClasses = `${classes.cartIcon} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const onCartClick = (event) => {
    cartCtx.loginInfo(true, "CART");
    cartCtx.loginInfo(false, "ACCOUNT");
    props.onCart();
  };
  const onAccountClick = (event) => {
    cartCtx.loginInfo(true, "ACCOUNT");
    cartCtx.loginInfo(false, "CART");
    props.onAccount();
  };

  return (
    <div>
      {cartCtx.isLoggedIn && (
        <button className={cartClasses} onClick={onCartClick}>
          <CartIcon />
          <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
      )}
      <button className={classes.loginIcon} onClick={onAccountClick}>
        <LoginIcon />
      </button>
    </div>
  );
};

export default HeaderCartButton;
