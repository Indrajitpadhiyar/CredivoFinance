import { useGSAP } from '@gsap/react';
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import Navbar from '../Navbar/navbar';

const Home = () => {
  useGSAP(() => {
    gsap.from('.text1', {
      opacity: 0,
      duration: 1,
      x: -100,
    })
    gsap.from('.text2', {
      opacity: 0,
      duration: 1,
      x: 100,
    })
    gsap.from('.text3', {
      opacity: 0,
      duration: 1,
      x: -100,
    })

  })
  return (
    <>
    <Navbar />
      <div className='flex w-full h-screen justify-center items-center flex-col '>
        <div className='w-[80%] h-[35%]  flex  justify-center'>
          <h1 className='text-7xl font-thin flex gap-3 flex-col'>
            <span className='text1'>
              THE BEST
            </span>
            <span className='text2 text-red-400 flex flex-col ml-20'>
              INVESTMENT
            </span>
            <span className='text3 mr-20 text-red-400'>PLATFORM</span>
          </h1>
        </div>
        <h2 className='text-2xl mt-10 '>
          <TypeAnimation
            sequence={[
              'Grow your wealth with smart ,secure , and simplified investing— trusted by thousands.',
              100,
            ]}
            wrapper="span"
            repeat={Infinity}
            style={{ fontSize: '1em', display: 'inline-block' }}
            className='text-2xl '
          />
        </h2>
        <button className='bg-orange-500 font-bold text-white px-4 py-2 rounded-md hover:bg-red-600 mt-10'>JOIN NOW</button>
      </div>
    </>
  )
}

export default Home