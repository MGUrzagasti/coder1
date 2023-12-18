
import React from "react";
import { useCart } from "./cartcontex";
import { useRouter } from "next/navigation";

const CartStatus = () => {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/productos");
  };

  const handleFinishPurchase = () => {
    const total = Object.values(cart).reduce((total, product) => total + product.precio * product.quantity, 0);
    
    // Obtener la lista de productos comprados
    const productsPurchased = Object.values(cart).map((product) => ({
      nombre: product.nombre,
      cantidad: product.quantity,
      precioUnitario: product.precio,
      totalProducto: product.precio * product.quantity,
    }));

    // Mostrar los productos comprados en un alert
    alert(`Total de la factura: $${total}\n\nProductos comprados:\n${JSON.stringify(productsPurchased, null, 2)}`);
  };

  return (
    <div>
      <h2 className="text-2xl">Estado del Carrito:</h2>
      {cart.length === 0 ? (
        <p className="text-xl text">El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {Object.values(cart).map((product) => (
              <li key={product.id} className="flex items-center mb-4">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div className="flex-grow">
                  <span className="font-semibold">{product.nombre}</span>
                  <span className="block text-gray-500">{product.descripcion}</span>
                  <span className="block text-gray-500">Precio: ${product.precio}</span>
                  <span className="block text-gray-500">Cantidad: {product.quantity}</span>
                </div>
                <button className="bg-red-500" onClick={() => removeFromCart(product)}>
                  Eliminar del carrito
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">
              Total: ${Object.values(cart).reduce((total, product) => total + product.precio * product.quantity, 0)}
            </h3>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleContinueShopping}>
              Comprar más
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleFinishPurchase}>
              Terminar con la compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartStatus;
