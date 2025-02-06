import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogContext from '../../context/blog/blogContext.js';
import AdminContext from '../../context/admin/adminContext.js';
import PatientContext from '../../context/patient/patientContext.js';
import {API_URL} from '../../services/config.js'

const BlogCreate = () => {
  const { fetchBlogs } = useContext(BlogContext);
  const { admin, isAdminAuthenticated } = useContext(AdminContext);
  const { patient, isPatientAuthenticated } = useContext(PatientContext);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    author: '',
    authorType: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated) {
      setFormData((prevData) => ({
        ...prevData,
        author: admin.fullName,
        authorType: 'admin'
      }));
    } else if (isPatientAuthenticated) {
      setFormData((prevData) => ({
        ...prevData,
        author: patient?.fullName,
        authorType: 'patient'
      }));
    }
  }, [admin, patient, isAdminAuthenticated, isPatientAuthenticated]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      const response = await axios.post(
        `${API_URL}/api/v1/blogs/${formData.authorType}/create`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success(response.data.message);
      navigateTo("/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      handleImage(e);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prevData) => ({
        ...prevData,
        image: file
      }));
    };
  };

  return (
    <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from-blue-800 to-blue-500 text-[#333] lg:h-screen p-6">
      <div className="grid md:grid-cols-1  items-center gap-y-8 bg-white max-w-4xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md p-6">
        <form onSubmit={handleCreateBlog} className="sm:p-6 p-4 w-full">
          <div className="mb-4">
            <div
              className="w-full h-64 bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById('imageInput').click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Select Image</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              onChange={handleImage}
              className="hidden"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="authorType" className="block text-gray-700 font-bold mb-2">Author Type</label>
            <input
              type="text"
              id="authorType"
              name="authorType"
              value={formData.authorType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700 font-bold mb-2">Body</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="6"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogCreate;
