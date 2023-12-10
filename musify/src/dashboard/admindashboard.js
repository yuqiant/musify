import React, { useState } from 'react';

const AdminDashboard = ({ onAddSong }) => {
    const [song, setSong] = useState({ songName: '', artistName: '', albumName: '', releasedYear: '', genre: '' });

    const handleChange = (e) => {
        setSong({ ...song, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddSong(song);
        setSong({ songName: '', artistName: '', albumName: '', releasedYear: '', genre: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="songName" value={song.songName} onChange={handleChange} placeholder="Song Name" />
            <input name="artistName" value={song.artistName} onChange={handleChange} placeholder="Artist Name" />
            <input name="albumName" value={song.albumName} onChange={handleChange} placeholder="Album Name" />
            <input name="releasedYear" value={song.releasedYear} onChange={handleChange} placeholder="Released Year" />
            <input name="genre" value={song.genre} onChange={handleChange} placeholder="Genre" />
            <button type="submit">Add Song</button>
        </form>
    );
};

export default AdminDashboard;
