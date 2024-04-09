import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/Auth";
import { useRouter } from "next/router";
import Loading from "../components/LoadingCircle";
import Countryapi from "../components/MultipleDropdown";
import PageTitle from "../components/PageTitle";

const Profile = () => {
  let router = useRouter();
  let { user, loadUser, setUser } = useContext(AuthContext);
  let [address, setAddress] = useState({
    country: user?.address?.country || "",
    district: user?.address?.district || "",
    division: user?.address?.division || "",
  });
  let [myInfo, setMyInfo] = useState({});
  let [err, setErr] = useState("");
  let [loadForm, setLoadForm] = useState(true);
  useEffect(() => {
    if (!loadUser && !user) router.push("/user/login");
    else {
      setMyInfo(user);
    }
    setLoadForm(false);
  }, [loadUser]);
  let handleForm = async (e) => {
    e.preventDefault();
    setLoadForm(true);
    // let myInfo = {
    //     ...myInfo,
    //     address: address
    // }
    if (
      myInfo.phone &&
      !/^(\+88)?[0-0]{1}[1-1]{1}[0-9]{3}[-]?[0-9]{6}$/.test(myInfo.phone)
    ) {
      setErr("Invalid phone number");
      return setLoadForm(false);
    }
    setErr("");
    let res = await fetch("/api/all-users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...myInfo,
        address: address?.country ? address : myInfo?.address,
      }),
    });
    let data = await res.json();
    setUser(data?.data);
    setMyInfo(data?.data);
    setLoadForm(false);
  };
  if (loadUser) return <Loading />;
  return (
    <div className="md:flex-row flex-col flex gap-10 p-5 items-center md:items-start">
      <PageTitle>Profile</PageTitle>
      <div className="max-w-xs">
        <img className="rounded-lg" src={myInfo?.displayURL} alt="" />
        <p className="text-3xl italic mt-3 font-semibold text-center text-blue-700">
          {myInfo?.fullName}
        </p>
        <p className="text-xl mb-3 font-bold text-center text-orange-800">
          {myInfo?.email}
        </p>
        <div className="border border-blue-900 rounded-xl p-5">
          <p className="mb-1 text-center text-blue-800">
            Phone: {myInfo?.phone || "-----------"}
          </p>
          <p className="mb-1 text-center text-blue-800">
            Country: {myInfo?.address?.country || "-----------"}
          </p>
          <p className="mb-1 text-center text-blue-800">
            Division: {myInfo?.address?.division || "-----------"}
          </p>
          <p className=" text-center text-blue-800">
            District: {myInfo?.address?.district || "-----------"}
          </p>
        </div>
      </div>
      <div className="flex-1 rounded-lg bg-blue-950 p-5">
        {loadForm ? (
          <Loading />
        ) : (
          <form className="gap-10 text-white w-full" onSubmit={handleForm}>
            <h1 className="text-right text-xl text-blue-200 border-blue-200 border-b-2 pb-3 mb-5 w-full">
              Details
            </h1>
            <div className="flex gap-10 items-center mb-5 w-full">
              <h1>Full Name:</h1>
              <input
                className="input input-info text-blue-900 flex-1"
                type="text"
                value={myInfo?.fullName}
                onChange={({ target }) =>
                  setMyInfo((prev) => {
                    return { ...prev, fullName: target.value };
                  })
                }
              />
            </div>
            <div className="flex gap-10 items-center mb-5 w-full">
              <h1>Phone:</h1>
              <input
                className="input input-info text-blue-900 flex-1"
                type="text"
                value={myInfo?.phone}
                onChange={({ target }) =>
                  setMyInfo((prev) => {
                    return { ...prev, phone: target.value };
                  })
                }
              />
            </div>
            {err && (
              <p className="text-center font-bold text-sm text-error w-full">
                {err}
              </p>
            )}
            <div className="w-full flex gap-10 items-center mb-5">
              <h1>Birth date:</h1>
              <p className="flex-1">{myInfo?.birthDate || "--/--/--"}</p>
            </div>
            <h1 className="text-right text-xl text-blue-200 border-blue-200 border-b-2 pb-3 mb-3 col-span-2">
              Address
            </h1>
            <div className="my-5">
              <Countryapi setAddress={setAddress} />
            </div>

            <input
              className="btn btn-info col-span-2 w-full"
              type="submit"
              value="SUBMIT"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
