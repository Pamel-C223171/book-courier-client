import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const BookDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: book = {}, isLoading } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Book Details</h2>
            <p>Author: {book.authorName}</p>
            <p>Name: {book.bookName}</p>
            <p>Price: {book.price}</p>
        </div>
    );
};

export default BookDetails;
