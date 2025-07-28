import { useContext, useState } from 'react';
import Input from '../Inputs/Input';
import ProfileSelect from '../Inputs/ProfileSelect';
import axiosInstance from '../../utils/axiosinstance';
import { validateEmail, uploadImage } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/UseContext';

const Register = () => {
    const [ShowPassword, setShowPassword] = useState(false);
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [error, seterror] = useState(null);
    const [FullName, setFullName] = useState("");
    const [Profilepic, setProfilepic] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    let profileImageUrl = "";

    const handelRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!FullName) {
            seterror("Full Name is required");
            setLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            seterror("Invalid email");
            setLoading(false);
            return;
        }
        if (!password) {
            seterror("Password is required");
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            seterror("Passwords do not match");
            setLoading(false);
            return;
        }

        seterror("");

        try {
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
            seterror(error?.response?.data?.message || "Something went wrong, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col md:flex-row w-full min-h-screen justify-center items-center p-4 relative'>

            <div className="w-32 h-32 md:w-[21%] md:h-[40%] md:-mt-36 bg-transparent mb-4 md:mb-0">
                <img
                    className='w-full h-full mix-blend-multiply object-contain'
                    src="./image/logoo.png" alt="" />
            </div>

            {
                loading ? (
                    // 🌈 Loading Animation
                    <div className='flex justify-center items-center h-96 w-full z-50'>
                        <div
                            className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
                        >
                            <span
                                className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
                            ></span>
                        </div>
                    </div>
                ) : (
                    <div className='w-full max-w-md rounded-2xl flex flex-col items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md bg-white/30 z-20 p-6'>

                        <form className='mt-2 w-full flex flex-col items-center' onSubmit={handelRegister}>
                            <ProfileSelect image={Profilepic} setImage={setProfilepic} />

                            <div className="FullName w-full h-11 p-5 mt-3 rounded-xl bg-white border border-black flex items-center">
                                <img className='w-4 h-4 -ml-2' src="./image/user-line.svg" alt="" />
                                <div className='h-8 border-l ml-2 border-gray-500'></div>
                                <Input
                                    className='w-full p-2 rounded-2xl focus:outline-none'
                                    required
                                    onChange={({ target }) => setFullName(target.value)}
                                    type="text"
                                    placeholder='FullName' />
                            </div>

                            <div className="email w-full h-11 p-5 mt-5 rounded-xl bg-white border border-black flex items-center">
                                <img className='w-4 h-4 -ml-2' src="./image/mail-line.svg" alt="" />
                                <div className='h-8 border-l ml-2 border-gray-500'></div>
                                <Input
                                    className='w-full p-2 rounded-2xl focus:outline-none'
                                    required
                                    onChange={({ target }) => setemail(target.value)}
                                    type="text"
                                    placeholder='Email' />
                            </div>

                            <div className="Password w-full h-11 p-5 mt-5 rounded-xl bg-white border border-black flex items-center">
                                <img className='w-4 h-4 -ml-2' src="./image/lock-line.svg" alt="" />
                                <div className='h-8 border-l ml-2 border-gray-500'></div>
                                <Input
                                    className='w-full p-2 rounded-2xl focus:outline-none'
                                    required
                                    onChange={({ target }) => setpassword(target.value)}
                                    value={password}
                                    type={ShowPassword ? "text" : "password"}
                                    placeholder="password"
                                />
                            </div>

                            <div className="Password w-full h-11 p-5 mt-5 rounded-xl bg-white border border-black flex items-center">
                                <img className='w-4 h-4 -ml-2' src="./image/lock-line.svg" alt="" />
                                <div className='h-8 border-l ml-2 border-gray-500'></div>
                                <Input
                                    className='w-full p-2 rounded-2xl focus:outline-none'
                                    required
                                    onChange={({ target }) => setConfirmPassword(target.value)}
                                    value={confirmPassword}
                                    type="password"
                                    placeholder="confirm password"
                                />
                            </div>

                            {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}

                            <button
                                type='submit'
                                className='w-full h-11 mt-5 rounded-2xl bg-blue-500 border border-black text-xl font-bold text-white'>
                                Sign Up
                            </button>

                            <p className='mt-2 text-sm'>
                                You Have an Account?
                                <span className='text-blue-800 ml-1'>
                                    <a href="/Login">Login</a>
                                </span>
                            </p>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default Register;
