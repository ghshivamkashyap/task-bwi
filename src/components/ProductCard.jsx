// ProductCard.js
import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="w-64 h-96 mx-auto my-4 bg-white rounded overflow-hidden shadow-lg">
      <img
        className="w-full h-48 object-cover"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-700 mb-2">${product.price}</p>
        <button
          className="text-white bg-gray-800 focus:ring-4 focus:outline-none 
          font-medium rounded-md text-sm px-3 py-2 text-center overflow-hidden"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
