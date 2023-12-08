// SearchResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ location }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Assuming the searchTerm and searchType are passed via location state
                const { searchTerm, searchType } = location.state;
                const response = await axios.post('https://your-api-service.com/search', {
                    searchTerm,
                    searchType
                });
                setResults(response.data); // Set the results in state
            } catch (error) {
                setError('Failed to fetch results');
                console.error('There was a problem fetching the search results:', error);
            }
            setIsLoading(false);
        };

        // If the location state has searchTerm, trigger the search
        if (location.state && location.state.searchTerm) {
            fetchData();
        }
    }, [location.state]); // Only re-run the effect if location state changes

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Search Results</h2>
            <ul>
                {results.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
