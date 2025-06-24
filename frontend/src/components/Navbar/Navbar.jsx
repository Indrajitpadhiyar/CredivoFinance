import React from 'react'
import { motion } from "motion/react"
import { fadeIn } from "../../assets/motion";
import { API_BASE_URL } from '../../utils/apiPath';
import { useUserAuth } from '../Hooks/UseUSerAuth';
import { useContext } from 'react'
import { UserContext } from '../../context/useContext';
import { FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  useUserAuth(); // Custom hook to fetch user data and handle authentication

  const { user, clearUser } = useContext(UserContext);

  return (
    <motion.nav
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className="bg-lightblack text-slate-900 backdrop-blur-md sticky top-0 z-40 shadow-lg ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <motion.div

            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="flex items-center">
            <img src="image/CF_LOGO_BLUE.png" alt="Logo" className="h-8 w-40" />
            {/* <span className="font-bold text-3xl text-sky-400">Credivo</span> */}
          </motion.div>

          <div className="hidden md:flex space-x-6 items-center">
            <motion.a

              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              href="/Home" className="text-black hover:text-sky-400 transition-colors">Home</motion.a>
            <motion.a

              variants={fadeIn("down", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              href="/About" className="text-black hover:text-sky-400 transition-colors  ">About Us</motion.a>
            <motion.a

              variants={fadeIn("down", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              href="/Income" className="text-black hover:text-sky-400 transition-colors  ">Income</motion.a>
            <motion.a

              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              href="/Expense" className="text-black hover:text-sky-400 transition-colors  ">Expense</motion.a>

            <motion.a

              variants={fadeIn("down", 0.7)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              href="/dashboard" className="text-black hover:text-sky-400 transition-colors flex items-center space-x-2">
              <img src={"image/dashboard-horizontal-line.svg"} alt="Dashboard" className="h-5 w-5" />
              <span>Dashboard</span>
            </motion.a>
            {/* <motion.a

              variants={fadeIn("down", 0.8)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              href="/Profile" className="text-black hover:text-sky-400 transition-colors  ">Profile</motion.a> */}

            {user?.profileImageUrl ? (
              <motion.div
                onClick={() => window.location.href = "/profile"}
                variants={fadeIn("left", 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className='w-10 h-10 rounded-full bg-cover bg-center hover:cursor-pointer'
                style={{
                  backgroundImage: `url('${API_BASE_URL}${encodeURI(user?.profileImageUrl)}')`
                }}
              />
            ) : (
              <motion.div
                onClick={() => window.location.href = "/profile"}
                variants={fadeIn("left", 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className='text-4xl text-gray-600 hover:text-black cursor-pointer'
              >
                <FaUserCircle />
              </motion.div>
            )}

            {/* <a href="#contact" className="text-black hover:text-sky-400 transition-colors">Contact</a> */}


            {/* <motion.button
            onClick={() => window.location.href = "/login"}
              variants={fadeIn("left", 0.7)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              Login | Sign Up
            </motion.button> */}
          </div>
          <div className="md:hidden">
            {/* Mobile menu button placeholder */}
            {/* <button 
            className="text-slate-300 hover:text-sky-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button> */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};


export default Navbar
