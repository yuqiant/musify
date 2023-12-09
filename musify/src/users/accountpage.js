import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client'; // Import client to use its functions

const AccountPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await client.findUserById(userId);
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Display user's information
  return (
    <div>
      <h1>Account: {user.username}</h1>
      <div>
          <label>First Name: </label>
          <span>{user.firstName}</span> {/* Display first name */}
          <br />
          <label>Last Name: </label>
          <span>{user.lastName}</span> {/* Display last name */}
          <br />
          <label>Role: </label>
          <span>{user.role}</span> {/* Display role */}
      </div>
    </div>
  );
};

export default AccountPage;
