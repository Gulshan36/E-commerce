import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Newsletter from '../components/Newsletter';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    const { value } = e.target;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const { value } = e.target;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    // Apply search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply sorting
    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProduct(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, sortType, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Filter Options */}
      <div className="min-w-60 bg-white rounded-lg shadow-lg p-6 h-fit sticky top-4">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transform transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-200 rounded-lg pl-5 py-4 mt-6 bg-gradient-to-r from-blue-50 to-purple-50 ${showFilter ? '' : 'hidden'} sm:block transition-all duration-300`}>
          <p className="mb-4 text-sm font-bold text-gray-800 uppercase tracking-wide">CATEGORIES</p>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="flex gap-3 items-center cursor-pointer hover:text-blue-600 transition-colors duration-200 group">
                <input 
                  className="w-4 h-4 accent-blue-600 cursor-pointer" 
                  type="checkbox" 
                  value={cat} 
                  onChange={toggleCategory} 
                />
                <span className="group-hover:scale-105 transition-transform duration-200">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-200 rounded-lg pl-5 py-4 my-5 bg-gradient-to-r from-purple-50 to-pink-50 ${showFilter ? '' : 'hidden'} sm:block transition-all duration-300`}>
          <p className="mb-4 text-sm font-bold text-gray-800 uppercase tracking-wide">TYPE</p>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((subCat) => (
              <label key={subCat} className="flex gap-3 items-center cursor-pointer hover:text-purple-600 transition-colors duration-200 group">
                <input 
                  className="w-4 h-4 accent-purple-600 cursor-pointer" 
                  type="checkbox" 
                  value={subCat} 
                  onChange={toggleSubCategory} 
                />
                <span className="group-hover:scale-105 transition-transform duration-200">{subCat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Summary */}
        {(category.length > 0 || subCategory.length > 0) && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-800 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {[...category, ...subCategory].map((filter, index) => (
                <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {filter}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-6 bg-white rounded-lg shadow-sm p-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className="border-2 border-gray-300 rounded-lg text-sm px-4 py-2 bg-white hover:border-blue-500 focus:border-blue-600 focus:outline-none transition-colors duration-200 cursor-pointer"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Count */}
        <div className="mb-4 text-gray-600 text-sm">
          Showing {filterProducts.length} products
        </div>

        {/* Display Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <ProductItem 
                  name={item.name} 
                  id={item._id} 
                  price={item.price} 
                  image={item.image} 
                />
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-20">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button 
                  onClick={() => {
                    setCategory([]);
                    setSubCategory([]);
                    setSortType('relavent');
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button (if needed) */}
        {filterProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
