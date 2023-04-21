import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";


const AllNewsSliders = ({ cat, news }) => {
    let catNews = news
    if (cat !== "All")
        catNews = news.filter(n => n?.category?.toLowerCase() === cat.toLowerCase())

    return (
        <div className='my-5 gap-10 flex overflow-x-scroll overflow-y-hidden'>
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
            {
                catNews.map((n, i) => (
                    <Link href={`/details/${n._id}`} key={i}>
                        <div className="w-[350px] hover:scale-95 duration-150 cursor-pointer">
                            <img className='w-full rounded-xl shadow-xl' src={n.image} alt="" />
                            <p className='font-semibold p-5 text-center italic'>{n.title}</p>
                        </div>
                    </Link>
                ))
            }
            {/* </SwiperSlide>
            </Swiper> */}

        </div>
    );
};

export default AllNewsSliders;