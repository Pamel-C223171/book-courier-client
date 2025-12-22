import React from 'react';
import Banner from '../Banner/Banner';
import LatestBooks from '../LatestBooks/LatestBooks';

const Home = () => {
    return (
        <div className='space-y-14'>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
        </div>
    );
};

export default Home;