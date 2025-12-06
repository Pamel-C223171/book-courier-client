import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Sheared/Footer/Footer';
import Navbar from '../Pages/Sheared/Navbar/Navbar';

const RootLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;