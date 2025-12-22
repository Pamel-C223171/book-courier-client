import React from 'react';
import errorimg from '../../assets/error-404.png'
import { NavLink } from 'react-router';
import Navbar from '../Sheared/Navbar/Navbar';
import Footer from '../Sheared/Footer/Footer';


const Error = () => {
    return (
       <div>
        <Navbar></Navbar>
             <div className='flex flex-col items-center mx-auto bg-base-100 text-center py-14'>
            <img className='mx-auto h-[200px]' src={errorimg} alt="" />
            <div>
                <h2 className='text-3xl font-bold'>Oops, page not found!</h2>
                <p className='text-xs mt-2'>The page you are looking for is not available.</p>
            </div>
            <NavLink to='/'><button className='btn mt-5 bg-primary text-secondary hover:bg-secondary hover:text-primary'>Go Back</button></NavLink>
        </div>
        <Footer></Footer>
        </div>
    );
};

export default Error;