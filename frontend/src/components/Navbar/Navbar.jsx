import React, { useState, useContext } from 'react';
import { motion } from "motion/react";
import { fadeIn } from "../../assets/motion";
import { API_BASE_URL } from '../../utils/apiPath';
import { useUserAuth } from '../Hooks/UseUSerAuth';
import { UserContext } from '../../context/UseContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  useUserAuth(); // Fetch user
  const { user } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Function to get initial (if name exists)
  const getInitial = () => {
    if (user?.fullName) {
      return user.fullName.charAt(0).toUpperCase();
    }
    return "U"; // Default
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true }}
        className="bg-lightblack text-slate-900 backdrop-blur-md sticky top-0 z-40 shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex items-center">
              <img src="image/CF_LOGO_BLUE.png" alt="Logo" className="h-8 w-40" />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6 items-center">
              {["Home", "About", "Income", "Expense"].map((item, i) => (
                <motion.a
                  key={item}
                  variants={fadeIn("down", 0.2 + i * 0.1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true }}
                  href={`/${item}`}
                  className="text-black hover:text-sky-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}

              <motion.a
                href="/dashboard"
                className="text-black hover:text-sky-400 transition-colors flex items-center space-x-2"
                variants={fadeIn("down", 0.7)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true }}
              >
                <img src="image/dashboard-horizontal-line.svg" alt="Dashboard" className="h-5 w-5" />
                <span>Dashboard</span>
              </motion.a>

              {/* Profile Section */}
              <div onClick={() => window.location.href = "/profile"} className="cursor-pointer">
                {user?.profileImageUrl ? (
                  <div
                    className='w-10 h-10 rounded-full bg-cover bg-center hover:cursor-pointer'
                    style={{ backgroundImage: `url('${API_BASE_URL}${encodeURI(user?.profileImageUrl)}')` }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                    {getInitial()}
                  </div>
                )}
              </div>
            </div>

            {/* Hamburger Icon (Mobile) */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleSidebar}>
                <FaBars size={24} />
              </button> 
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar (Mobile Only) */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 shadow-lg`}>
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <img src="image/CF_LOGO_BLUE.png" alt="Logo" className="h-8" />
          <button onClick={closeSidebar}>
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4 space-y-4">
          {["Home", "About", "Income", "Expense", "Dashboard"].map((item) => (
            <a
              key={item}
              href={`/${item}`}
              onClick={closeSidebar}
              className="text-black hover:text-sky-400 text-lg"
            >
              {item}
            </a>
          ))}

          {/* Profile in Sidebar */}
          <div onClick={() => window.location.href = "/profile"} className="mt-4 flex items-center space-x-2 cursor-pointer">
            {user?.profileImageUrl ? (
              <div
                className='w-10 h-10 rounded-full bg-cover bg-center'
                style={{ backgroundImage: `url('${API_BASE_URL}${encodeURI(user?.profileImageUrl)}')` }}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                {getInitial()}
              </div>
            )}
            <span className="text-black font-medium">{user?.fullName || "User"}</span>
          </div>
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black opacity-40 z-40"
        ></div>
      )}
    </>
  );
};

export default Navbar;
