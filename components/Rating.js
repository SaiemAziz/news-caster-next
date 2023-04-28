import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Auth';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const StarRating = () => {
  let { user } = useContext(AuthContext)
  const [rating, setRating] = useState(0);
  const [loadRating, setLoadRating] = useState(false);

  const handleRating = (event) => {
    const starId = parseInt(event.target.id);
    if (starId === rating) {
      setRating(0);
      handleRate(0)
    }
    else {
      handleRate(starId)
      setRating(starId);
    }
  };

  let { data: average, isLoading, refetch } = useQuery({
    queryKey: ['average-rating'],
    queryFn: async () => {
      let res = await fetch(`/api/rating`)
      let resData = await res.json();
      return resData?.data
    }
  })

  console.log(average);

  useEffect(() => {
    setRating(user?.rating || 0);
  }, [user])


  let handleRate = (rate) => {
    (async () => {
      setLoadRating(true)
      let res = await fetch(`/api/rating`, {
        method: 'PUT',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          rating: rate,
          id: user?._id
        })
      })

      let data = await res.json()
      if (data?.data?.acknowledged) toast.success("Rating updated successfully")
      refetch()
      setLoadRating(false)
    })()
  }

  const renderStars = () => {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "text-yellow-500" : "text-gray-500";
      stars.push(
        <button
          className={` text-5xl ${starClass} hover:scale-125 duration-200 ease-out`}
          key={i}
          id={i}
          disabled={(user || loadRating) ? false : true}
          onClick={handleRating}
        >
          ★
        </button>
      );
    }

    return <div className={`flex gap-3 ${!user && "tooltip tooltip-bottom"}`} data-tip="Please Login To Rate">{stars}</div>;
  };

  const renderMessage = () => {
    switch (rating) {
      case 1:
        return "I hated it..😫";
      case 2:
        return "I didn't like it..😣";
      case 3:
        return "It's okay...😐";
      case 4:
        return "I liked it...😀";
      case 5:
        return "I loved it!...😍";
      default:
        return "Please rate our site";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 text-center">
      <p className='text-3xl mt-3 font-semibold text-blue-800 border-b-2 pb-2 mb-2 border-blue-800'>Your rating is our pride. <br /> {average?.userCount} people rated {average?.avgRating.toFixed(2)}</p>
      {renderStars()}
      <p className='text-xl mt-3 font-semibold italic text-blue-800'>{renderMessage()}</p>
    </div>
  );
};

export default StarRating;
