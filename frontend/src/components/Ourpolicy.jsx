import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      description: "We provide 7 days return policy",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className='bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4'>
            Why Choose Us?
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            We're committed to providing the best shopping experience with customer-first policies
          </p>
        </div>

        {/* Policies Grid */}
        <div className='flex flex-col sm:flex-row justify-center gap-8 sm:gap-6 lg:gap-12'>
          {policies.map((policy, index) => (
            <div 
              key={index}
              className='group flex-1 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center hover:scale-105'
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Icon Container */}
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${policy.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <img 
                  src={policy.icon} 
                  className='w-10 h-10 filter brightness-0 invert' 
                  alt={policy.title} 
                />
              </div>

              {/* Content */}
              <h3 className='text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300'>
                {policy.title}
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {policy.description}
              </p>

              {/* Decorative Line */}
              <div className={`w-16 h-1 bg-gradient-to-r ${policy.gradient} mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='text-center mt-16'>
          <p className='text-gray-600 mb-6'>
            Have questions about our policies? We're here to help!
          </p>
          <button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300'>
            Contact Support
          </button>
        </div>
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
  )
}

export default Ourpolicy
