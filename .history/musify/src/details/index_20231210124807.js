// import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../navbar';
// import UserContext from './userContext';

// function SongDetails() {
//     const { id } = useParams();
//     const { user, isAuthenticated } = useContext(UserContext);
//     const [song, setSong] = useState(null);
//     const [playlists, setPlaylists] = useState([]);
//     const [selectedPlaylist, setSelectedPlaylist] = useState('');
//     const REMOTE_API_URL = "http://localhost:4000";

//     useEffect(() => {
//         // 获取歌曲详情
//         axios.get(`${REMOTE_API_URL}/details/${song._id}`)
//             .then(response => setSong(response.data))
//             .catch(error => console.error('Error fetching song details:', error));

//         // 如果用户已登录，获取其播放列表
//         if (isAuthenticated) {
//             axios.get(`${REMOTE_API_URL}/users/${user.id}/playlists`)
//                 .then(response => setPlaylists(response.data))
//                 .catch(error => console.error('Error fetching playlists:', error));
//         }
//     }, [id, user, isAuthenticated]);

//     const handleAddSong = () => {
//         if (!isAuthenticated) {
//             alert('Please log in to add songs to your list.');
//             return;
//         }
//         if (!selectedPlaylist) {
//             alert('Please select a playlist.');
//             return;
//         }
//         axios.post(`${REMOTE_API_URL}/playlists/${selectedPlaylist}/add-song`, { songId: id })
//             .then(response => alert('Song added to your list!'))
//             .catch(error => console.error('Error adding song:', error));
//     };

//     if (!song) return <div>Loading song details...</div>;

//     return (
//         <div>
//             <div>
//                 <Navbar />
//             </div>
//             <h2>{song.title}</h2>
//             {/* 其他歌曲信息 */}
//             {isAuthenticated && (
//                 <>
//                     <select
//                         value={selectedPlaylist}
//                         onChange={(e) => setSelectedPlaylist(e.target.value)}
//                     >
//                         <option value="">Select a Playlist</option>
//                         {playlists.map((playlist, index) => (
//                             <option key={index} value={playlist.id}>
//                                 {playlist.name}
//                             </option>
//                         ))}
//                     </select>
//                     <button onClick={handleAddSong}>Add to My List</button>
//                 </>
//             )}
//         </div>
//     );
// }

// export default SongDetails;


import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
// import UserContext from '../userContext';
import { AuthContext } from '../AuthContext';
import "./index.css";

function SongDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, userId } = useContext(AuthContext);
    // const { user, isAuthenticated } = useContext(UserContext);
    const [song, setSong] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const REMOTE_API_URL = "http://localhost:4000";
    const goToDashboard = () => {
        navigate('/dashboard'); // 使用你的dashboard路由路径替换'/dashboard'
    };


    useEffect(() => {
        // 定义一个异步函数
        const fetchSongDetails = async () => {
            try {
                const songResponse = await axios.get(`${REMOTE_API_URL}/details/${id}`);
                setSong(songResponse.data);
                console.log("current authenticated:", isAuthenticated);

                if (isAuthenticated && userId) {
                    const playlistsResponse = await axios.get(`${REMOTE_API_URL}/users/${userId}/playlists`);
                    setPlaylists(playlistsResponse.data);
                    console.log("Response data:", playlistsResponse.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSongDetails();
    }, [id, userId, isAuthenticated]);


    const handleAddSong = () => {
        if (!isAuthenticated) {
            alert('Please log in to add songs to your list.');
            return;
        }
        if (!selectedPlaylist) {
            alert('Please select a playlist.');
            return;
        }
        console.log("song id is:", id);
        console.log("playlist id is:", selectedPlaylist);
        axios.post(`${REMOTE_API_URL}/playlists/${selectedPlaylist}/add-song`, { songId: id })
            .then(response => alert('Song added to your list!'))
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.status === 400) {
                        alert('Song already in the playlist.');
                    } else {
                        alert('Error adding song: ' + error.response.data);
                    }
                    console.error('Error data:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Error request:', error.request);
                    alert('No response received from server.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                    alert('Error adding song: ' + error.message);
                }
            });

    };

    if (!song) return <div>Loading song details...</div>;

    return (
        <div className="song-details-container">
            <br />

            <div class="row">
                <div class="col-md-6 text-end">
                    <h2>Song Name:</h2>
                </div>
                <div class="col-md-6">
                    <h2>{song.songName}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 text-end">
                    <h2>Album Name:</h2>
                </div>
                <div class="col-md-6">
                    <h2>{song.albumName}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 text-end">
                    <h2>Artist Name:</h2>
                </div>
                <div class="col-md-6">
                    <h2>{song.artistName}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 text-end">
                    <h2>Genre:</h2>
                </div>
                <div class="col-md-6">
                    <h2>{song.genre}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 text-end">
                    <h2>Released Year:</h2>
                </div>
                <div class="col-md-6">
                    <h2>{song.releasedYear}</h2>
                </div>
            </div>


            {isAuthenticated && (
                <div className="select-playlist-container">

                    <select
                        value={selectedPlaylist}
                        onChange={(e) => setSelectedPlaylist(e.target.value)}
                    >
                        <option value="">Select a Playlist</option>
                        {playlists.map((playlist, index) => (
                            <option key={index} value={playlist._id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                    <button className='btn btn-success' onClick={handleAddSong}>Add to My List</button>
                </div>
            )}
        </div>
    );
}

export default SongDetails;
