import { createContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'
export const ModelContext = createContext('')
import * as tf from '@tensorflow/tfjs';


export default function App({ Component, pageProps }) {
    let [model, setModel] = useState(null)
    let [load, setLoad] = useState(false)
    let [wordIndex, setWordIndex] = useState(null);

  


  useEffect(() => {
    (async () => {
        setLoad(true)
        const response = await fetch('word_index.json');
        const data = await response.json()
        setWordIndex(data);
        const myModel = await tf.loadLayersModel('https://raw.githubusercontent.com/ReazTausif97/saiemmodel/main/Model8/model.json')
        setModel(myModel);
        setLoad(false)
    })();
}, []);

  return <ModelContext.Provider value={{load, model, wordIndex}}>
    <div className='min-h-screen flex flex-col justify-between bg-[#E5E5E5]' data-theme='light'>
    {load && <progress className="progress progress-primary w-full m-0 p-0 bg-white"></progress>}
    
    <Header />
    <Component {...pageProps} />
    <Footer />

  </div>
  </ModelContext.Provider>
}
