import React from 'react';
import SassTest from './SassTest';
import { ImSearch } from 'react-icons/im';
import { GiFist } from 'react-icons/gi';
import { GoVerified } from 'react-icons/go';
import { FaMedal } from 'react-icons/fa';
const WhyChooseUs = () => {
    return (
        <div className="whyChooseUs">
            <h1 className="whyChooseTitle">WHY CHOOSE US?</h1>
            <div className="level1">
                <SassTest className='item' icon={<ImSearch size={25} />} title='Real-time prediction' description='Predict news in real-time by hovering over card' />
                <SassTest classname='item' icon={<GiFist size={25} />} title="Freedom of speech" description='share your thought,political views in our site' />
                <SassTest classname='item' icon={<GoVerified size={25} />} title='Reliablity' description='News are predicted using machine learning to deliver authentic news.' />
                <SassTest classname='item' icon={<FaMedal size={25} />} title='Rewards' description='Good contents are rated by other reporters.' />
            </div>
        </div>
    );
};

export default WhyChooseUs;