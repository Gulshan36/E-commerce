import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            navigate('/orders');
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
        }
      },
    }
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // 👈 Start loading

    try {
      let orderItems = [];

      for (const category in cartItems) {
        for (const size in cartItems[category]) {
          if (cartItems[category][size] > 0) {
            const itemInfo = products.find(product => product._id === category);
            if (itemInfo) {
              orderItems.push({
                ...itemInfo,
                size,
                quantity: cartItems[category][size]
              });
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if (responseRazorpay.data.success && responseRazorpay.data.order) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 👈 Stop loading
    }
  };

  const paymentMethods = [
    { id: 'stripe', name: 'Stripe', logo: assets.stripe_logo },
    { id: 'razorpay', name: 'Razorpay', logo: assets.razorpay_logo },
    { id: 'cod', name: 'Cash on Delivery', logo: null }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen pt-5 sm:pt-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-12'>
          {/* Left side - Delivery Information */}
          <div className='flex-1 bg-white rounded-2xl shadow-lg p-8'>
            <div className='mb-8'>
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
              <p className="text-gray-600 mt-2">Please provide your delivery details</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='firstName' 
                    value={formData.firstName} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    type="text" 
                    placeholder="First name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='lastName' 
                    value={formData.lastName} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    type="text" 
                    placeholder="Last name" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  required 
                  onChange={onChangeHandler} 
                  name='email' 
                  value={formData.email} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  type="email" 
                  placeholder="E-mail address" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input 
                  required 
                  onChange={onChangeHandler} 
                  name='street' 
                  value={formData.street} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  type="text" 
                  placeholder="Street address" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='city' 
                    value={formData.city} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    type="text" 
                    placeholder="City" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='state' 
                    value={formData.state} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    type="text" 
                    placeholder="State" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pin Code</label>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='pinCode' 
                    value={formData.pinCode} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    type="number" 
                    placeholder="Pin Code" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='country' 
                    value={formData.country} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    type="text" 
                    placeholder="Country" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  required 
                  onChange={onChangeHandler} 
                  name='phone' 
                  value={formData.phone} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  type="number" 
                  placeholder="Phone number" 
                />
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary & Payment */}
          <div className='lg:w-96 space-y-8'>
            {/* Order Summary */}
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <CartTotal />
            </div>

            {/* Payment Method */}
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <div className='mb-6'>
                <Title text1={'PAYMENT'} text2={'METHOD'} />
                <p className="text-gray-600 mt-2">Choose your preferred payment method</p>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((paymentMethod) => (
                  <div 
                    key={paymentMethod.id}
                    onClick={() => setMethod(paymentMethod.id)} 
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      method === paymentMethod.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === paymentMethod.id ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {method === paymentMethod.id && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    {paymentMethod.logo ? (
                      <img className="h-6" src={paymentMethod.logo} alt={`${paymentMethod.name} Logo`} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="text-gray-700 font-medium">{paymentMethod.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className='mt-8'>
                <button 
                  type='submit'
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      PLACE ORDER
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
