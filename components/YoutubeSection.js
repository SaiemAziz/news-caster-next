import Link from "next/dist/client/link";
import React from "react";
import dummyArray from "./functions/dummyArray";
import { useQuery } from "@tanstack/react-query";

const YoutubeSection = () => {
  const dummyArr = dummyArray(4);
  let ytQuery = useQuery({
    queryKey: [`/api/all-youtube-links`],
    queryFn: async () => {
      let res = await fetch(`/api/all-youtube-links`);
      let data = await res.json();
      return data?.data;
    },
  });
  return (
    <>
      <h1 className="text-xl font-bold p-5 bg-white mb-5">
        <span className="border-b-2 border-[#C31815] pb-1">Live Ne</span>ws 24/7
      </h1>
      <div className="w-full flex flex-col gap-5 overflow-x-hidden">
        {ytQuery.isLoading
          ? dummyArr.map((n) => (
              <div key={n} className="bg-white animate-pulse">
                <div className="w-full aspect-video bg-gray-300" src=""></div>
                <div className="text-2xl p-5 pb-2 w-full mt-5 bg-gray-300"></div>
                <div className="p-5 pt-0 flex items-center gap-3 mt-5">
                  <div
                    className="rounded-full w-10 h-10 bg-gray-300"
                    src=""
                    alt=""
                  ></div>
                  <div className="w-48 bg-gray-300 p-2"></div>
                </div>
              </div>
            ))
          : ytQuery?.data?.map((n) => (
              <div key={n.src} className="bg-white">
                <iframe
                  className="w-full aspect-video"
                  src={n.src}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
                <h1 className="text-2xl p-5 pb-2">{n.title}</h1>
                <a
                  target="_blank"
                  href={n.channelLink}
                  className="p-5 pt-0 flex items-center gap-3 hover:text-info"
                >
                  <img className="rounded-full w-10" src={n.img} alt="" />
                  <h1 className="text-sm font-bold">{n.channel}</h1>
                </a>
              </div>
            ))}
      </div>
    </>
  );
};

export default YoutubeSection;

// {
//   news.map(n => <div key={n.src} className="bg-white">
//   <iframe
//     className="w-full aspect-video"
//     src={n.src}
//     title="YouTube video player"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
//   ></iframe>
//   <h1 className="text-2xl p-5 pb-2">{n.title}</h1>
//   <a
//     target="_blank"
//     href={n.channelLink}
//     className="p-5 pt-0 flex items-center gap-3 hover:text-info"
//   >
//     <img
//       className="rounded-full w-10"
//       src={n.img}
//       alt=""
//     />
//     <h1 className="text-sm font-bold">{n.channel}</h1>
//   </a>
// </div>)
// }
