import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  }

  if (isSubscribed) {
    return (
      <div className='bg-gradient-to-r from-green-50 to-teal-50 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl my-16'>
        <div className='text-center max-w-2xl mx-auto'>
          <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-2'>Thank you for subscribing!</h3>
          <p className='text-gray-600 mb-6'>You'll receive your 20% discount code in your email shortly.</p>
          <button 
            onClick={() => setIsSubscribed(false)}
            className='text-green-600 hover:text-green-800 font-medium'
          >
            Subscribe another email →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl my-16 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 left-0 w-full h-full opacity-5'>
        <div className='absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full'></div>
        <div className='absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full'></div>
        <div className='absolute top-1/2 left-1/3 w-16 h-16 bg-pink-500 rounded-full'></div>
      </div>

      <div className='text-center max-w-4xl mx-auto relative z-10'>
        {/* Header */}
        <div className='mb-8'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4'>
            Join Our Newsletter
          </h2>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold'>
              20% OFF
            </span>
            <span className='text-2xl font-medium text-gray-800'>
              for new subscribers!
            </span>
          </div>
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto'>
            Stay updated with our latest collections, exclusive deals, and fashion trends. Be the first to know about new arrivals and special promotions.
          </p>
        </div>

        {/* Benefits */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
          <div className='flex items-center justify-center gap-3 text-gray-700'>
            <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className='font-medium'>Early Access</span>
          </div>
          <div className='flex items-center justify-center gap-3 text-gray-700'>
            <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className='font-medium'>Exclusive Deals</span>
          </div>
          <div className='flex items-center justify-center gap-3 text-gray-700'>
            <div className='w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center'>
              <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className='font-medium'>Flash Sales</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 lg:w-1/2 mx-auto'>
          <div className='flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-full shadow-lg border border-gray-200'>
            <div className='flex-1 flex items-center gap-3 px-4'>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input 
                className='w-full outline-none text-gray-700 placeholder-gray-400' 
                type="email" 
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button 
              type='submit'
              disabled={isLoading}
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  SUBSCRIBE
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
          
          <p className='text-xs text-gray-500 mt-4'>
            By subscribing, you agree to our Privacy Policy and Terms of Service. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  )
}

export default Newsletter
