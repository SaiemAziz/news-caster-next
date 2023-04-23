import Loading from "../../components/Loading";
import Head from 'next/head'
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ModelContext } from "../_app";
import handleTokenizeClick from "../../components/functions/handleTokenizeClick";
import { AiFillClockCircle } from 'react-icons/ai'
import { CgCalendarDates } from 'react-icons/cg'
import Reaction from "../../components/Reaction";
import { MdVerified } from "react-icons/md";



const Details = () => {
    let [detailsLoad, setDetailsLoad] = useState(true)
    let [changeReact, setChangeReact] = useState(false)
    let { model, wordIndex } = useContext(ModelContext)
    let [news, setNews] = useState(null)
    let [real, setReal] = useState(null)
    let [fake, setFake] = useState(null)
    let [author, setAuthor] = useState(null)
    let [aiLoad, setAiLoad] = useState(true)
    let details = news?.details?.split('.')
    let router = useRouter()
    let { id } = router.query
    // console.log(news)

    useEffect(() => {
        if (id) {
            fetch(`/api/single-news?id=${id}`)
                .then(result => result.json())
                .then(data => {
                    console.log(data)
                    setNews(data?.data)
                    setDetailsLoad(false)
                })
        }
    }, [id])

    useEffect(() => {
        setAiLoad(true)
        if (news?.details)
            (async () => {
                let prediction = await handleTokenizeClick(news?.details, model, wordIndex)
                setReal(prediction.real)
                setFake(prediction.fake)
                setAiLoad(false)
            })();
    }, [news, id]);
    useEffect(() => {
        (
            async () => {
                let res = await fetch(`/api/user-info?email=${news?.authorInfo}`)
                let data = await res.json()
                setAuthor(data.data)
            }
        )()
    }, [news])
    return (
        <div className="max-w-4xl mx-auto p-5">
            <Head>
                <title>Details-News Caster</title>
            </Head>
            {
                detailsLoad ?
                    <Loading /> :
                    <div className="w-full">
                        <h1 className="sm:text-5xl text-3xl text-blue-900 font-bold text-center mb-10 mt-5">{news?.title}</h1>
                        <img className="w-full" src={news?.image} alt="" />
                        {
                            fake && !aiLoad && <>
                                <div className="flex justify-between mt-5 mb-2">
                                    <h1 className="text-green-500 text-xl font-bold">Real ({parseFloat(real).toFixed(2)} %)</h1>
                                    <h1 className="text-red-500 text-xl font-bold">({parseFloat(fake).toFixed(2)} %) Fake</h1>
                                </div>
                                <div className=" overflow-hidden  bg-green-500 mb-5">
                                    <div className={`p-5 bg-red-500 ml-auto`} style={{ width: `${parseInt(fake)}%` }}>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="text-lg font-semibold text-gray-700 italic" dangerouslySetInnerHTML={{ __html: news?.details }} />
                        <div className="m-10 ml-auto w-fit scale-150">
                            <Reaction n={news} setChangeReact={setChangeReact} />
                        </div>
                        {/* author  */}
                        <div className="flex gap-5 mt-5 items-center justify-between">
                            <div className="flex gap-5 items-center">
                                <img className="h-16 w-16 border-2 border-blue-800 p-0.5 rounded-full" src={author?.displayURL} alt="" />
                                {/* <h1 className="font-bold text-xl text-orange-500">{author?.fullName}</h1> */}
                                <p className="font-bold text-xl text-orange-500 flex gap-2 items-center">{author?.fullName} {author?.verified && <MdVerified color="blue" />}</p>
                            </div>
                            <div>
                                <h1 className="flex gap-2 mb-2 items-center"><AiFillClockCircle size={20} /> {news?.time.split(' ')[0]}</h1>
                                <h1 className="flex gap-2 items-center"><CgCalendarDates size={20} /> {news?.time.split(' ')[1]}</h1>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Details;