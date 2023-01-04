import { useState } from 'react';
import { AiTwotoneLike } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import Link from "next/link";


const SingleNews = ({ n }) => {
    let [liked, setLiked] = useState(false)
    let [likeCount, setLikeCount] = useState(20)

    let handlerLike = () => {
        if (liked)
            setLikeCount(num => num - 1)
        else
            setLikeCount(num => num + 1)
        setLiked(!liked)
    }

    return (
        <div className="bg-white flex flex-col justify-between shadow-lg">
            <div>
                <img className="w-full" src={n.image} alt="" />
                <h1 className="font-bold text-xl px-5 my-3">{n.title}</h1>
                <h1 className="px-5 text-justify">{n.details.slice(0, 100)}... <Link href={`/details/${n.id}`} className='text-blue-500 cursor-pointer font-bold text-sm'>See More</Link></h1>
            </div>
            <div className='mt-10'>
                <div className="px-5 pb-5 flex justify-between border-b-2">
                    <p className="">2 hours ago</p>
                    <p className="text-gray-400">By Lucy Hiddleston</p>
                </div>
                <div className="flex justify-evenly gap-5 py-5 ">
                    <div className="flex items-center gap-2">
                        <button className="btn btn-ghost hover:bg-transparent btn-xs p-0">
                            <AiTwotoneLike className={`text-2xl ${liked ? 'text-blue-500' : 'text-gray-400'}`} onClick={handlerLike} />
                        </button>
                        <p className={`text-xs font-semibold ${liked ? 'text-black' : 'text-gray-400'}`}>{likeCount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BiComment className='text-2xl text-black' />
                        {/* <p className={`text-xs font-semibold`}>comments</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleNews;