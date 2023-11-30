// PostDetail.js

"use client";

import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { useCart } from "@/app/context/CartContext";
import { db } from "@/firebase/config";

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
  const { addToCart} = useCart();
  const [post, setPost] = useState(null);
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

  const handleAddToCart = () => {
    addToCart({
    
      title: post.titulo,
      price: post.precio,
      // Otros campos que desees agregar al carrito
    });
  };



  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-bold text 2xl">Detalle de producto</h1>
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <img
          className="w-full h-64 object-cover object-center"
          src={post.imagen}
          alt={post.nombre}
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{post.titulo}</h2>
          <hr className="mb-4"></hr>
          <p className="text-gray-700 mb-4">{post.description}</p>
          <p className="text-gray-600 mb-2">Category: {post.categoria}</p>
          <p className="text-indigo-500 font-bold text-xl">${post.precio}</p>
        </div>
        <button
            onClick={addToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Agregar al carrito
          </button>
      </div>
    </div>
  );
};

export default PostDetail;
