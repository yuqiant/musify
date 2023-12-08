import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';

function Results() {
    const location = useLocation();
    const REMOTE_API_URL = "http://localhost:4000/search";
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        const type = queryParams.get('type');

        // 根据 query 和 type 执行搜索
        const performSearch = async () => {
            try {
                const response = await axios.get(`${REMOTE_API_URL}?query=${query}&type=${type}`);
                if (Array.isArray(response.data)) {
                    setSearchResults(response.data);
                    console.log("Response data:", response.data);
                } else {
                    setSearchResults([response.data]);
                }
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]); // 在错误情况下设置为空数组
            }
        };

        performSearch();
    }, [location]);

    const renderSearchResults = () => {
        console.log("in render", searchResults);
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
        <div>
            <Navbar />
        </div>
    )
}

export default Results;
