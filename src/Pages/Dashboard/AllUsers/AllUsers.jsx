import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaRegUserCircle, FaUser, FaUserCheck, FaUserEdit, FaUserGraduate, FaUserMinus, FaUserNurse, FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router';
import { MdOutlinePayment } from 'react-icons/md';

const AllUsers = () => {


    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users`);
    //         const currentUser = res.data.filter(u => u.email !== user.email);
    //         return currentUser;
    //     }
    // })

    const { data: users = [], refetch } = useQuery({
    queryKey: ['users', user?.email],
    enabled: !!user?.email,   // 🔥 VERY IMPORTANT
    queryFn: async () => {
        const res = await axiosSecure.get('/users');
        return res.data.filter(u => u.email !== user.email);
    }
});

    const handleToggleAdmin = async (user) => {
        const roleInfo = {role: 'admin'};
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
        .then(res => {
            if(res.data.modifiedCount){
                refetch();
                 Swal.fire({
                            title: "Confirm Admin?",
                            text: `${user.displayName} mark as an admin!`,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000
                        })
            }
        })
    

    };

    const handleToggleLibrarian = async (user) => {
        const roleInfo = {role: 'librarian'};
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
        .then(res => {
            if(res.data.modifiedCount){
                refetch();
                 Swal.fire({
                            title: "Confirm Librarian?",
                            text: `${user.displayName} mark as an librarian!`,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000
                        })
            }
        })
    

    };

    const handleToggleUser = async (user) => {
        const roleInfo = {role: 'user'};
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
        .then(res => {
            if(res.data.modifiedCount){
                refetch();
                 Swal.fire({
                            title: "Confirm User?",
                            text: `${user.displayName} remove an admin!`,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000
                        })
            }
        })
    };

    


    return (
       <div>
         <div className='w-11/12 mx-auto py-14'>
            <h2 className='text-3xl font-bold my-8'>All Users: {users.length}</h2>
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
                                <td><span className={`${user.role === 'admin' ? 'bg-green-400' : user.role === 'librarian' ? 'bg-yellow-400' : 'bg-primary'} p-1`}>{user.role}</span></td>
                                <th>
                                    {
                                        user.role === 'admin' ? <button onClick={() => handleToggleUser(user)} className="bg-green-400 mr-2 text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FiShieldOff /></button> : <button onClick={() => handleToggleAdmin(user)} data-tip="Admin" className="bg-primary mr-2 text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaUserShield /></button>
                                    }
                                    {
                                        user.role === 'librarian' ? <button onClick={() => handleToggleUser(user)} className="bg-yellow-400 mr-2 text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaRegUserCircle /></button> : <button onClick={() => handleToggleLibrarian(user)} data-tip="Admin" className="bg-primary mr-2 text-secondary hover:bg-secondary hover:text-primary rounded-full p-3"><FaUserGraduate /></button>
                                    }



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

export default AllUsers;