import Link from "next/dist/client/link";
import React from "react";

const YoutubeSection = () => {
  return (
    <>
      <h1 className="text-xl font-bold p-5 bg-white mb-5">
        <span className="border-b-2 border-[#C31815] pb-1">Live Ne</span>ws 24/7
      </h1>
      <div className="w-full flex flex-col gap-5">
        {/* 1st vdo  */}
        <div className="bg-white">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/gCNeDWCI0vo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          ></iframe>
          <h1 className="text-2xl p-5 pb-2">Al Jazeera English | Live</h1>
          <a
            target="_blank"
            href="https://www.youtube.com/@aljazeeraenglish"
            className="p-5 pt-0 flex items-center gap-3 hover:text-info"
          >
            <img
              className="rounded-full w-10"
              src="https://yt3.ggpht.com/YKrh5sIYpesEIHbjfgqwFjFx3ZgIjM_zak2z0LO8QENSgrmgKBes1m65POj9jkmzm0qoKwgl=s176-c-k-c0x00ffffff-no-rj-mo"
              alt=""
            />
            <h1 className="text-sm font-bold">Al Jazeera English</h1>
          </a>
        </div>

        {/* 2nd vdo  */}
        <div className="bg-white">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/oIuVOjDJZbE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          ></iframe>
          <h1 className="text-2xl p-5 pb-2">Watch Sky News live</h1>
          <a
            target="_blank"
            href="https://www.youtube.com/@SkyNews"
            className="p-5 pt-0 flex items-center gap-3 hover:text-info"
          >
            <img
              className="rounded-full w-10"
              src="https://yt3.googleusercontent.com/E96qzkAoX81DQs7wqRHR4rNk1esa4quBPzda2QRzImlhoHOVgRdAN8o-S0Rb_hpygo_n4LdhwTE=s88-c-k-c0x00ffffff-no-rj"
              alt=""
            />
            <h1 className="text-sm font-bold">Sky News</h1>
          </a>
        </div>

        {/* 3rd vdo  */}
        <div className="bg-white">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/e_BQWtx15qI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          ></iframe>
          <h1 className="text-2xl p-5 pb-2">
            SOMOY TV LIVE | সময় টিভি লাইভ | সরাসরি সময় টিভি | LIVE TV | SOMOY TV
            LIVE STREAMING |BANGLA TV LIVE
          </h1>
          <a
            target="_blank"
            href="https://www.youtube.com/@somoynews360"
            className="p-5 pt-0 flex items-center gap-3 hover:text-info"
          >
            <img
              className="rounded-full w-10"
              src="https://yt3.googleusercontent.com/dcx8BUs_aHDYkGkTVhHpORuF1MOHI6ZM5AdG9pe9gm9Q_atfhEuq_-mO8l1h5q8qJZzlUzWSgw=s176-c-k-c0x00ffffff-no-rj"
              alt=""
            />
            <h1 className="text-sm font-bold">SOMOY TV</h1>
          </a>
        </div>
      </div>
    </>
  );
};

export default YoutubeSection;
