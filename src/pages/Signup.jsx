import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div>
    <div className='flex flex-col items-center w-[90%] sm:w-96 mx-auto mt-14 gap-4  text-gray-800'>
        
            <div className='inline-flex items-center gap-2 mb-2 mt-10 '>
                <h1 className='prata-regular text-3xl x'>Create Account </h1>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
        
        <input type="text" name="" placeholder=' Name' id="" className='w-full px-3 py-2 border border-gray-800 ' />
        <input type="text" name="" placeholder=' Email' id="" className='w-full px-3 py-2 border border-gray-800 ' />
        <input type="text" name="" placeholder=' Password'id="" className='w-full px-3 py-2 border border-gray-800 ' />
        <div className='w-full flex justify-between text-xs mt-[-8px]'>
            <p className='cursor-pointer'>Forgot your password?</p>
           <Link to={"/login"}> <p className='cursor-pointer'>Login Here</p></Link>

        </div>
        <button className="bg-black text-white px-8 py-2 mt-4 font-light">Sign Up</button>
    </div>
</div>
  )
}

export default Signup