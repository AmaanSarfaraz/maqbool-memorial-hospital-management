import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {API_URL} from '../../services/config.js'


const BlogEdit = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/v1/blogs/get/${blogId}`);
                setBlog({
                    title: data.title,
                    body: data.body,
                    image: data.image,
                });
            } catch (error) {
                toast.error('Error fetching blog details');
            }
        };
        fetchBlog();
    }, [blogId]);

    if (!blog) {
        return <div>Loading...</div>; // Show loading while fetching data
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('body', blog.body);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const { data } = await axios.patch(`${API_URL}/api/v1/blogs/update/${blogId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            toast.success(data.message);
            setBlog(data.data);
            navigate('/my-blogs');
        } catch (error) {
            toast.error('Error updating blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 ">
            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Body</label>
                    <textarea
                        name="body"
                        value={blog.body}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                {loading && <div>Updating...</div>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Blog'}
                </button>
            </form>
        </div>
    );
};

export default BlogEdit;