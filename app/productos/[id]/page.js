"use client"

// PostDetail.js
import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import CartStatus from "@/components/CartStatus";
import { db } from "@/firebase/config";
import { useCart } from "@/components/cartcontex";

const getPostById = async (id) => {
  const postRef = doc(db, "productos", id);

  try {
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      throw new Error("Producto no encontrado");
    }

    return postDoc.data();
  } catch (error) {
    console.error("Error fetching post:", error.message);
    throw error;
  }
};

const PostDetail = ({ params }) => {
  const { addToCart, cart } = useCart();
  const [post, setPost] = useState(null);
  const [showCartStatus, setShowCartStatus] = useState(false); // Estado para controlar la visibilidad

  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Muestra el componente CartStatus al agregar un producto al carrito
    setShowCartStatus(true);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-bold text-2xl">Detalle de producto</h1>
      <div className="container mx-auto mt-2 flex ">
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
          <img
            className="w-full h-64 object-cover object-center"
            src={post.imagen}
            alt={post.nombre}
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{post.titulo}</h2>
            <hr className="mb-4"></hr>
            <p className="text-gray-700 mb-4">{post.descripcion}</p>
            <p className="text-gray-600 mb-2">Categoría: {post.categoria}</p>
            <p className="text-indigo-500 font-bold text-xl">${post.precio}</p>
          </div>
          <button
            onClick={() => handleAddToCart(post)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Agregar al carrito
          </button>
        </div>
        <div
          className={`cart-status-container transition-max-height duration-1000 ease-out overflow-hidden max-h-0 border-solid border-4 border-x-teal-400 border-y-teal-400 ${showCartStatus ? 'max-h-96' : ''}`}
        >
       
          <CartStatus />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
