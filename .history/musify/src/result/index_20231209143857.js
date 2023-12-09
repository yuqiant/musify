import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
import { AuthContext } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Results() {
    const location = useLocation();
    const REMOTE_API_URL = "http://localhost:4000/search";
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated, userId } = useContext(AuthContext);

    const goBack = () => navigate('/');  // go back to home

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        const type = queryParams.get('type');

        const handleViewDetails = (songId) => {
            navigate(`/details/${songId}`);
        };

        // 根据 query 和 type 执行搜索
        const performSearch = async () => {
            try {
                const response = await axios.get(`${REMOTE_API_URL}?query=${query}&type=${type}`);
                if (Array.isArray(response.data)) {
                    setSearchResults(response.data);
                    console.log("Response data:", response.data);
                    console.log("search page authenticate:", isAuthenticated);
                    // console.log("current authenticated:", isAuthenticated)

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
        if (searchResults.length === 0) {
            return <div>No results found</div>;
        }
        // return searchResults.map((result, index) => (


        //     <div key={index} className="search-result-item">
        //         <h5>Song : {result.songName}</h5>
        //         <h5>Album: {result.albumName}</h5>
        //         <h5>Artist: {result.artistName}</h5>
        //         <h5>Released Year: {result.releasedYear}</h5>
        //         <h5>Genre: {result.genre}</h5>


        //         <a href={`/details/${result.id}`}>View Details</a>
        //     </div>


        // ));
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Album</th>
                        <th>Artist</th>
                        {/* <th>Released Year</th>
                        <th>Genre</th>
                        <th>Details</th> */}
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result.songName}</td>
                            <td>{result.albumName}</td>
                            <td>{result.artistName}</td>
                            {/* <td>{result.releasedYear}</td>
                            <td>{result.genre}</td> */}
                            <td><a href={`/details/${result._id}`}>View Details</a></td>
                            {/* console.log("result id: ",{result._id}) */}

                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };


    return (
        <div>
            <button onClick={goBack} className="btn"> Back</button>

            <div>
                <br></br>
                <h3>Search Results</h3>
                <br></br>
            </div>
            <div>
                {renderSearchResults()}
            </div>
        </div>
    )
}

export default Results;
