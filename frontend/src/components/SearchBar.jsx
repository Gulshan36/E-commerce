import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch, products} = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const location = useLocation();

    useEffect(()=>{
       if(location.pathname.includes('collection')) {
          setVisible(true);
       }
       else{
        setVisible(false)
       }
    },[location])

    useEffect(() => {
        // Load search history from localStorage
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        setSearchHistory(history);
        setRecentSearches(history.slice(0, 5));
    }, []);

    useEffect(() => {
        if (search && search.length > 0) {
            const filteredSuggestions = products
                .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                .slice(0, 5)
                .map(item => item.name);
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [search, products]);

    const handleSearchSubmit = (searchTerm) => {
        if (searchTerm.trim()) {
            const newHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 10);
            setSearchHistory(newHistory);
            setRecentSearches(newHistory.slice(0, 5));
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
            setShowSuggestions(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(search);
        } else if (e.key === 'Escape') {
            setShowSearch(false);
        }
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
        setRecentSearches([]);
        localStorage.removeItem('searchHistory');
    };

    const handleFocus = () => {
        setShowSuggestions(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    const handleEscapeClose = () => {
        setShowSearch(false);
        setShowSuggestions(false);
        setSearch('');
    };

  return showSearch && visible ? (
    <div className='bg-gradient-to-r from-blue-50 to-purple-50 border-t border-b py-2'>
        <div className='max-w-2xl mx-auto px-4'>
            

            {/* Simple Search Container */}
            <div className='relative'>
                <div className='flex items-center bg-white rounded-xl shadow-md border-2 border-gray-200 focus-within:border-blue-500 transition-all duration-300'>
                    {/* Search Icon */}
                    <div className='pl-4 pr-3'>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    

                    {/* Input Field */}
                    <input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className='flex-1 py-4 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-lg' 
                        type="text" 
                        placeholder='Search for products...' 
                        autoComplete="off"
                    />

                    {/* Action Buttons */}
                    <div className='flex items-center gap-2 pr-3'>
                        {/* Clear Button */}
                        {search && (
                            <button 
                                onClick={() => setSearch('')}
                                className='p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-200'
                                title="Clear search"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}

                        {/* ESC Close Button */}
                        <button 
                            onClick={handleEscapeClose}
                            className='flex items-center gap-1 px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium'
                            title="Close search (ESC)"
                        >
                            <span>ESC</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                

                {/* Simple Suggestions Dropdown */}
                {showSuggestions && (search || recentSearches.length > 0) && (
                    <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto'>
                        {/* Product Suggestions */}
                        {search && suggestions.length > 0 && (
                            <div className='p-4'>
                                <p className='text-sm text-gray-500 mb-3 font-medium'>Products</p>
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSearch(suggestion);
                                            handleSearchSubmit(suggestion);
                                        }}
                                        className='w-full text-left py-3 px-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center gap-3'
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <span className='text-gray-800'>{suggestion}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {/* Recent Searches */}
                        {!search && recentSearches.length > 0 && (
                            <div className='p-4'>
                                <div className='flex items-center justify-between mb-3'>
                                    <p className='text-sm text-gray-500 font-medium'>Recent Searches</p>
                                    <button 
                                        onClick={clearSearchHistory}
                                        className='text-xs text-red-500 hover:text-red-700 transition-colors duration-200'
                                    >
                                        Clear
                                    </button>
                                </div>
                                {recentSearches.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSearch(item);
                                            handleSearchSubmit(item);
                                        }}
                                        className='w-full text-left py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-3'
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className='text-gray-600'>{item}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Popular Searches (when no input) */}
                        {!search && recentSearches.length === 0 && (
                            <div className='p-4'>
                                <p className='text-sm text-gray-500 mb-3 font-medium'>Popular Searches</p>
                                <div className='flex flex-wrap gap-2'>
                                    {['T-shirt', 'Jeans', 'Dress', 'Shoes', 'Jacket'].map((term, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSearch(term);
                                                handleSearchSubmit(term);
                                            }}
                                            className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-all duration-200'
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Close Hint in Dropdown */}
                        <div className='border-t border-gray-100 p-3 bg-gray-50'>
                            <p className='text-xs text-gray-500 text-center'>
                                Press <kbd className='px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono'>ESC</kbd> to close
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Search Results Count */}
            {search && (
                <div className='text-center mt-4'>
                    <span className='text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm'>
                        {products.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).length} products found
                    </span>
                </div>
            )}
        </div>
    </div>
  ) : null
}

export default SearchBar
