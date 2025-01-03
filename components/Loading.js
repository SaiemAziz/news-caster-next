import * as loader from '../assets/images/liquid-4-dot-loader.json'
import * as animate from '../assets/images/loading-files.json'
import LottieAnimation from './LottieAnimation';

const Loading = () => {
    return (
        <div className='w-full lg:p-20'>
            {/* <Lottie animationData={loader} /> */}
            <LottieAnimation jsonData={animate} />
        </div>
    );
};

export default Loading;