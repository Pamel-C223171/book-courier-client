import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";




const MyProfile = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();





    const handleUpdate = async (data) => {
        const imageFile = data.photo[0];

        const formData = new FormData();
        formData.append('image', imageFile);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        const imgRes = await axios.post(image_API_URL, formData);
        const photoURL = imgRes.data.data.url;

        await updateUserProfile({
            displayName: data.name,
            photoURL: photoURL
        });

        const updatedUser = {
            displayName: data.name,
            photoURL: photoURL
        };

        const res = await axiosSecure.patch(
            `/users/${user.email}`,
            updatedUser
        );

        if (res.data.modifiedCount) {
            alert('Profile updated successfully');
        }
    };




    return (
        <div className=' mx-auto py-10'>
            <div className="card shadow-sm border-4 shadow-2xl border-primary flex flex-col w-1/2 mx-auto h-auto">
                <figure className='p-3'>
                    <img className='h-[300px] w-full rounded-md object-cover'
                        src={user?.photoURL || "https://th.bing.com/th/id/R.2fa57439a24f242faaf2333fe5e9e295?rik=ERIOJB6KU7TNYw&pid=ImgRaw&r=0"}
                        alt="User Image" />
                </figure>

                <div className="my-8 space-y-3 px-5">
                    <p className="font-bold text-2xl">Name: <span className="font-normal">{user.displayName}</span></p>
                    <p className="font-bold text-2xl">Email: <span className="font-normal">{user.email}</span></p>
                </div>

                <div className="mx-auto">
                    <h3 className='text-3xl text-center font-bold'>Update Profile</h3>
                    <p className='text-center'></p>
                    <form onSubmit={handleSubmit(handleUpdate)} className="card-body">
                        <fieldset className="fieldset space-y-2">
                            <label className="label">Name</label>
                            <input type="text" {...register('name', { required: true })} className="input w-full text-black" placeholder="Your name" />
                            {errors.name?.type === 'required' && <p className='text-red-600'>Name is required</p>}

                            <label className="label">Photo</label>
                            <input type="file" {...register('photo')} className="file-input w-full text-black" placeholder="Your Photo" />
                            {errors.photo?.type === 'required' && <p className='text-red-600'>Photo is required</p>}

                            <button className="btn bg-primary text-secondary hover:bg-secondary hover:text-primary mt-4">Update</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;