import React, { useContext, useEffect, useState } from 'react';
import { BiDislike, BiLike } from 'react-icons/bi';
import { AuthContext } from './Auth';
import { useQuery } from '@tanstack/react-query';

const Reaction = ({ n, setChangeReact }) => {
    let [react, setReact] = useState("none")
    let [likeCount, setLikeCount] = useState(0)
    let [disLikeCount, setDisLikeCount] = useState(0)
    let { user } = useContext(AuthContext)

    let { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["reaction", n._id, user?._id],
        queryFn: async () => {
            let res = await fetch(`/api/reaction-check?newsid=${n._id}&reporterID=${user?._id}`)
            let data = await res.json()
            return data
        }
    })
    useEffect(() => {
        //     fetch(`/api/reaction-check?newsid=${n._id}&email=${user?.email}`)
        //         .then(res => res.json())
        //         .then(data => {
        if (data?.data === 'liked') {
            setReact('liked')
        }
        else if (data?.data === 'disliked') {
            setReact('disliked')
        } else
            setReact('none')
        //             console.log(data?.likeCount, " ", data?.disLikeCount);
        setLikeCount(data?.likeCount)
        setDisLikeCount(data?.disLikeCount)
        //         })
    }, [data])


    // console.log(data);
    let handlerReact = (currentReact) => {
        setChangeReact(true)
        if (react === currentReact) {
            fetch(`/api/reaction-check?newsid=${n._id}&reporterID=${user?._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    refetch()
                    // if (currentReact === 'liked')
                    //     setLikeCount(x => x - 1)
                    // if (currentReact === 'disliked')
                    //     setDisLikeCount(x => x - 1)
                    setChangeReact(false)
                    // setReact("none")
                })
        }
        else {
            fetch(`/api/reaction-check?newsid=${n._id}&reporterID=${user?._id}&react=${currentReact}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(data => {
                    refetch()
                    // if (react === 'none') {
                    //     if (currentReact === 'liked')
                    //         setLikeCount(x => x + 1)
                    //     if (currentReact === 'disliked')
                    //         setDisLikeCount(x => x + 1)
                    // } else {
                    //     if (currentReact === 'liked') {
                    //         setLikeCount(x => x + 1)
                    //         setDisLikeCount(x => x - 1)
                    //     }
                    //     if (currentReact === 'disliked') {
                    //         setLikeCount(x => x - 1)
                    //         setDisLikeCount(x => x + 1)
                    //     }
                    // }
                    // setReact(currentReact)
                    setChangeReact(false)
                })
        }
    }
    return (
        <div className={`flex gap-5 ${user ? '' : 'tooltip'} tooltip-top tooltip-accent`} data-tip="!!! Please Login to react">
            <div className="flex items-center gap-2">
                <button className="btn btn-ghost hover:bg-transparent btn-xs p-0 md:hover:scale-125 duration-150 disabled:bg-transparent"
                    disabled={user ? false : true}
                >
                    <BiLike className={`text-2xl ${react === 'liked' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handlerReact('liked')} />
                </button>
                <p className={`text-xs font-bold ${react === 'liked' ? 'text-blue-500' : 'text-gray-400'}`}>{likeCount}</p>
            </div>
            <div className="flex items-center gap-2">
                <button className="btn btn-ghost hover:bg-transparent btn-xs p-0 md:hover:scale-125 duration-150 disabled:bg-transparent"
                    disabled={user ? false : true}
                >
                    <BiDislike className={`text-2xl ${react === 'disliked' ? 'text-red-500' : 'text-gray-400'}`} onClick={() => handlerReact('disliked')} />
                </button>
                <p className={`text-xs font-bold ${react === 'disliked' ? 'text-red-500' : 'text-gray-400'}`}>{disLikeCount}</p>
            </div>
        </div>
    );
};

export default Reaction;