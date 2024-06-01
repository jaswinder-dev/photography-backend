import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { Testimony } from "../models/testimonyModel.js";
import fs from 'fs';

//getting testimonies for frontend
export const getForFrontEnd = catchAsyncError(async (req, res, next) => {
    const testimonies = await Testimony.find({});
    if (testimonies.length > 0) {
        res.status(200).json({
            testimonies,
            success: true
        });
    } else {
        return next(new ErrorHandeler("No testimonies found!", 404));
    }
});

//getting all testimonies (also based on the role of the photographer)
export const getAll = catchAsyncError(async (req, res, next) => {
    const photographer = req.photographer;
    const role = photographer.role;
    let testimonies;
    if (role === 'Admin') {
        testimonies = await Testimony.find({});
    } else {
        testimonies = await Testimony.find({ photographer: photographer._id });
    }
    res.status(200).json({
        testimonies,
        success: true
    });
});

//getting single testimony (for update and delete)
export const getSingle = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const testimony = await Testimony.findById(id);
    if (testimony) {
        res.status(200).json({
            testimony,
            success: true
        });
    } else {
        return next(new ErrorHandeler("Not found!", 404));
    }
});

//adding testimony
export const addTestimony = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, testimony } = req.body;
    const photographer = req.photographer._id;
    if (!name || !email || !phone || !photographer || !testimony) {
        return next(new ErrorHandeler("All fields are neccessary!", 400));
    }
    let image;
    if (req.file) {
        if (process.env.NODE_ENV === 'development') {
            image = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
        } else {
            image = `https://${req.hostname}/${req.file.filename}`;
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            image = `http://${process.env.HOST}:${process.env.PORT}/default.png`;
        } else {
            image = `https://${req.hostname}/default.png`;
        }
    }
    await Testimony.create({ name, email, phone, photographer, testimony, image });
    res.status(200).json({
        message: "Testimony added successfully!",
        success: true
    });
});

//updating testimony
export const updateTestimony = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    if (!data) {
        return next(new ErrorHandeler("All fields are neccessary!", 400));
    }
    await Testimony.findByIdAndUpdate(id, data);
    res.status(200).json({
        message: "Testimony updated successfully!",
        success: true
    });
});

//deleting testimony
export const deleteTestimony = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const image = ((await Testimony.findById(id)).image).split("/").pop();
    if (image !== 'default.png') {
        fs.unlinkSync(`./uploads/testimonies/${image}`);
    }
    await Testimony.findByIdAndDelete(id);
    res.status(200).json({
        message: "Testimony deleted successfully!",
        success: true
    });
});