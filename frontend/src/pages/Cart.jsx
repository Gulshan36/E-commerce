import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            tempData.push({
              _id: items,
              size: size,
              quantity: cartItems[items][size],
            });
          }
        }
      }
      setCartData(tempData);
      setLoading(false);
    }
  }, [cartItems, products]);

  const handleQuantityChange = (id, size, quantity) => {
    if (quantity <= 0) {
      updateQuantity(id, size, 0);
    } else {
      updateQuantity(id, size, quantity);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen border-t pt-14 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse max-w-6xl mx-auto">
          <div className="h-8 bg-gray-300 rounded w-48 mb-8"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-20 bg-gray-300 rounded mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen border-t pt-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Title text1={"YOUR"} text2={"CART"} />
          <p className="text-gray-600 mt-2">Review your items before checkout</p>
        </div>

        {cartData.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="hidden sm:grid grid-cols-[4fr_2fr_1fr] gap-4 py-4 border-b border-gray-200 font-semibold text-gray-700">
                <p>Product</p>
                <p className="text-center">Price & Quantity</p>
                <p className="text-center">Action</p>
              </div>

              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="py-6 border-b border-gray-100 last:border-b-0 grid grid-cols-1 sm:grid-cols-[4fr_2fr_1fr] gap-4 items-center hover:bg-gray-50 transition-colors duration-200"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                      opacity: 0
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-md"
                        src={productData.image[0]}
                        alt={productData.name}
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">{productData.name}</p>
                        <p className="text-gray-500 text-sm">Size: {item.size}</p>
                        <p className="text-blue-600 font-semibold text-sm sm:text-base">{currency}{productData.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-50 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => navigate('/collection')}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  ← Continue Shopping
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>Total Items: {cartData.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.2A2 2 0 007.83 20H19" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Start adding items to your cart to see them here</p>
              <button
                onClick={() => navigate('/collection')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}

        {cartData.length > 0 && (
          <div className="flex justify-end mt-8">
            <div className="w-full sm:w-[450px] bg-white rounded-lg shadow-lg p-6">
              <CartTotal />
              <div className='w-full text-center mt-6'>
                <button 
                  onClick={() => navigate('/place-order')} 
                  className='bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 w-full'
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
            from {
              opacity: 0;
              transform: translateY(20px);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Cart;
