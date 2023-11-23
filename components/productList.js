
"use client"

// component/productlist.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Listado = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null); // Nuevo estado
  useEffect(() => {
    // Hacer la solicitud a la API para obtener productos y categorías
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // Obtener todas las categorías únicas
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(['all', ...uniqueCategories]);
      });
  }, []);

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>

      {/* Menú de categorías */}
      <label htmlFor="category" className="block mb-2">Filtrar por categoría: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => filterProductsByCategory(e.target.value)}
        className="border p-2 mb-4"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Lista de productos en tarjetas con enlaces a detalles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link  onClick={() => setSelectedProduct(product)} key={product.id} href={`/${product.id}`} passHref>
            
              <div className="bg-white p-4 rounded-md shadow-md cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-green-700 font-semibold mb-2">Precio: ${product.price}</p>
                <p className="text-gray-600">Categoría: {product.category}</p>
                <img
                  src={product.image}
                  alt={product.title}
                  className="mt-4 mx-auto max-w-full h-auto"
                />
              </div>
              
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listado;

