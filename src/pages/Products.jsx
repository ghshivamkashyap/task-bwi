import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        console.log(data?.products);
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        toast.error("Error occured..");
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const handleFilterByPrice = () => {
    const filteredProducts = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );
    setFilteredProducts(filteredProducts);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Product Added..");
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    toast.success("Product Removed..");
  };

  const cartCount = cart.length;
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container bg-gray-100 mx-auto p-8 w-full overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="p-2 mb-4 border border-gray-300 rounded"
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Price Filter */}
      <div className="mb-4 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center">
        <label className="mr-2 text-gray-700">Filter by Price:</label>
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row items-center">
          <input
            type="number"
            placeholder="Min Price"
            className="p-2 border border-gray-300 rounded mb-2 sm:mb-0 md:mr-2 lg:mr-2"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="p-2 border border-gray-300 rounded mb-2 sm:mb-0 md:mr-2 lg:mr-2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
          onClick={handleFilterByPrice}
        >
          Apply Filters
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Cart */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Shopping Cart</h2>
        <p className="text-gray-700">Items in Cart: {cartCount}</p>
        <p className="text-gray-700">Total: ${cartTotal}</p>
        {cart.map((item) => (
          <div key={item.id} className="mt-4">
            <p className="text-gray-800">
              {item.title} - ${item.price}
            </p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
