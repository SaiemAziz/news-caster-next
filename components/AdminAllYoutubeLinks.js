import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { AiFillClockCircle } from "react-icons/ai";
import { CgCalendarDates } from "react-icons/cg";
import PageTitle from "./PageTitle";
const AdminAllYoutubeLinks = () => {
  let [allLinks, setAllLinks] = useState(null);
  let [newLink, setNewLink] = useState({});
  let [counter, setCounter] = useState(0);
  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/all-youtube-links`);
      let data = await res.json();
      setAllLinks(data?.data);
    })();
  }, [counter]);
  let handleUpdate = async (linkData, id) => {
    let res = await fetch(`/api/all-youtube-links?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(linkData),
    });
    let data = await res.json();
    toast.success("Link updated: " + linkData.title);
    setCounter(counter + 1);
  };
  let handleDelete = async (id) => {
    let res = await fetch(`/api/all-youtube-links?id=${id}`, {
      method: "DELETE",
    });
    let data = await res.json();
    toast.success("Link deleted.");
    setCounter(counter + 1);
  };
  let handleAdd = async (e) => {
    e.preventDefault();
    let res = await fetch(`/api/all-youtube-links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLink),
    });
    let data = await res.json();
    toast.success("Link added: " + newLink.title);
    setCounter(counter + 1);
  }

  return (
    <div className="p-5 pb-10 flex-1">
      <PageTitle>All Youtube Links</PageTitle>
      <h1 className="text-center text-3xl border-b-2 border-info text-info mb-3 pb-3 w-full font-bold">
        All Youtube Links
      </h1>
      {allLinks ? (
        <div className=" flex pb-20 space-x-5 space-y-5">
          {allLinks.map((item, i) => (
            <div className="space-y-5 my-5" key={item._id}>
              <input
                className="input input-group"
          required
                defaultValue={item?.title}
                onChange={(e) =>
                  (allLinks[i] = { ...allLinks[i], title: e.target.value })
                }
              />
              <input
                className="input input-group"
          required
                defaultValue={item?.img}
                onChange={(e) =>
                  (allLinks[i] = { ...allLinks[i], img: e.target.value })
                }
              />
              <input
                className="input input-group"
          required
                defaultValue={item?.src}
                onChange={(e) =>
                  (allLinks[i] = { ...allLinks[i], src: e.target.value })
                }
              />
              <input
                className="input input-group"
          required
                defaultValue={item?.channelLink}
                onChange={(e) =>
                  (allLinks[i] = {
                    ...allLinks[i],
                    channelLink: e.target.value,
                  })
                }
              />
              <input
                className="input input-group"
          required
                defaultValue={item?.channel}
                onChange={(e) =>
                  (allLinks[i] = { ...allLinks[i], channel: e.target.value })
                }
              />
              <button
                className="btn btn-error"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary ml-5"
                onClick={() => handleUpdate(allLinks[i],item._id)}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No links yet.</p>
      )}
      <p className="mt-10 text-2xl">Add New Link</p>
      <form className="space-y-5 my-5" onSubmit={handleAdd}>
        <input
            placeholder="Title"
          className="input input-group"
          required
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
        />
        <input
            placeholder="Channel Image Link"
          className="input input-group"
          required
          onChange={(e) => setNewLink({ ...newLink, img: e.target.value })}
        />
        <input
            placeholder="Video Link"
          className="input input-group"
          required
          onChange={(e) => setNewLink({ ...newLink, src: e.target.value })}
        />
        <input
            placeholder="Channel Link"
          className="input input-group"
          required
          onChange={(e) => setNewLink({ ...newLink, channelLink: e.target.value })}
        />
        <input
            placeholder="Channel Name"
          className="input input-group"
          required
          onChange={(e) => setNewLink({ ...newLink, channel: e.target.value })}
        />
        <input type="submit" className="btn btn-success w-full" value="ADD"/>
      </form>
    </div>
  );
};

export default AdminAllYoutubeLinks;
