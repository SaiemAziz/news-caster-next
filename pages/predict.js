import * as tf from '@tensorflow/tfjs'
import { useEffect, useState } from 'react';
const predict = () => {
    let [news, setNews] = useState([])

    useEffect(()=>{
        fetch('news.json')
        .then(res => res.json())
        .then(data => setNews(data))
    },[])

    let handlePredict = async (text) => {
        const model = await tf.loadLayersModel('https://raw.githubusercontent.com/SaiemAziz/news-caster-next/main/models/model.json')
        // const pred = await model.predict(text).arraySync()[0];
        // console.log(pred)
        console.log(model);
    }

    return (
        <div>
            <button className='btn btn-secondary' onClick={()=>handlePredict(news[0]?.details)}>
                test
            </button>
        </div>
    );
};

export default predict;