"use client"
import React, { createContext, useContext, useReducer } from "react";

// Estado inicial del carrito
const initialState = {
  cartItems: [],
};

// Acciones para modificar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    // Puedes agregar más casos según las necesidades (eliminar del carrito, actualizar cantidad, etc.)
    default:
      return state;
  }
};

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
