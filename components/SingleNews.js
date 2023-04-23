import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AiFillClockCircle, AiTwotoneLike } from 'react-icons/ai'
import { BiComment, BiDislike, BiLike } from 'react-icons/bi'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import LoadingCircle from './LoadingCircle'
import Link from "next/link";
import * as tf from '@tensorflow/tfjs';
import { ModelContext } from '../pages/_app';
import handleTokenizeClick from './functions/handleTokenizeClick';
import { AuthContext } from './Auth';
import { CgCalendarDates } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';
import Reaction from './Reaction';

const SingleNews = ({ n }) => {
    let { model, wordIndex } = useContext(ModelContext)
    let { user, setUser } = useContext(AuthContext)

    let [author, setAuthor] = useState(null)

    // let {real} = n?.prediction
    // let {fake} = n?.prediction
    // let [react, setReact] = useState("none")
    let [changeReact, setChangeReact] = useState(false)

    let [loading, setLoading] = useState(true)
    // let [likeCount, setLikeCount] = useState(0)
    // let [disLikeCount, setDisLikeCount] = useState(0)
    // // let [wordIndex, setWordIndex] = useState({});
    let [slide, setSlide] = useState(false)
    let [real, setReal] = useState(null)
    let [fake, setFake] = useState(null)
    const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        function updateDisplaySize() {
            setDisplaySize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener('resize', updateDisplaySize);
        updateDisplaySize();

        return () => {
            window.removeEventListener('resize', updateDisplaySize);
        };
    }, []);
    // let MAX_SEQUENCE_LENGTH = 500
    // let { details } = n

    // // Load the word index
    useLayoutEffect(() => {
        (async () => {
            let prediction = await handleTokenizeClick(n?.details, model, wordIndex)
            setReal(prediction.real)
            setFake(prediction.fake)
            setLoading(false)
        })();
    }, []);

    // useLayoutEffect(() => {
    //     fetch(`/api/reaction-check?newsid=${n._id}&email=${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.data === 'liked') {
    //                 setReact('liked')
    //             }
    //             else if (data.data === 'disliked') {
    //                 setReact('disliked')
    //             }
    //             console.log(data.likeCount, " ", data.disLikeCount);
    //             setLikeCount(data.likeCount)
    //             setDisLikeCount(data.disLikeCount)
    //         })
    // }, [])

    useEffect(() => {
        (
            async () => {
                let res = await fetch(`/api/user-info?email=${n.authorInfo}`)
                let data = await res.json()
                setAuthor(data.data)
            }
        )()
    }, [])



    // let handlerReact = (currentReact) => {
    //     setChangeReact(true)
    //     if (react === currentReact) {
    //         fetch(`/api/reaction-check?newsid=${n._id}&email=${user?.email}`, {
    //             method: "DELETE"
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (currentReact === 'liked')
    //                     setLikeCount(x => x - 1)
    //                 if (currentReact === 'disliked')
    //                     setDisLikeCount(x => x - 1)
    //                 setChangeReact(false)
    //                 setReact("none")
    //             })
    //     }
    //     else {
    //         fetch(`/api/reaction-check?newsid=${n._id}&email=${user?.email}&react=${currentReact}`, {
    //             method: "PUT"
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (react === 'none') {
    //                     if (currentReact === 'liked')
    //                         setLikeCount(x => x + 1)
    //                     if (currentReact === 'disliked')
    //                         setDisLikeCount(x => x + 1)
    //                 } else {
    //                     if (currentReact === 'liked') {
    //                         setLikeCount(x => x + 1)
    //                         setDisLikeCount(x => x - 1)
    //                     }
    //                     if (currentReact === 'disliked') {
    //                         setLikeCount(x => x - 1)
    //                         setDisLikeCount(x => x + 1)
    //                     }
    //                 }
    //                 setReact(currentReact)
    //                 setChangeReact(false)
    //             })
    //     }
    // }


    // JSX Syntax
    if (loading)
        return (
            <div className='opacity-40'>
                {/* <p className='text-center text-3xl font-bold text-accent'>Predicting</p> */}
                <LoadingCircle />
            </div>
        )

    return (
        <div className="bg-white flex flex-col justify-between shadow-lg"
            onMouseEnter={() => displaySize.width > 425 && setSlide(true)} onMouseLeave={() => displaySize.width > 425 && setSlide(false)}
        >
            <div>
                <div className='relative flex justify-center items-center overflow-hidden h-60'>
                    <img className="w-full" src={n?.image} alt="" />
                    <div className={`absolute top-0 z-30 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 duration-500 ease-out ${slide ? '' : "translate-y-full"}`}>
                        {
                            <div className='backdrop-blur-sm'>
                                <p className='text-3xl p-5 rounded-full font-bold text-success'>Real: {real?.toFixed(2)}%</p>
                                <p className='text-3xl p-5 rounded-full font-bold text-error'>Fake: {fake?.toFixed(2)}%</p>
                            </div>
                        }
                    </div>
                </div>
                <Link href={`/details/${n?._id}`} className='cursor-pointer'>
                    <h1 className="font-bold text-xl px-5 my-3">{n?.title}</h1>
                    <div className="px-5 text-justify" dangerouslySetInnerHTML={{ __html: n?.details.slice(0, 100) + `... <b style="--tw-text-opacity: 1; color: rgb(59 130 246 / var(--tw-text-opacity))">See More<b>` }} />
                </Link>
            </div>
            <div className='mt-10'>
                <div className="px-5 pb-5 flex justify-between border-b-2 text-gray-400">
                    <div>
                        <h1 className="flex gap-2 mb-2 items-center"><AiFillClockCircle size={20} /> {n?.time.split(' ')[0]}</h1>
                        <h1 className="flex gap-2 items-center"><CgCalendarDates size={20} /> {n?.time.split(' ')[1]}</h1>
                    </div>
                    <p className="flex items-center gap-1">{author?.fullName.split(' ').slice(0, 2).join(' ')} {author?.verified && <MdVerified color="blue" />}</p>
                </div>
                <div className="flex justify-between items-center gap-5 p-5 relative">
                    {changeReact &&
                        <progress className="progress progress-primary w-full -ml-5 p-0 bg-white absolute top-0"></progress>
                    }
                    <Reaction n={n} setChangeReact={setChangeReact} />
                    {/* <div className={`flex gap-5 ${user ? '' : 'tooltip'} tooltip-top tooltip-accent tooltip-right`} data-tip="!!! Please Login to react">
                        <div className="flex items-center gap-2">
                            <button className="btn btn-ghost hover:bg-transparent btn-xs p-0 md:hover:scale-125 duration-150 disabled:bg-transparent"
                                disabled={user ? false : true}
                            >
                                <BiLike className={`text-2xl ${react === 'liked' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handlerReact('liked')} />
                            </button>
                            <p className={`text-xs font-semibold ${react === 'liked' ? 'text-black' : 'text-gray-400'}`}>{likeCount}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="btn btn-ghost hover:bg-transparent btn-xs p-0 md:hover:scale-125 duration-150 disabled:bg-transparent"
                                disabled={user ? false : true}
                            >
                                <BiDislike className={`text-2xl ${react === 'disliked' ? 'text-red-500' : 'text-gray-400'}`} onClick={() => handlerReact('disliked')} />
                            </button>
                            <p className={`text-xs font-semibold ${react === 'disliked' ? 'text-black' : 'text-gray-400'}`}>{disLikeCount}</p>
                        </div>
                    </div> */}
                    <div className='flex gap-5 items-center'>
                        {
                            displaySize.width <= 425 &&
                            <div>

                                {
                                    slide ? <BsEyeSlashFill
                                        className={`text-2xl text-gray-400`}
                                        onClick={() => setSlide(false)}
                                    /> : <BsEyeFill
                                        className={`text-2xl text-blue-700`}
                                        onClick={() => setSlide(true)}
                                    />
                                }
                            </div>
                        }

                        <Link href={`/details/${n?._id}`} className="flex items-center gap-2">
                            <BiComment className='text-2xl text-black hover:text-info' />
                            {/* <p className={`text-xs font-semibold`}>comments</p> */}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleNews;



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