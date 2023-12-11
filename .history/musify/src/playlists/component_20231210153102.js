

import React, { useState } from 'react';

const PlaylistComponent = ({ playlist }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSongsList = () => {
        console.log(playlist.songs);

        setIsExpanded(!isExpanded); // 切换展开/收起状态
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <div onClick={toggleSongsList} style={{ cursor: 'pointer' }}>

                <h3>{playlist.name}</h3>
                {/* 显示播放列表封面，如果没有封面则显示默认图片 */}
                {/* //                 <img src={playlist.coverImage || 'path/to/default/heart/image.png'} alt={playlist.name} /> */}
            </div>




            {/* <div onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                <h3>{playlist.name}</h3>
            </div> */}
            {isExpanded && (
                <div>
                    {/* {console.log('Songs in Playlist:', playlist.songs)}
                    {console.log('name:', playlist.songs.songName)} */}

                    {playlist.songs.map(song => (


                        <div key={song._id}>{song.songName}</div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default PlaylistComponent;
