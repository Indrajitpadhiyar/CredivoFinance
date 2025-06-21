import React, { use, useContext } from 'react'
import { SIDE_MANU_DATA } from '../../../../utils/data'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../context/useContext';
import { useUserAuth } from '../../../Hooks/UseUSerAuth';
import { API_BASE_URL } from "../../../../utils/apiPath";
import { motion } from 'framer-motion';
import { fadeIn } from '../../../../assets/motion';
import DashBoard from './DashBoard';

const Profile = () => {

  useUserAuth(); // Custom hook to fetch user data and handle authentication
  const { user, clearUser } = useContext(UserContext);

  // console.log("User context:", user);


  const navigate = useNavigate();

  const hacdleClick = (Route) => {
    if (Route === "Logout") {
      // Clear user data and navigate to login page
      handleLogout();
      return;
    }
    navigate(Route);
  };
  console.log("User:", user);
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // control line-by-line delay
      },
    },
  };

  return (
    <div className='flex h-screen w-full gap-2 items-center p-2 '>
      <div className="h-[97%] w-[20%] rounded-2xl flex flex-col overflow-hidden items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20">
        <div className=''>

          <div>

            {user?.profileImageUrl ? (
              <motion.img
                variants={fadeIn("down", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true }}
                src={`${API_BASE_URL}${encodeURI(user?.profileImageUrl)}`}
                alt="Profile"
                className='w-40  mt-10 bg-amber-400 h-40 object-cover  rounded-bl-4xl rounded-tr-4xl'
              />


            ) : <></>}
            <motion.h5
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className='mt-5 uppercase text-xl font-semibold'>
              {user?.fullName || "User Name"}
            </motion.h5>


            {SIDE_MANU_DATA.map((item) => (
              <motion.button
                key={item.id}
                variants={fadeIn("right", item.id * 0.4)} // add delay based on index
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className='w-full flex mt-5 items-center gap-2 p-2 hover:bg-gray-200 rounded-lg'
                onClick={() => hacdleClick(item.path)}
              >
                <item.icon className='text-xl' />
                <span>{item.lable}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      <div className='h-[97%] w-[90%] rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20 overflow-hidden'>
        <DashBoard />
      </div>
    </div >
  )
}

export default Profile
