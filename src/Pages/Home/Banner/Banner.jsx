import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerimg1 from '../../../assets/banner/banner1.jpg';
import bannerimg2 from '../../../assets/banner/banner2.jpg';
import bannerimg3 from '../../../assets/banner/banner3.jpeg';
// import logo from '../../../assets/logo3.jpg';
import { Link } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Logo from '../../../Components/Logo/Logo';


const Banner = () => {

     useGSAP(() => {
        const t1 = gsap.timeline({ repeat: 1, yoyo: true })
        const t2 = gsap.timeline({ repeat: Infinity, yoyo: true })
        const t3 = gsap.timeline({ repeat: Infinity, yoyo: true })

        t1.to('.animation', { duration: 1, scale: 0.3, color: '#d1b787', rotate: 360 });
        t2.to('.animationbtn', { duration: 2, scale: 1.2 });
        t3.to('.animationdiv', { duration: 1, scale: 0.3, color: '#d1b787', rotate: 360 });
    })

    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            <div className='flex bg-primary items-center text-start h-[500px]'>
                <div className='flex-1 pl-5'>
                    {/* <div className='w-[100px] h-[100px] animationdiv'><img src={logo} alt="" /></div> */}
                    <h1 className="text-5xl font-bold"><span className="text-5xl">Book Courier </span><br />at Your Doorstep</h1>
                    <p className="mt-3"> Send, track, and receive books safely with our trusted book courier platform. <br />Fast delivery, secure handling, and real-time tracking.</p>
                    <Link className="animationbtn mt-5 btn text-primary hover:text-secondary bg-secondary hover:bg-primary">All Book</Link>
                </div>
                <div className='flex-1 h-full'>
                    <img className='h-full animation' src={bannerimg1} />
                </div>
            </div>
            <div className='flex bg-primary items-center text-start h-[500px]'>
                <div className='flex-1 pl-5'>
                    <h1 className="text-5xl text-black font-bold"><span className="text-5xl">Book Courier </span><br />at Your Doorstep</h1>
                    <p className="mt-3"> Send, track, and receive books safely with our trusted book courier platform. <br />Fast delivery, secure handling, and real-time tracking.</p>
                    <Link className="animationbtn mt-5 btn text-primary hover:text-secondary bg-secondary hover:bg-primary">All Book</Link>
                </div>
                <div className='flex-1 h-full'>
                    <img className='h-full animation' src={bannerimg2} />
                </div>
            </div>
            <div className='flex bg-primary items-center text-start h-[500px]'>
                <div className='flex-1 pl-5'>
                    <h1 className="text-5xl font-bold"><span className="text-5xl">Book Courier </span><br />at Your Doorstep</h1>
                    <p className="mt-3"> Send, track, and receive books safely with our trusted book courier platform. <br />Fast delivery, secure handling, and real-time tracking.</p>
                    <Link className="animationbtn mt-5 btn text-primary hover:text-secondary bg-secondary hover:bg-primary">All Book</Link>
                </div>
                <div className='flex-1 h-full'>
                    <img className='h-full animation' src={bannerimg3} />
                </div>
            </div>

        </Carousel>
    );
};

export default Banner;