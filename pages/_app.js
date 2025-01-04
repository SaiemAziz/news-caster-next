import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'
export const ModelContext = createContext('')
import * as tf from '@tensorflow/tfjs';
import Loading from '../components/Loading'
// import { loadModelBrowser } from '../components/functions/handleTokenizeClick'
import Auth from '../components/Auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
// sass style sheet
import '../styles/SassTest.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  // loadModelBrowser()
  let [model, setModel] = useState(null)
  let [load, setLoad] = useState(true)
  let [wordIndex, setWordIndex] = useState(null);


  // useEffect(() => {
  //   (async () => {
  //     let res = await fetch("/models/model/word_index.json")
  //     let data = await res.json()
  //     let myModel = await tf.loadLayersModel("/models/model/model.json")
  //     setWordIndex(data);
  //     setModel(myModel);
  //     setLoad(false)
  //   })();
  // }, []);
  // useEffect(() => {
  //   (() => {
  //     fetch(`/api/model-load`);
  //   })();
  // }, []);

  return <>
    <QueryClientProvider client={queryClient}>
      <Auth>
        <ModelContext.Provider value={{ model, wordIndex, load }}>
          <div className='min-h-screen flex flex-col justify-between bg-[#E5E5E5]' data-theme='light'>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </ModelContext.Provider>
      </Auth>
    </QueryClientProvider>
  </>
}

