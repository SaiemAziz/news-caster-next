import React, { useContext, useEffect, useState } from 'react';
import { BiDislike, BiLike } from 'react-icons/bi';
import { AuthContext } from './Auth';

const Reaction = ({ n, setChangeReact }) => {
    let [react, setReact] = useState("none")
    let [likeCount, setLikeCount] = useState(0)
    let [disLikeCount, setDisLikeCount] = useState(0)
    let { user } = useContext(AuthContext)

    useEffect(() => {
        fetch(`/api/reaction-check?newsid=${n._id}&email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data.data === 'liked') {
                    setReact('liked')
                }
                else if (data.data === 'disliked') {
                    setReact('disliked')
                }
                console.log(data.likeCount, " ", data.disLikeCount);
                setLikeCount(data.likeCount)
                setDisLikeCount(data.disLikeCount)
            })
    }, [])

    let handlerReact = (currentReact) => {
        setChangeReact(true)
        if (react === currentReact) {
            fetch(`/api/reaction-check?newsid=${n._id}&email=${user?.email}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (currentReact === 'liked')
                        setLikeCount(x => x - 1)
                    if (currentReact === 'disliked')
                        setDisLikeCount(x => x - 1)
                    setChangeReact(false)
                    setReact("none")
                })
        }
        else {
            fetch(`/api/reaction-check?newsid=${n._id}&email=${user?.email}&react=${currentReact}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(data => {
                    if (react === 'none') {
                        if (currentReact === 'liked')
                            setLikeCount(x => x + 1)
                        if (currentReact === 'disliked')
                            setDisLikeCount(x => x + 1)
                    } else {
                        if (currentReact === 'liked') {
                            setLikeCount(x => x + 1)
                            setDisLikeCount(x => x - 1)
                        }
                        if (currentReact === 'disliked') {
                            setLikeCount(x => x - 1)
                            setDisLikeCount(x => x + 1)
                        }
                    }
                    setReact(currentReact)
                    setChangeReact(false)
                })
        }
    }
    return (
        <div className={`flex gap-5 ${user ? '' : 'tooltip'} tooltip-top tooltip-accent tooltip-right`} data-tip="!!! Please Login to react">
            <div className="flex items-center gap-2">
                <button className="btn btn-ghost hover:bg-transparent btn-xs p-0 md:hover:scale-125 duration-150 disabled:bg-transparent"
                    disabled={user ? false : true}
                >
                    <BiLike className={`text-2xl ${react === 'liked' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handlerReact('liked')} />
                </button>
                <p className={`text-xs font-semibold ${react === 'liked' ? 'text-black' : 'text-gray-400'}`}>{likeCount}</p>
            </div>
            <div className="flex items-center gap-2">
                <button className="btn btn-ghost hover:bg-transparent btn-xs p-0 md:hover:scale-125 duration-150 disabled:bg-transparent"
                    disabled={user ? false : true}
                >
                    <BiDislike className={`text-2xl ${react === 'disliked' ? 'text-red-500' : 'text-gray-400'}`} onClick={() => handlerReact('disliked')} />
                </button>
                <p className={`text-xs font-semibold ${react === 'disliked' ? 'text-black' : 'text-gray-400'}`}>{disLikeCount}</p>
            </div>
        </div>
    );
};

export default Reaction;