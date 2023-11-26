// Card.js

import React from "react";

const Card = ({ product }) => {
  const { id, title, price, description, category, image } = product;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-2">{description}</p>
        <p className="text-gray-600">${price}</p>
        <p className="text-indigo-500 mt-2">{category}</p>
      </div>
    </div>
  );
};

export default Card;
