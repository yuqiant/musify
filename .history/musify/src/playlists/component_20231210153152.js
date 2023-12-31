

import React, { useState } from 'react';

const PlaylistComponent = ({ playlist, onDeleteSong }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleDeleteClick = (songId) => {
        if (window.confirm('Are you sure you want to delete this song from the playlist?')) {
            onDeleteSong(playlist._id, songId);
        }
    };
    const toggleSongsList = () => {
        console.log(playlist.songs);

        setIsExpanded(!isExpanded); // 切换展开/收起状态
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <div onClick={toggleSongsList} style={{ cursor: 'pointer' }}>
                <h3>{playlist.name}</h3>
            </div>

            {isExpanded && (
                <div>

                    {playlist.songs.map(song => (


                        <div key={song._id}>{song.songName}</div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default PlaylistComponent;
