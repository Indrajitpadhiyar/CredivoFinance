import { useContext, useState } from 'react';
import Input from '../Inputs/Input';
import ProfileSelect from '../Inputs/ProfileSelect';
import axiosInstance from '../../../../backend/utils/axiosinstance';
import { validateEmail, uploadImage } from '../../../../backend/utils/helper';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../../../backend/utils/apiPath';
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
        <div className='md:grid md:grid-cols-2 w-full min-h-screen'>

            {/* Left side with the logo and background */}
            <div
                className="relative hidden md:flex flex-col justify-center items-center p-8 bg-cover bg-center"
                style={{ backgroundImage: "url('/image/bg.png')" }}
            >
                {/* Overlay Background */}
                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

                {/* Logo */}
                <img
                    className="w-2/3 h-auto object-contain z-10 relative"
                    src="/image/logoo.png"
                    alt="Credivo Finance Logo"
                />
            </div>


            <div className='w-full flex justify-center items-center p-8'>
                {loading ? (

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
                    <div className='w-full max-w-lg rounded-2xl flex flex-col items-center shadow-xl backdrop-blur-md bg-white/40 z-20 p-8'>
                        <img
                            className='w-24 h-24 md:hidden mix-blend-multiply object-contain mb-6'
                            src="./image/logoo.png"
                            alt="Credivo Finance Logo"
                        />
                        <h2 className='text-3xl font-bold text-gray-800 mb-6'>Create Account</h2>
                        <form className='w-full flex flex-col items-center gap-4' onSubmit={handelRegister}>
                            <ProfileSelect image={Profilepic} setImage={setProfilepic} />

                            <div className="input-field-container w-full flex items-center bg-white rounded-xl border border-gray-300 shadow-sm">
                                <img className='w-5 h-5 ml-4' src="./image/user-line.svg" alt="User Icon" />
                                <div className='h-6 border-l mx-3 border-gray-400'></div>
                                <Input
                                    className='w-full p-3 rounded-r-xl focus:outline-none'
                                    required
                                    onChange={({ target }) => setFullName(target.value)}
                                    type="text"
                                    placeholder='Full Name'
                                />
                            </div>

                            <div className="input-field-container w-full flex items-center bg-white rounded-xl border border-gray-300 shadow-sm">
                                <img className='w-5 h-5 ml-4' src="./image/mail-line.svg" alt="Email Icon" />
                                <div className='h-6 border-l mx-3 border-gray-400'></div>
                                <Input
                                    className='w-full p-3 rounded-r-xl focus:outline-none'
                                    required
                                    onChange={({ target }) => setemail(target.value)}
                                    type="email"
                                    placeholder='Email'
                                />
                            </div>

                            <div className="input-field-container w-full flex items-center bg-white rounded-xl border border-gray-300 shadow-sm">
                                <img className='w-5 h-5 ml-4' src="./image/lock-line.svg" alt="Password Icon" />
                                <div className='h-6 border-l mx-3 border-gray-400'></div>
                                <Input
                                    className='w-full p-3 rounded-r-xl focus:outline-none'
                                    required
                                    onChange={({ target }) => setpassword(target.value)}
                                    value={password}
                                    type={ShowPassword ? "text" : "password"}
                                    placeholder="Password"
                                />
                            </div>

                            <div className="input-field-container w-full flex items-center bg-white rounded-xl border border-gray-300 shadow-sm">
                                <img className='w-5 h-5 ml-4' src="./image/lock-line.svg" alt="Confirm Password Icon" />
                                <div className='h-6 border-l mx-3 border-gray-400'></div>
                                <Input
                                    className='w-full p-3 rounded-r-xl focus:outline-none'
                                    required
                                    onChange={({ target }) => setConfirmPassword(target.value)}
                                    value={confirmPassword}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            {error && <p className='text-red-600 text-sm font-semibold mt-2'>{error}</p>}

                            <button
                                type='submit'
                                className='w-full py-3 mt-4 rounded-xl bg-blue-700 text-lg font-bold text-white shadow-md transition-transform transform hover:scale-105 hover:bg-blue-800'
                            >
                                Sign Up
                            </button>

                            <p className='mt-4 text-sm text-gray-700'>
                                You Have an Account?
                                <a href="/Login" className='text-blue-800 font-bold ml-1 hover:underline'>
                                    Login
                                </a>
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;