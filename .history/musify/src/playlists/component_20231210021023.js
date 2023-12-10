// import React, { useState } from 'react';

// const PlaylistComponent = ({ playlist }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div>
//             <div onClick={() => setIsOpen(!isOpen)}>
//                 <h3>{playlist.name}</h3>
//                 {/* <img src={playlist.coverImage || 'path/to/default/heart/image.png'} alt="Playlist cover" /> */}
//             </div>
//             {isOpen && (
//                 <div>
//                     {playlist.songs.map(song => (
//                         <div key={song.id}>{song.name}</div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PlaylistComponent;

import React, { useState } from 'react';

const PlaylistComponent = ({ playlist }) => {
    // 使用useState钩子来控制歌曲列表的展开和收起
    const [isExpanded, setIsExpanded] = useState(false);

    // 这个函数会在用户点击播放列表时被调用
    const toggleSongsList = () => {
        setIsExpanded(!isExpanded); // 切换展开/收起状态
    };

    return (
        <div>
            {/* 这里是点击事件触发器，会展示或隐藏歌曲列表 */}
            <div onClick={toggleSongsList} style={{ cursor: 'pointer' }}>
                {/* 显示播放列表名称 */}
                <h3>{playlist.name}</h3>
                {/* 显示播放列表封面，如果没有封面则显示默认图片 */}
                <img src={playlist.coverImage || 'path/to/default/heart/image.png'} alt={playlist.name} />
            </div>

            {/* 根据isExpanded的值展示歌曲列表 */}
            {isExpanded && (
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
