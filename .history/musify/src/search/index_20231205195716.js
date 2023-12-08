import React from 'react';

const SearchResults = ({ location }) => {
    // Assuming your search results are passed in the location state
    const { results } = location.state || { results: [] };

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