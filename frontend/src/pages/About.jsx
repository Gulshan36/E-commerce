import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen'>
      {/* Hero Section */}
      <div className='text-center pt-16 pb-8 px-4 sm:px-6 lg:px-8'>
        <Title text1={'ABOUT'} text2={'US'} />
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Learn about our journey, mission, and what makes us special in the world of e-commerce.
        </p>
      </div>

      {/* About Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='bg-white rounded-2xl shadow-lg p-8 mb-12 hover:shadow-xl transition-shadow duration-300'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <img 
                className='w-full h-96 object-cover rounded-lg shadow-md' 
                src={assets.about_img} 
                alt="About Us" 
              />
            </div>
            <div className='space-y-6'>
              <div>
                <h3 className='text-2xl font-bold text-gray-800 mb-4'>Our Story</h3>
                <p className='text-gray-600 leading-relaxed'>
                  StyleSway was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                </p>
              </div>
              <div>
                <p className='text-gray-600 leading-relaxed'>
                  Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                </p>
              </div>
              <div>
                <h4 className='text-xl font-bold text-gray-800 mb-3'>Our Mission</h4>
                <p className='text-gray-600 leading-relaxed'>
                  Our mission at StyleSway is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className='text-center mb-12'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Here's what sets us apart from the competition and makes us your trusted shopping partner.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Quality Assurance',
              description: 'We meticulously select and test every product to ensure it meets our high standards of quality and durability before it reaches your doorstep.',
              gradient: 'from-blue-500 to-purple-600'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'Convenience',
              description: 'Shop from anywhere, anytime with our user-friendly platform. Fast shipping, easy returns, and 24/7 customer support make shopping effortless.',
              gradient: 'from-green-500 to-teal-600'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              title: 'Exceptional Customer Service',
              description: 'Our dedicated support team is always ready to help. We pride ourselves on going above and beyond to ensure your satisfaction.',
              gradient: 'from-purple-500 to-pink-600'
            }
          ].map((item, index) => (
            <div 
              key={index}
              className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center'
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`,
                opacity: 0
              }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center`}>
                {item.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>{item.title}</h3>
              <p className='text-gray-600 leading-relaxed'>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='bg-white rounded-2xl shadow-lg p-8 mt-12 hover:shadow-xl transition-shadow duration-300'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Products' },
              { number: '50+', label: 'Cities' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className='space-y-2'>
                <div className='text-3xl font-bold text-blue-600'>{stat.number}</div>
                <div className='text-gray-600'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

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

      <Newsletter/>
    </div>
  )
}

export default About
