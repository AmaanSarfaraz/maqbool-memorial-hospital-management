import React from 'react';
import { format } from "date-fns";

import BlogContext from '../../context/blog/blogContext.js';

const Blogs = () => {

    const { blogs } = React.useContext(BlogContext)

    return (
    <div className="bg-white font-[sans-serif] my-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">LATEST BLOGS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
          {
            blogs.map(( blog ) => (
            <div key={blog?._id} className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                <img src={blog?.image} alt="Blog Post 1" className="w-full h-60 object-cover" />
                <div className="p-6">
                <span className="text-sm block text-gray-400 mb-2">{blog?.authorType} | {format(new Date(blog.createdAt), "dd-MM-yy")} | {blog.author?.fullName}</span>
                <h3 className="text-xl font-bold text-[#333]">{blog.title}</h3>
                <hr className="my-6" />
                <p className="text-gray-400 text-sm">{blog.body}</p>
                </div>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Blogs;

