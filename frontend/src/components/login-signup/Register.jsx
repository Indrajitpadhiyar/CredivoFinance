import { use, useContext, useState } from 'react'
import Input from '../Inputs/Input';
import ProfileSelect from '../Inputs/ProfileSelect';
import axiosInstance from '../../utils/axiosinstance';
import { validateEmail } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPath';
import { uploadImage } from '../../utils/helper';


import { UserContext } from '../../context/useContext';

const Register = () => {
    const [ShowPassword, setShowPassword] = useState(false)
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [error, seterror] = useState(null)
    const [FullName, setFullName] = useState("")
    const [Profilepic, setProfilepic] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");


    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();
    const handelRegister = async (e) => {
        e.preventDefault();

        if (!FullName) {
            seterror("Full Name is required");
            return;
        }
        if (!validateEmail(email)) {
            seterror("Invalid email");
            return;
        }
        if (!password) {
            seterror("Password is required");
            return;
        }
        if (password !== confirmPassword) {
            seterror("Passwords do not match");
            return;
        }
        seterror("");

        try {
            let profileImageUrl = "";

            if (Profilepic) {
                const imgUploadRes = await uploadImage(Profilepic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName: FullName,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate("/home");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                seterror(error.response.data.message);
            } else {
                seterror("Something went wrong, please try again later.");
            }
        }
    };
    
return (
    <div className='flex w-full h-screen  justify-center items-center '>

        <div className="w-[21%] h-[40%] -mt-150 bg-transparent ">
            <img
                className='w-full h-full mix-blend-multiply'
                src="./image/logoo.png" alt="" />
        </div>
        <div className='absolute w-120 h-130 rounded-2xl flex flex-col items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20'>

            <form className='mt-7' onSubmit={handelRegister} action="">
                <ProfileSelect image={Profilepic} setImage={setProfilepic} />


                <div className="FullName w-80 h-11 p-5 rounded-xl bg-white border-1 border-black focus:outline-none flex items-center ">
                    <img
                        className='w-4 h-4 -ml-2'
                        src="./image/user-line.svg" alt="" />
                    <div className='h-8 border-1 ml-2 border-gray-500'></div>
                    <Input
                        className='w-full p-2 rounded-2xl focus:outline-none'
                        required
                        onChange={({ target }) => { setFullName(target.value) }}
                        type="text"
                        placeholder='FullName' />
                </div>
                <div className="email w-80 h-11 p-5  mt-5 rounded-xl bg-white border-1 border-black focus:outline-none flex items-center ">
                    <img
                        className='w-4 h-4 -ml-2'
                        src="./image/mail-line.svg" alt="" />
                    <div className='h-8 border-1 ml-2 border-gray-500'></div>
                    <Input
                        className='w-full p-2 rounded-2xl focus:outline-none'
                        required
                        onChange={({ target }) => { setemail(target.value) }}
                        type="text"
                        placeholder='Email' />
                </div>

                <div className="Password w-80 h-11 p-5 rounded-xl bg-white border-1 mt-5 border-black flex items-center  ">
                    <img
                        className='w-4 h-4 -ml-2'
                        src="./image/lock-line.svg" alt="" />
                    <div className='h-8 border-1 ml-2 border-gray-500'></div>
                    <Input
                        className='w-full p-2 rounded-2xl focus:outline-none '
                        required
                        onChange={({ target }) => { setpassword(target.value) }}
                        value={password}
                        type="password"
                        placeholder="password"
                    />
                </div>
                <div className="Password w-80 h-11 p-5 rounded-xl bg-white border-1 mt-5 border-black flex items-center  ">
                    <img
                        className='w-4 h-4 -ml-2'
                        src="./image/lock-line.svg" alt="" />
                    <div className='h-8 border-1 ml-2 border-gray-500'></div>
                    <Input
                        className='w-full p-2 rounded-2xl focus:outline-none '
                        required
                        onChange={({ target }) => { setConfirmPassword(target.value) }}
                        value={confirmPassword}
                        type="password"
                        placeholder="cunfirm password"
                    />
                </div>
                {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
                <button
                    type='submit'
                    className='btn-primary w-80 h-11  mt-5 rounded-2xl bg-blue-500 border-1 border-black text-xl font-bold text-white'>
                    Sign Up
                </button>
                <p className='mt-1 ml-15'>
                    You Have an Account ?
                    <span className='text-blue-800'>
                        <a href="/Login">
                            Login
                        </a>
                    </span>
                </p>
            </form>
        </div>
    </div>
)
}

export default Register
