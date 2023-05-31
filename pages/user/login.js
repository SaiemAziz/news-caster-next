import Lottie from 'lottie-react';
import Link from 'next/link';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import * as loginImage from '../../assets/images/GLOBE-ANIME.json'
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../components/Auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import * as loadingImage from '../../assets/images/liquid-4-dot-loader.json'

const login = () => {
    let router = useRouter()
    let userInfo = useContext(AuthContext)
    let [load, setLoad] = useState(false)
    let { user, setUser, setLoadUser, loginUserGoogle, loginUser, logOutUser, sendVerification } = userInfo
    let [show, setShow] = useState(false)
    let [err, setErr] = useState('')

    useEffect(() => {
        if (user?.email) {
            toast.error('You already have logged in')
            router.push('/profile')
        }
    }, [user])

    let handlerForm = e => {
        e.preventDefault();
        setLoad(true)
        let password = e.target.password.value
        let email = e.target.email.value
        loginUser(email, password)
            .then(async res => {
                if (res.user.emailVerified) {
                    let res2 = await fetch(`/api/user-info?email=${res.user.email}`)
                    let myUser = await res2.json()
                    setUser(myUser.data)
                    setLoadUser(false)
                    toast?.success('Login successful')
                    e.target.reset()
                    router.push('/dashboard')
                } else {
                    toast.error("Email not verified yet.")
                    setLoadUser(false)
                    // sendVerification()
                    logOutUser()
                        .then(() => { setUser(null) }).catch(err => { setUser(null) })
                }
                setLoad(false)
            })
            .catch(err => {
                setLoad(false)
                setLoadUser(false)
                toast?.error(err.code.replace('auth/', '').replaceAll('-', ' ').toUpperCase())
            })
    }
    // let handlerGoogle = () => {
    //     loginUserGoogle()
    //         .then(res => {
    //             let currentUser = res.user
    //             router.push('/categories')
    //             setUser(currentUser)
    //             setLoadUser(false)
    //         }).catch(err => {
    //             console.log(err.code.replace('auth/', '').replaceAll('-', ' ').toUpperCase());
    //         })
    // }

    return (
        <div className='md:max-w-7xl w-full mx-auto grid gap-10 md:grid-cols-2 '>
            <div className='flex flex-col items-center justify-center gap-5 p-10'>
                <Lottie animationData={loginImage} />
                <h1 className='lg:text-5xl text-3xl text-center italic -mt-10 text-blue-500'>Welcome to NewsCaster</h1>
            </div>
            <div className='bg-white p-10 flex flex-col justify-center items-center gap-5'>
                <h1 className='text-2xl font-bold text-[#097ef6] mb-10'>Login Account</h1>

                <form onSubmit={handlerForm} className='flex flex-col gap-3 w-full max-w-xs'>
                    <div className="relative w-full max-w-xs font-semibold">
                        <input type="text" id="floating_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='email' />
                        <label htmlFor="floating_email" className="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                    </div>
                    <div className="relative w-full max-w-xs font-semibold">
                        <input type={show ? 'text' : 'password'} id="floating_password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-l-4 border-[#097ef6] outline-0 focus:ring-0 focus:border-[#097ef6] peer" placeholder=" " name='password' />
                        <label htmlFor="floating_password" className="absolute  text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
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
                            : <input type='submit' className='btn border-0 btn-info text-center text-white rounded-full w-full py-2 mt-10 bg-[#097ef6]' value='Login' />
                    }
                    <Link href='/user/register' className='btn border-0 btn-link text-info text-center w-full mt-0'>New Member?</Link>
                </form>
                {/* <button className='btn text-center btn-outline items-center rounded-full mx-auto py-2 flex gap-5' onClick={handlerGoogle}><FcGoogle size={30} /> Google</button> */}
            </div>
        </div>
    );
};

export default login;

