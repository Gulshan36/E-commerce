import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();

    const handleShopNow = () => {
        navigate('/collection');
    };

    return (
        <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-slate-50 to-blue-50">
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 px-8 sm:px-12">
                <div className="text-gray-800 space-y-6 animate-fade-in">
                    {/* Best Sellers Section */}
                    <div className="flex items-center gap-3 group">
                        <div className="w-12 md:w-16 h-[3px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-x-110 transition-transform duration-300"></div>
                        <p className="font-semibold text-sm md:text-base text-blue-600 uppercase tracking-wide group-hover:text-purple-600 transition-colors duration-300">
                            Our Best Sellers
                        </p>
                    </div>

                    {/* Title Section */}
                    <h1 
                        className="text-4xl sm:py-4 lg:text-6xl leading-tight font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300" 
                        style={{ fontFamily: "'Prata', serif" }}
                    >
                        Latest Arrivals
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md">
                        Discover our curated collection of premium products that define modern style and quality.
                    </p>

                    {/* Shop Now Section */}
                    <div className="flex items-center gap-4 pt-4">
                        <button 
                            onClick={handleShopNow}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-sm md:text-base hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                        >
                            <span>SHOP NOW</span>
                            <div className="w-6 h-[2px] bg-white rounded-full group-hover:w-8 transition-all duration-300"></div>
                        </button>
                    </div>

                    {/* Stats Section */}
                    <div className="flex gap-8 pt-6">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-blue-600">1000+</h3>
                            <p className="text-gray-500 text-sm">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-purple-600">500+</h3>
                            <p className="text-gray-500 text-sm">Products</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-600">24/7</h3>
                            <p className="text-gray-500 text-sm">Support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Right Side */}
            <div className="w-full sm:w-1/2 relative overflow-hidden group">
                <img 
                    src={assets.hero_img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="Hero Image" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg animate-bounce">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <p className="text-sm font-semibold text-gray-800">New Collection</p>
                    <p className="text-xs text-gray-600">50% OFF</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
