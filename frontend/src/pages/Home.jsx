import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Ourpolicy from '../components/Ourpolicy'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen'>
      <div className='space-y-16'>
        <Hero />
        <LatestCollection/>
        <BestSeller/>
        <Ourpolicy/>
        <Newsletter/>
      </div>
    </div>
  )
}

export default Home
