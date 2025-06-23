import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi similique unde ab, natus et, earum aut quae, eveniet in voluptate iste. Consequuntur numquam earum veniam assumenda asperiores architecto quod alias?
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Pravacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 9534311604</li>
                <li>gulshan311604@gmail.com</li>
                <li>+91 9631591055</li>
                <li>rakesh@gmail.com</li>
                <li>+91 7091501353</li>
                <li>samar@gmail.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'> Copyright 2025@ forever.com-All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
