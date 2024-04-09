import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import Link from "next/link";
import { toast } from "react-toastify";
import { AiFillClockCircle } from "react-icons/ai";
import { CgCalendarDates } from "react-icons/cg";
import PageTitle from "./PageTitle";

const AdminAllPosts = () => {
  let { user } = useContext(AuthContext);
  let [allNews, setAllNews] = useState(null);
  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/all-news`);
      let data = await res.json();
      setAllNews(data?.data);
    })();
  }, []);
  let handleStatus = async (status, id) => {
    let res = await fetch(`/api/single-news?status=${status}&id=${id}`, {
      method: "PUT",
    });
    let data = await res.json();
    toast.success("Status updated to " + status);
  };

  return (
    <div className="p-5 pb-10 flex-1">
      <PageTitle>All News</PageTitle>
      <h1 className="text-center text-3xl border-b-2 border-info text-info mb-3 pb-3 w-full font-bold">
        All News
      </h1>
      {allNews ? (
        <div className=" flex pb-20">
          <table className="table table-compact flex-1 px-5 table-zebra">
            <thead>
              <tr>
                <th>SN.</th>
                <th>Category</th>
                <th>Image</th>
                <th>Time</th>
                <th>Author Email</th>
                <th>Title</th>
                <th>Details</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody className="pl-10">
              {allNews.map((item, i) => {
                let time = new Date(item.time);
                return (
                  <tr key={item?._id}>
                    <th>{i + 1}</th>
                    <td>{item?.category}</td>
                    <td className="">
                      <Link className="w-full" href={`/details/${item._id}`}>
                        <img className="w-60" src={item?.image} alt="" />
                      </Link>
                    </td>

                    <td>
                      <div>
                        <h1 className="flex gap-2 mb-2 items-center">
                          <AiFillClockCircle size={20} />{" "}
                          {time.toLocaleTimeString()}
                        </h1>
                        <h1 className="flex gap-2 items-center">
                          <CgCalendarDates size={20} />{" "}
                          {time.toLocaleDateString()}
                        </h1>
                      </div>
                    </td>
                    <td>{item?.authorInfo}</td>
                    <td className="max-w-sm whitespace-pre-wrap">
                      {item?.title.slice(0, 200)}
                    </td>
                    <td className="whitespace-pre-wrap">
                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: item?.details.slice(0, 200) + "...",
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        defaultChecked={
                          item?.status === "active" ? true : false
                        }
                        onChange={({ target }) =>
                          handleStatus(
                            target?.checked ? "active" : "pending",
                            item._id
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              })}
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
        <p>No news posted yet.</p>
      )}
    </div>
  );
};

export default AdminAllPosts;
