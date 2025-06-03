import React from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react'
import { use } from 'react';

const Signup = () => {
    const [ShowPassword, setShowPassword] = useState(false)
    return (
        <div className='flex w-full h-screen  justify-center items-center '>

            <div className='absolute w-120 h-140 rounded-2xl flex flex-col items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)]'>
                <img
                    className='w-[40%] h-[35%] mix-blend-multiply'
                    src="./image/logo.png" alt="" />

                <div className="name w-80 h-11 p-5 rounded-xl bg-white border-1 border-black focus:outline-none flex items-center ">
                    <img
                        className='w-4 h-4 -ml-2'
                        src="./image/user-line.svg" alt="" />
                    <div className='h-8 border-1 ml-2 border-gray-500'></div>
                    <input className='w-full p-2 rounded-2xl focus:outline-none' required type="text" placeholder='Name' />
                </div>
                <div className="email mt-5 w-80 h-11 p-5 rounded-xl bg-white border-1 border-black focus:outline-none flex items-center ">
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
                <div className="Password w-80 h-11 p-5 rounded-xl bg-white border-1 mt-5 border-black focus:outline-none flex items-center ">
                    <img
                        className='w-4 h-4 -ml-2'
                        src="./image/lock-line.svg" alt="" />
                    <div className='h-8 border-1 ml-2 border-gray-500'></div>
                    <input className='w-full p-2 rounded-2xl focus:outline-none' required type={ShowPassword ? "text" : "password"} placeholder='Confirm Password' />
                    <button
                        type='button'
                        onClick={() => setShowPassword((prev => !prev))}>
                        {ShowPassword ? <EyeOff className='w-4 h-4 -ml-2' /> : <Eye className='w-4 h-4 -ml-2' />}
                    </button>
                </div>
                <button className='w-80 h-11  mt-5 rounded-2xl bg-blue-500 border-1 border-black text-xl font-bold text-white'>SignUp Now</button>
                <h2 className='mt-2'>Already have an account?<span className='text-blue-500'>Login</span></h2>
            </div>
        </div>
    )
}

export default Signup
