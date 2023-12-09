// Dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import * as client from './client'; // Ensure you have a client.js that contains the necessary API calls

const Dashboard = () => {
    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await client.findUserById(userId);
                    setUserData(response);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    // Display user-specific data
    return (
        <div>
            <h1>User Dashboard</h1>
            <p>Welcome back, {userData.firstName}!</p>
            {/* Display more user-specific data here */}
        </div>
    );
};

export default Dashboard;
