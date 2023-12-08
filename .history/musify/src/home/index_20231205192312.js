import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Songs');
    const URL = "http://localhost:4000/api/search";

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Search Term:', searchTerm);
        console.log('Search Type:', searchType);
        // Add search logic here
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
    };

    return (
        <div className="App">
            <div className="playlist-section">
                <br /><br />
                <h2 className="playlist-heading">Make your Playlist</h2>
                <br /><br />
                <div className="search-types">
                    {['Songs', 'Albums', 'Artists', 'Playlists'].map((type) => (
                        <button
                            key={type}
                            className={`search-type-button ${searchType === type ? 'active' : ''}`}
                            onClick={() => handleSearchTypeChange(type)}
                        >
                            {type}
                        </button>
                    ))}
                    <br /><br />
                </div>
                <div className="search-container">
                    <form onSubmit={handleSearchSubmit} className="form-inline">
                        <input
                            type="text"
                            className="form-control search-bar mb-2 mr-sm-2"
                            placeholder="Search for songs, artists, albums, playlists"
                            value={searchTerm}
                            onChange={handleSearchChange} />
                        <button type="submit" className="btn btn-primary mb-2">Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
