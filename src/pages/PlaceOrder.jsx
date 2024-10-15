import React, { useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { useShop } from '../context/ShopContext';

function PlaceOrder() {
    const [method,setMethod]=useState("cod")
    const {navigate}=useShop()
    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
            {/* Left Side Address Info  */}
            <div className='flex flex-col gap-4 sm:max-w-[480px]'>
                <div className='text-2xl items-start my-3'>
                    <Title text1={"DELIVERY "} text2={"INFORMATION"} />
                </div>
                <div className='flex gap-3'>
                    <input type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <div className='flex flex-col gap-3'>
                    <input type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <div className='flex gap-3'>
                    <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <div className='flex gap-3'>
                    <input type="text" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <div>
                    <input type="tel" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
            </div>
            {/* Right Side Order Info  */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='mt-12'>
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    {/* Payment section  */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={()=>setMethod("stripe")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==="stripe"?"bg-green-400":"bg-white"} `}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Logo" />
                        </div>
                        <div onClick={()=>setMethod("razor")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==="razor"?"bg-green-400":"bg-white"}` }></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay Logo" />
                        </div>
                        <div onClick={()=>setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==="cod"?"bg-green-400":"bg-white"}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON <span className='text-green-500'>DELIVERY</span></p>
                        </div>
                    </div>
                    <div  className='w-full text-end mt-8'>
                        <button onClick={()=>navigate("/orders")} className='bg-black text-white text-sm my-8 px-8 py-3 active:bg-white active:border active:border-black active:text-black'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
