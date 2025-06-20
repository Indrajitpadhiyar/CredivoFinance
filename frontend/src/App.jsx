import { useState } from 'react'
import './App.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Login from './components/login-signup/Login';
import Profile from './components/pages/DashBoard/dashBoard/Profile';
import Register from './components/login-signup/Register';
import UserProvider from './context/useContext';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Expense from './components/pages/Expense';
import toast, { Toaster } from 'react-hot-toast';
import Root from './components/pages/Root';
import Income from './components/pages/Income';



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import DashBoard from './components/pages/DashBoard/dashBoard/DashBoard';
import FullPageDashboard from './components/pages/DashBoard/dashBoard/FullPageDashboard';
import Income from './components/pages/Income';

function App() {
  const [count, setCount] = useState(0)
  const [mousePointer, setMousePointer] = useState({ x: 0, y: 0 })
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

      <div className='cursor w-5 h-5 bg-red-500 rounded-full  absolute z-50 '></div>
      <UserProvider>
        <div>
        </div>
        <div className='w-full h-screen relative overflow-hidden z-1'>
          <div className='pages flex flex-col absolute h-full w-full bottom-0 z-100'>
            <Router>
              <Routes>

                <Route path='/' element={<Root />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Income' element={<Income />} />
                <Route path='/dashboard' element={<FullPageDashboard />} />
                <Route path='/Expense' element={<Expense />} />
                <Route path='/About' element={<About />} />
              </Routes>
            </Router>
          </div>
        </div>
        <Toaster
          toasterOptions={{
            className: '',
            style: {
              fontSize: '13px'
            },

          }}
        />
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