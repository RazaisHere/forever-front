import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigate, token, setToken } = useShop();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            if (response.data.success) {
                const newToken = response.data.token;
                setToken(newToken);
                localStorage.setItem("token", newToken);
                toast.success("Login Successful");
                navigate("/");
            } else {
                toast.error(response.data.message || "Login Failed");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred during login");
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div>
            <form
                className='flex flex-col items-center w-[90%] sm:w-96 mx-auto mt-14 gap-4 text-gray-800'
                onSubmit={handleSubmit}
            >
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <h1 className='prata-regular text-3xl'>Login</h1>
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
                </div>

                <input
                    type="email"
                    placeholder='Email'
                    className='w-full px-3 py-2 border border-gray-800'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder='Password'
                    className='w-full px-3 py-2 border border-gray-800'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className='w-full flex justify-between text-xs mt-[-8px]'>
                    <p className='cursor-pointer'>Forgot your password?</p>
                    <Link to="/signup">
                        <p className='cursor-pointer'>Create Account</p>
                    </Link>
                </div>
                <button
                    type="submit"
                    className="bg-black text-white px-8 py-2 mt-4 font-light"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default Login;
