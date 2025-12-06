import React from 'react';
import logo from '../../assets/logo3.jpg';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center'>
                <img className='h-[45px] w-[45px] mr-5 rounded-xl' src={logo} alt="" />
                <h2 className="text-3xl font-bold -ms-2.5">Book Courirer</h2>
            </div></Link>
    );
};

export default Logo;