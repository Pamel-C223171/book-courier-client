// import React, { useEffect } from 'react';
// import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();


  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get('/users');
      const user = res.data[0];
      console.log('all users:', user);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchUsers();

    return (
        <div>
            <h2>all users </h2>
            {/* {
                user.map(u => <p>{u}</p>)
            } */}
        </div>
    );
};

export default AllUsers;