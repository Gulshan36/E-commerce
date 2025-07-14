import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets'; 
import RelatedProducts from '../components/Relatedproducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
      setLoading(false);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (size) {
      addToCart(productData._id, size);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  // Loading skeleton
  const ProductSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex gap-12 flex-col sm:flex-row">
        <div className="flex-1">
          <div className="bg-gray-300 h-96 rounded-lg mb-4"></div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-300 h-20 w-20 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="bg-gray-300 h-8 rounded w-3/4"></div>
          <div className="bg-gray-300 h-4 rounded w-1/2"></div>
          <div className="bg-gray-300 h-6 rounded w-1/4"></div>
          <div className="bg-gray-300 h-20 rounded"></div>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-t-2 pt-10 px-4 sm:px-6 lg:px-8">
      <ProductSkeleton />
    </div>
  );

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 border-t-2 pt-10 px-4 sm:px-6 lg:px-8 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row max-w-7xl mx-auto'>
        
        {/* ---------- Product Images ---------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  image === item ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                }`}
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%] relative group'>
            <img 
              className='w-full h-auto rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300' 
              src={image} 
              alt="Product Image" 
            />
            {/* Image zoom indicator */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ---------- Product Info ---------- */}
        <div className='flex-1 bg-white rounded-lg shadow-lg p-8'>
          <h1 className='font-bold text-3xl mt-2 text-gray-800'>{productData.name}</h1>
          
          {/* Rating */}
          <div className='flex items-center gap-2 mt-4'>
            <div className='flex items-center gap-1'>
              {[...Array(4)].map((_, index) => (
                <img key={index} src={assets.star_icon} alt="Star" className="w-4" />
              ))}
              <img src={assets.star_dull_icon} alt="Empty Star" className="w-4" />
            </div>
            <p className='text-gray-600 text-sm'>(122 reviews)</p>
          </div>

          {/* Price */}
          <p className='mt-6 text-4xl font-bold text-blue-600'>
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className='mt-6 text-gray-600 text-base leading-relaxed md:w-4/5'>
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p className='text-lg font-semibold text-gray-800'>Select Size</p>
            <div className='flex gap-3'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border-2 py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    item === size 
                      ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-md' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={!size}
            className={`w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
              addedToCart 
                ? 'bg-green-600 text-white' 
                : size 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {addedToCart ? '✓ Added to Cart!' : 'ADD TO CART'}
          </button>

          {!size && (
            <p className='text-red-500 text-sm mt-2'>Please select a size</p>
          )}

          <hr className='mt-8 border-gray-200' />
          
          {/* Product Features */}
          <div className='mt-6 space-y-3'>
            <div className='flex items-center gap-3'>
              <div className='w-6 h-6 bg-green-100 rounded-full flex items-center justify-center'>
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className='text-gray-600'>100% Original Product</p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <p className='text-gray-600'>Cash on delivery available</p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center'>
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className='text-gray-600'>Easy return & exchange within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section --------- */}
      <div className='mt-20 max-w-7xl mx-auto'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='flex border-b'>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 font-semibold transition-colors duration-300 ${
                activeTab === 'description'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 font-semibold transition-colors duration-300 ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Reviews (122)
            </button>
          </div>
          
          <div className='p-8'>
            {activeTab === 'description' ? (
              <div className='space-y-4 text-gray-600 leading-relaxed'>
                <p>
                  An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
                </p>
                <p>
                  E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
                </p>
              </div>
            ) : (
              <div className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <div className='flex'>
                    {[...Array(5)].map((_, index) => (
                      <img key={index} src={assets.star_icon} alt="Star" className="w-4" />
                    ))}
                  </div>
                  <span className='text-gray-600'>4.8 out of 5 stars</span>
                </div>
                <div className='text-gray-600'>
                  <p>122 customer reviews coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* -------- Display Related Products -------- */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  );
};

export default Product;
