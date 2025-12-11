import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';

const AllBooks = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            // const myBooks = res.data.filter(b => b.librarianEmail === user.email);
            // console.log(myBooks);
            // return myBooks;
            return res.data;

        }
    })

    const handleDetailsBtn = (id) => {
        if(!user){
            navigate('/login');
        }
        else{
            navigate(`/book-details/${id}`);
            console.log(id);
        }
    }

    return (
        <div className='py-14 bg-base-300'>


            <div className='w-11/12 mx-auto'>
                <h2 className='text-4xl font-bold text-center'>All Books: {books.length}</h2>
                <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        books.map(book => <div className="card p-3 hover:scale-105 rounded-2xl shadow-xl">
                            <figure className='rounded-2xl '>
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    // src={book.bookPhoto}
                                    alt="Shoes" />
                            </figure>
                            <div className="mt-3">
                                <h2 className="card-title font-bold hover:text-primary text-2xl justify-center">
                                    {book.bookName}
                                </h2>
                                <p className='text-center my-1'>{book.authorName}</p>
                                <p className='text-center text-xl my-3 font-bold'>Tk. {book.price}</p>
                                <div className="card-actions justify-center">
                                    <button onClick={() => handleDetailsBtn(book._id)} className="btn w-full bg-primary text-secondary hover:bg-secondary hover:text-primary">View More</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>

            </div>











        </div>
    );
};

export default AllBooks;