import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import PageTitle from "./PageTitle";

const AdminAllUser = () => {
  let [allData, setAllData] = useState(null);
  let [allUsers, setAllUsers] = useState(null);
  let [page, setPage] = useState(0);
  let [pageBtn, setPageBtn] = useState([]);

  useEffect(() => {
    (async function () {
      let res = await fetch("/api/all-users");
      let data = await res.json();
      let users = data.data;
      setAllData(users);
      let dataPortion = users?.slice(0 * 5, 0 * 5 + 5);
      setAllUsers(dataPortion);
      let pageSize = Math.ceil(users.length / 5);
      let myPageBtn = [];
      for (let i = 0; i < pageSize; i++) myPageBtn.push(i);
      setPageBtn(myPageBtn);
    })();
  }, []);
  useEffect(() => {
    if (allData) {
      let data = allData?.slice(page * 5, page * 5 + 5);
      setAllUsers(data);
    }
  }, [page]);

  let handleStatus = async (verified, id) => {
    let res = await fetch(`/api/user-info?id=${id}&status=${verified}`, {
      method: "PUT",
    });
    let data = await res.json();
    // console.log(data);
    toast.success(
      "Reporter's status has been updated to " +
        (verified ? "verified" : "not verified")
    );
  };

  return (
    <div className="p-5 pb-10 flex-1">
      <PageTitle>All Users</PageTitle>
      <h1 className="text-center text-3xl border-b-2 border-info text-info mb-3 pb-3 w-full font-bold">
        All Users
      </h1>

      {pageBtn.length > 1 && (
        <div className="flex justify-center my-5 scale-75">
          <div className={`flex`}>
            <div
              onClick={() => setPage((prev) => prev - 1)}
              className={`btn  rounded-none mx-5 rounded-l-full ${
                page > 0 ? "btn-accent btn-outline" : "btn-disabled"
              } `}
            >
              <FaLessThan />
            </div>
            <div
              className={`overflow-x-auto flex`}
              style={{ width: `${Math.min(120, pageBtn.length * 40)}px` }}
            >
              {pageBtn?.map((i) => (
                <div
                  onClick={() => setPage(i)}
                  key={i}
                  className={`btn w-10 btn-accent ${
                    page === i ? "" : "btn-outline"
                  } rounded-none`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div
              onClick={() => setPage((prev) => prev + 1)}
              className={`btn  rounded-none mx-5 rounded-r-full ${
                page < pageBtn.length - 1
                  ? "btn-accent btn-outline"
                  : "btn-disabled"
              }`}
            >
              <FaGreaterThan />
            </div>
          </div>
        </div>
      )}
      {allUsers ? (
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
            <tbody className="pl-10">
              {allUsers.map((item, i) => (
                <tr key={item?._id}>
                  <th>{page * 5 + i + 1}</th>
                  <td>
                    <img className="w-20" src={item?.displayURL} alt="" />
                  </td>

                  <td>{item?.fullName}</td>
                  <td>{item?.userName}</td>
                  <td>{item?.email}</td>
                  <td>{item?.birthDate}</td>
                  <td>{item?.role}</td>
                  <td>
                    {item?.role !== "admin" && (
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        defaultChecked={item?.verified}
                        onChange={({ target }) =>
                          handleStatus(target?.checked, item._id)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
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
        </div>
      ) : (
        <p>No users yet.</p>
      )}
    </div>
  );
};

export default AdminAllUser;
