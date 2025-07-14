import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevant');
  const [showAll, setShowAll] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      let filteredProducts = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );

      // Apply price filter
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(item => {
          const price = item.price;
          return max ? price >= min && price <= max : price >= min;
        });
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          // Keep original order for 'relevant'
          break;
      }

      const displayCount = showAll ? filteredProducts.length : 5;
      setRelated(filteredProducts.slice(0, displayCount));
      setLoading(false);
    }
  }, [products, category, subCategory, sortBy, showAll, priceRange]);

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}`);
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
    <div className='my-24 bg-gradient-to-br from-slate-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl'>
      <div className='text-center text-3xl py-8 max-w-4xl mx-auto'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
        <p className='text-gray-600 text-base mt-4'>
          Discover more products you might like
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div className='flex flex-wrap justify-center gap-4 mb-8 max-w-4xl mx-auto'>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>

        <select 
          value={priceRange} 
          onChange={(e) => setPriceRange(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value="all">All Prices</option>
          <option value="100-200">₹100 - ₹200</option>
          <option value="200 - 500">₹200 - ₹500</option>
          <option value="500 - 1000">₹500 - ₹1000</option>
          <option value="1000 - 1500">₹1000 - ₹1500</option>
          <option value="1500">₹1500+</option>
        </select>
      </div>

      {/* Products Count */}
      <div className='text-center mb-6 text-gray-600'>
        {loading ? 'Loading...' : `Showing ${related.length} related products`}
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8 max-w-7xl mx-auto'>
        {loading ? (
          // Loading skeletons
          [...Array(5)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : related.length > 0 ? (
          related.map((item, index) => (
            <div 
              key={index}
              className='group transform hover:scale-105 transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden bg-white p-2 relative'
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Quick view overlay */}
              <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-10 flex items-center justify-center'>
                <button 
                  onClick={() => handleQuickView(item._id)}
                  className='bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200'
                >
                  Quick View
                </button>
              </div>

              <ProductItem 
                id={item._id} 
                name={item.name} 
                price={item.price} 
                image={item.image} 
              />
            </div>
          ))
        ) : (
          <div className="text-center col-span-5 py-20">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No related products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or browse our full collection</p>
              <button 
                onClick={() => {
                  setSortBy('relevant');
                  setPriceRange('all');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Show More/Less Button */}
      {related.length >= 5 && (
        <div className='text-center mt-8'>
          <button 
            onClick={() => setShowAll(!showAll)}
            className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300'
          >
            {showAll ? 'Show Less' : 'Show All Related Products'}
          </button>
        </div>
      )}

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

export default RelatedProducts;
