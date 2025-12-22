// import React, { useEffect } from 'react';
// import { useLoaderData } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

const MyBooks = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure(); 
    const navigate = useNavigate();
    const { data: books = [] } = useQuery({
        queryKey: ['books', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            const myBooks = res.data.filter(b => b.librarianEmail === user.email);
            console.log(myBooks);
            return myBooks;

        }
    })

    const handleEditBtn = async (id) => {

        navigate(`/dashboard/edit-book/${id}`)

    }



    return (
        <div>
            <div className='w-11/12 mx-auto py-14'>
            <h2 className='text-3xl font-bold my-8'>My Books: {books.length}</h2>
            <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            books.map((book, i) => <tbody key={i}>
                            {/* row 1 */}
                            <tr>
                                <th>{i+1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={book.photoBook}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{book.bookName}</div>
                                            <div className="text-sm opacity-50">{book.authorName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className={`${book.bookStatus === 'Published'? 'bg-green-600' : 'bg-red-400'} p-1`}>{book.bookStatus}</span></td>
                                <th>
                                    <button onClick={() => handleEditBtn(book._id)} className="btn bg-primary text-secondary hover:bg-secondary hover:text-primary btn-xs p-3">Edit</button>
                                </th>
                            </tr>
                        </tbody>)
                        }
                    </table>
                </div>
        </div>
        </div>
    );
};

export default MyBooks;



