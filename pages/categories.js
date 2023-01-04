
import SingleNews from '../components/SingleNews'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import CategoryButtons from '../components/CategoryButtons'

const categories = () => {
    let [news, setNews] = useState([])
    let [load, setLoad] = useState(false)
    let [button, setButton] = useState('all')
    useEffect(() => {
        setLoad(true)
        fetch('/api/hello')
            .then(res => res.json())
            .then(data => {
                setNews(data.news)
                setLoad(false)
            })
    }, [])
    return (
        <div className='max-w-7xl mx-auto mb-14'>
            <div className='bg-[#0E1E32] py-20'>

            </div>
            <div className='-mt-16'>
              <CategoryButtons setButton={setButton} button={button}/>
            </div>
            {/* <h1 className='text-xl font-bold p-5 bg-white mx-10 -mt-7 mb-5'><span className='border-b-2 border-[#C31815] pb-1'>All</span> News</h1> */}
            
            {
              load ? <div className={`max-w-xl mx-auto my-11`}>
                <Loading />
              </div> :
                <div className='grid grid-cols-3 gap-5'>
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