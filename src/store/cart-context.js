import { findAllByDisplayValue } from "@testing-library/react";
import React from "react";

const CartContext = React.createContext({
  items: [],
  loginInfo: (val, authenticationType) => {},
  isLoggedIn: false,
  err: findAllByDisplayValue,
  isCartClicked: false,
  isAccountClicked: false,
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
