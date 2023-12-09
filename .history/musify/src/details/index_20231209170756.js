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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
// import UserContext from '../userContext';
import { AuthContext } from '../AuthContext';

function SongDetails() {
    const { id } = useParams();
    const { isAuthenticated, userId } = useContext(AuthContext);
    // const { user, isAuthenticated } = useContext(UserContext);
    const [song, setSong] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const REMOTE_API_URL = "http://localhost:4000";

    useEffect(() => {
        // 获取歌曲详情
        axios.get(`${REMOTE_API_URL}/details/${id}`)
            .then(response => setSong(response.data))
            .catch(error => console.error('Error fetching song details:', error));
        console.log("current authenticated:", isAuthenticated)


        // 获取播放列表，只有在用户已登录时
        console.log("userId here: ", userId);
        if (isAuthenticated && userId) {

            axios.get(`${REMOTE_API_URL}/users/${userId}/playlists`)
                .then(response => setPlaylists(response.data))
                .catch(error => console.error('Error fetching playlists:', error));

        }
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
        axios.post(`${REMOTE_API_URL}/playlists/${selectedPlaylist}/add-song`, { songId: id })
            .then(response => alert('Song added to your list!'))
            .catch(error => console.error('Error adding song:', error));
    };

    if (!song) return <div>Loading song details...</div>;

    return (
        <div>
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

            {/* 
            <h2>{song.songName}</h2>
            <h2>{song.albumName}</h2>
            <h2>{song.artistName}</h2>
            <h2>{song.genre}</h2>
            <h2>{song.releasedYear}</h2> */}

            {isAuthenticated && (
                <>
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
                    <button onClick={handleAddSong}>Add to My List</button>
                </>
            )}
        </div>
    );
}

export default SongDetails;
