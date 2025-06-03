import React, { use, useContext } from 'react'
import { SIDE_MANU_DATA } from '../../../utils/data'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/useContext';
import { useUserAuth } from '../../../components/Hooks/UseUSerAuth';
// import { API_BASE_URL } from '../../../utils/axiosinstance';
import { API_BASE_URL } from "../../../utils/apiPath";

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


  return (
    <div className='flex h-screen w-full gap-2 items-center p-2'>
      <div className="h-[97vh] w-[20%] rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20">
        <div className=''>
          {/* <h5>
            {user?.fullName || "User Name"}
          </h5> */}
          <div>

            {user?.profileImageUrl ? (
              <img
                src={`${API_BASE_URL}${encodeURI(user?.profileImageUrl)}`}
                alt="Profile"
                className='w-40 m-5 rounded-full  bg-amber-400 h-40 object-cover rounded-tr-2xl'
              />

            ) : <></>}


            {SIDE_MANU_DATA.map((item) => (
              <button
                key={item.id}
                className='w-full flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg'
                onClick={() => hacdleClick(item.path)}
              >
                <item.icon className='text-xl' />
                <span>{item.lable}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='h-[97vh] w-[90vw] rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20'></div>
    </div >
  )
}

export default Profile
