import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const Orders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch only this librarian's orders
  const { data: orders = [], refetch } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders?librarianEmail=${user.email}`
      );
      return res.data;
    }
  });

  // ✅ Status change logic
  const handleStatusChange = async (id, currentStatus) => {
    const status = currentStatus.toLowerCase();
    let nextStatus = '';

    if (status === 'pending') nextStatus = 'shipped';
    else if (status === 'shipped') nextStatus = 'delivered';
    else if (status === 'delivered') nextStatus = 'pending';
    else return;

    try {
      await axiosSecure.patch(`/orders/${id}`, {
        orderStatus: nextStatus
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ Cancel order
  const handleCancelOrder = async (id) => {
    try {
      await axiosSecure.patch(`/orders/${id}`, {
        orderStatus: 'cancelled'
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Status color function
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
      <h2 className="text-xl font-bold mb-4">
        Orders: {orders.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Order Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>

                <td>
                  <div className="font-bold">{order.customerName}</div>
                  <div className="text-sm opacity-60">
                    {order.customerEmail}
                  </div>
                </td>

                <td>
                  <span
                    className={`text-white px-2 py-1 rounded ${statusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td>
                  <span className="px-2 py-1 rounded bg-gray-200">
                    {order.paymentStatus}
                  </span>
                </td>

                <td className="space-x-2">
                  {/* Next Status button */}
                  <button
                    disabled={
                      ['delivered', 'cancelled'].includes(
                        order.orderStatus.toLowerCase()
                      )
                    }
                    onClick={() =>
                      handleStatusChange(order._id, order.orderStatus)
                    }
                    className="btn btn-xs bg-primary text-white"
                  >
                    Next Status
                  </button>

                  {/* Cancel button */}
                  <button
                    disabled={order.orderStatus.toLowerCase() !== 'pending'}
                    onClick={() => handleCancelOrder(order._id)}
                    className="btn btn-xs bg-red-500 text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

