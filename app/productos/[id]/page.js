
"use client"
// pages/productos/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProductDetails = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = router.query;

        if (id) {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await response.json();
          setProduct(data);
        } else {
          // Manejar el caso en el que id es undefined
          console.warn('ID no proporcionado');
        }
      } catch (error) {
        console.error('Error al recuperar detalles del producto de la API', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [router.query]); 

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Detalles del Producto</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          {router.query && router.query.id ? (
            <>
              <p>ID del Producto: {router.query.id}</p>
              {product && (
                <>
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-700 mb-2">{product.category}</p>
                  <p className="text-gray-900 font-bold">${product.price}</p>
                  <p>{product.description}</p>
                  <img
                    src={product.image}
                    alt={`Imagen de ${product.title}`}
                    className="w-full h-48 object-cover mb-4"
                  />
                
                </>
              )}
            </>
          ) : (
            <p>ID no proporcionado</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
