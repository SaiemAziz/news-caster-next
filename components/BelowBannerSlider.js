import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
const BelowBannerSlider = () => {
    return (<div className='max-w-6xl mx-auto'>
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay]}
          className="mySwiper cursor-grab"
        >
          <SwiperSlide>
          <div className=' bg-[#E0CECE] text-[#632727] flex gap-14 text-2xl justify-center p-5'>
            <h1 className='italic underline'>Sports</h1>
            <h1>Pump the brakes: Shanahan says Jimmy G miracle return is unlikely
            </h1>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className=' bg-[#E0CECE] text-[#632727] flex gap-14 text-2xl justify-center p-5'>
            <h1 className='italic underline'>Politics</h1>
            <h1>We asked a Bay Area lawmaker about being dragged into Musk drama
            </h1>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className=' bg-[#E0CECE] text-[#632727] flex gap-14 text-2xl justify-center p-5'>
            <h1 className='italic underline'>Travel</h1>
            <h1>Buried behind SF lies a tribute to the city’s quintessential tree
            </h1>
          </div>
          </SwiperSlide>
          
        </Swiper>
        
      </div>
    );
};

export default BelowBannerSlider;