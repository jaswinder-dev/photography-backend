import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { Portfolio } from "../models/PortfolioModel.js";
import { Photographer } from "../models/photographerModel.js";
import { Post } from "../models/postModel.js";
import fs from 'fs';

//getting all posts.
export const getAll = catchAsyncError(async (req, res, next) => {
    const posts = await Post.find({});
    res.status(200).json({
        posts,
        success: true
    });
});

//getting latest posts (total 15 posts, for showing in frontend)
export const getLatest = catchAsyncError(async (req, res, next) => {
    let posts = await Post.find({}).sort({ $natural: 1 }).limit(15);
    res.status(200).json({
        posts,
        success: true
    });
});

//adding post
export const addPost = catchAsyncError(async (req, res, next) => {
    const photographerId = req.photographer._id;
    const photographerUserName = req.photographer.username;
    const { description, portfolio } = req.body;
    if (!portfolio) {
        return next(new ErrorHandeler("Cound not access the necessary fields!", 400))
    }
    let image = "";
    if (process.env.NODE_ENV === 'development') {
        image = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        image = `https://${req.hostname}/${req.file.filename}`;
    }
    await Post.create({
        image,
        description,
        photographer: photographerId,
        photographer_name: photographerUserName,
        portfolio,
    });
    let posts = (await Photographer.findById(photographerId)).posts;
    posts += 1;
    await Photographer.findByIdAndUpdate(photographerId, { posts });
    posts = (await Portfolio.findById(portfolio)).posts;
    posts += 1;
    await Portfolio.findByIdAndUpdate(portfolio, { posts });
    res.status(200).json({
        message: 'Post added successfully!',
        success: true
    });
});

//used when showing the posts to a specific role.
export const getSpecific = catchAsyncError(async (req, res, next) => {
    let posts = [];
    if (req.photographer.role === "Admin") {
        posts = await Post.find({});
    } else {
        posts = await Post.find({ photographer: req.photographer._id });
    }
    res.status(200).json({
        posts,
        success: true
    });
});

//used for all posts of a particular photographer.
export const getById = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let posts = await Post.find({ photographer: id });
    res.status(200).json({
        posts,
        success: true
    });
});

//getting single posts (for update and delete)
export const getSingle = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json({
        post,
        success: true
    });
});

//getting post by condition
export const getByCondition = catchAsyncError(async (req, res, next) => {
    const { condition } = req.params;
    const query = JSON.parse(condition);
    const posts = await Post.find(query);
    res.status(200).json({
        posts,
        success: true
    });
});

//updating post data
export const updatePost = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    await Post.findByIdAndUpdate(id, data);
    res.status(200).json({
        message: 'Post updated successfully!',
        success: true
    });
});

//updating post image
export const updateImage = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const prevPost = ((await Post.findById(id)).image).split("/").pop();
    if (prevPost !== 'default.jpg') {
        fs.unlinkSync(`./uploads/posts/${prevPost}`);
    }
    let image = "";
    if (process.env.NODE_ENV === 'development') {
        image = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        image = `https://${req.hostname}/${req.file.filename}`;
    }
    await Post.findByIdAndUpdate(id, { image });
    res.status(200).json({
        message: 'Image updated successfully!',
        success: true
    });
});

//deleting post
export const deletePost = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const postToDelete = await Post.findById(id);
    const photographerId = postToDelete.photographer;
    const portfolioId = postToDelete.portfolio;
    const image = (postToDelete.image).split("/").pop();
    await Post.findByIdAndDelete(id);
    let posts = (await Photographer.findById(photographerId)).posts;
    posts -= 1;
    await Photographer.findByIdAndUpdate(photographerId, { posts });
    posts = (await Portfolio.findById(portfolioId)).posts;
    posts -= 1;
    await Portfolio.findByIdAndUpdate(portfolioId, { posts });
    fs.unlinkSync(`./uploads/posts/${image}`);
    res.status(200).json({
        message: 'Post deleted successfully!',
        success: true
    });
});