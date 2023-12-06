"use client"
//cartcontex.js
import React, { createContext, useContext, useReducer } from "react";

// Definir el contexto
const CartContext = createContext();

// Definir el inicializador del estado y el contexto del proveedor
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
        


    // Agregar más casos según sea necesario (eliminar del carrito, actualizar cantidades, etc.)
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  
  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };
  // Agregar más funciones según sea necesario (eliminar del carrito, actualizar cantidades, etc.)

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

// Función de utilidad para usar el contexto
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de un CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
