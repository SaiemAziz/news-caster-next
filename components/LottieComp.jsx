import React from 'react';
import Lottie from 'react-lottie'
const LottieComp = ({jsonData}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: jsonData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
      <div className='w-full'>
        <Lottie options={defaultOptions}/>
      </div>
    );
};
export default LottieComp;