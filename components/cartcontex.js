

"use client"// cartcontex.js
// cartcontex.js
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const productId = action.payload.id;

      if (state.cart[productId]) {
        // El producto ya existe en el carrito, aumentar la cantidad
        return {
          ...state,
          cart: {
            ...state.cart,
            [productId]: {
              ...state.cart[productId],
              quantity: state.cart[productId].quantity + 1,
            },
          },
        };
      } else {
        // El producto no está en el carrito, agregarlo con cantidad 1
        return {
          ...state,
          cart: {
            ...state.cart,
            [productId]: {
              ...action.payload,
              quantity: 1,
            },
          },
        };
      }

    case "REMOVE_FROM_CART":
      const { [action.payload.id]: removedProduct, ...newCart } = state.cart;
      return {
        ...state,
        cart: newCart,
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: {} });

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de un CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
