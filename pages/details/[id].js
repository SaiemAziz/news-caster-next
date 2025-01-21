import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import {  useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { CgCalendarDates } from "react-icons/cg";
import Reaction from "../../components/Reaction";
import { MdVerified } from "react-icons/md";
import Comments from "../../components/Comments";
import PageTitle from "../../components/PageTitle";

const Details = () => {
  let [detailsLoad, setDetailsLoad] = useState(true);
  const [time, setTime] = useState(null);
  const [changeReact, setChangeReact] = useState(false);
  let [news, setNews] = useState(null);
  let [real, setReal] = useState(null);
  let [fake, setFake] = useState(null);
  let [vio, setVio] = useState({
    violence: null,
    non_violence: null,
  });
  let [author, setAuthor] = useState(null);
  let router = useRouter();
  let { id } = router.query;
  console.log(vio);

  useEffect(() => {
    if (id) {
      fetch(`/api/single-news?id=${id}`)
        .then((result) => result.json())
        .then((data) => {
          setNews(data?.data);
          setDetailsLoad(false);
          setTime(new Date(data?.data?.time));
          setReal(data?.data?.prediction?.real);
          setFake(100 - data?.data?.prediction?.real);
        });
    }
  }, [id]);

  useEffect(() => {
    if (news) {
      fetch(
        `https://toon-tab-server.vercel.app/violence-classifications?url=${news?.image}`
      )
        .then((res) => res.json())
        .then((d) => {
          let temp = {};
          d.forEach(
            (item) =>
              (temp[item?.class] = parseFloat(
                parseFloat(item?.score * 100).toFixed(2)
              ))
          );
          setVio(temp);
        });
    }
  }, [news]);
  
  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/user-info?email=${news?.authorInfo}`);
      let data = await res.json();
      setAuthor(data.data);
    })();
  }, [news]);
  return (
    <div className="max-w-4xl mx-auto p-5">

      {detailsLoad ? (
        <Loading />
      ) : (
        <div className="w-full">
          <PageTitle>{news?.title}</PageTitle>
          <h1 className="sm:text-5xl text-3xl text-blue-900 font-bold text-center mb-10 mt-5">
            {news?.title}
          </h1>
          <img className="w-full aspect-video object-contain object-center bg-black" src={news?.image} alt="" />
          <div className="flex justify-between mt-5 mb-2">
            <h1 className="text-green-500 text-xl font-bold">
              Real ({parseFloat(real).toFixed(2)} %)
            </h1>
            <h1 className="text-red-500 text-xl font-bold">
              ({parseFloat(fake).toFixed(2)} %) Fake
            </h1>
          </div>
          <div className=" overflow-hidden  bg-green-500 mb-3">
            <div
              className={`py-3 bg-red-500 ml-auto`}
              style={{ width: `${parseInt(fake)}%` }}
            ></div>
          </div>
          {vio?.violence !== null ? (
            <>
              <div className=" overflow-hidden  bg-blue-700">
                <div
                  className={`py-3 bg-orange-500 ml-auto`}
                  style={{ width: `${parseInt(Number(vio?.violence))}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 mb-5">
                <h1 className="text-blue-700 text-xl font-bold">
                  Non Violence ({parseFloat(vio?.non_violence).toFixed(2)} %)
                </h1>
                <h1 className="text-orange-500 text-xl font-bold">
                  ({parseFloat(vio?.violence).toFixed(2)} %) Violence
                </h1>
              </div>
            </>
          ) : (
            <div>
              <progress className="progress w-full progress-primary"></progress>
            </div>
          )}
          <div
            className="text-lg font-semibold text-gray-700 italic"
            dangerouslySetInnerHTML={{ __html: news?.details }}
          />
          <div className="m-10 ml-auto w-fit scale-150">
            <Reaction n={news} setChangeReact={setChangeReact} />
          </div>
          {/* author  */}
          <div className="flex gap-5 mt-5 items-center justify-between">
            <div className="flex gap-5 items-center">
              <div className="h-16 w-16 border-2 border-blue-800 rounded-full flex justify-center items-center bg-black overflow-hidden">
                <img className="" src={author?.displayURL} alt="" />
              </div>
              {/* <h1 className="font-bold text-xl text-orange-500">{author?.fullName}</h1> */}
              <p className="font-bold text-xl text-orange-500 flex gap-2 items-center">
                {author?.fullName}{" "}
                {author?.verified && <MdVerified color="blue" />}
              </p>
            </div>
            {time && (
              <div>
                <h1 className="flex gap-2 mb-2 items-center">
                  <AiFillClockCircle size={20} /> {time.toLocaleTimeString()}
                </h1>
                <h1 className="flex gap-2 items-center">
                  <CgCalendarDates size={20} /> {time.toLocaleDateString()}
                </h1>
              </div>
            )}
          </div>
        </div>
      )}

      <Comments news={news} />
    </div>
  );
};

export default Details;
