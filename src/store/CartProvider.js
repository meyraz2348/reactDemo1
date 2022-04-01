import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  isLoggedIn: false,
  err: false,
  isCartClicked: false,
  isAccountClicked: false,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const userLog = state.isLoggedIn;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      isLoggedIn: userLog,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    const userLog = state.isLoggedIn;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      isLoggedIn: userLog,
    };
  }
  if (action.type === "CLEAR") {
    const k = { ...defaultCartState };
    const userLog = state.isLoggedIn;
    return {
      items: k.items,
      totalAmount: k.totalAmount,
      isLoggedIn: userLog,
    };
  }
  if (action.type === "LOGIN") {
    const updateIsloggedIn = action.val;
    const updateErrorMessage = state.err;
    const upItem = state.items;
    const upamt = state.totalAmount;
    return {
      isLoggedIn: updateIsloggedIn,
      err: updateErrorMessage,
      items: upItem,
      totalAmount: upamt,
    };
  }
  if (action.type === "ERRORTEXT") {
    const updateErrorMessage = action.val;
    const updateIsloggedIn = state.isLoggedIn;
    const upItem = state.items;
    const upamt = state.totalAmount;
    return {
      isLoggedIn: updateIsloggedIn,
      err: updateErrorMessage,
      items: upItem,
      totalAmount: upamt,
    };
  }
  if (action.type === "CART") {
    const updateIsCartClicked = action.val;
    const updateIsAccountClicked = state.isAccountClicked;
    const updateErrorMessage = state.isLoggedIn;
    const updateIsloggedIn = state.isLoggedIn;
    const upItem = state.items;
    const upamt = state.totalAmount;
    return {
      isLoggedIn: updateIsloggedIn,
      err: updateErrorMessage,
      items: upItem,
      isCartClicked: updateIsCartClicked,
      isAccountClicked: updateIsAccountClicked,
      totalAmount: upamt,
    };
  }
  if (action.type === "ACCOUNT") {
    const updateIsAccountClicked = action.val;
    const updateIsCartClicked = state.isCartClicked;
    const updateErrorMessage = state.isLoggedIn;
    const updateIsloggedIn = state.isLoggedIn;
    const upItem = state.items;
    const upamt = state.totalAmount;
    return {
      isLoggedIn: updateIsloggedIn,
      err: updateErrorMessage,
      items: upItem,
      isCartClicked: updateIsCartClicked,
      isAccountClicked: updateIsAccountClicked,
      totalAmount: upamt,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = (id) => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const userAuthenticator = (val, authenticationType) => {
    dispatchCartAction({ type: authenticationType, val: val });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    isLoggedIn: cartState.isLoggedIn,
    err: cartState.err,
    isCartClicked: cartState.isCartClicked,
    isAccountClicked: cartState.isAccountClicked,
    loginInfo: userAuthenticator,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
