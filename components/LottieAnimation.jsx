import dynamic from 'next/dynamic';
const LottieComp = dynamic(() => import('./LottieComp'), { ssr: false });
const LottieAnimation = ({jsonData}) => {
    
    return (
        <LottieComp jsonData={jsonData}/>
    );
};
export default LottieAnimation;