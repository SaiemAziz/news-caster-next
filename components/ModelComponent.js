import React, { createContext, useLayoutEffect, useState } from 'react';
import Loading from './Loading';
import * as tf from '@tensorflow/tfjs';
// import { loadModelBrowser } from './functions/handleTokenizeClick';
export const ModelContext = createContext('')
const ModelComponent = ({ children, model, wordIndex }) => {
    // loadModelBrowser()
    // let [model, setModel] = useState(null)
    // let [load, setLoad] = useState(true)
    // let [wordIndex, setWordIndex] = useState(null);

    // useLayoutEffect(() => {
    //     (async () => {
    //         let res = await fetch("models/model/word_index.json")
    //         let data = await res.json()
    //         let myModel = await tf.loadLayersModel("models/model/model.json")
    //         setWordIndex(data);
    //         setModel(myModel);
    //         setLoad(false)
    //     })();
    // }, []);

    // if (load)
    //     return <div data-theme='light'>
    //         <div className='max-w-5xl p-20 min-h-screen mx-auto flex flex-col items-center justify-center'>
    //             <p className='text-center text-4xl font-bold pt-10 text-primary'>Fake News Detection</p>
    //             <p className='text-center text-4xl font-bold pb-10 text-primary'>Model Loading</p>
    //             <p className='text-center text-3xl italic font-bold text-gray-400'>Please Keep Patience</p>
    //             <Loading />
    //         </div>
    //     </div>
    return (
        <ModelContext.Provider value={{ model, wordIndex }}>
            {children}
        </ModelContext.Provider>
    );
};

export default ModelComponent;

export async function getStaticProps() {
    let res = await fetch("models/model/word_index.json")
    let data = await res.json()
    let myModel = await tf.loadLayersModel("models/model/model.json")
    // console.log(data);
    return {
        props: {
            model: myModel,
            wordIndex: data
        }
    }
}