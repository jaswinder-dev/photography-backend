import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { Photographer } from "../models/photographerModel.js";
import { Post } from "../models/postModel.js";
import { Portfolio } from '../models/PortfolioModel.js'
import fs from 'fs';

//getting all photographer
export const getAll = catchAsyncError(async (req, res, next) => {
    const photographers = await Photographer.find({});
    if (photographers) {
        res.status(200).json({
            photographers,
            success: true
        });
    } else {
        return next(new ErrorHandeler("No record found!", 404));
    }
});

//getting single photographer(for update and delete)
export const getSingle = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ErrorHandeler("No credentials supplied!", 400));
    }
    const photographer = await Photographer.findById(id);
    if (!photographer) {
        return next(new ErrorHandeler("Photographer not found!", 400));
    } else {
        res.status(200).json({
            success: true,
            photographer: {
                _id: photographer._id,
                fullname: photographer.fullname,
                username: photographer.username,
                email: photographer.email,
                avatar: photographer.avatar,
                role: photographer.role,
                phone: photographer.phone,
                posts: photographer.posts
            }
        });
    }
});

//getting photographer's profile
export const getMyProfile = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        photographer: req.photographer,
        success: true
    });
});

//adding photographer
export const addPhotographer = catchAsyncError(async (req, res, next) => {
    const { fullname, username, email, phone, password, role } = req.body;
    if (!fullname || !username || !email || !phone || !password || !role) {
        return next(new ErrorHandeler("All the fields are necessary!", 400));
    }

    const doesAleradyExist = await Photographer.findOne({
        username: username,
        email: email
    });

    if (doesAleradyExist) {
        return next(new ErrorHandeler("This photographer alredy exists!", 400));
    }

    await Photographer.create({ fullname, username, email, phone, password, role });
    res.status(200).json({
        message: "Photographer added successfully!",
        success: true
    });
});

//updating photographer data
export const updatePhotographer = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    if (!data) {
        return next(new ErrorHandeler("No data supplied to update!", 400));
    }

    await Photographer.findByIdAndUpdate(id, data);
    const photographer = await Photographer.findOne({ _id: id });
    if (photographer) {
        res.status(200).json({
            photographer,
            message: "Photographer updated successfully!",
            success: true
        });
    } else {
        return next(new ErrorHandeler("Cannot update data!", 400));
    }
});

//updating photographer avatar
export const updateAvatar = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const prevAvatar = ((await Photographer.findById(id)).avatar).split("/").pop();
    if (prevAvatar !== 'default.png') {
        fs.unlinkSync(`./uploads/photographers/${prevAvatar}`);
    }
    let avatar = "";
    if (process.env.NODE_ENV === 'development') {
        avatar = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        avatar = `https://${req.hostname}/${req.file.filename}`;
    }
    await Photographer.findByIdAndUpdate(id, { avatar });
    res.status(200).json({
        success: true,
        message: "Profile picture updated successfully!"
    });
});

// deleting photographer avatar
export const DeleteAvatar = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const prevAvatar = ((await Photographer.findById(id)).avatar).split("/").pop();
    if (prevAvatar !== 'default.png') {
        fs.unlinkSync(`./uploads/photographers/${prevAvatar}`);
    }
    let avatar = "";
    if (process.env.NODE_ENV === 'development') {
        avatar = `http://${process.env.HOST}:${process.env.PORT}/default.png`;
    } else {
        avatar = `https://${req.hostname}/default.png`;
    }
    await Photographer.findByIdAndUpdate(id, { avatar });
    res.status(200).json({
        success: true,
        message: "Profile picture removed successfully!"
    });
});

//deleting photographer
export const deletePhotographer = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(new ErrorHandeler("No credentials supplied to delete!", 400));
    }

    const photographerImg = ((await Photographer.findById(id)).avatar).split("/").pop();

    const isDeleted = await Photographer.findByIdAndDelete(id);

    if (!isDeleted) {
        return next(new ErrorHandeler("Cannot delete this photographer!", 400));
    }

    if (photographerImg !== 'default.png') {
        fs.unlinkSync(`./uploads/photographers/${photographerImg}`);
    }

    const postsByPhotographer = await Post.find({ photographer: id });
    if (postsByPhotographer.length > 0) {
        postsByPhotographer.forEach(async (post) => {
            let portfolioId = post.portfolio;
            let no_of_posts = (await Portfolio.findById(portfolioId)).posts;
            no_of_posts -= 1;
            await Portfolio.findByIdAndUpdate(portfolioId, { posts: no_of_posts });
        });
        await Post.deleteMany({ photographer: id });
    }
    res.status(200).json({
        message: "Photographer deleted successfully!",
        success: true
    });
});