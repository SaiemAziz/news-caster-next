import { createContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'
export const ModelContext = createContext('')
import * as tf from '@tensorflow/tfjs';
import Loading from '../components/Loading'


export default function App({ Component, pageProps }) {
  let [model, setModel] = useState(null)
  let [load, setLoad] = useState(false)
  let [wordIndex, setWordIndex] = useState(null);



  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('word_index.json');
  //     const data = await response.json()
  //     setWordIndex(data);
  //     const myModel = await tf.loadLayersModel('https://raw.githubusercontent.com/ReazTausif97/saiemmodel/main/Model8/model.json')
  //     setModel(myModel);
  //     setLoad(false)
  //   })();
  // }, []);

  if (load)
    return <div  data-theme='light'>
      <div className='max-w-5xl p-20 min-h-screen mx-auto flex flex-col items-center justify-center'>
    <p className='text-center text-4xl font-bold pt-10 text-primary'>Fake News Detection</p>
    <p className='text-center text-4xl font-bold pb-10 text-primary'>Model Loading</p>
    <p className='text-center text-3xl italic font-bold text-gray-400'>Please Keep Patience</p>
      <Loading />
    </div>
    </div>

  return <ModelContext.Provider value={{ model, wordIndex }}>
    <div className='min-h-screen flex flex-col justify-between bg-[#E5E5E5]' data-theme='light'>
      {/* {load && <progress className="progress progress-primary w-full m-0 p-0 bg-white"></progress>} */}

      <Header />
      <Component {...pageProps} />
      <Footer />

    </div>
  </ModelContext.Provider>
}

