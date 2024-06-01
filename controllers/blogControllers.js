import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { Blog } from "../models/blogModel.js";
import fs from 'fs';

//getting all blogs
export const getAll = catchAsyncError(async (req, res, next) => {
    const blogs = await Blog.find({});
    if (blogs.length === 0) {
        return next(new ErrorHandeler("No blogs found!", 404));
    }
    res.status(200).json({
        blogs,
        success: true
    });
});

//getting single blog (for update and delete)
export const getSingle = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json({
        blog,
        success: true
    });
});

//getting latest blog to show in frontend
export const getLatest = catchAsyncError(async (req, res, next) => {
    const blog = await Blog.find({}).sort({ $natural: -1 }).limit(1);
    res.status(200).json({
        blog,
        success: true
    });
});

//adding blog
export const addBlog = catchAsyncError(async (req, res, next) => {
    const { title, description, author, author_id } = req.body;
    if (!title || !description || !author || !author_id) {
        return next(new ErrorHandeler("All fields are necessary!", 404));
    }
    let image = "";
    if (process.env.NODE_ENV === 'development') {
        image = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        image = `https://${req.hostname}/${req.file.filename}`;
    }
    await Blog.create({ title, description, author, author_id, image });
    res.status(200).json({
        message: "Blog added successfully!",
        success: true
    });
});

//updating blog
export const updateBlog = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    if (!data) {
        return next(new ErrorHandeler("No data supplied!", 400));
    }
    await Blog.findByIdAndUpdate(id, data);
    res.status(200).json({
        message: "Blog updated successfully!",
        success: true
    });
});

//updating blog image
export const updateBlogImg = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const prevImg = (await Blog.findById(id)).image.split("/").pop();
    fs.unlinkSync(`./uploads/blogs/${prevImg}`);
    let image = "";
    if (process.env.NODE_ENV === 'development') {
        image = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        image = `https://${req.hostname}/${req.file.filename}`;
    }
    await Blog.findByIdAndUpdate(id, { image });
    res.status(200).json({
        message: "Blog image updated successfully!",
        success: true
    });
});

// deleting blog
export const deleteBlog = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const prevImg = (await Blog.findById(id)).image.split("/").pop();
    fs.unlinkSync(`./uploads/blogs/${prevImg}`);
    await Blog.findByIdAndDelete(id);
    res.status(200).json({
        message: "Blog deleted successfully!",
        success: true
    });
});