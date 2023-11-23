
"use client"
// components/ApiComponent.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ApiComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al recuperar datos de la API', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Filtrar por categoría:</h2>
        <select
          className="p-2 border border-gray-300 rounded"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">Todos</option>
          {[...new Set(products.map((product) => product.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/productos/${product.id}`}>
              <div>
                <div className="bg-white p-4 rounded shadow cursor-pointer transition duration-300 transform hover:scale-105">
                  <img
                    src={product.image}
                    alt={`Imagen de ${product.title}`}
                    className="max-w-full h-auto object-cover"
                  />
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-700 mb-2">{product.category}</p>
                  <p className="text-gray-900 font-bold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
