import React from 'react';
import AllNewsSliders from './AllNewsSliders';

const AllNews = ({news}) => {
    return (
        <div className='max-w-7xl mx-auto p-5 xl:p-0'>
            <h1 className='font-bold text-2xl mt-5'>All Type</h1>
            <AllNewsSliders cat="all" news={news}/>
            <h1 className='font-bold text-2xl mt-5'>Sports</h1>
            <AllNewsSliders cat="sports" news={news}/>
            <h1 className='font-bold text-2xl mt-5'>Travel</h1>
            <AllNewsSliders cat="travel" news={news}/>
            <h1 className='font-bold text-2xl mt-5'>Politics</h1>
            <AllNewsSliders cat="politics" news={news}/>
            <h1 className='font-bold text-2xl mt-5'>Food</h1>
            <AllNewsSliders cat="food" news={news}/>
            <h1 className='font-bold text-2xl mt-5'>Weather</h1>
            <AllNewsSliders cat="weather" news={news}/>
            <h1 className='font-bold text-2xl mt-5'>Local</h1>
            <AllNewsSliders cat="local" news={news}/>
        </div>
    );
};

export default AllNews;