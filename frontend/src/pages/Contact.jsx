import React, { useState } from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'
import { assets } from '../assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen'>
      {/* Contact Us Section */}
      <div className='text-center pt-16 pb-8 px-4 sm:px-6 lg:px-8'>
        <Title text1={'CONTACT'} text2={'US'} />
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Information */}
          <div className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300'>
            <img 
              className='w-full h-64 object-cover rounded-lg mb-6' 
              src={assets.contact_img} 
              alt="Contact Us"
            />
            <div className='space-y-6'>
              <div>
                <h3 className='text-2xl font-bold text-gray-800 mb-4'>Get in Touch</h3>
                <p className='text-gray-600 leading-relaxed'>
                  We're here to help and answer any question you might have. We look forward to hearing from you.
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Our Store</h4>
                    <p className='text-gray-600'>845305, Bank Road, Street 18, Raxaul, Bihar</p>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Phone</h4>
                    <p className='text-gray-600'>(+91) 9534311604</p>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'>
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Email</h4>
                    <p className='text-gray-600'>gulshan@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className='border-t pt-6'>
                <h4 className='text-xl font-bold text-gray-800 mb-3'>Careers at StyleSway</h4>
                <p className='text-gray-600 mb-4'>
                  Learn more about our teams and job openings. Join our growing team!
                </p>
                <button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300'>
                  Explore Jobs
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300'>
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Send us a Message</h3>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Name</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='Your name'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='Your email'
                    required
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Subject</label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  placeholder='Subject'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows='5'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  placeholder='Your message'
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}

export default Contact
