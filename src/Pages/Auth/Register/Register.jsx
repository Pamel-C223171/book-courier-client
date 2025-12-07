import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit, formState: {errors} } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    const handleRegistration = (data) => {
        console.log('After register', data.photo[0]);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
        .then(result => {
            console.log(result.user);
            const formData = new FormData();
            formData.append('image', profileImg);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

            axios.post(image_API_URL, formData)
            .then(res => {
                console.log('After image upload', res.data.data.url);

                const userProfile = {
                    displayName : data.name,
                    photoURL : res.data.data.url
                }
                updateUserProfile(userProfile)
                .then( () => {
                    console.log('User updated profile done');
                    navigate(location.state || '/');
                })
                .catch(error => console.log(error))
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className=''>
           <div className="card mx-auto border-2 border-white text-white py-8 w-full max-w-md shrink-0 shadow-2xl">
                <h3 className='text-3xl text-center font-bold'>Create an Account</h3>
                <p className='text-center'>Please Register</p>
                <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
                    <fieldset className="fieldset space-y-2">
                        <label className="label text-white">Name</label>
                        <input type="text" {...register('name', {required: true})} className="input w-full" placeholder="Your name" />
                        {errors.name?.type==='required' && <p className='text-red-600'>Name is required</p>}
                        
                        <label className="label text-white">Photo</label>
                        <input type="file" {...register('photo', {required: true})} className="file-input w-full" placeholder="Your Photo" />
                        {errors.photo?.type==='required' && <p className='text-red-600'>Photo is required</p>}
                        
                        <label className="label text-white">Email</label>
                        <input type="email" {...register('email', {required: true})} className="input w-full" placeholder="Email" />
                        {errors.email?.type==='required' && <p className='text-red-600'>Email is required</p>}

                        <label className="label text-white">Password</label>
                        <input type="password" {...register('password', {required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/})} className="input w-full" placeholder="Password" />
                        {errors.password?.type==='required' && <p className='text-red-600'>Password is required</p>}
                        {errors.password?.type==='minLength' && <p className='text-red-600'>Password must be at least 6 character</p>}
                        {errors.password?.type==='pattern' && <p className='text-red-600'>Password must be at least one uppercase one lowercase one number and one special character</p>}

                        <button className="btn bg-primary text-secondary hover:bg-secondary hover:text-primary mt-4">Register</button>
                        <div className='mt-3'>Already have an account? <Link state={location.state} to='/login' className='text-primary font-bold hover:text-secondary'>Login</Link></div>
                    </fieldset>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;