import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Order = () => {
  const{ backendUrl, token ,currency} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItems = [] 
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItems.push(item)
          })
        });
        setOrderData(allOrdersItems.reverse());
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen border-t pt-16 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse max-w-6xl mx-auto">
          <div className="h-8 bg-gray-300 rounded w-48 mb-8"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-32 bg-gray-300 rounded mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen border-t pt-16 px-4 sm:px-6 lg:px-8'>
      <div className="max-w-6xl mx-auto">
        <div className='text-center mb-8'>
          <Title text1={'MY'} text2={'ORDERS'}/>
          <p className="text-gray-600 mt-2">Track your order history and status</p>
        </div>

        {orderData.length > 0 ? (
          <div className="space-y-6">
            {orderData.map((item,index) => (
              <div 
                key={index} 
                className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                  <div className='flex items-start gap-4'>
                    <img 
                      className='w-20 h-20 object-cover rounded-lg shadow-md' 
                      src={item.image[0]} 
                      alt={item.name} 
                    />
                    <div className="flex-1">
                      <h3 className='font-bold text-lg text-gray-800 mb-2'>{item.name}</h3>
                      <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600'>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">Price:</span>
                          <span className="text-blue-600 font-bold">{currency}{item.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">Quantity:</span>
                          <span className="bg-gray-100 px-2 py-1 rounded">{item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">Size:</span>
                          <span className="bg-gray-100 px-2 py-1 rounded">{item.size}</span>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                          </svg>
                          <span className="text-gray-600">
                            Ordered on: <span className="font-medium">{new Date(item.date).toLocaleDateString()}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span className="text-gray-600">
                            Payment: <span className="font-medium capitalize">{item.paymentMethod}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                      <span className="font-semibold text-gray-800 capitalize">{item.status}</span>
                    </div>
                    <button 
                      onClick={loadOrderData} 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Start Shopping
              </button>
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
  )
}

export default Order
