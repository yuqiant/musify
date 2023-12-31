import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import * as userClient from '../users/client'; // Adjust path as needed
import * as songClient from './client'; // Adjust path as needed
import * as playlistClient from '../playlists/client';
import PlaylistComponent from '../playlists/component';
import AdminDashboard from './admindashboard';

const Dashboard = () => {
    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await userClient.findUserById(userId);
                    setUserData(response);
                    const playlistsResponse = await playlistClient.getUserPlaylists(userId);
                    // setPlaylists(playlistsResponse);

                    const playlistsDetailPromises = playlistsResponse.map(async (playlist) => {
                        // 假设您有一个函数来获取单个播放列表的详细信息
                        return await playlistClient.getPlaylistDetails(playlist._id);
                    });

                    const playlistsDetails = await Promise.all(playlistsDetailPromises);
                    console.log(playlistsDetails);
                    setPlaylists(playlistsDetails);
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

    const handleDeleteSongFromPlaylist = async (playlistId, songId) => {
        if (window.confirm('Are you sure you want to remove this song from the playlist?')) {
            try {
                // 发送请求到后端 API 删除歌曲
                await playlistClient.deleteSongFromPlaylist(playlistId, songId);

                // 重新获取播放列表数据来更新 UI
                const updatedPlaylists = await playlistClient.getUserPlaylists(userId);
                setPlaylists(updatedPlaylists);
            } catch (error) {
                console.error('Error deleting song from playlist:', error);
                alert('Failed to delete song from playlist');
            }
        }
    };


    const handleEditPlaylist = (playlistId) => {
        navigate(`/edit-playlist/${playlistId}`);
    };



    return (
        <div>
            <p>Hello, {userData.firstName}!</p>

            {userData.role === 'USER' && (
                <div>
                    <h2>Your Playlists</h2>
                    <div>
                        {playlists.map(playlist => (
                            <PlaylistComponent key={playlist._id} playlist={playlist} onDeleteSong={handleDeleteSongFromPlaylist}
                            />
                        ))}
                    </div>
                </div>
            )}

            {userData.role === 'ADMIN' && (
                <div>
                    <h2>Song Management</h2>
                    <AdminDashboard
                        onAddSong={handleAddSong}
                        onEditSong={handleEditSong}
                        onDeleteSong={handleDeleteSong}
                        onEditPlaylist={handleEditPlaylist}
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
