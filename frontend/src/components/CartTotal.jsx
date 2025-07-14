import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className='w-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-gray-200'>
      <div className='mb-6'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='space-y-4'>
        {/* Subtotal */}
        <div className='flex justify-between items-center py-3 border-b border-gray-200'>
          <div className='flex items-center gap-2'>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className='text-gray-700 font-medium'>Subtotal</p>
          </div>
          <p className='text-gray-900 font-semibold'>{currency} {subtotal}.00</p>
        </div>

        {/* Shipping Fee */}
        <div className='flex justify-between items-center py-3 border-b border-gray-200'>
          <div className='flex items-center gap-2'>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <p className='text-gray-700 font-medium'>Shipping Fee</p>
          </div>
          <p className='text-gray-900 font-semibold'>{currency} {delivery_fee}.00</p>
        </div>

        {/* Total */}
        <div className='flex justify-between items-center py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-4 border-2 border-blue-200'>
          <div className='flex items-center gap-2'>
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className='text-gray-900 font-bold text-lg'>Total</p>
          </div>
          <p className='text-blue-600 font-bold text-xl'>{currency} {total}.00</p>
        </div>

        {/* Savings Info */}
        {subtotal > 0 && (
          <div className='bg-green-50 border border-green-200 rounded-lg p-3 mt-4'>
            <div className='flex items-center gap-2'>
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className='text-green-800 text-sm font-medium'>
                Free shipping on orders over ₹500!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTotal