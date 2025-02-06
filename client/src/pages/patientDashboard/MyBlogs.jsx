import React, { useState, useEffect } from 'react';
import PatientContext from '../../context/admin/adminContext.js';
import BlogContext from '../../context/blog/blogContext.js';
import { format } from 'date-fns';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/config.js';

const MyBlogs = () => {
  const { isPatientAuthenticated, patientId } = React.useContext(PatientContext);
  const { blogs } = React.useContext(BlogContext);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [hoveredBlog, setHoveredBlog] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isPatientAuthenticated) {
      // Filter blogs for patient
      const patientBlogs = blogs.filter(blog => blog.author._id === patientId);
      setFilteredBlogs(patientBlogs);
    }
  }, [blogs, patientId, isPatientAuthenticated]);

  const handleHover = (blogId) => {
    setHoveredBlog(blogId);
  };

  const handleLeave = () => {
    setHoveredBlog(null);
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) {
      return; // If user cancels, exit the function
    }

    try {
      const { data } = await axios.delete(
        `${API_URL}/api/v1/blogs/delete/${blogId}`,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setFilteredBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogId)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (blogId) => {
    navigateTo(`/blogs/update/${blogId}`);
  };

  return (
    <div className="bg-white font-[sans-serif] my-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-start">
          <h2 className="text-3xl text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-blue-400 after:rounded-full">My Patient Blogs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
          {filteredBlogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 transition-all duration-300"
              onMouseEnter={() => handleHover(blog._id)}
              onMouseLeave={handleLeave}
            >
              <img src={blog.image} alt="Blog Post" className="w-full h-60 object-cover" />
              <div className="p-6">
                <span className="text-sm block text-gray-400 mb-2">{blog.authorType} | {format(new Date(blog.createdAt), "dd-MM-yy")} | {blog.author.fullName}</span>
                <h3 className="text-xl font-bold text-[#333]">{blog.title}</h3>
                <hr className="my-6" />
                <p className="text-gray-400 text-sm">{blog.body}</p>
                {hoveredBlog === blog._id && (
                  <>
                    <button
                      className="absolute top-0 right-0 text-black px-2 py-1 rounded-full hover:text-red-600"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <MdDelete className="text-4xl" />
                    </button>
                    <button
                      className="absolute top-10 right-0 text-black px-2 py-1 rounded-full hover:text-blue-600"
                      onClick={() => handleEdit(blog._id)}
                    >
                      <CiEdit className="text-4xl" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
