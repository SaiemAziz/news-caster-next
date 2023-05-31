import React from 'react';
import AllNewsSliders from './AllNewsSliders';
import { categoriesList } from './CategoryButtons';

const AllNews = ({ news }) => {

    return (
        <div className='max-w-7xl mx-auto p-5 xl:p-0'>
            {
                categoriesList.map(item => (
                    <div key={item}>
                        <h1 className='font-bold text-2xl mt-5'>{item} Type</h1>
                        <AllNewsSliders cat={item} news={news} />
                    </div>
                ))
            }
        </div>
    );
};

export default AllNews;