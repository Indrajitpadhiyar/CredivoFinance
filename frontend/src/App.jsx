import { useState } from 'react'
import './App.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// import Login from './components/login-signup/Login';
import Navbar from './components/Navbar/navbar';
// import Signup from './components/login-signup/Signup';
// import Home from './components/pages/Home';
import About from './components/pages/About';


function App() {
  const [count, setCount] = useState(0)
  const [mousePointer, setMousePointer] = useState({ x: 0, y: 0 })

  useGSAP(() => {

    const mouseMove = (e) => {
      gsap.to('.cursor', {
        x: e.clientX,
        y: e.clientY,
        duration: 0
      })
    }
    window.addEventListener('mousemove', mouseMove)
  })

  return (
    <>
      <div className='cursor w-5 h-5 bg-red-500 blur rounded-full absolute z-10'></div>
      <div className='w-full h-screen relative overflow-y-auto'>
        <div className="circule1 absolute w-[25%] h-[50%] -left-[120px] -top-[120px] bg-blue-400 rounded-full blur-3xl"></div>
        <div className="circule2 absolute w-[25%] h-[50%] -right-[120px] -bottom-[100px] bg-blue-400 rounded-full blur-3xl"></div>
        {/* <Login /> */}
        {/* <Signup /> */}
        {/* <Home /> */}
        <Navbar />
        <About />
      </div>
    </>
  )
}

export default App
