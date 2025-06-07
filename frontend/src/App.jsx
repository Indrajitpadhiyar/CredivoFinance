import { useState } from 'react'
import './App.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Login from './components/login-signup/Login';
import Profile from './components/pages/DashBoard/Profile';
import Register from './components/login-signup/register';
import UserProvider from './context/useContext';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Expense from './components/pages/Expense';



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
  const [mousePointer, setMousePointer] = useState({ x: 0, y: 0 })

  useGSAP(() => {
    gsap.to('.circule1', {
      left: 100,
      right: 170,
      scale: 1.1,
      duration: 7,
      repeat: -1,
      yoyo: true,
    })
  })
  useGSAP(() => {
    const mouseMove = (e) => {
      gsap.to('.cursor', {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        transition: 'ease-in-out',
      })
    }
    window.addEventListener('mousemove', mouseMove)
  })

  return (
    <>
      <UserProvider>
        <div className='cursor w-5 h-5 bg-red-500 rounded-full  absolute z-50 '></div>
        <div>
        </div>
        <div className='w-full h-screen relative overflow-hidden z-1'>
          {/* <img
            src="/image/bgg.svg"
            alt="background"
            className="w-full h-screen relative object-cover top-0 left-0"
          /> */}
          {/* <div className="circule1 absolute w-[25%] h-[50%] right-[100%] left-[70%] -top-[120px] bg-red-300 rounded-full blur-3xl z-10"></div> */}
          {/* <div className="circule2 absolute w-[25%] h-[50%] -right-[120px] -bottom-[100px] bg-blue-400 rounded-full blur-3xl z-10"></div> */}
          <div className='pages flex flex-col absolute h-full w-full bottom-0 z-100'>
            <Router>
              <Routes>

                <Route path='/' element={<Root />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Expense' element={<Expense />} />
                <Route path='/About' element={<About />} />
              </Routes>
            </Router>
          </div>
        </div>
      </UserProvider>
    </>
  )
}

export default App

const Root = () => {
  //check if token exist in local storage
  const isAuthanticated = !!localStorage.getItem('token')

  return isAuthanticated ? (
    <Navigate to='/DashBoard' />
  ) : (
    <Navigate to='/login' />
  )
}