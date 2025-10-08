import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Toaster } from 'react-hot-toast';
import useAdminStore from '../../Store/AdminStore';

function Login() {
    const navigate = useNavigate();
    const login = useAdminStore((state) => state.login);
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const res = await login(loginDetails.email, loginDetails.password);
        if (res) {
            localStorage.setItem('auth', 'true');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }
    }

    const checkUser = async () => {
        const check = await useAdminStore.getState().loginWithTokne();
        console.log(check);
        if (check) {
            localStorage.setItem('auth', 'true');
            navigate('/dashboard');
        } else {
            localStorage.setItem('auth', 'false');
            navigate('/');
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handelSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-200"
            >
                <h2 className="text-2xl font-serif font-bold mb-8 text-center text-gray-800">Law Firm Login</h2>

                {/* Email Field */}
                <div className="relative mb-6">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-lg" />
                    <input
                        value={loginDetails.email}
                        onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-700"
                    />
                </div>

                {/* Password Field */}
                <div className="relative mb-8">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-black" />
                    <input
                        value={loginDetails.password}
                        onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-700"
                    />
                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition-colors font-medium"
                >
                    Login
                </button>
            </form>
            <Toaster />
        </main>
    )
}

export default Login;
