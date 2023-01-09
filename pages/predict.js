import * as tf from '@tensorflow/tfjs'
import { useEffect, useState } from 'react';
const predict = () => {
    let [news, setNews] = useState([])

    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/SaiemAziz/news-caster-next/main/assets/others/news.json')
        .then(res => res.json())
        .then(data => setNews(data))
    },[])

    let handlePredict = async (text) => {
        // console.log(tf);
        // text = text.split(' ')
        const model = await tf.loadLayersModel('https://raw.githubusercontent.com/SaiemAziz/news-caster-next/main/models/model.json')
        // const pred = model.predict(text).arraySync()[0];
        // console.log(pred)
        // console.log(text);
    }

    return (
        <div>
        {
            news.map(n => <div>
            <h1>{n.title}</h1>
            <button className='btn btn-secondary' onClick={()=>handlePredict(n.details)}>
                test
            </button>
            </div>)
        }
        </div>
    );
};

export default predict;