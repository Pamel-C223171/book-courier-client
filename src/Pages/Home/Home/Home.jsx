import React from 'react';
import Banner from '../Banner/Banner';
import LatestBooks from '../LatestBooks/LatestBooks';
import WhyChooseBookCourier from '../WhyChooseBookCourier/WhyChooseBookCourier';

const Home = () => {
    return (
        <div className='space-y-14'>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            <WhyChooseBookCourier></WhyChooseBookCourier>
        </div>
    );
};

export default Home;