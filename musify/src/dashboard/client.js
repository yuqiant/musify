import axios from 'axios';

const BASE_API_URL = 'http://localhost:4000/api'; // Adjust accordingly

export const addSong = async (songData) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/songs`, songData);
        return response.data;
    } catch (error) {
        throw error;
    }
};