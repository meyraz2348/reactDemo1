import { useContext } from "react";
import classes from "./Account.module.css";
import CartContext from "../../store/cart-context";
const Account = (props) => {
  const cartCtx = useContext(CartContext);
  const logoutHandler = () => {
    props.onHide();
    cartCtx.loginInfo(false, "LOGIN");
    cartCtx.loginInfo(false, "ACCOUNT");
  };
  return (
    <section className={classes.sectionClasses}>
      <button className={classes.sectionButtons}>My Orders</button>
      <button onClick={props.onOrders} className={classes.sectionButtons}>
        My Address{" "}
      </button>
      <button className={classes.sectionButtons}>My Offers </button>
      <button onClick={logoutHandler} className={classes.sectionButtons}>
        logout
      </button>
    </section>
  );
};
export default Account;
