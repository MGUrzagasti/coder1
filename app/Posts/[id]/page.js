// PostDetail.js
"use client"
// PostDetail.js

import React, { useEffect, useState } from "react";

const getPostById = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Error de datos");
  }

  return response.json();
};

const PostDetail = ({ params }) => {
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

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-6">
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <img className="w-full h-64 object-cover" src={post.image} alt={post.title} />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <hr className="mb-4"></hr>
          <p className="text-gray-700 mb-4">{post.description}</p>
          <p className="text-gray-600 mb-2">Category: {post.category}</p>
          <p className="text-indigo-500 font-bold text-xl">${post.price}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
