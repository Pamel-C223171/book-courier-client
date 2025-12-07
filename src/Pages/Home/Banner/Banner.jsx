import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerimg1 from '../../../assets/banner/banner1.jpg';
import bannerimg2 from '../../../assets/banner/banner2.jpg';
import bannerimg3 from '../../../assets/banner/banner3.jpeg';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            <div className='relative'>
                <img src={bannerimg1} />
                <div className='-mt-150 pb-5'>
                    <h1 className="animation text-5xl text-center  font-bold text-white"><span className="animation text-5xl bebas">Reliable Marketplace </span><br />for Local Jobs </h1>
                    <p className="text-center mt-3 "> Discover the perfect job or hire talented people easily. Join our
                        platform today!</p>
                    <Link className="animationbtn mt-5 btn text-primary hover:text-secondary bg-secondary hover:bg-primary z-10">All Book</Link>
                </div>
            </div>
            <div className='relative'>
                <img src={bannerimg2} />
                <div className='-mt-170 pb-5'>
                    <h1 className="animation text-5xl text-center  font-bold text-white"><span className="animation text-5xl bebas">Reliable Marketplace </span><br />for Local Jobs </h1>
                    <p className="text-center mt-3 "> Discover the perfect job or hire talented people easily. Join our
                        platform today!</p>
                    <Link className="animationbtn mt-5 btn text-primary hover:text-secondary bg-secondary hover:bg-primary z-10">All Book</Link>
                </div>
            </div>
            <div className='relative'>
                <img src={bannerimg3} />
                <div className='-mt-200 pb-5'>
                    <h1 className="animation text-5xl text-center  font-bold text-white"><span className="animation text-5xl bebas">Reliable Marketplace </span><br />for Local Jobs </h1>
                    <p className="text-center mt-3 "> Discover the perfect job or hire talented people easily. Join our
                        platform today!</p>
                    <Link className="animationbtn mt-5 btn text-primary hover:text-secondary bg-secondary hover:bg-primary z-10">All Book</Link>
                </div>
            </div>
           
        </Carousel>
    );
};

export default Banner;