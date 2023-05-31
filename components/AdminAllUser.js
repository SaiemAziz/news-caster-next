import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminAllUser = () => {
    let [allUsers, setAllUsers] = useState(null)

    useEffect(() => {
        (async function () {
            let res = await fetch('/api/all-users')
            let data = await res.json()
            let users = data.data;
            setAllUsers(users)
        })()
    }, [])

    let handleStatus = async (verified, id) => {
        let res = await fetch(`/api/user-info?id=${id}&status=${verified}`, {
            method: 'PUT'
        })
        let data = await res.json()
        // console.log(data);
        toast.success("Reporter's status has been updated to " + (verified ? "verified" : "not verified"))
    }
    return (
        <div className='p-5 pb-10 flex-1'>
            <h1 className='text-center text-3xl border-b-2 border-info text-info mb-3 pb-3 w-full font-bold'>All Users</h1>
            {
                allUsers ?
                    <div className="flex pb-20">
                        <table className="table table-compact flex-1 px-5">
                            <thead>
                                <tr>
                                    <th>SN.</th>
                                    <th>Image</th>
                                    <th>Full Name</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Birth Date</th>
                                    <th>Role</th>
                                    <th>Verify</th>
                                </tr>
                            </thead>
                            <tbody className='pl-10'>
                                {
                                    allUsers.map((item, i) => (
                                        <tr key={item?._id}>
                                            <th>{i + 1}</th>
                                            <td>
                                                <img className='w-60' src={item?.displayURL} alt="" />
                                            </td>

                                            <td>{item?.fullName}</td>
                                            <td>{item?.userName}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.birthDate}</td>
                                            <td>{item?.role}</td>
                                            <td>
                                                {
                                                    item?.role !== 'admin' &&
                                                    <input type="checkbox" className="toggle toggle-success" defaultChecked={item?.verified} onChange={({ target }) => handleStatus(target?.checked, item._id)} />
                                                }
                                            </td>
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
                    <p>No users yet.</p>
            }
        </div>
    );
};

export default AdminAllUser;