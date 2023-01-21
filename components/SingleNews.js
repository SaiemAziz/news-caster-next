import { useContext, useEffect, useState } from 'react';
import { AiTwotoneLike } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import Loading from './Loading'
import Link from "next/link";
import * as tf from '@tensorflow/tfjs';
import { ModelContext } from '../pages/_app';

const SingleNews = ({ n }) => {
    let { model, wordIndex } = useContext(ModelContext)
    let {real} = n?.prediction
    let {fake} = n?.prediction
    let [liked, setLiked] = useState(false)
    let [loading, setLoading] = useState(false)
    let [likeCount, setLikeCount] = useState(20)
    // // let [wordIndex, setWordIndex] = useState({});
    let [slide, setSlide] = useState(false)
    // let [real, setReal] = useState(null)
    // let [fake, setFake] = useState(null)
    // let MAX_SEQUENCE_LENGTH = 500
    // let { details } = n

    // // Load the word index
    // // useEffect(() => {
    // //     (async () => {
    // //         setLoading(true)
    // //         // const response = await fetch('word_index.json');
    // //         // const data = await response.json()
    // //         // setWordIndex(data);
    // //         // const myModel = await tf.loadLayersModel('https://raw.githubusercontent.com/ReazTausif97/saiemmodel/main/Model8/model.json')
    // //         if(model)
    // //             handleTokenizeClick()
    // //     })();
    // // }, [model]);

    // useEffect(() => {
    //     setLoading(true)
    //     if (model)
    //         handleTokenizeClick()
    // }, [model])

    // const puncRemove = (t) => {
    //     t = t.split('');
    //     let newt = t.filter(x => {
    //         if (x >= 'A' && x <= 'Z') return x;
    //         else if (x >= 'a' && x <= 'z') return x;
    //         else if (x === ' ' || x === '\'' || x === '“' || x === '”') return x;
    //     })
    //     newt = newt.join('')
    //     return newt
    // }

    // const paddingAdd = (arr) => {
    //     let newArray = [...arr]
    //     if (arr.length >= MAX_SEQUENCE_LENGTH) {
    //         return newArray
    //     }
    //     for (let i = arr.length; i < MAX_SEQUENCE_LENGTH; i++) {
    //         newArray.push(0)
    //     }
    //     return newArray
    // }

    // const removeZero = (arr) => {
    //     let newArray = arr.filter(num => num !== undefined)
    //     return paddingAdd(newArray)
    // }


    // const handleTokenizeClick = async () => {
    //     details = puncRemove(details)
    //     const mytokenizedText = details.toLowerCase().split(' ');
    //     const mywordIndices = await mytokenizedText.map(word => wordIndex[word]);
    //     const mypaddedSequences = [...removeZero(mywordIndices)]
    //     const slicedPaddedSequence = mypaddedSequences.slice(0, 500)
    //     const mypaddedSequence = tf.tensor1d(slicedPaddedSequence, 'int32')
    //     const reshapedPaddedSequence = mypaddedSequence.reshape([1, 500])
    //     const pred = model.predict(reshapedPaddedSequence);
    //     setFake(pred.dataSync()[0] * 100)
    //     setReal(pred.dataSync()[1] * 100)
    //     setLoading(false)
    //     // const result = pred.dataSync()[0] > pred.dataSync()[1] ? "FAKE" : "REAL"
    //     // const result2 = Math.max(...pred.dataSync())
    //     // console.log(index + " Prediction " + result + ", Percent " + parseFloat(result2 * 100).toFixed(2))
    // }



console.log(n)
    let handlerLike = () => {
        if (liked)
            setLikeCount(num => num - 1)
        else
            setLikeCount(num => num + 1)
        setLiked(!liked)
    }


    // JSX Syntax
    if (loading)
        return (
            <div>
                <p>{fake}</p>
                <Loading />
            </div>
        )

    return (
        <div className="bg-white flex flex-col justify-between shadow-lg"
            onMouseEnter={() => setSlide(true)} onMouseLeave={() => setSlide(false)}
        >
            <div>
                <div className='relative overflow-hidden'>
                    <img className="w-full" src={n?.image} alt="" />
                    <div className={`absolute top-0 z-30 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 duration-500 ease-out ${slide ? '' : "translate-y-full"}`}>
                        {
                            <div className='backdrop-blur-sm'>
                                <p className='text-3xl p-5 rounded-full font-bold text-success'>Real: {real.toFixed(2)}%</p>
                                <p className='text-3xl p-5 rounded-full font-bold text-error'>Fake: {fake.toFixed(2)}%</p>
                            </div>
                        }
                    </div>
                </div>
                <h1 className="font-bold text-xl px-5 my-3">{n?.title}</h1>
                <h1 className="px-5 text-justify">{n?.details.slice(0, 100)}... <Link href={`/details/${n?._id}`} className='text-blue-500 cursor-pointer font-bold text-sm'>See More</Link></h1>
            </div>
            <div className='mt-10'>
                <div className="px-5 pb-5 flex justify-between border-b-2">
                    <p className="">2 hours ago</p>
                    <p className="text-gray-400">By Lucy Hiddleston</p>
                </div>
                <div className="flex justify-evenly gap-5 py-5 ">
                    <div className="flex items-center gap-2">
                        <button className="btn btn-ghost hover:bg-transparent btn-xs p-0 md:hover:scale-125 duration-150">
                            <AiTwotoneLike className={`text-2xl ${liked ? 'text-blue-500' : 'text-gray-400'}`} onClick={handlerLike} />
                        </button>
                        <p className={`text-xs font-semibold ${liked ? 'text-black' : 'text-gray-400'}`}>{likeCount}</p>
                    </div>
                    <Link href={`/details/${n?._id}`} className="flex items-center gap-2">
                        <BiComment className='text-2xl text-black hover:text-info' />
                        {/* <p className={`text-xs font-semibold`}>comments</p> */}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleNews;