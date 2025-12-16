import React from 'react';
import { useForm } from 'react-hook-form';
// import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
// import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddBook = () => {

    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        // control,
        // formState: { errors } 
    } = useForm();

    

    const axiosSecure = useAxiosSecure();


    const handleAddBook = (data) => {
        // console.log('After register', data.photo[0]);
        const profileImg = data.photo[0];
        // data.username = user.displayName;
        const formData = new FormData();
        formData.append('image', profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
        data.photoBook = image_API_URL; 
        // console.log(data);
        console.log('book photo', image_API_URL);
        data.librarianEmail = user.email;
        data.librarianId = user.uid;
        data.createdAt = new Date();
        console.log(data);



        Swal.fire({
            title: "Add to the Book?",
            text: `You will be charged taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree!"
        }).then( async (result) => {
            if (result.isConfirmed) {

                // axios.post('http://localhost:3000/books', data);

                // save the book info to the database
               await axiosSecure.post('/books', data)
                    .then(res => {
                        console.log('after saving parcel', res.data);
                    })

                Swal.fire({

                    title: "Added successfully!",
                    text: "Your book has been added.",
                    icon: "success"
                });
            }
        });

    }


    return (
        <div>
            <form className='p-4 shadow-2xl border-2 border-black w-1/2 my-14 mx-auto'
                onSubmit={handleSubmit(handleAddBook)}>
                {/* add book form */}
                <div className='grid grid-cols-1'>
                    {/* sender */}
                    <fieldset className="fieldset">
                        <h2 className='text-5xl font-bold text-center my-8'>Add Book</h2>

                        {/* Book name */}
                        <label className="label">Book Name</label>
                        <input type="text" {...register('bookName', { required: true })} className="input w-full" placeholder="Book Name" />

                        {/* Book author name */}
                        <label className="label">Author Name</label>
                        <input type="text" {...register('authorName', { required: true })} className="input w-full" placeholder="Author Name" />

                        <label className="label">Photo</label>
                        <input type="file" {...register('photo', { required: true })} className="file-input w-full" placeholder="Your Photo" />

                        {/* <label className="label">Cover Image</label>
                        <input type="text" {...register('photo', { required: true })} className="input input-bordered w-full" placeholder="Enter Job Image URL" required /> */}

                        {/* Book price */}
                        <label className="label">Price</label>
                        <input type="text" {...register('price', { required: true })} className="input w-full" placeholder="Price" />


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Status</legend>
                            <select {...register('bookStatus', { required: true })} defaultValue="Pick a status" className="select w-full">
                                <option>Pick a status</option>
                                <option>Published</option>
                                <option>Unpublished</option>

                            </select>
                        </fieldset>

                    </fieldset>

                </div>
                <input className='btn bg-primary w-1/2 text-secondary hover:bg-secondary hover:text-primary mt-8' type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddBook;