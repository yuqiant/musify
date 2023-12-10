import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import * as userClient from '../users/client'; // Adjust path as needed
import * as songClient from './client'; // Adjust path as needed
import * as playlistClient from '../playlists/client';
import PlaylistComponent from '../playlists/component';
import AdminDashboard from './admindashboard';

const Dashboard = () => {
    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await userClient.findUserById(userId);
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

    const handleAddSong = async (song) => {
        try {
            await songClient.addSong(song);
            alert('Song added successfully');
        } catch (error) {
            console.error('Error adding song:', error);
            alert('Failed to add song');
        }
    };

    const handleEditSong = async (songId, updatedSong) => {
        try {
            await songClient.updateSong(songId, updatedSong);
            alert('Song updated successfully');
        } catch (error) {
            console.error('Error updating song:', error);
            alert('Failed to update song');
        }
    };

    const handleDeleteSong = async (songId) => {
        try {
            await songClient.deleteSong(songId);
            alert('Song deleted successfully');
        } catch (error) {
            console.error('Error deleting song:', error);
            alert('Failed to delete song');
        }
    };

    return (
        <div>
            <p>Hello, {userData.firstName}!</p>

            {userData.role === 'USER' && (
                <div>
                    <h2>Your Playlists</h2>
                    {/* Display playlists here */}
                </div>
            )}

            {userData.role === 'ADMIN' && (
                <div>
                    <h2>Song Management</h2>
                    <AdminDashboard
                        onAddSong={handleAddSong}
                        onEditSong={handleEditSong}
                        onDeleteSong={handleDeleteSong}
                    />
                </div>
            )}

            {userData.role === 'REVIEWER' && (
                <div>
                    <h2>Your Reviews</h2>
                    {/* Display reviews here */}
                </div>
            )}

            {/* Additional role-specific components */}
        </div>
    );
};

export default Dashboard;
