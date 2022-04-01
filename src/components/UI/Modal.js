import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import CartContext from "../../store/cart-context";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  const cartCtx = useContext(CartContext);
  const modalHandler = (event) => {
    if (cartCtx.isAccountClicked) {
      props.onHide();
    }
    if (cartCtx.isCartClicked) {
      props.onClose();
    }
  };
  return <div className={classes.backdrop} onClick={modalHandler} />;
};
const ModalOverlay = (props) => {
  const { isLoggedIn, isAccountClicked } = useContext(CartContext);
  const accountCss = `${classes.modal} ${
    isLoggedIn && isAccountClicked ? classes.modalAccount : ""
  } `;
  return (
    <div className={accountCss}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} onHide={props.onHide} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
