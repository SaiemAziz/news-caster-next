import animate from '../assets/images/nature-visite-travel.json'
import LottieAnimation from './LottieAnimation';
const BannerTravel = () => {



    return (<div className='max-w-6xl mx-auto grid md:grid-cols-2 my-20 gap-14'>
        <div className=''>
            <div className=''>
                <LottieAnimation jsonData={animate} />
            </div>
        </div>

        <div className='flex flex-col justify-center gap-5'>
            <h1 className='text-3xl text-center font-bold'>“A journey of a thousand miles,  <br /> Begins with a single step”</h1>
            <h1 className='text-3xl text-right'>-- Lao Tzu </h1>
            <p className='text-2xl text-justify'><span className='font-semibold'>Next Travel</span> is a platform for tourists to travel around the country, to book tickets for different places, and to have a safe journey at any time. </p>
        </div>
    </div>

    );
};

export default BannerTravel;
