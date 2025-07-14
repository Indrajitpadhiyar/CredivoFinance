import React, { useContext, useState } from 'react';
import { SIDE_MANU_DATA } from '../../../../utils/data';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../context/UseContext';
import { useUserAuth } from '../../../Hooks/UseUSerAuth';
import { API_BASE_URL } from "../../../../utils/apiPath";
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../assets/motion';
import DashBoard from './DashBoard';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Profile = () => {
  useUserAuth();
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleClick = (Route) => {
    if (Route === "Logout") {
      handleLogout();
      return;
    }
    navigate(Route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full gap-2 p-2">

      {/* Sidebar */}
      <div className="w-full md:w-[20%] rounded-2xl flex flex-col items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20 p-4">
        {/* Profile Image */}
        {user?.profileImageUrl && (
          <motion.img
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            src={`${API_BASE_URL}${encodeURI(user?.profileImageUrl)}`}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
          />
        )}

        {/* User Name */}
        <motion.h5
          variants={fadeIn("right", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="mt-4 text-xl font-semibold text-center uppercase"
        >
          {user?.fullName || "User Name"}
        </motion.h5>

        {/* Toggle Button for Mobile */}
        <div className="md:hidden mt-4">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 text-blue-600 hover:text-black"
          >
            {isMenuOpen ? "Hide Menu" : "Show Menu"}
            {isMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth >= 768) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full mt-4"
            >
              {SIDE_MANU_DATA.map((item) => (
                <motion.button
                  key={item.id}
                  variants={fadeIn("right", item.id * 0.3)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="w-full flex items-center gap-2 p-2 mt-2 hover:bg-gray-200 rounded-lg"
                  onClick={() => handleClick(item.path)}
                >
                  <item.icon className="text-xl" />
                  <span>{item.lable}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Dashboard Content */}
      <div className="w-full md:w-[80%] rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20 overflow-hidden overflow-y-scroll">
        <DashBoard />
      </div>
    </div>
  );
};

export default Profile;
