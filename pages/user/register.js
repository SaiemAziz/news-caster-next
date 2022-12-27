import Lottie from 'lottie-react';
import Link from 'next/link';
import React, { useState } from 'react';
import * as loginImage from '../../assets/images/GLOBE-ANIME.json'
import * as loadingImage from '../../assets/images/liquid-4-dot-loader.json'

const register = () => {
    
    let imgbbUrl = process.env.NEXT_PUBLIC_IMGBB_URL
    let [show, setShow] = useState(false)
    let [load, setLoad] = useState(false)
    let [err, setErr] = useState('')

    let handlerForm = async e => {
        e.preventDefault();
        setLoad(true)
        setErr('')
        let password = e.target.password.value
        let confirm = e.target.confirm.value
        let displayName = e.target.displayName.value
        let email = e.target.email.value
        let image = e.target.image.files[0]
        if (password !== confirm) {
            setErr('Password and Confirm does not match')
            return setLoad(false)
        }
        // let formData = new FormData()
        // formData.append('image', image)

        // const config = {
        //     method: 'POST',
        //     body: formData
        // }

        // let res = await fetch(imgbbUrl, config)
        // let data = await res.json()

        // console.log(data.data.display_url);
        // setLoad(false)
        // e.target.reset()
    }



    return (
        <div className='md:max-w-7xl w-full mx-auto grid gap-10 md:grid-cols-2 '>
            <div className='flex flex-col items-center justify-center gap-5 pt-10'>
                <Lottie animationData={loginImage} />
                <h1 className='text-5xl italic -mt-10 text-blue-500'>Welcome to NewsCaster</h1>
            </div>
            <div className='bg-white p-10 flex flex-col justify-center items-center gap-5'>
                <h1 className='text-2xl font-bold text-[#097ef6] mb-10'>Register Account</h1>

                <form onSubmit={handlerForm} className='flex flex-col gap-3 w-full max-w-xs'>
                    <div className="relative w-full max-w-xs font-semibold">
                        <input required type="text" id="floating_name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='displayName' />
                        <label htmlFor="floating_name" className="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Full Name</label>
                    </div>
                    <div className="relative w-full max-w-xs font-semibold">
                        <input required type="text" id="floating_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='email' />
                        <label htmlFor="floating_email" className="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                    </div>
                    <div className="relative w-full max-w-xs font-semibold">
                        <input required type="file" id='floating_image' name='image' accept="image/png, image/gif, image/jpeg"  className="text-sm text-grey-900
            file:mr-5 file:py-2 file:px-5
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-600 file:to-blue-300
            hover:file:cursor-pointer hover:file:opacity-80 mt-5
          " />
                        <label htmlFor="floating_image" className="absolute  text-[#097ef6] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Image</label>
                    </div>

                    <div className="relative w-full max-w-xs font-semibold">
                        <input required type={show ? 'text' : 'password'} id="floating_password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='password' />
                        <label htmlFor="floating_password" className="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                    </div>
                    <div className="relative w-full max-w-xs font-semibold">
                        <input required type={show ? 'text' : 'password'} id="floating_confirm" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='confirm' />
                        <label htmlFor="floating_confirm" className="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm</label>
                    </div>
                    <div className='flex gap-3 ml-auto'>
                        <p className='text-[#097ef6] font-semibold text-xs'>Show Password</p>
                        <input type="checkbox" onChange={() => setShow(!show)} className="checkbox checkbox-xs checkbox-info" />
                    </div>
                    {
                        err && <p className='text-center font-bold text-sm text-error'>{err}</p>
                    }
                    {
                        load ? 
                        <div className='mx-auto max-w-[100px] mt-2'>
                            <Lottie animationData={loadingImage} />
                        </div>
                        : <input type='submit' className='btn border-0 btn-info text-center text-white rounded-full w-full py-2 mt-10 bg-[#097ef6]' value='Register' />
                    }
                    <Link href='/user/login' className='btn border-0 btn-link text-info text-center w-full mt-0'>Already a Member?</Link>
                </form>
            </div>
        </div>
    );
};

export default register;