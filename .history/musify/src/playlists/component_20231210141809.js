// import React, { useState } from 'react';

// const PlaylistComponent = ({ playlist }) => {
//     // 使用useState钩子来控制歌曲列表的展开和收起
//     const [isExpanded, setIsExpanded] = useState(false);

//     // 这个函数会在用户点击播放列表时被调用
//     const toggleSongsList = () => {
//         console.log(playlist.songs);
//         setIsExpanded(!isExpanded); // 切换展开/收起状态
//     };

//     return (
//         <div>
//             {/* 这里是点击事件触发器，会展示或隐藏歌曲列表 */}
//             <div onClick={toggleSongsList} style={{ cursor: 'pointer' }}>
//                 {/* 显示播放列表名称 */}
//                 <h3>{playlist.name}</h3>
//                 {/* 显示播放列表封面，如果没有封面则显示默认图片 */}
//                 <img src={playlist.coverImage || 'path/to/default/heart/image.png'} alt={playlist.name} />
//             </div>

//             {/* 根据isExpanded的值展示歌曲列表 */}
//             {isExpanded && (
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
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSongsList = () => {
        console.log(playlist.songs);
        console.log(playlist.songs.songName);

        setIsExpanded(!isExpanded); // 切换展开/收起状态
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <div onClick={toggleSongsList} style={{ cursor: 'pointer' }}>
                {/* 显示播放列表名称 */}
                <h3>{playlist.name}</h3>
                {/* 显示播放列表封面，如果没有封面则显示默认图片 */}
                {/* //                 <img src={playlist.coverImage || 'path/to/default/heart/image.png'} alt={playlist.name} /> */}
            </div>




            {/* <div onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                <h3>{playlist.name}</h3>
            </div> */}
            {isExpanded && (
                <div>
                    {console.log('Songs in Playlist:', playlist.songs)}
                    {console.log('name:', playlist.songs.songName)}

                    {playlist.songs.map(song => (


                        <div key={song._id}>{song.songName}</div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default PlaylistComponent;
