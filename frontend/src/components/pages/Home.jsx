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
      </div>
    </>
  );
};

export default Home;
