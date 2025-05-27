import { Eye, EyeOff } from 'lucide-react';
import React from 'react'
import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

const Login = () => {

  const [ShowPassword, setShowPassword] = useState(false)

  useGSAP(() => {
    gsap.to('.circule1', {
      x: 100,
      y: 100,
      scale: 1.1,
      duration: 3,
      repeat: -1,   
      yoyo: true    
    })
    gsap.to('.circule2', {
      x: -100,
      y: -100,
      scale: 1.1,
      duration: 3,
      repeat: -1,   
      yoyo: true    
    })
  })

  return (
    <div className='flex w-full h-screen  justify-center items-center '>

      <div className='absolute w-120 h-130 rounded-2xl flex flex-col items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)]'>
        <img
          className='w-[40%] h-[35%] mix-blend-multiply'
          src="./image/logo.png" alt="" />

        <div className="email w-80 h-11 p-5 rounded-xl bg-white border-1 border-black focus:outline-none flex items-center ">
          <img
            className='w-4 h-4 -ml-2'
            src="./image/mail-line.svg" alt="" />
          <div className='h-8 border-1 ml-2 border-gray-500'></div>
          <input className='w-full p-2 rounded-2xl focus:outline-none' required type="text" placeholder='Email' />
        </div>

        <div className="Password w-80 h-11 p-5 rounded-xl bg-white border-1 mt-5 border-black focus:outline-none flex items-center ">
          <img
            className='w-4 h-4 -ml-2'
            src="./image/lock-line.svg" alt="" />
          <div className='h-8 border-1 ml-2 border-gray-500'></div>
          <input className='w-full p-2 rounded-2xl focus:outline-none' required type={ShowPassword ? "text" : "password"} placeholder='Password' />
          <button
            type='button'
            onClick={() => setShowPassword((prev => !prev))}>
            {ShowPassword ? <EyeOff className='w-4 h-4 -ml-2' /> : <Eye className='w-4 h-4 -ml-2' />}
          </button>
        </div>

        <div className='flex w-80 h-11 items-center'>
          <input className='w-4 h-4 bg-transparent' type="checkbox" />
          <h1 className='p-1'>remember me</h1>
          <h1 className='ml-15 underline'>Forgot Password?</h1>
        </div>
        <button className='w-80 h-11  mt-5 rounded-2xl bg-blue-500 border-1 border-black text-xl font-bold text-white'>Log In</button>
        <h1 className='mt-1'>Don't have an account?<span className='text-blue-800'><a href="">Sign Up</a></span></h1>
      </div>
    </div>
  )
}
export default Login
