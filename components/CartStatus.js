// CartStatus.js
import React from "react";

import { useCart } from "./cartcontex";



const CartStatus = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Estado del Carrito:</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              <img
                src={product.imagen}
                alt={product.nombre}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <span>{product.nombre}</span>
              <span>Precio: ${product.precio}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartStatus;
