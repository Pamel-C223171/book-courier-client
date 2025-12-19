import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['myOrders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?customerEmail=${user.email}`);
            return res.data;
        }
    });

    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books');
            return res.data;
        }
    });

    const ordersWithBook = orders.map(order => {
        const book = books.find(b => b._id === order.bookId);
        return { ...order, bookTitle: book?.title || 'Unknown' };
    });

    const handleCancelOrder = async (id) => {
        try {
            await axiosSecure.patch(`/orders/${id}`, { orderStatus: 'cancelled' });
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handlePayNow = async (id) => {
        // console.log(id);
        navigate(`/dashboard/payments/${id}`);
    };

    const statusColor = (status) => {
        const s = status.toLowerCase();
        if (s === 'pending') return 'bg-yellow-400';
        if (s === 'shipped') return 'bg-blue-500';
        if (s === 'delivered') return 'bg-green-600';
        if (s === 'cancelled') return 'bg-red-500';
        return 'bg-gray-400';
    };

    const paymentColor = (status) => {
        const s = status.toLowerCase();
        if (s === 'paid') return 'bg-green-600';
        if (s === 'unpaid') return 'bg-red-500';
        return 'bg-gray-400';
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Orders: {ordersWithBook.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>No</th>
                            <th>Book Title</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ordersWithBook.map((order, i) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td>{i + 1}</td>
                                <td>{order.bookTitle}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>

                                <td>
                                    <span
                                        className={`text-white px-2 py-1 rounded ${statusColor(order.orderStatus)}`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`text-white px-2 py-1 rounded ${paymentColor(order.paymentStatus)}`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    {/* Cancel button */}
                                    {order.orderStatus && order.orderStatus.trim().toLowerCase() === 'pending' && (
                                        <button
                                            onClick={() => handleCancelOrder(order._id)}
                                            className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                                        >
                                            Cancel
                                        </button>
                                    )}

                                    {/* Pay Now button */}
                                    {order.orderStatus &&
                                        order.orderStatus.trim().toLowerCase() === 'pending' &&
                                        order.paymentStatus &&
                                        order.paymentStatus.trim().toLowerCase() !== 'paid' && (
                                            <button
                                                onClick={() => handlePayNow(order._id)}
                                                className="px-2 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-700"
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
