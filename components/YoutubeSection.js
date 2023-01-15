import Link from 'next/dist/client/link';
import React from 'react';

const YoutubeSection = () => {
    return (<>

            <h1 className='text-xl font-bold p-5 bg-white mb-5'><span className='border-b-2 border-[#C31815] pb-1'>Live</span> News</h1>
        <div className='w-full flex flex-col gap-5'>

            {/* 1st vdo  */}
            <div className='bg-white'>
            <iframe className='w-full' src="https://www.youtube.com/embed/GEumHK0hfdo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
            <h1 className='text-2xl p-5 pb-2'>Al Jazeera English | Live</h1>
            <Link href="https://www.youtube.com/@aljazeeraenglish" className='p-5 pt-0 flex items-center gap-3 hover:text-info'>
            <img className='rounded-full w-10' src="https://yt3.googleusercontent.com/cFVmPUgDfXuG3A3q8ZCG1zlb6Qms0UezboHORO8SbI1mGCeOLgR__Ou1iTe8ChxDyPw_vr6x=s88-c-k-c0x00ffffff-no-rj" alt="" />
            <h1  className='text-sm font-bold'>Al Jazeera English</h1>
            </Link>
            </div>

            {/* 2nd vdo  */}
            <div className='bg-white'>
            <iframe className='w-full' src="https://www.youtube.com/embed/9Auq9mYxFEE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
            <h1 className='text-2xl p-5 pb-2'>Watch Sky News live</h1>
            <Link href="https://www.youtube.com/@SkyNews" className='p-5 pt-0 flex items-center gap-3 hover:text-info'>
            <img className='rounded-full w-10' src="https://yt3.googleusercontent.com/E96qzkAoX81DQs7wqRHR4rNk1esa4quBPzda2QRzImlhoHOVgRdAN8o-S0Rb_hpygo_n4LdhwTE=s88-c-k-c0x00ffffff-no-rj" alt="" />
            <h1  className='text-sm font-bold'>Sky News</h1>
            </Link>
            </div>

            {/* 3rd vdo  */}
            <div className='bg-white'>
            <iframe className='w-full' src="https://www.youtube.com/embed/uTj-sc9pV7Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
            <h1 className='text-2xl p-5 pb-2'>SOMOY TV LIVE | সময় টিভি লাইভ | সরাসরি সময় টিভি | LIVE TV | SOMOY TV LIVE STREAMING |BANGLA TV LIVE</h1>
            <Link href="https://www.youtube.com/@somoynews360" className='p-5 pt-0 flex items-center gap-3 hover:text-info'>
            <img className='rounded-full w-10' src="https://yt3.ggpht.com/T9GKAlpplboyhpfoDFiVeyQdA7l2mx4mp51UxNFpbtEO3XAJT5KY7IUQJ-KlXVXBkpMQc94U=s88-c-k-c0x00ffffff-no-rj" alt="" />
            <h1  className='text-sm font-bold'>SOMOY TV</h1>
            </Link>
            </div>
        </div>
    </>
    );
};

export default YoutubeSection;