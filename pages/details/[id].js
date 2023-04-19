import Loading from "../../components/Loading";
import Head from 'next/head'
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ModelContext } from "../_app";
import handleTokenizeClick from "../../components/functions/handleTokenizeClick";



const Details = () => {
    let [detailsLoad, setDetailsLoad] = useState(true)
    let { model, wordIndex } = useContext(ModelContext)
    let [news, setNews] = useState(null)
    let [real, setReal] = useState(null)
    let [fake, setFake] = useState(null)
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
    console.log(real, fake);

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

    return (
        <div className="max-w-4xl mx-auto p-5">
            <Head>
                <title>Details-News Caster</title>
            </Head>
            {
                detailsLoad ?
                    <Loading /> :
                    <div className="w-full">
                        <h1 className="text-5xl text-blue-900 font-bold text-center mb-10 mt-5">{news?.title}</h1>
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

                        <div className="flex flex-col gap-5 text-lg font-semibold text-gray-700 italic">
                            <h1>{details.slice(0, 5).join('.')}.</h1>
                            <h1>{details.slice(5, 10).join('.')}.</h1>
                            <h1>{details.slice(10, 15).join('.')}.</h1>
                            <h1>{details.slice(15, 20).join('.')}.</h1>
                            <h1>{details.slice(20, 25).join('.')}.</h1>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Details;