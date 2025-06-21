import { useGSAP } from '@gsap/react';
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import Canvas from './Canvas';
import { FaLocationArrow } from "react-icons/fa";
import { motion } from "motion/react"
import { fadeIn } from "../../assets/motion";
import Marquee from '../Marquee';
import MoneyEffect from './MoneyEffect';
import { useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar/navbar";

// import HomePageAnimation from './HomePageAnimation';

const Home = () => {

  // const locomotiveScroll = new LocomotiveScroll();

  const moneyRef = useRef(null);
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
    const Home = ({ setShowCursor }) => {
      const moneyRef = useRef(null);


      useEffect(() => {
        const onScroll = () => {
          if (!moneyRef.current) return;

          const rect = moneyRef.current.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;

          setShowCursor(!isInView); // 👈 hide cursor if MoneyEffect is in view
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
      }, [setShowCursor]);

    }
  })
  return (
    <>

      <div className='w-full overflow-x-hidden main'>

        <Navbar />
        <div className='flex w-full h-screen justify-center items-center flex-col overflow-hidden '>
          <div className='w-[80%] h-[35%]  flex  justify-center'>
            <h1 className='text-7xl font-thin flex gap-3 flex-col'>
              <span className='text1'>
                THE BEST
              </span>
              <span className='text2 text-red-400 flex flex-col ml-20'>
                MANAGEMENT
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
          <motion.button
            variants={fadeIn("up", 1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className='bg-orange-500 font-bold text-white px-4 py-2 rounded-md hover:bg-red-600 mt-10'>
            JOIN NOW
          </motion.button>

          {/* info bottome bar */}

          <div className='w-full  p-1 mt-20 flex   justify-around  font-semibold'>
            <motion.div
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className='text-gray-500 px-4 py-2'>
              <h4>For Public And Private Use</h4>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className='text-gray-500 px-4 py-2 '>
              <h4>Form the Manage your investments</h4>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 1.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className='flex justify-center items-center gap-4'>
              <h4 className='border px-4 py-2 rounded-4xl  hover:bg-black cursor-pointer hover:text-white transform duration-300'>Start Now</h4>
              <FaLocationArrow />
            </motion.div>
          </div>
        </div>

        {/* info bottome bar end */}

        {/* secction2 */}


        <div className=' w-full  h-[350vh]'>

          <div className='w-full sticky top-0 left-0 z-50 '>

            <Canvas />

          </div>
        </div>

        {/* marquee effect starrt */}
        <Marquee />
        {/* marquee effect end */}

        {/* money page effect */}
        <div className='w-full h-[250vh]' ref={moneyRef}>
          <div className='w-full sticky top-0 left-0 z-50 '>
            <MoneyEffect />
          </div>
        </div>
        {/* money page effect end */}

        <footer id="contact" className="py-16 bg-slate-900 border-t border-slate-700 relative z-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-sky-400 mb-4"><img src="image/CF_LOGO_PNG.png" alt="logo" className="h-10 w-40" /></h3>
                <p className="text-slate-400 text-sm">
                  Your trusted partner in financial growth and security. We provide cutting-edge tools and expert advice to help you achieve your financial goals.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">About Us</a></li>
                  <li><a href="#features" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Our Features</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Pricing Plans</a></li>
                  <li><a href="#testimonials" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Testimonials</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Contact Us</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">FAQs</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Help Center</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Live Chat</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Terms of Service</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center">
              <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Finamore. All rights reserved. Built with React & Tailwind CSS.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home