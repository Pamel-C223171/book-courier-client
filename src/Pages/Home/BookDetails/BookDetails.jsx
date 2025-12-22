import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { MdFavoriteBorder } from 'react-icons/md';
import ratingimg from '../../../assets/star.png'

const BookDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    const { data: book = {}, isLoading } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            // console.log(res.data);
            return res.data;
        }
    });

    ////////////////////////////////////////////

    const {
        register,
        handleSubmit,
        control,
        // formState: { errors } 
    } = useForm();

    // const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [... new Set(regionsDuplicate)];
    const customerRegion = useWatch({ control, name: 'customerRegion' });

    const districtsRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const handleOrder = data => {
        data.customerName = user.displayName;
        data.customerEmail = user.email;
        data.orderStatus = 'Pending';
        data.paymentStatus = 'Unpaid';
        data.price = book.price;
        data.orderDate = new Date();
        data.bookId = book._id;
        data.customerId = user.uid;
        data.bookName = book.bookName;
        data.librarianEmail = book.librarianEmail;

        console.log(data);

        Swal.fire({
            title: "Confirm Order?",
            text: `You will be charged ${data.price} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree!"
        }).then( async (result) => {
            if (result.isConfirmed) {

                //save the parcel  info to the database
                await axiosSecure.post('/orders', data)
                    .then(res => {
                        console.log('after saving orders', res.data);
                    })

                Swal.fire({
                    title: "Success!",
                    text: "Order confirmed",
                    icon: "success"
                }).then(() => {
                    document.getElementById('my_modal_5').close();
                });
               
            }
        });

    }
    ////////////////////////////////////////


    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            {/* <h2 className='text-5xl font-bold'>Send A Parcel</h2> */}
            {/* <form className='mt-12 p-4' onSubmit={handleSubmit(handleSendParcel)}> */}

            {/* sender & receiver */}
            {/* book details */}
            <div className='py-14 max-w-6xl mx-auto'>
                <h3 className='font-semibold text-3xl'>Book Details</h3>

                <div className="flex p-3 gap-8 rounded-2xl">
                    <div className='flex-1'>
                        <figure className='rounded-2xl '>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                // src={book.bookPhoto}
                                alt="Shoes" />
                        </figure>
                    </div>
                    <div className="mt-3 flex-1 px-3">
                        <div className='flex items-center justify-between '>
                            <h2 className="card-title font-bold hover:text-primary text-4xl">{book.bookName} </h2>
                            <p className=''><MdFavoriteBorder /></p>
                        </div>
                        <p className='text-2xl font-normal mt-3'>{book.authorName}</p>
                        <div className='mt-3 space-y-3'>
                            <div className='flex'>
                                <img src={ratingimg} alt="" />
                                <img src={ratingimg} alt="" />
                                <img src={ratingimg} alt="" />
                                <img src={ratingimg} alt="" />
                                <img src={ratingimg} alt="" />
                            </div>
                            <p className='text-2xl my-3 font-bold'>Tk. {book.price}</p>
                        </div>
                        {/* <input className='btn bg-primary text-secondary hover:bg-secondary hover:text-primary mt-8' type="submit" value="Send parcel" /> */}
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn bg-primary hover:bg-secondary text-secondary hover:text-primary" onClick={() => document.getElementById('my_modal_5').showModal()}>Order Now!</button>
                        <dialog id="my_modal_5" className="modal modal-bottom  sm:modal-middle">
                            <div className="modal-box ">
                                <div>
                                    <div className="min-h-screen flex items-center justify-center">

                                        <div className="card bg-base-300  w-11/12 md:w-full max-w-xl  shadow-2xl p-10">
                                            <h1 className="text-4xl font-bold text-center">Order</h1>
                                            <div className="">
                                                <form className='mt-8 p-4' onSubmit={handleSubmit(handleOrder)}>
                                                    {/* Customer Info */}
                                                    <fieldset className="fieldset">
                                                        <h3 className='text-3xl font-semibold'>Customer Details</h3>

                                                        {/* Customer name */}
                                                        <label className="label">Customer Name</label>
                                                        <input defaultValue={user?.displayName} readOnly type="text" {...register('customerName')} className="input w-full" placeholder="Customer Name" />

                                                        {/* Customer email */}
                                                        <label className="label">Customer Email</label>
                                                        <input defaultValue={user?.email} readOnly type="email" {...register('customerEmail')} className="input w-full" placeholder="Customer Email" />

                                                        {/* Customer number */}
                                                        <label className="label">Customer Number</label>
                                                        <input type="number" {...register('customerNumber')} className="input w-full" placeholder="Customer Number" required />

                                                        {/* Customer region */}
                                                        <fieldset className="fieldset">
                                                            <legend className="fieldset-legend">Customer Region</legend>
                                                            <select {...register('customerRegion')} defaultValue="Pick a region" className="select w-full" required>
                                                                <option disabled={true}>Pick a region</option>
                                                                {
                                                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                                                }
                                                            </select>
                                                        </fieldset>

                                                        {/* Customer district */}
                                                        <fieldset className="fieldset">
                                                            <legend className="fieldset-legend">Customer District</legend>
                                                            <select {...register('customerDistrict')} defaultValue="Pick a district" className="select w-full" required>
                                                                <option disabled={true}>Pick a District</option>
                                                                {
                                                                    districtsRegion(customerRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                                                }
                                                            </select>
                                                        </fieldset>
                                                        <div>
                                                            <input type="submit" className="btn bg-primary hover:bg-secondary text-secondary hover:text-primary mt-5" value='Confirm'></input>
                                                        </div>

                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn bg-primary hover:bg-secondary text-secondary hover:text-primary">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookDetails;








// {/* <div className="card-actions justify-center">
//     <button onClick={() => handleDetailsBtn(book._id)} className="btn w-full bg-primary text-secondary hover:bg-secondary hover:text-primary">View More</button>
// </div> */}














//    <div>
//         <h2>Book Details</h2>
//         <img src={book.photoURL} alt="" />
//         <p>Author: {book.authorName}</p>
//         <p>Name: {book.bookName}</p>
//         <p>Price: {book.price}</p>

//     </div>