import { useGSAP } from '@gsap/react';
import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { FaLocationArrow } from "react-icons/fa";
import { motion } from "motion/react";
import { fadeIn } from "../../assets/motion";
import Navbar from "@/components/Navbar/Navbar";

const Home = () => {
  const moneyRef = useRef(null);

  useGSAP(() => {
    gsap.from('.text1', {
      opacity: 0,
      duration: 1,
      x: -100,
    });
    gsap.from('.text2', {
      opacity: 0,
      duration: 1,
      x: 100,
    });
    gsap.from('.text3', {
      opacity: 0,
      duration: 1,
      x: -100,
    });
  });

  return (
    <>
      <div className='w-full overflow-x-hidden main'>
        <Navbar />

        {/* Hero Section */}
        <div className='flex w-full h-screen justify-center items-center flex-col overflow-hidden px-4'>
          <div className='w-full sm:w-[80%] h-[35%] flex justify-center items-center'>
            <h1 className='text-4xl sm:text-7xl font-thin flex gap-3 flex-col text-center sm:text-left'>
              <span className='text1'>
                THE BEST
              </span>
              <span className='text2 text-red-400 sm:ml-20'>
                MANAGEMENT
              </span>
              <span className='text3 sm:mr-20 text-red-400'>PLATFORM</span>
            </h1>
          </div>

          {/* Typing Text */}
          <h2 className='text-center text-lg sm:text-2xl mt-10 px-4 sm:px-0'>
            <TypeAnimation
              sequence={[
                'Grow your wealth with smart, secure, and simplified investing—trusted by thousands.',
                100,
              ]}
              wrapper="span"
              repeat={Infinity}
              style={{ fontSize: '1em', display: 'inline-block' }}
              className='text-inherit'
            />
          </h2>

          {/* CTA Button */}
          <motion.button
            variants={fadeIn("up", 1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className='bg-orange-500 font-bold text-white px-6 py-3 rounded-md hover:bg-red-600 mt-10 transition duration-300'
          >
            JOIN NOW
          </motion.button>

          {/* Info Bottom Bar */}
          <div className='w-full mt-20 flex flex-col sm:flex-row sm:justify-around items-center gap-6 font-semibold px-4'>
            <motion.div
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className='text-gray-500 text-center sm:text-left'
            >
              <h4>For Public And Private Use</h4>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className='text-gray-500 text-center sm:text-left'
            >
              <h4>Management of your investments</h4>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 1.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className='flex justify-center items-center gap-3'
            >
              <h4 className='border px-4 py-2 rounded-full hover:bg-black cursor-pointer hover:text-white transition duration-300 text-sm sm:text-base'>
                Start Now
              </h4>
              <FaLocationArrow />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer id="contact" className="py-16 bg-slate-900 border-t border-slate-700 relative z-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-sky-400 mb-4">
                  <img src="image/CF_LOGO_PNG.png" alt="logo" className="h-10 w-40" />
                </h3>
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
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Finamore. All rights reserved. Built with React & Tailwind CSS.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
