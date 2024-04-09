import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

const AllNewsSliders = ({ cat, news }) => {
  let catNews = news;
  if (cat !== "All")
    catNews = news.filter(
      (n) => n?.category?.toLowerCase() === cat.toLowerCase()
    );

  return (
    <div className="my-5 gap-10 flex overflow-x-scroll overflow-y-hidden">
      {/* <Swiper
                direction={"horizontal"}
                slidesPerView={"auto"}
                freeMode={true}
                scrollbar={true}
                mousewheel={true}
                modules={[FreeMode, Scrollbar, Mousewheel]}
                className="mySwiper"
            >
                <SwiperSlide className='flex gap-10'> */}
      {catNews.map((n, i) => (
        <Link href={`/details/${n._id}`} key={i}>
          <div className="w-[350px] flex flex-col gap-2 items-center justify-between hover:scale-95 duration-150 cursor-pointer">
            <div className="h-52 overflow-hidden flex justify-center items-center">
              <img
                className="h-full shadow-2xl aspect-video object-cover object-center bg-black"
                src={n.image}
                alt=""
              />
            </div>
            <p className="font-semibold p-5 text-center italic truncate w-full">
              {n.title}
            </p>
          </div>
        </Link>
      ))}
      {/* </SwiperSlide>
            </Swiper> */}
    </div>
  );
};

export default AllNewsSliders;
