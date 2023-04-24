import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/Auth';
import Loading from '../components/LoadingCircle';
import AddPost from '../components/AddPost';
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import MyPosts from '../components/MyPosts';
import AdminAllPosts from '../components/AdminAllPosts';
import AdminAllUser from '../components/AdminAllUser';
const Dashboard = () => {
    let [tab, setTab] = useState("")
    let [barOpen, setBarOpen] = useState(false)
    let router = useRouter()
    let { user, loadUser } = useContext(AuthContext)
    useEffect(() => {
        if (!user && !loadUser)
            router.push('/user/login')
    }, [loadUser])

    if (loadUser) return <div className='max-h-screen flex justify-center items-center p-20 opacity-50'><Loading /></div>
    else if (user?.role == 'reporter')
        return (<>
            <div className="drawer drawer-mobile">
                <input id="reporter-dashboard-drawer" type="checkbox" className="drawer-toggle" onChange={(e) => setBarOpen(e.target.checked)} />
                <label htmlFor="reporter-dashboard-drawer" className={`top-1/2 -left-5 fixed z-20 font-bold text-xl p-1 rounded-r-full  lg:hidden ${barOpen ? 'translate-x-80 rotate-180' : ''} duration-200 ease-out text-blue-500`}><BsFillArrowRightCircleFill size={40} /></label>
                <div className="drawer-content flex justify-center m-5 overflow-y-auto  pb-40">

                    {/* <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
                    {
                        !tab && <p>Please select an option from side bar.</p>
                    }
                    {
                        tab == "addPost" && <div className='p-5'>
                            <AddPost />
                        </div>
                    }
                    {
                        tab == "myAllNews" && <div className='p-5'>
                            <MyPosts />
                        </div>
                    }
                </div>
                <div className="drawer-side">
                    <label htmlFor="reporter-dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-blue-200 text-base-content ">
                        <li className='text-center my-1 btn btn-info' onClick={() => setTab("addPost")}>Add Post</li>
                        <li className='text-center my-1 btn btn-info' onClick={() => setTab("myAllNews")}>My All News</li>
                    </ul>
                </div>
            </div>
        </>
        );
    else if (user?.role == 'admin')
        return (
            <div className="drawer drawer-mobile">
                <input id="admin-dashboard-drawer" type="checkbox" className="drawer-toggle" onChange={(e) => setBarOpen(e.target.checked)} />
                <label htmlFor="admin-dashboard-drawer" className={`top-1/2 -left-5 fixed z-20 font-bold text-xl p-1 rounded-r-full  lg:hidden ${barOpen ? 'translate-x-80 rotate-180' : ''} duration-200 ease-out text-blue-500`}><BsFillArrowRightCircleFill size={40} /></label>
                <div className="drawer-content flex justify-center m-5 overflow-y-auto  pb-40">

                    {/* <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
                    {
                        !tab && <p>Please select an option from side bar.</p>
                    }
                    {
                        tab == "allUsers" && <div className='p-5'>
                            <AdminAllUser />
                        </div>
                    }
                    {
                        tab == "adminAllNews" && <div className='p-5'>
                            <AdminAllPosts />
                        </div>
                    }
                </div>
                <div className="drawer-side">
                    <label htmlFor="admin-dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-blue-200 text-base-content ">
                        <li className='text-center my-1 btn btn-info' onClick={() => setTab("allUsers")}>All Users</li>
                        <li className='text-center my-1 btn btn-info' onClick={() => setTab("adminAllNews")}>All News</li>
                    </ul>
                </div>
            </div>
        );
};

export default Dashboard;