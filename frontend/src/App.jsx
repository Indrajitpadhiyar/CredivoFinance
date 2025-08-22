import { useState } from 'react'
import './App.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Login from './components/login-signup/Login';
import Profile from './components/pages/DashBoard/dashBoard/Profile';
import Register from './components/login-signup/Register';
import UserProvider from './context/UseContext';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Expense from './components/pages/Expense';
import toast, { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import FullPageDashboard from './components/pages/DashBoard/dashBoard/FullPageDashboard';
import Income from './components/pages/Income';


import { AnimatePresence, motion } from "framer-motion";

function App() {
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
      <div className='cursor w-5 h-5 bg-red-500 rounded-full absolute z-50'></div>
      <UserProvider>
        <div className='w-full h-screen relative overflow-hidden z-1'>
          <div className='pages flex flex-col absolute h-full w-full bottom-0 z-100'>
            <Router>
              <AnimatedRoutes />
            </Router>
          </div>
        </div>
        <Toaster
          toasterOptions={{
            className: '',
            style: { fontSize: '13px' },
          }}
        />
      </UserProvider>
    </>
  )
}

export default App

function AnimatedRoutes() {
  const location = useLocation();

  const pageTransition = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },      
    transition: { duration: 0.4 },
  };

  const MotionWrapper = ({ children }) => (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Navigate to='/login' />} />

        <Route path='/home' element={<MotionWrapper><Home /></MotionWrapper>} />
        <Route path='/login' element={<MotionWrapper><Login /></MotionWrapper>} />
        <Route path='/register' element={<MotionWrapper><Register /></MotionWrapper>} />
        <Route path='/profile' element={<MotionWrapper><Profile /></MotionWrapper>} />
        <Route path='/income' element={<MotionWrapper><Income /></MotionWrapper>} />
        <Route path='/dashboard' element={<MotionWrapper><FullPageDashboard /></MotionWrapper>} />
        <Route path='/expense' element={<MotionWrapper><Expense /></MotionWrapper>} />
        <Route path='/about' element={<MotionWrapper><About /></MotionWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}