import React, { useState } from 'react';
import axios from "axios";
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
        try {
            // Make the API call
            const response = await axios.post(apiEndpoint, {
                searchTerm: searchTerm,
                searchType: searchType
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response
            const data = await response.json();

            // Do something with the search results
            // For example, set them in the state and then map over that state to render components
            console.log(data);
        } catch (error) {
            // Handle errors, for example, by setting an error message in your state and displaying it
            console.error('There was a problem with the fetch operation:', error);
        }

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
