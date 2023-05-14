import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '/components/Auth';
import { categoriesList } from './CategoryButtons';
import RichText from './RichText';
import Lottie from 'lottie-react';
import * as loadingImage from '../assets/images/liquid-4-dot-loader.json'
import Loading from './LoadingCircle';
// import RichText from './RichText';
import { toast } from 'react-toastify';

// let RichText = React.memo(dynamic(() => import('./RichText'), {
//     ssr: false,
// }))
const AddPost = () => {
    let router = useRouter()
    let { user, loadUser } = useContext(AuthContext)
    const [details, setDetails] = useState('');
    const [loadAdd, setLoadAdd] = useState(false);
    const [loadRich, setLoadRich] = useState(true);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [err, setErr] = useState('');
    let imgbbUrl = process.env.NEXT_PUBLIC_IMGBB_URL
    // useEffect(() => {
    //     if (user?.role != 'admin' && !loadUser)
    //         router.push('/')
    // }, [loadUser])
    // console.log(details, details.length);
    // useEffect(() => {
    //     RichText = dynamic(() => import('/components/RichText'), {
    //         ssr: false,
    //     })
    //     setLoadRich(false)
    // }, [])

    let handleForm = async e => {
        e.preventDefault()
        setLoadAdd(true)
        console.log(details.length);
        if (!category) {
            setLoadAdd(false)
            return setErr("Please select a category")
        }
        else if (details.length < 100) {
            setLoadAdd(false)
            return setErr("Please enter at least 100 characters of details")
        }
        setErr('');

        let formData = new FormData()
        formData.append('image', image)

        const config = {
            method: 'POST',
            body: formData
        }

        let res = await fetch(imgbbUrl, config)
        let data = await res.json()
        let displayURL = data.data.display_url

        let news = {
            time: new Date(),
            status: 'active',
            title,
            details,
            authorInfo: user?.email,
            image: displayURL,
            category: category.toLowerCase()
        }
        console.log(news);
        try {
            let res2 = await fetch('/api/single-news', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(news)
            })
            let data2 = await res2.json()
            if (data2.data.success) {
                toast.success('News added successfully')
                e.target.reset()
                setDetails('')
            }
        } catch (e) {
            toast.error("Something went wrong")
        }
        setLoadAdd(false)
    }
    // if (loadRich) return <div>
    //     <Loading />
    // </div>

    return (
        <form onSubmit={handleForm} className='p-5 mx-auto lg:w-[900px] w-full'>
            <h1 className='text-center text-3xl border-b-2 border-info text-info mb-3 pb-3 w-full font-bold'>Add News</h1>
            <p className='text-xl my-4 text-primary'>News Title</p>
            <input required type="text" placeholder="Title" className="input input-bordered input-info w-full" onChange={(e) => setTitle(e.target.value)} />
            <div className="flex gap-2 w-full justify-between items-center">
                <p className='text-xl text-primary mt-5 mr-5'>Image</p>
                <input required type="file" id='floating_image' name='image' accept="image/png, image/gif, image/jpeg" className="text-sm text-grey-900
            file:mr-5 file:py-2 w-full flex-grow md:file:px-40 lg:file:px-60 file:px-12
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-600 file:to-blue-300
            hover:file:cursor-pointer hover:file:opacity-80 mt-5
          " onChange={(e) => setImage(e.target.files[0])} />
                {/* <label htmlFor="floating_image" className="absolute  text-[#097ef6] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-[#097ef6]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Image</label> */}
            </div>
            <div className='flex gap-2 items-center'>

                <p className='text-xl text-primary mr-5'>Category</p>
                <select className="select select-info flex-grow my-5" onChange={(e) => setCategory(e.target.value.toLowerCase())} required>
                    <option disabled selected>Pick Category</option>
                    {
                        categoriesList.map(item => (
                            item !== 'All' && <option className='my-2' key={item} value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>

            <p className='text-xl mb-4 text-primary'>Details</p>
            <RichText value={details} setValue={setDetails} />
            {
                err && <p className='text-center font-bold text-sm text-error'>{err}</p>
            }
            {
                loadAdd ?
                    <div className='mx-auto max-w-[100px] mt-2 mb-10'>
                        <Lottie animationData={loadingImage} />
                    </div> :
                    <input type="submit" className="btn btn-success w-full my-5 mb-10" value="SUBMIT" />
            }
        </form>
    );
};

export default AddPost;