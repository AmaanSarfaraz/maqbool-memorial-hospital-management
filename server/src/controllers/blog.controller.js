import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";
import { Admin } from "../models/admin.model.js";
import { uploadOnCloudinary } from "../utilis/Cloudinary.js";

const getAllBlogs = asyncHandler(async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate("authorType", "fullName");
        if (!blogs.length) {
            throw new ApiError(404, "No blogs found");
        }
        return res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
    } catch (error) {
        console.error("Error in getAllBlogs:", error);
        throw new ApiError(500, `Error fetching blogs: ${error.message}`);
    }
});

const createBlog = asyncHandler(async (req, res, next) => {
    const { title, body, author, authorType } = req.body;
    if ([title, body, author, authorType].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const imageLocalPath = req.files?.image?.[0]?.path;
    if (!imageLocalPath) {
        throw new ApiError(400, "Blog image is required");
    }

    const blogImage = await uploadOnCloudinary(imageLocalPath);
    if (!blogImage) {
        throw new ApiError(400, "Failed to upload blog image");
    }

    let newAuthor;
    if (authorType === "Doctor") {
        newAuthor = await Doctor.findOne({ fullName: { $regex: new RegExp(author, "i") } });
    } else if (authorType === "Admin") {
        newAuthor = await Admin.findOne({ fullName: { $regex: new RegExp(author, "i") } });
    } else if (authorType === "Patient") {
        newAuthor = await Patient.findOne({ fullName: { $regex: new RegExp(author, "i") } });
    }

    if (!newAuthor) {
        throw new ApiError(404, `${authorType} not found`);
    }

    const blog = await Blog.create({
        title,
        body,
        author: newAuthor._id,
        authorType,
        image: blogImage.url,
    });

    return res.status(201).json(new ApiResponse(201, blog, "Blog created successfully"));
});

const getCurrentBlog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }
    return res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

const updateBlog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    let blog = await Blog.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    blog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    return res.status(200).json(new ApiResponse(200, blog, "Blog updated successfully"));
});

const deleteBlog = asyncHandler(async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }
        return res.status(200).json(new ApiResponse(200, blog, "Blog deleted successfully"));
    } catch (error) {
        console.error("Error in deleteBlog:", error);
        throw new ApiError(500, `Failed to delete blog: ${error.message}`);
    }
});

export { getAllBlogs, createBlog, getCurrentBlog, updateBlog, deleteBlog };
