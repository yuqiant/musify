// import React, { useState } from 'react';
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';

// function Home() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchType, setSearchType] = useState('Songs');
//     const URL = "http://localhost:4000/api/songs";

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleSearchSubmit = async (event) => {
//         event.preventDefault();
//         console.log('Search Term:', searchTerm);
//         console.log('Search Type:', searchType);
//         try {
//             // Make the API call
//             const response = await axios.post(URL, {
//                 searchTerm: searchTerm,
//                 searchType: searchType
//             });

//             const data = response.data;

//             // Do something with the search results
//             // For example, set them in the state and then map over that state to render components
//             console.log(data);
//         } catch (error) {
//             // Handle errors, for example, by setting an error message in your state and displaying it
//             // Axios wraps the response error in the 'response' object
//             if (error.response) {
//                 console.error('Error response:', error.response);
//             } else if (error.request) {
//                 console.error('Error request:', error.request);
//             } else {
//                 console.error('Error message:', error.message);
//             }
//         }
//     };

//     const handleSearchTypeChange = (type) => {
//         setSearchType(type);
//     };

//     return (
//         <div className="App">
//             <div className="playlist-section">
//                 <br /><br />
//                 <h2 className="playlist-heading">Make your Playlist</h2>
//                 <br /><br />
//                 <div className="search-types">
//                     {['Songs', 'Albums', 'Artists', 'Playlists'].map((type) => (
//                         <button
//                             key={type}
//                             className={`search-type-button ${searchType === type ? 'active' : ''}`}
//                             onClick={() => handleSearchTypeChange(type)}
//                         >
//                             {type}
//                         </button>
//                     ))}
//                     <br /><br />
//                 </div>
//                 <div className="search-container">
//                     <form onSubmit={handleSearchSubmit} className="form-inline">
//                         <input
//                             type="text"
//                             className="form-control search-bar mb-2 mr-sm-2"
//                             placeholder="Search for songs, artists, albums, playlists"
//                             value={searchTerm}
//                             onChange={handleSearchChange} />
//                         <button type="submit" className="btn btn-primary mb-2">Search</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useHistory } from 'react-router-dom'; // still needed for reading the current location
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';

// function Home() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const location = useLocation(); // to read the current query parameters
//     // const URL = "http://localhost:4000";
//     useEffect(() => {
//         // Extract search criteria from URL query parameters
//         const queryParams = new URLSearchParams(location.search);
//         const query = queryParams.get('criteria');
//         if (query) {
//             performSearch(query);
//         }
//     }, [location.search]);

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const performSearch = async (query) => {
//         const REMOTE_API_URL = "http://localhost:4000/search"; // replace with the actual remote API URL
//         try {
//             const response = await axios.get(`${REMOTE_API_URL}?query=${query}`);
//             setSearchResults(response.data.results); // Assuming the response has a 'results' field
//         } catch (error) {
//             console.error('Search error:', error);
//         }
//     };

//     const handleSearchSubmit = (event) => {
//         event.preventDefault();
//         performSearch(searchTerm);
//         window.history.pushState({}, '', `/search?criteria=${searchTerm}`); // Update URL without using history object
//     };

//     const renderSearchResults = () => {
//         return searchResults.map((result, index) => (
//             <div key={index} className="search-result-item">
//                 <img src={result.thumbnail} alt={result.title} />
//                 <h3>{result.title}</h3>
//                 <p>{result.description}</p>
//                 {/* Link to details page */}
//                 <a href={`/details/${result.id}`}>View Details</a>
//             </div>
//         ));
//     };

//     return (
//         <div className="App">
//             <div className="search-section">
//                 <form onSubmit={handleSearchSubmit} className="form-inline">
//                     <input
//                         type="text"
//                         className="form-control search-bar"
//                         placeholder="Search"
//                         value={searchTerm}
//                         onChange={handleSearchChange} />
//                     <button type="submit" className="btn btn-primary">Search</button>
//                 </form>

//                 <div className="search-results">
//                     {renderSearchResults()}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;


// doeesnt work but api changed
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Songs'); // New state for search type
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const REMOTE_API_URL = "http://localhost:4000/search";
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('criteria');
        if (query) {
            performSearch(query);
        }
    }, [location.search]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type); // Update the search type
    };

    const performSearch = async (query) => {
        try {
            const response = await axios.get(`${REMOTE_API_URL}?query=${query}&type=${searchType}`);
            console.log(response)
            setSearchResults(response.data.results || []);
            // setSearchResults(response.data || []);

        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        performSearch(searchTerm);
        // window.history.pushState({}, '', `/search?criteria=${searchTerm}`);
        navigate(`/search?criteria=${searchTerm}&type=${searchType}`);
    };

    const renderSearchResults = () => {
        console.log(searchResults);
        return searchResults.map((result, index) => (
            <div key={index} className="search-result-item">
                {/* <img src={result.thumbnail} alt={result.title} /> */}
                <h3>{result.songName}</h3>
                <p>{result.albumName}</p>
                <a href={`/details/${result.id}`}>View Details</a>
            </div>
        ));
    };





    return (
        <div className="App">
            <div className="search-section">
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
                </div>
                <form onSubmit={handleSearchSubmit} className="form-inline">
                    <input
                        type="text"
                        className="form-control search-bar"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange} />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
                <div className="search-results">
                    {renderSearchResults()}
                </div>
            </div>
        </div>
    );
}

export default Home;



