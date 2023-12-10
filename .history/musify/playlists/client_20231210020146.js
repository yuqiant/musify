
import axios from 'axios';

const BASE_API_URL = 'http://localhost:4000'; // Adjust accordingly




const getUserPlaylists = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/playlists`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error; // 重新抛出错误，以便调用者可以捕获并处理它
    }
};

// 您可以继续添加更多函数，例如更新播放列表、删除播放列表等

export {
    getUserPlaylists,

};
