import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
import UserContext from './userContext';

function SongDetails() {
    const { id } = useParams();
    const { user, isAuthenticated } = useContext(UserContext);
    const [song, setSong] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const REMOTE_API_URL = "http://localhost:4000";

    useEffect(() => {
        // 获取歌曲详情
        axios.get(`${REMOTE_API_URL}/details/${song._id}`)
            .then(response => setSong(response.data))
            .catch(error => console.error('Error fetching song details:', error));

        // 如果用户已登录，获取其播放列表
        if (isAuthenticated) {
            axios.get(`${REMOTE_API_URL}/users/${user.id}/playlists`)
                .then(response => setPlaylists(response.data))
                .catch(error => console.error('Error fetching playlists:', error));
        }
    }, [id, user, isAuthenticated]);

    const handleAddSong = () => {
        if (!isAuthenticated) {
            alert('Please log in to add songs to your list.');
            return;
        }
        if (!selectedPlaylist) {
            alert('Please select a playlist.');
            return;
        }
        axios.post(`${REMOTE_API_URL}/playlists/${selectedPlaylist}/add-song`, { songId: id })
            .then(response => alert('Song added to your list!'))
            .catch(error => console.error('Error adding song:', error));
    };

    if (!song) return <div>Loading song details...</div>;

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <h2>{song.title}</h2>
            {/* 其他歌曲信息 */}
            {isAuthenticated && (
                <>
                    <select
                        value={selectedPlaylist}
                        onChange={(e) => setSelectedPlaylist(e.target.value)}
                    >
                        <option value="">Select a Playlist</option>
                        {playlists.map((playlist, index) => (
                            <option key={index} value={playlist.id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddSong}>Add to My List</button>
                </>
            )}
        </div>
    );
}

export default SongDetails;
