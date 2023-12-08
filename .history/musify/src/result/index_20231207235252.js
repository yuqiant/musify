import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Results() {
    const location = useLocation();

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
                // 处理错误
            }
        };

        performSearch();
    }, [location]);

    // 渲染搜索结果
    // ...
}

export default Results;
