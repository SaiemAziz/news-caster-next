import * as bannerImage from '../assets/images/bannerImage.json'
import LottieAnimation from './LottieAnimation';


const Banner = () => {
    return (<div className='max-w-6xl mx-auto grid md:grid-cols-2 mb-20 gap-14 text-white'>
        <div className='flex justify-center items-center'>
            <div className='-p-5 -mt-20'>
                <LottieAnimation jsonData={bannerImage} />
            </div>
        </div>

        <div className='flex flex-col justify-center gap-5 p-5'>
            <h1 className='md:text-3xl text-xl text-center font-bold text-info'>“Fake news is cheap to produce. <br /> Genuine journalism is expensive”</h1>
            <h1 className='md:text-xl text-md text-right'>-- Toomas Hendrik Ilves </h1>
            <p className='md:text-2xl text-lg text-justify text-gray-400'><span className='font-semibold'>News Caster</span> is a platform for journalists to showcase their works, learn from others, and and uncover vital new information in the public interest. </p>
        </div>
    </div>

    );
};

export default Banner;
