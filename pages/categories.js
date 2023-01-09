
import SingleNews from '../components/SingleNews'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import CategoryButtons from '../components/CategoryButtons'

const categories = () => {
    let [news, setNews] = useState([])
    let [load, setLoad] = useState(false)
    let [button, setButton] = useState('All')
    useEffect(() => {
        setLoad(true)
        fetch('https://raw.githubusercontent.com/SaiemAziz/news-caster-next/main/assets/others/news.json')
            .then(res => res.json())
            .then(data => {
                setNews(data)
                setLoad(false)
            })
    }, [])
    return (
        <div className=' mb-14'>
            <div className='bg-[#0E1E32] py-20'>
              <h1 className='text-4xl font-bold text-center text-info'>{button} News: {news.length}</h1>
            </div>
            <div className='max-w-7xl mx-auto -mt-10'>
              <CategoryButtons setButton={setButton} button={button}/>
            </div>
            {/* <h1 className='text-xl font-bold p-5 bg-white mx-10 -mt-7 mb-5'><span className='border-b-2 border-[#C31815] pb-1'>All</span> News</h1> */}
            
            {
              load ? <div className={`max-w-xl mx-auto my-11`}>
                <Loading />
              </div> :
                <div className='max-w-7xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                  {
                    news?.map(n => <SingleNews
                      key={n?.id}
                      n={n}
                    ></SingleNews>)
                  }
                </div>
            }
        </div>
    )
}

export default categories;