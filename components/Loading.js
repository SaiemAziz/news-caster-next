import * as loader from '../assets/images/liquid-4-dot-loader.json'
import * as animate from '../assets/images/loading-files.json'
import Lottie from 'lottie-react'

const Loading = () => {
    return (
        <div className='w-full opacity-50'>
            <Lottie animationData={loader} />
            <Lottie animationData={animate} />
        </div>
    );
};

export default Loading;