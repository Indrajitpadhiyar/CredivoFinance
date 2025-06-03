import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-lightblack text-slate-900 backdrop-blur-md sticky top-0 z-50 shadow-lg ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img src="image/CF_LOGO_BLUE.png" alt="Logo" className="h-8 w-40" />
            {/* <span className="font-bold text-3xl text-sky-400">Credivo</span> */}
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#Home" className="text-black hover:text-sky-400 transition-colors">Home</a>
            <a href="#investment" className="text-black hover:text-sky-400 transition-colors  ">Investment</a>
            <a href="/About" className="text-black hover:text-sky-400 transition-colors  ">About Us</a>
            <a href="/Profile" className="text-black hover:text-sky-400 transition-colors  ">Profile</a>
            {/* <a href="#contact" className="text-black hover:text-sky-400 transition-colors">Contact</a> */}

            <a href="#dashboard" className="text-black hover:text-sky-400 transition-colors flex items-center space-x-2">
              <img src={"image/dashboard-horizontal-line.svg"} alt="Dashboard" className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              Login | Sign Up
            </button>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button placeholder */}
            <button className="text-slate-300 hover:text-sky-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar