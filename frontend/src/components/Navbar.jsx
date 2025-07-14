import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom'; 
import { ShopContext } from '../context/ShopContext';

function Navbar() {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { setShowSearch, getCartItems, navigate, token, setToken, setCartItems} = useContext(ShopContext);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        navigate("/login");
        localStorage.removeItem('token');
        setToken("");
        setCartItems({});
    }

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className={`flex items-center justify-between py-4 px-6 font-medium transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
                : 'bg-gradient-to-r from-white to-blue-50'
        }`}>
            {/* Logo */}
            <Link to='/' className="flex items-center gap-2 group">
                <img 
                    src={assets.logo} 
                    className="w-32 sm:w-36 hover:scale-105 transition-transform duration-300" 
                    alt="Logo" 
                />
                <div className="hidden lg:block">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        StyleSway
                    </span>
                    <p className="text-xs text-gray-500 -mt-1">Premium Shopping</p>
                </div>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
                {[
                    { name: "Home", path: "/" },
                    { name: "Collection", path: "/collection" },
                    { name: "About", path: "/about" },
                    { name: "Contact", path: "/contact" }
                ].map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={`relative flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-300 group ${
                            isActive(item.path) 
                                ? 'text-blue-600 bg-blue-50' 
                                : 'hover:text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                        <p className="font-semibold">{item.name}</p>
                        <div className={`w-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
                            isActive(item.path) ? 'w-full' : 'group-hover:w-full'
                        }`}></div>
                    </NavLink>
                ))}
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
                {/* Search Icon */}
                <Link to="/collection" className="relative group">
                    <div 
                        onClick={() => setShowSearch(true)} 
                        className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </Link>

                {/* Profile Dropdown */}
                <div className="group relative">
                    <div 
                        onClick={() => token ? null : navigate('/login')} 
                        className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>

                    {/* Enhanced Dropdown Menu */}
                    {token && (
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
                            <div className="flex flex-col w-48 py-2 bg-white text-gray-600 rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-gray-800">Welcome back!</p>
                                    <p className="text-xs text-gray-500">Manage your account</p>
                                </div>
                                
                                <button 
                                    onClick={() => navigate('/profile')}
                                    className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center gap-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-medium">My Profile</span>
                                </button>
                                
                                <button 
                                    onClick={() => navigate('/order')} 
                                    className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center gap-3"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="font-medium">My Orders</span>
                                </button>
                                
                                <hr className="border-gray-200 my-1" />
                                
                                <button 
                                    onClick={logout} 
                                    className="w-full text-left px-4 py-3 hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex items-center gap-3"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Cart Icon */}
                <Link to="/cart" className="relative group">
                    <div className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200">
                        <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.2A2 2 0 007.83 20H19" />
                        </svg>
                    </div>
                    {getCartItems() > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                            {getCartItems()}
                        </div>
                    )}
                </Link>

                {/* Mobile Menu Icon */}
                <button
                    onClick={() => setVisible(true)}
                    className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200 sm:hidden"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Enhanced Mobile Menu (Sliding Drawer) */}
            <div className={`fixed top-0 right-0 h-screen bg-white transition-all duration-300 ${
                visible ? 'w-80' : 'w-0'
            } overflow-hidden shadow-2xl sm:hidden z-50`}>
                
                {/* Close Button */}
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-4 right-4 p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Mobile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 mb-6">
                    <div className="flex items-center gap-3">
                        <img src={assets.logo} className="w-10 h-10 filter brightness-0 invert" alt="Logo" />
                        <div>
                            <h2 className="text-lg font-bold">StyleSway</h2>
                            <p className="text-xs opacity-90">Premium Shopping Experience</p>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Links */}
                <ul className="px-6 space-y-2">
                    {[
                        { name: "Home", path: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                        { name: "Collection", path: "/collection", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                        { name: "About", path: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                        { name: "Contact", path: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
                    ].map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={`flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-200 ${
                                    isActive(item.path) 
                                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                                        : 'hover:bg-gray-50 text-gray-700'
                                }`}
                                onClick={() => setVisible(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                </svg>
                                <span className="font-semibold">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Mobile Auth Section */}
                <div className="absolute bottom-6 left-6 right-6">
                    {token ? (
                        <div className="space-y-3">
                            <button 
                                onClick={() => {navigate('/profile'); setVisible(false)}} 
                                className="w-full py-4 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                My Profile
                            </button>
                            <button 
                                onClick={() => {navigate('/order'); setVisible(false)}} 
                                className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                My Orders
                            </button>
                            <button 
                                onClick={() => {logout(); setVisible(false)}} 
                                className="w-full py-4 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => {navigate('/login'); setVisible(false)}} 
                            className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {visible && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
                    onClick={() => setVisible(false)}
                ></div>
            )}
        </div>
    );
}

export default Navbar;
