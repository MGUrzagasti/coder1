// Posts.js

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";

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
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const handleCategoryChange = (categoria) => {
    setSelectedCategory(categoria);
    if (categoria === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => post.categoria === categoria);
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-3xl font-semibold mb-4">Posts</h1>
      <div className="mb-4">
        <label className="mr-2">Filtrar por categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Todas</option>
          {[...new Set(posts.map((post) => post.categoria))].map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <hr className="mb-4"></hr>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPosts.map((post) => (
          <Link key={post.id} href={`/productos/${post.id}`}>
            <div>
              <div className="bg-white rounded-md overflow-hidden shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105">
              <img
                  src={post.imagen}
                  alt={post.nombre}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <p className="text-lg font-semibold mb-2">{post.titulo}</p>
                <p className="text-gray-700">{post.categoria}</p>
                <p className="text-indigo-500 font-bold">${post.precio}</p>
                <p className="text-indigo-500 font-bold">${post.descripcion}</p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
