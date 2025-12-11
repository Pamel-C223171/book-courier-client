// import React, { useEffect } from 'react';
// import { useLoaderData } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaUser, FaUserEdit, FaUserNurse } from 'react-icons/fa';

const AllUsers = () => {


    const { user } = useAuth();
    //  const axiosSecure = useAxiosSecure();
    //     const { data: books = [], refetch } = useQuery({
    //         queryKey: ['books', user?.email],
    //         queryFn: async () => {
    //             const res = await axiosSecure.get(`/books`);
    //             const myBooks = res.data.filter(b => b.librarianEmail === user.email);
    //             console.log(myBooks);
    //             return myBooks;

    //         }
    //     })

    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            const allUsers = res.data.filter(u => u.email !== user.email);
            return allUsers

        }
    })



    return (
        <div>
            <h2>My Books: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        users.map((user, i) => <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className={`${user.bookStatus === 'Admin' ? 'bg-green-600' : 'bg-blue-400'} p-1`}>{user.role}</span></td>
                                <th>
                                    <button onClick={() => handleEditBtn(user._id)} className="bg-primary text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaUser /></button>
                                    <button onClick={() => handleEditBtn(user._id)} className="bg-primary text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaUserEdit /></button>
                                    <button onClick={() => handleEditBtn(user._id)} className="bg-primary text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaUserNurse /></button>
                                    
                                </th>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default AllUsers;