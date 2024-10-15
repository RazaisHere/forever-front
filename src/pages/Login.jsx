import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function Login() {
    const [currentState, setCurrentState] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigate } = useShop(); // Use the navigate function from the ShopContext

    const handleSubmit = async(e) => {
        e.preventDefault();
        
      
    };

    // Conditionally navigate to signup if currentState is not "Login"
    if (currentState !== "Login") {
        navigate("/signup");
        return null; // Prevent rendering the rest of the component
    }

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
