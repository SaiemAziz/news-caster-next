import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Auth';
import Link from 'next/link';
import { toast } from 'react-toastify';

const MyPosts = () => {
    let { user } = useContext(AuthContext)
    let [allNews, setAllNews] = useState(null)
    useEffect(() => {
        (
            async () => {
                let res = await fetch(`/api/all-news?email=${user.email}`)
                let data = await res.json()
                setAllNews(data?.data)
            }
        )()
    }, [])
    let handleStatus = async (status, id) => {
        let res = await fetch(`/api/single-news?status=${status}&id=${id}`, {
            method: "PUT"
        })
        let data = await res.json()
        toast.success("Status updated to " + status)
    }

    return (
        <div className='p-5 pb-10 flex-1'>
            <h1 className='text-center text-3xl border-b-2 border-info text-info mb-3 pb-3 w-full font-bold'>My All News</h1>
            {
                allNews ?
                    <div className=" flex pb-20">
                        <table className="table table-compact flex-1 px-5 table-zebra">
                            <thead>
                                <tr>
                                    <th>SN.</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Time</th>
                                    <th>Title</th>
                                    <th>Details</th>
                                    <th>Active</th>
                                </tr>
                            </thead>
                            <tbody className='pl-10'>
                                {
                                    allNews.map((item, i) => (
                                        <tr key={item?._id}>
                                            <th>{i + 1}</th>
                                            <td>{item?.category}</td>
                                            <td>
                                                <Link href={`/details/${item._id}`}>
                                                    <img className='w-60' src={item?.image} alt="" />
                                                </Link>
                                            </td>
                                            <td>{item?.time.split(' ')[0]}<br />{item?.time.split(' ')[1]}</td>

                                            <td className='max-w-sm whitespace-pre-wrap'>{item?.title.slice(0, 200)}</td>
                                            <td className='max-w-sm whitespace-pre-wrap'>
                                                <div className="" dangerouslySetInnerHTML={{ __html: item?.details.slice(0, 200) + "..." }} /></td>
                                            <td><input type="checkbox" className="toggle toggle-success" defaultChecked={item?.status === "active" ? true : false} onChange={({ target }) => handleStatus(target?.checked ? "active" : "pending", item._id)} /></td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                            <tfoot>

                                {/* <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>company</th>
                                    <th>location</th>
                                    <th>Last Login</th>
                                    <th>Favorite Color</th>
                                </tr> */}
                            </tfoot>
                        </table>
                    </div> :
                    <p>You still have no news posted.</p>
            }
        </div>
    );
};

export default MyPosts;