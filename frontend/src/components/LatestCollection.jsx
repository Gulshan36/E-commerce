/* eslint-disable react/jsx-no-undef */
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Function to shuffle the products array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        if (products.length > 0) {
            // Shuffle the products and take the first 15
            const shuffledProducts = shuffleArray([...products]);
            setLatestProducts(shuffledProducts.slice(0, 15));
            setLoading(false);
        }
    }, [products]); // Runs whenever products change

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
        <div className="my-10 bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-sm">
            <div className="text-center py-8 text-3xl max-w-4xl mx-auto">
                <div className="mb-6">
                    <Title text1={'LATEST'} text2={'COLLECTION'} />
                </div>
                <p className="w-full m-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                    Discover the latest trends, fresh styles, and exclusive picks designed just for you. Whether you're updating your wardrobe, revamping your space, or looking for the perfect gift, our latest collection has something for everyone.
                </p>
                
                {/* Featured badges */}
                <div className="flex justify-center gap-4 mb-8">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        ✨ New Arrivals
                    </span>
                    <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        🔥 Trending
                    </span>
                    <span className="bg-gradient-to-r from-pink-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        ⚡ Limited Time
                    </span>
                </div>
            </div>

            {/* Product count and filter info */}
            <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
                <p className="text-gray-600 text-sm">
                    {loading ? 'Loading...' : `Showing ${latestProducts.length} latest products`}
                </p>
                <button 
                    onClick={handleViewAll}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200"
                >
                    View All Products →
                </button>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8 max-w-7xl mx-auto">
                {loading ? (
                    // Loading skeletons
                    [...Array(15)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                ) : latestProducts.length > 0 ? (
                    latestProducts.map((item, index) => (
                        <div 
                            key={index} 
                            className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden bg-white p-2"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            <ProductItem 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products available</h3>
                            <p className="text-gray-500">Check back later for our latest collection</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Call to action */}
            <div className="text-center mt-12">
                <button 
                    onClick={handleViewAll}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                >
                    <span>Explore Full Collection</span>
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

export default LatestCollection;
