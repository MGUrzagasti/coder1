// Posts.js
"use client"
// Posts.js

import React, { useEffect, useState } from "react";
import Link from "next/link";

const getPosts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error("Error de datos");
  }

  return response.json();
};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-3xl font-semibold mb-4">Posts</h1>
      <hr className="mb-4"></hr>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/Posts/${post.id}`}>
            <div>
              <div className="bg-white rounded-md overflow-hidden shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105">
                <p className="text-lg font-semibold mb-2">{post.title}</p>
                <p className="text-gray-700">{post.category}</p>
                <p className="text-indigo-500 font-bold">${post.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
