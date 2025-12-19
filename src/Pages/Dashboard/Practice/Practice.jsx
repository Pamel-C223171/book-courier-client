// // import React, { useEffect } from 'react';
// // import { useLoaderData } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAuth from '../../../hooks/useAuth';

// const Orders = () => {

//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();
//     // const { data: orders = [] } = useQuery({
//     //     queryKey: ['orders'],
//     //     queryFn: async () => {
//     //         const res = await axiosSecure.get(`/orders`);
//     //         // const myBooks = res.data.filter(b => b.librarianEmail === user.email);
//     //         console.log(res.data);
//     //         return res.data;

//     //     }
//     // })

//     // const { data: orderBook = [] } = useQuery({
//     //     queryKey: ['book'],
//     //     queryFn: async () => {
//     //         const res = await axiosSecure.get(`/books`);
//     //         const ordersBooks = res.data.filter(b => b._id === orders.map(o => o.bookId));
//     //         console.log('ordersBooks', ordersBooks);
//     //         return ordersBooks;
//     //         // orders[0].bookId
//     //     }
//     // });


//     const { data: orders = [], refetch } = useQuery({
//         queryKey: ['orders'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/orders');
//             console.log('orders', orders);
//             return res.data;
//         }
//     });

//     const { data: orderBook = [] } = useQuery({
//         queryKey: ['orderBooks', orders],
//         enabled: orders.length > 0,
//         queryFn: async () => {
//             const res = await axiosSecure.get('/books');

//             const bookIds = orders.map(o => o.bookId);

//             const ordersBooks = res.data.filter(b =>
//                 bookIds.includes(b._id)
//             );

//             console.log('ordersBooks', ordersBooks);
//             return ordersBooks;
//         }
//     });


//     console.log("orderBoooook", orderBook);

//     // const handleEditBtn = async (id) => {

//     //     // navigate(`edit-book/${id}`)

//     //     try{
//     //         const status = {orderStatus: 'Shipped'}
//     //         const res = await axiosSecure.patch(`/orders/${id}`, status);
//     //         console.log('updated', res.data);
//     //         refetch();
//     //     }
//     //     catch(error) {
//     //         console.log(error);
//     //     }
//     //        { orders.orderStatus = 'Shipped'};
//     // }


//     const handleEditBtn = async (id) => {
//         try {
//             const status = { orderStatus: 'Shipped' };
//             const res = await axiosSecure.patch(`/orders/${id}`, status);
//             console.log('updated', res.data);

//             refetch(); // react-query দিয়ে data আবার আনবে
//         } catch (error) {
//             console.log(error);
//         }
//     };


//     return (
//         <div>
//             <h2>My Books: {orders.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>No</th>
//                             <th>Customer Name</th>
//                             <th>Order Status</th>
//                             <th>Payment Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     {
//                         orders.map((order, i) => <tbody key={i}>
//                             {/* row 1 */}
//                             <tr>
//                                 <th>{i + 1}</th>
//                                 <td>
//                                     <div className="flex items-center gap-3">
//                                         <div className="avatar">
//                                             <div className="mask mask-squircle h-12 w-12">
//                                                 <img
//                                                     src={order.photoBook}
//                                                     alt="Avatar Tailwind CSS Component" />
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <div className="font-bold">{order.customerName}</div>
//                                             <div className="text-sm opacity-50">{order.customerEmail}</div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td><span className={`${order.bookStatus === 'Published' ? 'bg-green-600' : 'bg-red-400'} p-1`}>{order.orderStatus}</span></td>
//                                 <td><span className={`${order.bookStatus === 'Published' ? 'bg-green-600' : 'bg-red-400'} p-1`}>{order.paymentStatus}</span></td>

//                                 <th>
//                                     <button onClick={() => handleEditBtn(order._id)} className="btn bg-primary text-secondary hover:bg-secondary hover:text-primary btn-xs p-3">Confirm</button>
//                                     <button onClick={() => handleEditBtn(order._id)} className="btn bg-primary text-secondary hover:bg-secondary hover:text-primary btn-xs p-3">Cancel</button>
//                                 </th>
//                             </tr>
//                         </tbody>)
//                     }
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Orders;












// // import React, { useEffect } from 'react';
// // import { useLoaderData } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAuth from '../../../hooks/useAuth';
// import { FaRegUserCircle, FaUser, FaUserCheck, FaUserEdit, FaUserGraduate, FaUserMinus, FaUserNurse, FaUserShield } from 'react-icons/fa';
// import { FiShieldOff } from 'react-icons/fi';
// import Swal from 'sweetalert2';
// import { NavLink } from 'react-router';
// import { MdOutlinePayment } from 'react-icons/md';

// const AllUsers = () => {


//     const { user } = useAuth();

//     const axiosSecure = useAxiosSecure();
//     // const { data: users = [] } = useQuery({
//     //     queryKey: ['users'],
//     //     queryFn: async () => {
//     //         const res = await axiosSecure.get(`/users`);
//     //         const allUsers = res.data.filter(u => u.email !== user.email);
//     //         return allUsers;

//     //     }
//     // })

//     const { data: users = [], refetch } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users`);
//             const currentUser = res.data.filter(u => u.email !== user.email);
//             return currentUser;
//         }
//     })

//     const handleToggleAdmin = async (user) => {
//         const roleInfo = {role: 'admin'};
//         axiosSecure.patch(`/users/${user._id}`, roleInfo)
//         .then(res => {
//             if(res.data.modifiedCount){
//                 refetch();
//                  Swal.fire({
//                             title: "Confirm Admin?",
//                             text: `${user.displayName} mark as an admin!`,
//                             icon: "success",
//                             showConfirmButton: false,
//                             timer: 2000
//                         })
//             }
//         })
    

//     };

//     const handleToggleLibrarian = async (user) => {
//         const roleInfo = {role: 'librarian'};
//         axiosSecure.patch(`/users/${user._id}`, roleInfo)
//         .then(res => {
//             if(res.data.modifiedCount){
//                 refetch();
//                  Swal.fire({
//                             title: "Confirm Librarian?",
//                             text: `${user.displayName} mark as an librarian!`,
//                             icon: "success",
//                             showConfirmButton: false,
//                             timer: 2000
//                         })
//             }
//         })
    

//     };

//     const handleToggleUser = async (user) => {
//         const roleInfo = {role: 'user'};
//         axiosSecure.patch(`/users/${user._id}`, roleInfo)
//         .then(res => {
//             if(res.data.modifiedCount){
//                 refetch();
//                  Swal.fire({
//                             title: "Confirm User?",
//                             text: `${user.displayName} remove an admin!`,
//                             icon: "success",
//                             showConfirmButton: false,
//                             timer: 2000
//                         })
//             }
//         })
//     };

    


//     return (
//         <div>
//             <h2>My Users: {users.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>No</th>
//                             <th>Name</th>
//                             <th>Role</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     {
//                         users.map((user, i) => <tbody>
//                             {/* row 1 */}
//                             <tr>
//                                 <th>{i + 1}</th>
//                                 <td>
//                                     <div className="flex items-center gap-3">
//                                         <div className="avatar">
//                                             <div className="mask mask-squircle h-12 w-12">
//                                                 <img
//                                                     src={user.photoURL}
//                                                     alt="Avatar Tailwind CSS Component" />
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <div className="font-bold">{user.displayName}</div>
//                                             <div className="text-sm opacity-50">{user.email}</div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td><span className={`${user.role === 'admin' ? 'bg-green-400' : user.role === 'librarian' ? 'bg-yellow-400' : 'bg-primary'} p-1`}>{user.role}</span></td>
//                                 <th>
//                                     {
//                                         user.role === 'admin' ? <button onClick={() => handleToggleUser(user)} className="bg-green-400 mr-2 text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FiShieldOff /></button> : <button onClick={() => handleToggleAdmin(user)} data-tip="Admin" className="bg-primary mr-2 text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaUserShield /></button>
//                                     }
//                                     {
//                                         user.role === 'librarian' ? <button onClick={() => handleToggleUser(user)} className="bg-yellow-400 mr-2 text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaRegUserCircle /></button> : <button onClick={() => handleToggleLibrarian(user)} data-tip="Admin" className="bg-primary mr-2 text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaUserGraduate /></button>
//                                     }



//                                 </th>
//                             </tr>
//                         </tbody>)
//                     }
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllUsers;













// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useState } from 'react';

// const ManageBooks = () => {
//   const axiosSecure = useAxiosSecure();
//   const [loading, setLoading] = useState(false);

//   const { data: books = [], refetch } = useQuery({
//     queryKey: ['books'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/books');
//       return res.data;
//     }
//   });

//   const handleTogglePublish = async (book) => {
//     try {
//       setLoading(true);
//       const newStatus = book.bookStatus === 'Published' ? 'Unpublished' : 'Published';
//       await axiosSecure.patch(`/books/${book._id}`, { bookStatus: newStatus });
//       refetch();
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const handleDeleteBook = async (bookId) => {
//     try {
//       const confirm = window.confirm('Are you sure you want to delete this book and all its orders?');
//       if (!confirm) return;

//       setLoading(true);
//       // 1. Delete book
//       await axiosSecure.delete(`/books/${bookId}`);
//       // 2. Delete all orders related to this book
//       await axiosSecure.delete(`/orders/book/${bookId}`);
//       refetch();
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Manage Books: {books.length}</h2>

//       {loading && <p className="text-sm text-gray-500 mb-2">Processing...</p>}

//       <div className="overflow-x-auto">
//         <table className="table w-full border">
//           <thead className="bg-gray-200">
//             <tr>
//               <th>No</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Librarian</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {books.map((book, i) => (
//               <tr key={book._id} className="hover:bg-gray-50">
//                 <td>{i + 1}</td>
//                 <td>{book.bookName}</td>
//                 <td>{book.authorName}</td>
//                 <td>{book.librarianName || book.librarianEmail}</td>

//                 <td>
//                   <span
//                     className={`text-white px-2 py-1 rounded ${
//                       book.bookStatus === 'Published' ? 'bg-green-600' : 'bg-red-500'
//                     }`}
//                   >
//                     {book.bookStatus}
//                   </span>
//                 </td>

//                 <td className="space-x-2">
//                   {/* Publish / Unpublish */}
//                   <button
//                     onClick={() => handleTogglePublish(book)}
//                     className={`px-2 py-1 rounded text-white text-xs ${
//                       book.bookStatus === 'Published' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
//                     }`}
//                   >
//                     {book.bookStatus === 'Published' ? 'Unpublish' : 'Publish'}
//                   </button>

//                   {/* Delete */}
//                   <button
//                     onClick={() => handleDeleteBook(book._id)}
//                     className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageBooks;
