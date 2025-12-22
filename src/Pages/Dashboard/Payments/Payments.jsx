import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
// import { useParams } from 'react-router';



const Payment = () => {
    // const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // const { data: orders = [] } = useQuery({
    //     queryKey: ['orders'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/orders`);
    //         return res.data;
    //     }
    // })

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders`);
            const myOrders = res.data.filter(o => o.customerEmail === user.email);
            const successPayment = myOrders.filter(o => o.paymentStatus === 'paid');
            console.log('success', successPayment);
            console.log(myOrders);
            return successPayment;

        }
    })

    const statusColor = (status) => {
        const s = status.toLowerCase();
        if (s === 'pending') return 'bg-yellow-400';
        if (s === 'shipped') return 'bg-blue-500';
        if (s === 'delivered') return 'bg-green-600';
        if (s === 'cancelled') return 'bg-red-500';
        return 'bg-gray-400';
    };

    return (
        <div>
            <div className='w-11/12 mx-auto py-14'>
            <h2 className='text-3xl font-bold my-8'>Payment Orders: {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="">
                        <tr>
                            <th>No</th>
                            <th>Book Title</th>
                            <th>Price</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, i) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td>{i + 1}</td>
                                <td>{order.bookName}</td>
                                <td>{order.price}</td>
                                <td>{new Date(order.paymentDate).toLocaleDateString()}</td>

                                <td>
                                    <span
                                        className={`text-white px-2 py-1 rounded ${statusColor(order.orderStatus)}`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </td>

                                <td>
                                    <span className='bg-green-400 p-1'>{order.paymentStatus}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default Payment;