


"use client"

import { useState } from 'react';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';
const FormularioCarga = () => {
  const [producto, setProducto] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productosCollection = collection(db, 'productos');
      await addDoc(productosCollection, {
        ...producto,
      });
     
      setProducto({
        titulo: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: '',
        categoria: '',
      });
      alert('Producto cargado exitosamente');
    } catch (error) {
      console.error('Error al cargar el producto:', error);
      alert('Error al cargar el producto');
    }
  };

  return (
    <>
    <h1 className='text-2xl text-bold'>Carga de Producto</h1>
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
      <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="titulo">
        Título:
      </label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        value={producto.titulo}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        required
      />

      <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="descripcion">
        Descripción:
      </label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={producto.descripcion}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded-md resize-none focus:outline-none focus:border-blue-500"
        required
      />

      <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="precio">
        Precio:
      </label>
      <input
        type="number"
        id="precio"
        name="precio"
        value={producto.precio}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        required
      />

      <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="stock">
        Stock:
      </label>
      <input
        type="number"
        id="stock"
        name="stock"
        value={producto.stock}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        required
      />

      <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="imagen">
        URL de la Imagen:
      </label>
      <input
        type="url"
        id="imagen"
        name="imagen"
        value={producto.imagen}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        required
      />

      <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="categoria">
        Categoría:
      </label>
      <input
        type="text"
        id="categoria"
        name="categoria"
        value={producto.categoria}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        required
      />

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-teal-500 rounded-md focus:outline-none hover:bg-teal-500"
      >
        Cargar Producto
      </button>
    </form>
    </>
    
  );
};

export default FormularioCarga;
