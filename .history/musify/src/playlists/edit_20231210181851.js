import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // 如果您使用 React Router

const EditPlaylistPage = () => {
    const { playlistId } = useParams(); // 获取 URL 参数中的 playlistId
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const BASE_API_URL = 'http://localhost:4000';

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/playlists/${playlistId}`);
                setPlaylistName(response.data.name);
                setPlaylistDescription(response.data.description || '');
                setPlaylistDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch playlist details:', error);
            }
        };

        fetchPlaylistDetails();
    }, [playlistId]);


    const handleSave = async () => {
        try {
            await axios.put(`${BASE_API_URL}/playlists/${playlistId}`, {
                name: playlistName,
                description: playlistDescription
            });

            alert('Playlist updated successfully');
        } catch (error) {
            console.error('Failed to update playlist:', error);
            alert('Failed to update playlist');
        }
    };
    return (
        <div>
            <h2>Edit Playlist</h2>
            <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Playlist Name"
            />
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
};

export default EditPlaylistPage;
