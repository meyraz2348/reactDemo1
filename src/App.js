import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Account from "./components/Account/Account";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [accountIsShown, setAccountIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showAccountHandler = () => {
    setAccountIsShown(true);
  };
  const hideAccountHandler = () => {
    setAccountIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {/* {cartIsShown && <Account onClose={hideCartHandler} />} */}
      {accountIsShown && <Cart onHide={hideAccountHandler} />}
      <Header onShowCart={showCartHandler} onShowAccount={showAccountHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
