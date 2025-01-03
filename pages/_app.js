import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'
export const ModelContext = createContext('')
import * as tf from '@tensorflow/tfjs';
import Loading from '../components/Loading'
import { loadModelBrowser } from '../components/functions/handleTokenizeClick'
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
  loadModelBrowser()
  let [model, setModel] = useState(null)
  let [load, setLoad] = useState(true)
  let [wordIndex, setWordIndex] = useState(null);


  useEffect(() => {
    (async () => {
      let res = await fetch("/models/model/word_index.json")
      let data = await res.json()
      let myModel = await tf.loadLayersModel("/models/model/model.json")
      setWordIndex(data);
      setModel(myModel);
      setLoad(false)
    })();
  }, []);

  // if (load)
  //   return <div data-theme='light'>
  //     <div className='max-w-5xl p-20 min-h-screen mx-auto flex flex-col items-center justify-center'>
  //       <p className='text-center text-4xl font-bold pt-10 text-primary'>Fake News Detection</p>
  //       <p className='text-center text-4xl font-bold pb-10 text-primary'>Model Loading</p>
  //       <p className='text-center text-3xl italic font-bold text-gray-400'>Please Keep Patience</p>
  //       <Loading />
  //     </div>
  //   </div>

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

