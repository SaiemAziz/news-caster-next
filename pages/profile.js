import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/Auth';
import { useRouter } from 'next/router';
import Loading from '../components/LoadingCircle';

const Profile = () => {
    let router = useRouter()
    let { user, loadUser, setUser } = useContext(AuthContext)
    // let [address, setAddress] = useState({
    //     country: user?.address?.country || "",
    //     district: user?.address?.district || "",
    //     area: user?.address?.area || ""
    // })
    let [myInfo, setMyInfo] = useState({})
    let [err, setErr] = useState("")
    let [loadForm, setLoadForm] = useState(true)
    useEffect(() => {
        if (!loadUser && !user) router.push('/user/login')
        else {
            setMyInfo({
                ...user
                // , address: {
                //     country: user?.address?.country || "",
                //     district: user?.address?.district || "",
                //     area: user?.address?.area || ""
                // }
            })
        }
        setLoadForm(false);
    }, [loadUser])
    let handleForm = async e => {
        e.preventDefault()
        setLoadForm(true);
        // let myInfo = {
        //     ...myInfo,
        //     address: address
        // }
        if (myInfo.phone && !/^(\+88)?[0-0]{1}[1-1]{1}[0-9]{3}[-]?[0-9]{6}$/.test(myInfo.phone)) {
            setErr("Invalid phone number")
            return setLoadForm(false)
        }
        setErr("")
        let res = await fetch('/api/all-users', {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(myInfo)
        })
        let data = await res.json()
        setUser(data?.data)
        setMyInfo(data?.data)
        setLoadForm(false);
    }
    if (loadUser) return <Loading />
    return (
        <div className='md:flex-row flex-col flex gap-5 p-5 items-center md:items-start'>
            <div className='max-w-xs'>
                <img className='rounded-lg' src={myInfo?.displayURL} alt="" />
                <p className='text-3xl italic mt-3 font-semibold text-center text-blue-700'>{myInfo.fullName}</p>
                <p className='text-xl mb-3 font-bold text-center text-orange-800'>{myInfo?.email}</p>
            </div>
            <div className='flex-1 rounded-lg bg-blue-950 p-5'>
                {
                    loadForm ? <Loading /> :
                        <form className='grid grid-cols-2 gap-5 text-white' onSubmit={handleForm}>
                            <h1 className='text-right text-xl text-blue-200 border-blue-200 border-b-2 pb-3 mb-3 col-span-2'>Details</h1>
                            <h1>Full Name</h1>
                            <input className='input input-info text-blue-900' type="text" value={myInfo.fullName} onChange={({ target }) => setMyInfo(prev => {
                                return { ...prev, fullName: target.value }
                            })} />
                            <h1>Phone</h1>
                            <input className='input input-info text-blue-900' type="text" value={myInfo.phone} onChange={({ target }) => setMyInfo(prev => {
                                return { ...prev, phone: target.value }
                            })} />
                            {
                                err && <p className='text-center font-bold text-sm text-error col-span-2'>{err}</p>
                            }
                            <h1>Birth date</h1>
                            <p>{myInfo?.birthDate}</p>
                            <h1 className='text-right text-xl text-blue-200 border-blue-200 border-b-2 pb-3 mb-3 col-span-2'>Address</h1>

                            <h1>Country</h1>
                            <input className='input input-info text-blue-900' type="text" value={myInfo?.address?.country} onChange={(e) => setMyInfo(prev => {
                                return { ...prev, address: { ...(prev.address), country: e.target.value } }
                            })} />
                            {
                                myInfo?.address?.country && <>
                                    <h1>District</h1>
                                    <input className='input input-info text-blue-900' type="text" value={myInfo?.address?.district} onChange={(e) => setMyInfo(prev => {
                                        return { ...prev, address: { ...(prev.address), district: e.target.value } }
                                    })} />
                                </>
                            }
                            {
                                myInfo?.address?.district && myInfo?.address?.country && <>
                                    <h1>Area</h1>
                                    <input className='input input-info text-blue-900' type="text" value={myInfo?.address?.area} onChange={(e) => setMyInfo(prev => {
                                        return { ...prev, address: { ...(prev.address), area: e.target.value } }

                                    }
                                    )} />
                                </>
                            }

                            <input className='btn btn-info col-span-2' type="submit" value="SUBMIT" />
                        </form>
                }
            </div>
        </div>
    );
};

export default Profile;