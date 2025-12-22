import React from 'react';
import { FaShippingFast, FaBookOpen, FaUsers, FaHeadset } from 'react-icons/fa';

const WhyChooseBookCourier = () => {
    return (
        <section className="bg-gray-50 py-20">
            <div className="w-11/12 mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Choose Book Courier</h2>
                <p className="text-gray-600 mb-12">
                    Discover the benefits of choosing BookCourier for all your book delivery needs. Fast, reliable, and convenient.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Fast Delivery */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="text-primary  text-4xl mb-4">
                            <FaShippingFast />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                        <p className="text-gray-500 text-sm">
                            Get your books delivered to your doorstep quickly and safely.
                        </p>
                    </div>

                    {/* Wide Selection */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="text-primary text-4xl mb-4">
                            <FaBookOpen />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                        <p className="text-gray-500 text-sm">
                            Thousands of books from all genres available in one place.
                        </p>
                    </div>

                    {/* Trusted Service */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="text-primary text-4xl mb-4">
                            <FaUsers />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Trusted Service</h3>
                        <p className="text-gray-500 text-sm">
                            Reliable service with happy customers all over the country.
                        </p>
                    </div>

                    {/* 24/7 Support */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="text-primary text-4xl mb-4">
                            <FaHeadset />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-500 text-sm">
                            Our friendly team is always ready to assist you anytime.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseBookCourier;
