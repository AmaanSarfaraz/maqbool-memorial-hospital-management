import React, { useState, useEffect } from 'react';
import BlogContext from './blogContext';
import axios from 'axios';
import {API_URL} from '../../services/config'
import { toast } from 'react-toastify';

const BlogContextProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/v1/blogs/all/blogs`,
                    {
                        withCredentials: true,
                    }
                );
                setBlogs(response.data.data);
            } catch (error) {
                // toast.error(error.response.data.message);
                setBlogs([]);
            }
        };

        fetchBlogs();
    }, [])
    return (
        <BlogContext.Provider value={{ blogs, setBlogs }}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
