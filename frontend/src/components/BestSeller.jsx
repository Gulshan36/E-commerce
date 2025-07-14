import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to shuffle the products array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (products.length > 0) {
      const bestProductList = products.filter((item) => item.bestseller);
      const shuffledProducts = shuffleArray([...bestProductList]);
      setBestSellers(shuffledProducts.slice(0, 5));
      setLoading(false);
    }
  }, [products]);

  const handleViewAll = () => {
    navigate('/collection');
  };

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-48 rounded-lg mb-3"></div>
      <div className="bg-gray-300 h-4 rounded mb-2"></div>
      <div className="bg-gray-300 h-4 rounded w-3/4"></div>
    </div>
  );

  return (
    <div className="my-10 bg-gradient-to-br from-yellow-50 to-orange-50 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-sm">
      <div className="text-center text-3xl py-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Title text1="BEST" text2="SELLERS" />
        </div>
        <p className="w-full m-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-8">
          Discover our most popular products! These best sellers are selected fresh every time you visit and loved by thousands of customers worldwide.
        </p>

        {/* Featured badges */}
        <div className="flex justify-center gap-4 mb-8">
          <span className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            🏆 Top Rated
          </span>
          <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            🔥 Most Popular
          </span>
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            ⭐ Customer Favorites
          </span>
        </div>
      </div>

      {/* Product count and navigation */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <p className="text-gray-600 text-sm">
          {loading ? 'Loading bestsellers...' : `Showing ${bestSellers.length} bestselling products`}
        </p>
        <button 
          onClick={handleViewAll}
          className="text-orange-600 hover:text-orange-800 text-sm font-medium hover:underline transition-colors duration-200"
        >
          View All Products →
        </button>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8 max-w-7xl mx-auto">
        {loading ? (
          // Loading skeletons
          [...Array(5)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : bestSellers.length > 0 ? (
          bestSellers.map((item, index) => (
            <div 
              key={item._id}
              className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden bg-white p-2 relative group"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Bestseller badge */}
              <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                #1
              </div>
              
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No bestsellers available</h3>
              <p className="text-gray-500">Check back later for our top products</p>
            </div>
          </div>
        )}
      </div>

      {/* Call to action */}
      <div className="text-center mt-12">
        <button 
          onClick={handleViewAll}
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
        >
          <span>Shop All Bestsellers</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BestSeller;
