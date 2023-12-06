// CartStatus.js
import React from "react";
import { useCart } from "./cartcontex";


const CartStatus = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  return (
    <div>
      <h2 className="text 2xl:">Estado del Carrito:</h2>
      {cart.length === 0 ? (
        <p className="text-xl text">El carrito está vacío.</p>
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
           
             <button className="bg-red-500"  onClick={() => handleRemoveFromCart(product)}>
                Eliminar del carrito
              </button>

          
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartStatus;
