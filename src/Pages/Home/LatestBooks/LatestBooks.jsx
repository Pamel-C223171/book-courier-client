import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink, useNavigate } from 'react-router';

const LatestBooks = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/latest-books`);
            // const myBooks = res.data.filter(b => b.librarianEmail === user.email);
            // console.log(myBooks);
            // return myBooks;
            return res.data;
        }
    })

     const handleDetailsBtn = (id) => {
        if (!user) {
            navigate('/login');
        }
        else {
            navigate(`/book-details/${id}`);
            console.log(id);
        }
    }

    return (
        <div>
            <div className='mt-14 w-11/12 mx-auto'>
                <h2 className='text-4xl font-bold'>Latest Jobs</h2>
                <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        books.map(book => 
                            book.bookStatus === 'Published' && (<div key={book._id} className="card p-3 hover:scale-105 rounded-2xl shadow-xl">
                                <figure className='rounded-2xl flex-1'>
                                    <img
                                        src={book.photoBook}
                                        // src={book.bookPhoto}
                                        alt="Shoes" />
                                </figure>
                                <div className="mt-3 flex-1">
                                    <div className='flex-1'>
                                        <h2 className="card-title font-bold hover:text-primary text-2xl justify-center">
                                            {book.bookName}
                                        </h2>
                                        <p className='text-center my-1'>{book.authorName}</p>
                                        <p className='text-center text-xl my-3 font-bold'>Tk. {book.price}</p>
                                    </div>
                                    <div className="card-actions justify-center flex-1">
                                        <button onClick={() => handleDetailsBtn(book._id)} className="btn w-full bg-primary text-secondary hover:bg-secondary hover:text-primary">View More</button>
                                    </div>
                                </div>
                            </div>)
                        )
                    }
                </div>

                <div className=' mt-10 flex justify-center'>
                    <NavLink to='/all-books'><button className='btn bg-primary hover:bg-secondary text-secondary hover:text-primary'>View All Books</button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default LatestBooks; <h2>latest books</h2>