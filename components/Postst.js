// Posts.js

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/config";



const getPosts = async () => {
  const postsCollection = collection(db, "productos");

  try {
    const querySnapshot = await getDocs(postsCollection);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};

const Posts = () => {


  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showCargaProducto, setShowCargaProducto] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  const handleCargaProductoClick = () => {
    // Cambiar el estado para mostrar o ocultar el componente de carga de producto
    setShowCargaProducto(!showCargaProducto);

    router.push("/admin/cargaproducto");
  };
 


  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-3xl font-semibold mb-4">Productos</h1>
      <div className="mb-4">
        <button
          onClick={handleCargaProductoClick}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Nuevo Producto
        </button>
      </div>



      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-2xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-2xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-2xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-2xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-2xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Imagen
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-2xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 font-medium text-indigo-600">
                  {post.titulo}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{post.categoria}</td>
              <td className="px-6 py-4 whitespace-no-wrap">${post.precio}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{post.stock}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <img
                  src={post.imagen}
                  alt={post.nombre}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{post.descripcion}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
