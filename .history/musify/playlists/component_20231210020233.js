import React, { useState } from 'react';

const PlaylistComponent = ({ playlist }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div onClick={() => setIsOpen(!isOpen)}>
                <h3>{playlist.name}</h3>
                {/* <img src={playlist.coverImage || 'path/to/default/heart/image.png'} alt="Playlist cover" /> */}
            </div>
            {isOpen && (
                <div>
                    {playlist.songs.map(song => (
                        <div key={song.id}>{song.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaylistComponent;
