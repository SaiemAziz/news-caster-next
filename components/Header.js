"use client"
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import logo from '../assets/images/logo.png'
import { GoPrimitiveDot } from 'react-icons/go'
import { RxPerson } from 'react-icons/rx'
import { AuthContext } from "./Auth";
import { FiLogOut } from 'react-icons/fi'
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";
import { categoriesList } from "./CategoryButtons";

const Header = () => {
    let router = useRouter()
    let { setCat, user, setUser, logOutUser, loadUser } = useContext(AuthContext)
    let [drop1, setDrop1] = useState(false)
    let [drop2, setDrop2] = useState(false)
    let [drop3, setDrop3] = useState(false)

    useEffect(() => {
        setDrop2(false)
        setDrop3(false)
    }, [router])

    useEffect(()=> {
        if(!drop3)
            setDrop2(false)
    }, [drop3])


    let handlerLogout = async () => {
        localStorage.removeItem('remember')
        logOutUser()
            .then(() => {
                setUser(null)
                Router.push('/user/login')
                toast?.success('User logged out successfully')
            })
            .catch(() => {
                setUser(null)
                Router.push('/user/login')
                toast?.success('User logged out successfully')
            })
    }


    let handleCategory = (text) => {
        setCat(text);
        Router.push('/categories')
    }
    // console.log(user);
    return (<>
        <div className="sticky z-50 top-0 bg-base-100 shadow-lg">
            <div className="flex max-w-6xl mx-auto p-3 items-center" >
                <div className="lg:hidden" >
                    <label className="cursor-pointer swap swap-rotate mr-3" >
                        <input type="checkbox" checked={drop3} onChange={(e) => {
                            setDrop3(e.target.checked)
                        }} />
                        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                    </label>
                    <div className={`absolute   ${drop3 ? 'translate-y-4 -translate-x-4' : 'scale-0 -translate-y-4 -translate-x-16'} duration-300 ease-in-out flex flex-col shadow-xl bg-base-100`}>
                        <Link className="px-5 py-2 flex gap-1 items-center" href={'/'}>Home</Link>
                        <div className="my-auto cursor-pointer mx-auto" onClick={() => setDrop2(!drop2)}>Categories
                            {
                                drop3 && <div className={`absolute duration-200 ease-out flex flex-col -z-30 bg-white ${!drop2 ? '-translate-y-40 translate-x-10 scale-0 ' : 'translate-x-20 -translate-y-7'}`}>
                                <button className="px-5 py-2">
                                    <Link  href={'/categories'}>All News</Link>
                                </button>
                                    {
                                        categoriesList.map(item => (
                                            <button className="px-5 py-2" onClick={() => handleCategory(item)}
                                                key={item}
                                            >{item}</button>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        <Link className="px-5 py-2" href={'/about'}>About Us</Link>
                        {
                            user &&
                            <Link className="px-5 py-2" href={'/dashboard'}>Dashboard</Link>
                        }
                    </div>
                </div>
                <Link href='/' className="my-auto">
                    <Image src={logo} width='50' alt="" />
                </Link>
                <div className="flex justify-between flex-1 mx-5">
                    <div className="lg:flex hidden gap-10 relative">
                        <Link className="my-auto flex gap-1 items-center" href={'/'}>Home</Link>
                        <div className="my-auto cursor-pointer" onClick={() => setDrop2(!drop2)}>Categories
                            <div className={`absolute duration-200 ease-out flex flex-col gap-2 -z-30 bg-white ${!drop2 ? '-translate-y-36 -translate-x-10 scale-0 ' : 'translate-y-4'}`}>
                                {
                                    categoriesList.map(item => (
                                        <button className="px-7 py-2" onClick={() => handleCategory(item)} key={item} >{item}</button>
                                    ))
                                }
                            </div>
                        </div>
                        <Link className="my-auto" href={'/about'}>About Us</Link>
                        {
                            user &&
                            <Link className="my-auto" href={'/dashboard'}>Dashboard</Link>
                        }
                    </div>
                </div>
               
                <div className="ml-auto">
                    {user ? <div className="flex gap-3 items-center">
                        <div className="tooltip tooltip-bottom tooltip-accent" data-tip={user?.fullName.split(' ').slice(0,3).join(' ')}>
                            <Link href='/profile'>
                                <div className={`h-10 w-10 rounded-full border-2 border-primary overflow-hidden flex justify-center items-center bg-black`}>

                                    <img className='' src={user?.displayURL} alt="" />
                                </div>
                            </Link>
                        </div>
                        <FiLogOut size={30} className="text-error cursor-pointer" onClick={handlerLogout} />
                    </div>
                        :
                        <Link href='/user/login'>
                            <button className="btn btn-ghost hover:bg-transparent text-xl"><RxPerson /></button>
                        </Link>
                    }
                </div>
                
            </div>
        </div>
    </>
    );
};

export default Header;