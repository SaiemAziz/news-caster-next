import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (event) => {
    const starId = parseInt(event.target.id);
    if (starId === rating)
      setRating(0);
    else
      setRating(starId);
  };

  const renderStars = () => {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "text-yellow-500" : "text-gray-500";
      stars.push(
        <button
          className={` text-5xl ${starClass} hover:scale-125 duration-200 ease-out`}
          key={i}
          id={i}
          onClick={handleRating}
        >
          ★
        </button>
      );
    }

    return <div className='flex gap-3'>{stars}</div>;
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
    <div className="flex flex-col justify-center items-center p-5">
      {renderStars()}
      <p className='text-3xl mt-3 font-semibold italic text-blue-800'>{renderMessage()}</p>
    </div>
  );
};

export default StarRating;
