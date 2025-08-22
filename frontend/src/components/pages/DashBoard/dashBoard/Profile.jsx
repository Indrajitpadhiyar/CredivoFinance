import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../context/UseContext';
import { useUserAuth } from '../../../Hooks/UseUSerAuth';
import { API_BASE_URL } from '../../../../../../backend/utils/apiPath';
import { useNavigate } from 'react-router-dom';
import { SIDE_MANU_DATA } from '../../../../../utils/data';
import DashBoard from './DashBoard';
import { FaChevronDown, FaChevronUp, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../assets/motion';
import uploadImage from '../../../../../utils/uploadImage';
import axiosInstance from '../../../../../utils/axiosinstance';

const Profile = () => {
  useUserAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(user?.fullName || '');
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleClick = (Route) => {
    if (Route === 'Logout') {
      handleLogout();
    } else {
      navigate(Route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      let imageUrl = user.profileImageUrl;

      if (newImage) {
        const uploadRes = await uploadImage(newImage);
        imageUrl = uploadRes.imageUrl;
      }

      const updatedUserData = {
        fullName: newName,
        profileImageUrl: imageUrl,
      };

      await axiosInstance.put('/api/v1/auth/update-user', updatedUserData);
      const res = await axiosInstance.get('/api/v1/auth/user');
      const updatedUser = res.data.user;

      updateUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toggleModal();
    } catch (error) {
      console.error('Profile update failed', error.message);
      alert('Profile update failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate(-1);
    }, 400);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full gap-2 p-2 relative">

      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 
             bg-blue-600 text-white rounded-lg shadow-md 
             hover:bg-blue-700 transition"
      >
        <FaArrowLeft />
      </button>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-white p-6 rounded-xl w-96 max-w-full shadow-xl flex flex-col items-center justify-center"
          >
            {loading ? (
              <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
                <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4 text-center">Edit Profile</h2>
                <div className="flex flex-col gap-4 w-full">
                  <input
                    type="text"
                    className="p-2 border rounded-md"
                    placeholder="Enter Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <label
                    htmlFor="image-upload"
                    className="w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer text-gray-500 hover:border-blue-500 overflow-hidden"
                  >
                    {newImage ? (
                      <img
                        src={URL.createObjectURL(newImage)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>Click to upload image</span>
                    )}
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setNewImage(e.target.files[0])}
                    />
                  </label>
                  <button
                    onClick={handleProfileUpdate}
                    className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={toggleModal}
                    className="text-gray-600 text-sm underline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-full md:w-[20%] rounded-2xl flex flex-col items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20 p-4">

        {/* Profile Image OR Initial Avatar */}
        {user?.profileImageUrl ? (
          <motion.img
            variants={fadeIn('down', 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            src={
              user.profileImageUrl.startsWith("http")
                ? `${user.profileImageUrl}?t=${Date.now()}`
                : `${API_BASE_URL}${user.profileImageUrl}?t=${Date.now()}`
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
          />
        ) : (
          <motion.div
            variants={fadeIn('down', 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mt-4"
          >
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
          </motion.div>
        )}

        <motion.h5
          variants={fadeIn('right', 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-4 text-xl font-semibold text-center uppercase"
        >
          {user?.fullName || 'User Name'}
        </motion.h5>
        <button
          onClick={toggleModal}
          className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800 gap-1 cursor-pointer"
        >
          <FaEdit /> Edit Profile
        </button>

        {/* Mobile Toggle */}
        <div className="md:hidden mt-4">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 text-blue-600 hover:text-black"
          >
            {isMenuOpen ? 'Hide Menu' : 'Show Menu'}
            {isMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {/* Sidebar Items */}
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
                  variants={fadeIn('right', item.id * 0.3)}
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

      {/* Dashboard Section */}
      <div className="w-full md:w-[80%] rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20 overflow-hidden overflow-y-scroll">
        <DashBoard />
      </div>
    </div>
  );
};  

export default Profile;
