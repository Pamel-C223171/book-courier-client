import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const EditBook = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    // const { user } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        // control,
        // formState: { errors } 
    } = useForm();

    const { data: book = {} } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            console.log(res.data);
            console.log('book', book);
            return res.data;
        },
        onSuccess: (data) => {
            reset(data);
        }
    });

    const handleUpdate = async (data) => {
        // console.log('After register', data.photo[0]);
        let imageURL = book.photoBook;
      

        if (data.photo && data.photo.length > 0) {
            const formData = new FormData();
            formData.append('image', data.photo[0]);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const imgData = await res.json();
            imageURL = imgData.data.display_url;
        }




        const updatedBook = {
            bookName: data.bookName,
            authorName: data.authorName,
            price: data.price,
            bookStatus: data.bookStatus,
            photoBook: imageURL
        }

        Swal.fire({
            title: "Update Book?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Update"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/books/${id}`, updatedBook);

                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Book updated successfully.", "success");
                    navigate('/dashboard/my-books');
                }

            }
        });

    }



    return (
        <div>
            {/* <h2>edit book</h2> */}
            <form className='p-4 shadow-2xl border-2 border-black w-1/2 my-14 mx-auto'
                onSubmit={handleSubmit(handleUpdate)}>
                {/* add book form */}
                <div className='grid grid-cols-1'>
                    {/* sender */}
                    <fieldset className="fieldset">
                        <h2 className='text-5xl font-bold text-center my-8'>Update Book {book.authorName}</h2>

                        {/* Book name */}
                        <label className="label">Book Name</label>
                        <input type="text" {...register('bookName', {required: true})} className="input w-full" placeholder="Book Name" defaultValue={book.bookName} />

                        {/* Book author name */}
                        <label className="label">Author Name</label>
                        <input type="text" {...register('authorName', {required: true})} className="input w-full" placeholder="Author Name" defaultValue={book.authorName} />

                        <label className="label">Photo</label>
                        <input type="file" {...register('photo')} className="file-input w-full" placeholder="Your Photo" defaultValue={book.photoBook} />

                        {/* Book price */}
                        <label className="label">Price</label>
                        <input type="text" {...register('price', {required: true})} className="input w-full" placeholder="Price" defaultValue={book.price} />


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Status</legend>
                            <select {...register('bookStatus')} defaultValue={book.bookStatus} className="select w-full">
                                {/* <option>Pick a status</option> */}
                                <option>Published</option>
                                <option>Unpublished</option>

                            </select>
                        </fieldset>

                    </fieldset>

                </div>
                <input className='btn bg-primary w-1/2 text-secondary hover:bg-secondary hover:text-primary mt-8' type="submit" value="Update" />
            </form>
        </div>
    );
};

export default EditBook;