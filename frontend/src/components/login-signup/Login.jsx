import { Eye, EyeOff } from 'lucide-react';
import React from 'react'
import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Input from '../Inputs/Input';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';

const Login = () => {
  const navigate = useNavigate();

  // const [ShowPassword, setShowPassword] = useState(false)
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  const [error, seterror] = useState(null)

  const handelLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      seterror("invalid email")
      return;
    }
    if (!password) {
      seterror("password is required")
      return
    }
    seterror("")
    //login api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email.trim(),
        password: password.trim()
      });


      console.log("Login response:", response);

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        navigate("/profile"); // Redirect to dashboard or profile page
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      if (error.response?.status === 401 || error.response?.status === 400) {
        seterror(error.response.data.message || "Invalid credentials");
      } else {
        seterror("Something went wrong, please try again later.");
      }
    }
  }

  useGSAP(() => {
    gsap.to('.circule1', {
      x: 100,
      y: 100,
      scale: 1.1,
      duration: 3,
      repeat: -1,
      yoyo: true
    })
  })

  return (
    <div className='flex w-full h-screen justify-center items-center relative z-10'>

      <div className='absolute w-120 h-130 rounded-2xl flex flex-col items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20'>

        <img
          className='w-[40%] h-[35%] mix-blend-multiply'
          src="./image/logoo.png" alt="" />
        <form onSubmit={handelLogin} action="">
          <div className="email w-80 h-11 p-5 rounded-xl bg-white border-1 border-black focus:outline-none flex items-center ">
            <img
              className='w-4 h-4 -ml-2'
              src="./image/mail-line.svg" alt="" />
            <div className='h-8 border-1 ml-2 border-gray-500'></div>
            <Input
              className='w-full p-2 rounded-2xl focus:outline-none'
              required
              onChange={({ target }) => { setemail(target.value) }}
              type="text"
              placeholder='Email' />
          </div>

          <div className="Password w-80 h-11 p-5 rounded-xl bg-white border-1 mt-5 border-black flex items-center  ">
            <img
              className='w-4 h-4 -ml-2'
              src="./image/lock-line.svg" alt="" />
            <div className='h-8 border-1 ml-2 border-gray-500'></div>
            <Input
              className='w-full p-2 rounded-2xl focus:outline-none '
              required
              onChange={({ target }) => { setpassword(target.value) }}
              type="password"
              value={password}
              placeholder="password"
            />
          </div>
          {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}

          <div className='flex w-80 h-11 items-center'>
            <input className='w-4 h-4 bg-transparent' type="checkbox" />
            <h2 className='p-1'>remember me</h2>
            <h2 className='ml-15 underline'>Forgot Password?</h2>
          </div>
          <button
            type='submit'
            className='btn-primary w-80 h-11  mt-5 rounded-2xl bg-blue-500 border-1 border-black text-xl font-bold text-white'>
            Log In
          </button>
          <p className='mt-1'>
            Don't have an account?{""}
            <span className='text-blue-800'>
              <a href="/register" className='underline text-blue-800'>
                Sign Up
              </a>
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Login