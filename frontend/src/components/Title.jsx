import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-3 items-center mb-6 group'>
      <div className='text-center'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>
          <span className='text-gray-600 group-hover:text-gray-700 transition-colors duration-300'>{text1}</span>
          {' '}
          <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300'>
            {text2}
          </span>
        </h2>
        <div className='flex items-center justify-center gap-2 mt-2'>
          <div className='w-8 sm:w-12 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-16 sm:group-hover:w-20 transition-all duration-300'></div>
          <div className='w-2 h-2 bg-blue-600 rounded-full group-hover:bg-purple-600 transition-colors duration-300'></div>
          <div className='w-8 sm:w-12 h-[2px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full group-hover:w-16 sm:group-hover:w-20 transition-all duration-300'></div>
        </div>
      </div>
    </div>
  )
}

export default Title