"use client"
// Importa las funciones necesarias de Firebase
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/config';

const FormularioCarga = () => {
  const [producto, setProducto] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sube la imagen al almacenamiento de Firebase
      if (imageFile) {
        const storageRef = ref(storage, `${imageFile.name}`);
        const uploadTask = uploadBytes(storageRef, imageFile);

        // Espera a que se complete la carga
        await uploadTask;

        // Obtiene la URL de descarga después de la carga
        const downloadURL = await getDownloadURL(storageRef);

        // Actualiza el estado del producto con la URL de descarga
        setProducto((prevProducto) => ({
          ...prevProducto,
          imagen: downloadURL,
        }));
      }

      // Agrega el producto a la colección de Firestore
      const productosCollection = collection(db, 'productos');
      await addDoc(productosCollection, { ...producto });

      // Reinicia el estado del formulario
      setProducto({
        titulo: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: '',
        categoria: '',
      });
      setImageFile(null);

      alert('Producto cargado exitosamente');
    } catch (error) {
      console.error('Error al cargar el producto:', error);
      alert('Error al cargar el producto');
    }
  };

  return (
    <>
      <h1 className='text-2xl font-bold'>Carga de Producto</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <label htmlFor="titulo" className="block mb-2 text-sm font-bold text-gray-600">
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

        <label htmlFor="descripcion" className="block mb-2 text-sm font-bold text-gray-600">
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

        <label htmlFor="precio" className="block mb-2 text-sm font-bold text-gray-600">
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

        <label htmlFor="stock" className="block mb-2 text-sm font-bold text-gray-600">
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

        <label htmlFor="categoria" className="block mb-2 text-sm font-bold text-gray-600">
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

        <label htmlFor="imagen" className="block mb-2 text-sm font-bold text-gray-600">
          Imagen:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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
