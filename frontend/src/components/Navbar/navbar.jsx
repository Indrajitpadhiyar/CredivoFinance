import React from 'react'

const Navbar = () => {
  return (
   <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white absolute top-0 left-0 right-0">
      {/* Logo and Tagline */}
      <div className="flex items-center space-x-2">
        <img src="image/credivo_2.png" alt="logo"   className="h-13 w-40" />
        <div className="flex flex-col leading-tight">
          {/* <span className="text-xl font-bold text-blue-900">credivo</span>
          <span className="text-xs text-gray-500">meaving make Snople</span> */}
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center space-x-30 text-gray-800 text-sm font-medium">
        <a href="#home" className="hover:text-blue-600">Home</a>
        <a href="#services" className="hover:text-blue-600">Services</a>
        <a href="#about" className="hover:text-blue-600">About</a>
        <a href="#resources" className="hover:text-blue-600">Resources</a>
        <a href="#contact" className="hover:text-blue-600">Contact</a>
        <a href="#dashboard" className="hover:text-blue-600 flex items-center space-x-2">
        <img src={"image/dashboard-horizontal-line.svg"} alt="Dashboard" className="h-5 w-5" />
        <span>Dashboard</span>
        </a>
      </div>

      
     
      {/* Login Button */}
      <button
      onClick={() => window.location.href = '/login'}
      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
        Login
      </button>
    </nav>
  );
};


export default Navbar
