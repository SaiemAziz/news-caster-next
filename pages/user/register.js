import Lottie from 'lottie-react';
import Link from 'next/link';
import React, { useState } from 'react';
import * as loginImage from '../../assets/images/GLOBE-ANIME.json'

const register = () => {

    let [show, setShow] = useState(false)
    let [err, setErr] = useState('')

    let handlerForm = e => {
        e.preventDefault();
        let password = e.target.password.value
        let confirm = e.target.confirm.value

        if(password !== confirm) {
            setErr('Password and Confirm does not match')
            return;
        }
        setErr('')
    }



    return (
        <div className='max-w-7xl mx-auto grid gap-10 grid-cols-2 '>
            <div className='flex flex-col items-center justify-center gap-5 p-10'>
                <Lottie animationData={loginImage} />
                <h1 className='text-5xl italic -mt-10 text-blue-500'>Welcome to NewsCaster</h1>
            </div>
            <div className='bg-white p-10 flex flex-col justify-center items-center gap-5'>
                <h1 className='text-2xl font-bold text-[#097ef6] mb-10'>Register Account</h1>

                <form onSubmit={handlerForm} className='flex flex-col gap-3 w-full max-w-xs'>
                    <div class="relative w-full max-w-xs font-semibold">
                        <input type="text" id="floating_name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='displayName'/>
                        <label for="floating_name" class="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Full Name</label>
                    </div>
                    <div class="relative w-full max-w-xs font-semibold">
                        <input type="text" id="floating_email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='email'/>
                        <label for="floating_email" class="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                    </div>
                    <div class="relative w-full max-w-xs font-semibold">
                        <input type={show ? 'text' : 'password'} id="floating_password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='password'/>
                        <label for="floating_password" class="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                    </div>
                    <div class="relative w-full max-w-xs font-semibold">
                        <input type={show ? 'text' : 'password'} id="floating_confirm" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='confirm'/>
                        <label for="floating_confirm" class="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm</label>
                    </div>
                    <div className='flex gap-3 ml-auto'>
                        <p className='text-[#097ef6] font-semibold text-xs'>Show Password</p>
                        <input type="checkbox" onChange={()=>setShow(!show)} className="checkbox checkbox-xs checkbox-info" /> 
                    </div>
                    {
                        err && <p className='text-center font-bold text-sm text-error'>{err}</p>
                    }
                    <button className='btn border-0 btn-info text-center text-white rounded-full w-full py-2 mt-10 bg-[#097ef6]'>Register</button>
                    <Link href='/user/login' className='btn border-0 btn-link text-info text-center w-full mt-0'>Already a Member?</Link>
                </form>
            </div>
        </div>
    );
};

export default register;