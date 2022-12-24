import Header from '../components/Header'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <div className='min-h-screen bg-[#E5E5E5]' data-theme='light'>
    <Header/>
    <Component {...pageProps} />
  </div>
}
