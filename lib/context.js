import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [qty, setQty] = useState(1);

  // Increase product quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  // Add product to cart
  const onAdd = (product, quantity) => {
    // check prod in cart
    const exist = cartItems.find((Item) => Item.Slug === product.Slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
