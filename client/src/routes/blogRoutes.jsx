// src/routes/blogRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import CreateBlog from '../pages/Blog/CreateBlog';
import Blogs from '../pages/Blog/Blogs';
import EditBlog from '../pages/Blog/EditBlog';

const BlogRoutes = () => {
  return (
    <>
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/create" element={<CreateBlog />} />
      <Route path="/blogs/update/:blogId" element={<EditBlog />} />
    </>
  );
};

export default BlogRoutes;
