import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Auth';
import * as loadingImage from '../assets/images/liquid-4-dot-loader.json'
import Loading from './LoadingCircle';
import Lottie from 'lottie-react';

const Comments = ({ news }) => {
    let [comments, setComments] = useState([])
    let [loadComment, setLoadComment] = useState(false)
    let [loadReply, setLoadReply] = useState(false)
    let { user } = useContext(AuthContext)
    // console.log(user);
    useEffect(() => {
        (async () => {
            let res = await fetch(`/api/single-news-comments?newsId=${news?._id}`)
            let data = await res.json()
            setComments(data.data)
        })()
    }, [news])


    let handleComment = async e => {
        e.preventDefault()
        setLoadComment(true)
        let commenter = user
        let comment = {
            comment: e.target.comment.value,
            commenter: commenter,
            newsId: news?._id,
            time: new Date(),
        }
        // console.log(comment);
        let res = await fetch(`/api/single-news-comments`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        let data = await res.json()
        setLoadComment(false)
    }


    let handleReply = async (e, id) => {
        e.preventDefault()
        setLoadReply(true)
        // let commenter = author
        let reply = {
            comment: e.target.reply.value,
            author: user,
            time: new Date(),
        }
        // console.log(comment);
        let res = await fetch(`/api/single-news-comments?id=${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(reply)
        })
        let data = await res.json()
        setLoadReply(false)
    }

    return (
        <div>
            <h1 className='text-2xl font-bold text-right text-info my-3 border-b-2 mb-3 pb-3 border-info'>All Comments</h1>
            {
                user &&
                <form className='flex flex-col md:flex-row gap-5 justify-center items-center w-full mb-10'
                    onSubmit={handleComment}>
                    <img className='h-16 w-16 rounded-full' src={user?.displayURL} alt="" />
                    <textarea className='flex-1 max-w-lg textarea textarea-info' name="comment" />
                    {
                        loadComment ? <div className='mx-auto max-w-[100px]'>
                            <Lottie animationData={loadingImage} />
                        </div> :
                            <input className='btn btn-info' type="submit" value="SUBMIT" />
                    }
                </form>
            }
            <div className=''>
                {
                    comments?.map(item => (
                        <div key={item?._id}>
                            <div className='flex my-2 gap-2 border-2 border-blue-500 p-5 rounded-xl'>
                                <img className='h-16 w-16 rounded-full' src={item?.commenter?.displayURL} alt="" />
                                <div className='flex-1'>
                                    <div className='flex justify-between'>
                                        <h1 className='text-orange-600 font-bold'>{item?.commenter?.fullName}</h1>
                                        <h1 className='font-semibold'>{item?.time?.toString().split("T")[0]}</h1>
                                    </div>
                                    <p className='italic font-semibold text-gray-600'>{item?.comment}</p>
                                </div>
                            </div>

                            {/* reply  */}
                            <div className='pl-20 mb-3 w-full flex justify-center items-center'>
                                {
                                    !item?.reply ?
                                        <form className={`flex-1 flex flex-col md:flex-row gap-5 justify-center items-center w-full border-2 border-purple-400 p-5 rounded-xl ${user?.email !== news?.authorInfo && 'hidden'}`}
                                            onSubmit={(e) => handleReply(e, item._id)}>
                                            <img className='h-16 w-16 rounded-full' src={user?.displayURL} alt="" />
                                            <textarea className='flex-1 max-w-lg textarea textarea-secondary' name="reply" />
                                            {
                                                loadReply ? <div className='mx-auto max-w-[100px]'>
                                                    <Lottie animationData={loadingImage} />
                                                </div> :
                                                    <input className='btn btn-secondary' type="submit" value="REPLY" />
                                            }
                                        </form> :
                                        <div className='flex-1 flex mb-3 gap-2 border-2 border-purple-400 p-5 rounded-xl'>
                                            <img className='h-16 w-16 rounded-full' src={item?.reply?.author?.displayURL} alt="" />
                                            <div className='flex-1'>
                                                <div className='flex justify-between'>
                                                    <h1 className='text-orange-600 font-bold'>{item?.reply?.author?.fullName}</h1>
                                                    <h1 className='font-semibold'>{item?.reply?.time?.toString().split("T")[0]}</h1>
                                                </div>
                                                <p className='italic font-semibold text-gray-600'>{item?.reply?.comment}</p>
                                            </div>
                                        </div>
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Comments;