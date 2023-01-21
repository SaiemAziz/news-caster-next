
import SingleNews from '../components/SingleNews'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import CategoryButtons from '../components/CategoryButtons'
import Head from 'next/head'
import AllNews from '../components/AllNews'

const categories = () => {
  let [news, setNews] = useState([])
  let [load, setLoad] = useState(false)
  let [button, setButton] = useState('All')
  useEffect(() => {
    setLoad(true)
    setNews([])
    fetch(`/api/categories?category=${button.toLowerCase()}`)
      .then(res => res.json())
      .then(data => {
        setNews(data.data)
        setLoad(false)
      })
  }, [button])
  return (
    <div className=' mb-14'>
      <Head>
        <title>{button}-News Caster</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-[#0E1E32] py-20'>
        <h1 className='text-4xl font-bold text-center text-info'>{button} News: {news.length}</h1>
      </div>
      <div className='max-w-7xl mx-auto -mt-10'>
        <CategoryButtons setButton={setButton} button={button} />
      </div>
      {/* <h1 className='text-xl font-bold p-5 bg-white mx-10 -mt-7 mb-5'><span className='border-b-2 border-[#C31815] pb-1'>All</span> News</h1> */}

      {
        load ? <div className={`max-w-5xl mx-auto my-11`}>
          <Loading />
        </div> :
          button === "All" ?
            <AllNews news={news} /> :
            <div className='max-w-7xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
              {
                news?.map(n => <SingleNews
                  key={n?._id}
                  n={n}
                ></SingleNews>)
              }
            </div>
      }
    </div>
  )
}

export default categories;